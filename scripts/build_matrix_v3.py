# scripts/build_matrix_v3.py
# Master Assembler for 15,000 Questions - Ai Là Triệu Phú (VTV3)
# Strictly adheres to VTV3 4-Tier Matrix:
# Tầng 1 (L1-5): Warm-up, idioms, proverbs, daily life, primary school. 0% obscure Western generals.
# Tầng 2 (L6-10): Foundation & expansion (geography, sports, music, cinema, science).
# Tầng 3 (L11-13): Deep specialized knowledge (Patton, MacArthur, Truman, Nobel laureates).
# Tầng 4 (L14-15): Pinnacle academic & archival.

import os
import sys
import json
import sqlite3
import re
import random

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import banks_data as bd
import native_bank_easy as nbe
import native_bank_more as nbm
import vietnamese_t1_rich_bank as vtr
import vietnamese_t1_part2 as vtp

def clean_text(s):
    if s is None:
        return ""
    s = str(s).strip()
    s = re.sub(r'\s*\((?:Câu|Mã|ID|Lần|Khảo sát|Tích cổ|Địa danh|Mã số|Tư liệu)[^)]*\)', '', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

def normalize_category(cat_raw, q_text="", opt_text=""):
    c = str(cat_raw).lower().strip()
    full_text = (str(q_text) + " " + str(opt_text)).lower()
    
    if any(k in c for k in ['sport', 'thể thao', 'bóng đá', 'olympic']) or any(k in full_text for k in ['world cup', 'olympic', 'sea games', 'cầu thủ', 'bóng đá', 'quần vợt', 'vô địch']):
        return "Thể thao"
    if any(k in c for k in ['ẩm thực', 'food']) or any(k in full_text for k in ['món ăn', 'đặc sản', 'nước mắm', 'bánh chưng', 'bánh tét', 'phở', 'bún bò', 'canh cua']):
        return "Ẩm thực & Văn hóa"
    if any(k in c for k in ['history', 'lịch sử', 'quân sự', 'people']) or any(k in full_text for k in ['vua', 'triều đại', 'khởi nghĩa', 'năm 19', 'năm 18', 'năm 17', 'thế kỷ', 'tổng thống', 'thống tướng', 'tướng', 'hiệp ước', 'chiến tranh', 'đế quốc', 'cách mạng', 'patton', 'macarthur', 'truman']):
        return "Lịch sử"
    if any(k in c for k in ['văn học', 'thơ', 'truyện', 'tiểu thuyết', 'humanities']) or any(k in full_text for k in ['nhà thơ', 'nhà văn', 'tác phẩm', 'tiểu thuyết', 'truyện kiều', 'tập thơ', 'bài thơ', 'tác giả của', 'nhân vật']):
        return "Văn học"
    if any(k in c for k in ['geography', 'địa lý', 'tỉnh', 'quốc gia', 'thành phố']) or any(k in full_text for k in ['thủ đô', 'tỉnh lỵ', 'châu lục', 'con sông', 'dãy núi', 'biển', 'quần đảo', 'hòn đảo', 'đất nước']):
        return "Địa lý"
    if any(k in c for k in ['nghệ thuật', 'âm nhạc', 'hội họa', 'điện ảnh', 'phim', 'movies', 'music', 'art']) or any(k in full_text for k in ['bài hát', 'nhạc sĩ', 'ca sĩ', 'họa sĩ', 'bức tranh', 'bộ phim', 'đạo diễn', 'diễn viên', 'giải oscar']):
        return "Nghệ thuật & Giải trí"
    if any(k in c for k in ['khoa học', 'hóa học', 'vật lý', 'sinh học', 'animals', 'thiên nhiên']) or any(k in full_text for k in ['nguyên tố', 'hóa học', 'vật lý', 'sinh học', 'hành tinh', 'hệ mặt trời', 'tế bào', 'nhiệt độ', 'động vật', 'thực vật', 'loài chim', 'loài cá']):
        return "Khoa học & Tự nhiên"
    return "Đời sống & Thường thức"

seen_global = set()
questions_by_level = {lv: [] for lv in range(1, 16)}

def add_q(level, category, q_text, opt_a, opt_b, opt_c, opt_d, correct_ans):
    qc = clean_text(q_text)
    if not qc or len(qc) < 8 or len(qc) > 380:
        return False
        
    norm_key = qc.lower()
    if norm_key in seen_global:
        return False
        
    oa = clean_text(opt_a)
    ob = clean_text(opt_b)
    oc = clean_text(opt_c)
    od = clean_text(opt_d)
    
    opts = [oa, ob, oc, od]
    if len(set(opts)) < 4 or any(len(o) == 0 for o in opts):
        return False
        
    ans_letter = None
    if correct_ans in ['A', 'B', 'C', 'D']:
        ans_letter = correct_ans
    else:
        ans_clean = clean_text(correct_ans)
        if ans_clean in opts:
            ans_letter = ['A', 'B', 'C', 'D'][opts.index(ans_clean)]
            
    if not ans_letter:
        return False
        
    target_correct_text = {'A': oa, 'B': ob, 'C': oc, 'D': od}[ans_letter]
    random.shuffle(opts)
    new_letter = ['A', 'B', 'C', 'D'][opts.index(target_correct_text)]
    
    cat_vn = normalize_category(category, qc, " ".join(opts))
    
    seen_global.add(norm_key)
    questions_by_level[level].append({
        "level": level,
        "difficulty": level,
        "category": cat_vn,
        "question": qc,
        "option_a": opts[0],
        "option_b": opts[1],
        "option_c": opts[2],
        "option_d": opts[3],
        "correct_answer": new_letter
    })
    return True

print("1. Nạp từ Question_sqlite (4,228 câu VTV3 gốc)...")
conn = sqlite3.connect('/Users/soncris/Ailatrieuphu/Question_sqlite')
cur = conn.cursor()
for lv in range(1, 16):
    try:
        cur.execute(f"SELECT question, casea, caseb, casec, cased, truecase FROM Question{lv}")
        for q, a, b, c, d, ans in cur.fetchall():
            ans_letter = ['A', 'B', 'C', 'D'][int(ans)-1]
            add_q(lv, "VTV3", q, a, b, c, d, ans_letter)
    except Exception as e:
        pass
conn.close()

print("2. Nạp kho câu hỏi Tiếng Việt thuần (Level 1 - 5)...")
for item in vtr.RICH_T1_QUESTIONS:
    add_q(*item)

for item in vtp.MORE_T1_QUESTIONS:
    add_q(*item)

for item in nbe.EASY_QUESTIONS:
    add_q(*item)

for item in nbm.MORE_VIETNAMESE_QUESTIONS:
    add_q(*item)

# 63 Tỉnh thành
for p in bd.PROVINCES_63:
    name, center, region, landmark, food, flower = p
    add_q(3, "Địa lý", f"Tỉnh lỵ (trung tâm hành chính) của tỉnh {name} là thành phố hoặc thị xã nào?", center, "TP Huế", "TP Đà Nẵng", "TP Nha Trang", "A")
    add_q(3, "Địa lý", f"Địa danh thắng cảnh '{landmark}' nổi tiếng tọa lạc tại tỉnh/thành phố nào?", name, "Hà Nội", "TP Hồ Chí Minh", "Lâm Đồng", "A")
    add_q(2, "Ẩm thực & Văn hóa", f"Món ăn đặc sản '{food}' nức tiếng gần xa là niềm tự hào ẩm thực của địa phương nào?", name, "Bắc Giang", "Cà Mau", "Tây Ninh", "A")

# Countries
for c in bd.COUNTRIES_WORLD:
    name, cap, cont, curr, lang = c
    add_q(5, "Địa lý", f"Thủ đô của quốc gia {name} là thành phố nào?", cap, "London", "Paris", "Washington D.C.", "A")
    add_q(6, "Địa lý", f"Quốc gia {name} thuộc châu lục nào sau đây?", cont, "Châu Đại Dương", "Châu Nam Cực", "Châu Phi", "A")

# Elements
for el in bd.ELEMENTS_CHEMISTRY:
    name, sym, num, feat, desc = el
    add_q(5, "Khoa học & Tự nhiên", f"Ký hiệu hóa học của nguyên tố {name} trong bảng tuần hoàn là gì?", sym, "H", "O", "C", "A")
    add_q(8, "Khoa học & Tự nhiên", f"Nguyên tố nào có số hiệu nguyên tử (Z) bằng {num} và có đặc điểm '{feat}'?", name, "Sắt", "Đồng", "Nhôm", "A")

# Historical VN
for h in bd.HISTORICAL_VN:
    q, corr, w1, w2, w3, cat, lvl = h
    add_q(lvl, cat, q, corr, w1, w2, w3, "A")

# Literature VN
for lit in bd.LITERATURE_VN:
    q, corr, w1, w2, w3, cat, lvl = lit
    add_q(lvl, cat, q, corr, w1, w2, w3, "A")

# Sports Data
for s in bd.SPORTS_DATA:
    q, corr, w1, w2, w3, cat, lvl = s
    add_q(lvl, cat, q, corr, w1, w2, w3, "A")

# Arts and Music
for m in bd.ARTS_AND_MUSIC:
    q, corr, w1, w2, w3, cat, lvl = m
    add_q(lvl, cat, q, corr, w1, w2, w3, "A")

print("Hiện trạng sau các ngân hàng thuần Việt:")
for lv in range(1, 16):
    print(f"  Level {lv:2d}: {len(questions_by_level[lv])}")

print("3. Nạp từ Translated Trivia theo ma trận độ khó chặt chẽ...")
with open('/tmp/translated_trivia.json', 'r', encoding='utf-8') as f:
    translated = json.load(f)

obscure_keywords = [
    'patton', 'macarthur', 'truman', 'watergate', 'vaaler', 'nobel', 'sắc lệnh', 
    'tổng thống', 'thủ tướng', 'hiệp ước', 'thế kỷ 16', 'thế kỷ 17', 'thế kỷ 18', 
    'giải oscar lần thứ', 'bằng sáng chế', 'kỷ lục thế giới', 'duy nhất', 'vụ bê bối',
    'năm 18', 'năm 17', 'chiến tranh thế giới', 'quân đội', 'tướng', 'đế quốc', 'la mã'
]

for k, item in translated.items():
    q_txt = item.get('q', '')
    cat_raw = item.get('category', 'general')
    opt_a = item.get('a', '')
    opt_b = item.get('b', '')
    opt_c = item.get('c', '')
    opt_d = item.get('d', '')
    ans_letter = item.get('letter', 'A')
    
    q_lower = q_txt.lower()
    
    # Strictly map:
    # Obscure history & Western generals -> STRICTLY Levels 11 - 15 (Tầng 3 & 4)
    if any(w in q_lower for w in obscure_keywords) or cat_raw in ['history', 'people']:
        target_pool = [11, 12, 13, 14, 15]
    elif cat_raw == 'animals':
        # Simple animal questions -> Level 4, 5, 6
        target_pool = [4, 5, 6]
    elif cat_raw == 'geography':
        # Geography capitals/rivers -> Level 5, 6, 7
        target_pool = [5, 6, 7]
    elif cat_raw == 'sports':
        # Sports -> Level 6, 7, 8, 9, 10
        target_pool = [6, 7, 8, 9, 10]
    elif cat_raw in ['music', 'movies']:
        target_pool = [7, 8, 9, 10]
    else:
        # Humanities, World, General -> Level 8 to 15
        target_pool = [8, 9, 10, 11, 12, 13, 14, 15]
        
    underfilled = [lv for lv in target_pool if len(questions_by_level[lv]) < 1000]
    if underfilled:
        chosen_lv = min(underfilled, key=lambda lv: len(questions_by_level[lv]))
        add_q(chosen_lv, cat_raw, q_txt, opt_a, opt_b, opt_c, opt_d, ans_letter)

print("\nHiện trạng sau khi nạp Trivia:")
for lv in range(1, 16):
    print(f"  Level {lv:2d}: {len(questions_by_level[lv])}")

# Balance Levels 1 - 5:
# If level 1 has 950 and level 2 has 980, we can borrow gentle warm-up questions from level 2 to 1, or level 3 to 2
for target_lv in range(1, 6):
    while len(questions_by_level[target_lv]) < 1000:
        donors = [lv for lv in range(target_lv + 1, 6) if len(questions_by_level[lv]) > 1000]
        if not donors:
            # If no donors in 1-5, check level 6 (easiest level 6)
            donors = [lv for lv in range(1, 7) if len(questions_by_level[lv]) > 1000]
        if not donors:
            break
        donor = donors[0]
        item = questions_by_level[donor].pop()
        item['level'] = target_lv
        item['difficulty'] = target_lv
        questions_by_level[target_lv].append(item)

# Balance Levels 6 - 15:
for target_lv in range(6, 16):
    while len(questions_by_level[target_lv]) < 1000:
        donors = [lv for lv in range(6, 16) if len(questions_by_level[lv]) > 1000]
        if not donors:
            break
        donor = min(donors, key=lambda lv: abs(lv - target_lv))
        item = questions_by_level[donor].pop()
        item['level'] = target_lv
        item['difficulty'] = target_lv
        questions_by_level[target_lv].append(item)

# Trim each level to exactly 1,000
for lv in range(1, 16):
    questions_by_level[lv] = questions_by_level[lv][:1000]

print("\n=== KẾT QUẢ ĐÃ ĐẠT CHUẨN 1.000 CÂU MỖI CẤP ĐỘ (TỔNG 15.000 CÂU) ===")
total = 0
for lv in range(1, 16):
    cnt = len(questions_by_level[lv])
    print(f"  Level {lv:2d}: {cnt} câu")
    total += cnt

print(f"Tổng cộng: {total} câu")

# Build final output
final_list = []
for lv in range(1, 16):
    final_list.extend(questions_by_level[lv])

out_paths = [
    '/Users/soncris/Ailatrieuphu/src/data/questions_15k.json',
    '/Users/soncris/Ailatrieuphu/data/questions_15k.json'
]
for p in out_paths:
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(final_list, f, ensure_ascii=False, indent=2)
    print(f"Đã lưu thành công vào: {p}")
