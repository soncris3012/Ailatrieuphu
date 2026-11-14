# scripts/assemble_perfect_15k.py
# Final Perfect Master Assembler for 15,000 Questions - Ai Là Triệu Phú (VTV3)
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
import vietnamese_t1_part2 as vtp2
import vietnamese_t1_part3 as vtp3
import vietnamese_t1_part4 as vtp4
import vietnamese_t1_part5 as vtp5
import vietnamese_t1_part6 as vtp6

def clean_text(s):
    if s is None: return ""
    s = str(s).strip()
    s = re.sub(r'\s*\((?:Câu|Mã|ID|Lần|Khảo sát|Tích cổ|Địa danh|Mã số|Tư liệu)[^)]*\)', '', s)
    return re.sub(r'\s+', ' ', s).strip()

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

print("1. Nạp từ Question_sqlite (4,228 câu VTV3 chính thức)...")
conn = sqlite3.connect('/Users/soncris/Ailatrieuphu/Question_sqlite')
cur = conn.cursor()
for lv in range(1, 16):
    try:
        cur.execute(f"SELECT question, casea, caseb, casec, cased, truecase FROM Question{lv}")
        for q, a, b, c, d, ans in cur.fetchall():
            add_q(lv, "VTV3", q, a, b, c, d, ['A', 'B', 'C', 'D'][int(ans)-1])
    except Exception:
        pass
conn.close()

print("2. Nạp từ m1804, m1805, m1806...")
for p in ['/tmp/m1804.sqlite', '/tmp/m1805.sqlite', '/tmp/m1806.sqlite']:
    if os.path.exists(p):
        conn_m = sqlite3.connect(p)
        cu = conn_m.cursor()
        for tbl, lv in [('CauHoiDe', 1), ('CauHoiThuong', 6), ('CauHoiKho', 11)]:
            try:
                cu.execute(f"SELECT cauHoi, dapAnA, dapAnB, dapAnC, dapAnD, cauTraLoi FROM {tbl}")
                for q, a, b, c, d, ans in cu.fetchall():
                    add_q(lv, "VTV3", q, a, b, c, d, ans)
            except Exception:
                pass
        conn_m.close()

print("3. Nạp ngân hàng câu hỏi Thuần Việt văn hóa & đời sống...")
for item in vtr.RICH_T1_QUESTIONS: add_q(*item)
for item in vtp2.MORE_T1_QUESTIONS: add_q(*item)
for item in vtp3.EXPANDED_T1_QUESTIONS: add_q(*item)
for item in vtp4.FINAL_EXPANSION_QUESTIONS: add_q(*item)
for item in vtp5.EXTRA_AUTHENTIC_QUESTIONS: add_q(*item)
for item in vtp6.TOPUP_T1_QUESTIONS: add_q(*item)
for item in nbe.EASY_QUESTIONS: add_q(*item)
for item in nbm.MORE_VIETNAMESE_QUESTIONS: add_q(*item)

# 63 Tỉnh thành
for p in bd.PROVINCES_63:
    name, center, region, landmark, food, flower = p
    add_q(3, "Địa lý", f"Tỉnh lỵ (trung tâm hành chính) của tỉnh {name} là thành phố hoặc thị xã nào?", center, "TP Huế", "TP Đà Nẵng", "TP Nha Trang", "A")
    add_q(3, "Địa lý", f"Địa danh thắng cảnh '{landmark}' nổi tiếng tọa lạc tại tỉnh/thành phố nào?", name, "Hà Nội", "TP Hồ Chí Minh", "Lâm Đồng", "A")
    add_q(2, "Ẩm thực & Văn hóa", f"Món ăn đặc sản '{food}' nức tiếng gần xa là niềm tự hào ẩm thực của địa phương nào?", name, "Bắc Giang", "Cà Mau", "Tây Ninh", "A")

for item_c in bd.COUNTRIES_WORLD:
    name, cap, cont, curr, lang = item_c
    add_q(5, "Địa lý", f"Thủ đô của quốc gia {name} là thành phố nào?", cap, "London", "Paris", "Washington D.C.", "A")
    add_q(6, "Địa lý", f"Quốc gia {name} thuộc châu lục nào sau đây?", cont, "Châu Đại Dương", "Châu Nam Cực", "Châu Phi", "A")

for el in bd.ELEMENTS_CHEMISTRY:
    name, sym, num, feat, desc = el
    add_q(5, "Khoa học & Tự nhiên", f"Ký hiệu hóa học của nguyên tố {name} trong bảng tuần hoàn là gì?", sym, "H", "O", "C", "A")
    add_q(8, "Khoa học & Tự nhiên", f"Nguyên tố nào có số hiệu nguyên tử (Z) bằng {num} và có đặc điểm '{feat}'?", name, "Sắt", "Đồng", "Nhôm", "A")

for h in bd.HISTORICAL_VN: add_q(h[6], h[5], h[0], h[1], h[2], h[3], h[4], "A")
for lit in bd.LITERATURE_VN: add_q(lit[6], lit[5], lit[0], lit[1], lit[2], lit[3], lit[4], "A")
for s in bd.SPORTS_DATA: add_q(s[6], s[5], s[0], s[1], s[2], s[3], s[4], "A")
for m in bd.ARTS_AND_MUSIC: add_q(m[6], m[5], m[0], m[1], m[2], m[3], m[4], "A")

print("Hiện trạng trước khi nạp Trivia:")
for lv in range(1, 16):
    print(f"  Level {lv:2d}: {len(questions_by_level[lv])}")

print("4. Nạp từ Translated Trivia...")
with open('/tmp/translated_trivia.json', 'r', encoding='utf-8') as f:
    translated = json.load(f)

obscure_keywords = [
    'patton', 'macarthur', 'truman', 'watergate', 'vaaler', 'nobel', 'sắc lệnh', 
    'tổng thống', 'thủ tướng', 'hiệp ước', 'thế kỷ 16', 'thế kỷ 17', 'thế kỷ 18', 
    'giải oscar', 'bằng sáng chế', 'kỷ lục thế giới', 'duy nhất', 'vụ bê bối', 'kennedy', 'west point', 'tướng mỹ',
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
    full_item_lower = (q_lower + " " + opt_a + " " + opt_b + " " + opt_c + " " + opt_d).lower()
    if any(w in full_item_lower for w in obscure_keywords) or cat_raw in ['history', 'people']:
        target_pool = [11, 12, 13, 14, 15]
    elif cat_raw == 'animals':
        target_pool = [1, 2, 3, 4, 5, 6]
    elif cat_raw == 'geography':
        target_pool = [2, 3, 4, 5, 6, 7]
    elif cat_raw == 'sports':
        target_pool = [6, 7, 8, 9, 10]
    elif cat_raw in ['music', 'movies']:
        target_pool = [6, 7, 8, 9, 10]
    elif cat_raw == 'general':
        target_pool = [2, 3, 4, 5, 6, 7, 8, 9, 10]
    else:
        target_pool = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        
    underfilled = [lv for lv in target_pool if len(questions_by_level[lv]) < 1000]
    if underfilled:
        chosen_lv = min(underfilled, key=lambda lv: len(questions_by_level[lv]))
        add_q(chosen_lv, cat_raw, q_txt, opt_a, opt_b, opt_c, opt_d, ans_letter)

print("\nHiện trạng sau khi nạp Trivia:")
for lv in range(1, 16):
    print(f"  Level {lv:2d}: {len(questions_by_level[lv])}")

# 5. Cân bằng tuyệt đối mỗi cấp độ đạt 1.000 câu
# Cân bằng trong nội bộ Tầng 1 (Level 1 - 5)
for target_lv in range(1, 6):
    while len(questions_by_level[target_lv]) < 1000:
        donors = [lv for lv in range(1, 6) if len(questions_by_level[lv]) > 1000]
        if not donors:
            donors = [lv for lv in range(1, 7) if len(questions_by_level[lv]) > 1000]
        if not donors:
            break
        donor = donors[0]
        item = questions_by_level[donor].pop()
        item['level'] = target_lv
        item['difficulty'] = target_lv
        questions_by_level[target_lv].append(item)

# Cân bằng trong Tầng 2, 3, 4 (Level 6 - 15)
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

# Cắt gọn mỗi level đúng 1.000 câu
for lv in range(1, 16):
    questions_by_level[lv] = questions_by_level[lv][:1000]

print("\n=== KẾT QUẢ PHÂN BỔ 15 CẤP ĐỘ ===")
total = 0
for lv in range(1, 16):
    cnt = len(questions_by_level[lv])
    print(f"  Level {lv:2d}: {cnt} câu")
    total += cnt

print(f"Tổng cộng: {total} câu")

# Kiểm tra phân bố đáp án đúng (A, B, C, D)
counts_ans = {'A': 0, 'B': 0, 'C': 0, 'D': 0}
final_list = []
for lv in range(1, 16):
    for q in questions_by_level[lv]:
        counts_ans[q['correct_answer']] = counts_ans.get(q['correct_answer'], 0) + 1
        final_list.append(q)

print("\nPhân bố đáp án đúng:")
for k, v in counts_ans.items():
    print(f"  {k}: {v} câu ({v/len(final_list)*100:.1f}%)")

# Ghi ra file
out_paths = [
    '/Users/soncris/Ailatrieuphu/src/data/questions_15k.json',
    '/Users/soncris/Ailatrieuphu/data/questions_15k.json'
]
for p in out_paths:
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(final_list, f, ensure_ascii=False, indent=2)
    print(f"Đã lưu thành công vào: {p}")
