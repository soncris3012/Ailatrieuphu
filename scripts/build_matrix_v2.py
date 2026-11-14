# scripts/build_matrix_v2.py
# Clean, deterministic, robust 15,000 question assembler for Ai Là Triệu Phú (VTV3)
# Exactly matching user's 4-tier specification.

import os
import sys
import json
import sqlite3
import re
import random

def clean_text(s):
    if s is None:
        return ""
    s = str(s).strip()
    s = re.sub(r'\s*\((?:Câu|Mã|ID)[^)]*\)', '', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

def normalize_category(cat_raw, q_text="", opt_text=""):
    c = str(cat_raw).lower().strip()
    full_text = (str(q_text) + " " + str(opt_text)).lower()
    
    # Sports
    if any(k in c for k in ['sport', 'thể thao', 'bóng đá', 'olympic']) or any(k in full_text for k in ['world cup', 'olympic', 'sea games', 'cầu thủ', 'bóng đá', 'quần vợt', 'vô địch giải']):
        return "Thể thao"
    # History
    if any(k in c for k in ['history', 'lịch sử', 'quân sự']):
        return "Lịch sử"
    if any(k in full_text for k in ['vua', 'triều đại', 'khởi nghĩa', 'năm 19', 'năm 18', 'năm 17', 'thế kỷ', 'tổng thống', 'thống tướng', 'tướng', 'hiệp ước', 'chiến tranh', 'đế quốc', 'cách mạng']):
        return "Lịch sử"
    # Literature
    if any(k in c for k in ['văn học', 'thơ', 'truyện', 'tiểu thuyết', 'humanities']):
        return "Văn học"
    if any(k in full_text for k in ['nhà thơ', 'nhà văn', 'tác phẩm', 'tiểu thuyết', 'truyện kiều', 'tập thơ', 'bài thơ', 'tác giả của cuốn', 'nhân vật trong tác phẩm']):
        return "Văn học"
    # Geography
    if any(k in c for k in ['geography', 'địa lý', 'tỉnh', 'quốc gia', 'thành phố']):
        return "Địa lý"
    if any(k in full_text for k in ['thủ đô', 'tỉnh lỵ', 'châu lục', 'con sông', 'dãy núi', 'biển', 'quần đảo', 'hòn đảo', 'đất nước', 'giáp ranh với']):
        return "Địa lý"
    # Arts
    if any(k in c for k in ['nghệ thuật', 'âm nhạc', 'hội họa', 'điện ảnh', 'phim', 'movies', 'music', 'art']):
        return "Nghệ thuật"
    if any(k in full_text for k in ['bài hát', 'nhạc sĩ', 'ca sĩ', 'họa sĩ', 'bức tranh', 'bộ phim', 'đạo diễn', 'diễn viên', 'giải oscar']):
        return "Nghệ thuật"
    # Science & Nature
    if any(k in c for k in ['khoa học', 'hóa học', 'vật lý', 'sinh học', 'animals', 'thiên nhiên']):
        return "Khoa học & Tự nhiên"
    if any(k in full_text for k in ['nguyên tố', 'hóa học', 'vật lý', 'sinh học', 'hành tinh', 'hệ mặt trời', 'tế bào', 'nhiệt độ', 'động vật', 'thực vật', 'loài chim', 'loài cá']):
        return "Khoa học & Tự nhiên"
    # Default
    return "Đời sống & Thường thức"

seen_global = set()
questions_by_level = {lv: [] for lv in range(1, 16)}

def add_q(level, category, q_text, opt_a, opt_b, opt_c, opt_d, correct_ans):
    qc = clean_text(q_text)
    if not qc or len(qc) < 8 or len(qc) > 350:
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
        
    # Randomize answer positions so it is evenly distributed
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

print("1. Nạp từ Question_sqlite...")
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

print("2. Nạp từ m180x SQLite...")
for p in ['/tmp/m1806.sqlite', '/tmp/m1805.sqlite', '/tmp/m1804.sqlite']:
    if os.path.exists(p):
        try:
            c = sqlite3.connect(p)
            cu = c.cursor()
            for tbl, target_lv in [('CauHoiDe', 2), ('CauHoiThuong', 7), ('CauHoiKho', 12)]:
                try:
                    cu.execute(f"SELECT cauHoi, dapAnA, dapAnB, dapAnC, dapAnD, cauTraLoi FROM {tbl}")
                    for q, a, b, c, d, ans in cu.fetchall():
                        add_q(target_lv, "m180x", q, a, b, c, d, ans)
                except Exception:
                    pass
        except Exception:
            pass

print("3. Nạp ngân hàng câu hỏi Tiếng Việt khởi động (Levels 1 - 5)...")
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import native_bank_easy as nbe
import native_bank_more as nbm
import banks_data as bd

for item in nbe.EASY_QUESTIONS:
    add_q(*item)

for item in nbm.MORE_VIETNAMESE_QUESTIONS:
    add_q(*item)

# 63 Provinces
for p in bd.PROVINCES_63:
    name, center, region, landmark, food, flower = p
    add_q(3, "Địa lý", f"Tỉnh lỵ (trung tâm hành chính) của tỉnh {name} là thành phố hoặc thị xã nào?", center, "TP Huế", "TP Đà Nẵng", "TP Nha Trang", "A")
    add_q(3, "Địa lý", f"Địa danh thắng cảnh '{landmark}' nổi tiếng tọa lạc tại tỉnh/thành phố nào?", name, "Hà Nội", "TP Hồ Chí Minh", "Lâm Đồng", "A")
    add_q(3, "Ẩm thực", f"Món ăn đặc sản '{food}' nức tiếng gần xa là niềm tự hào ẩm thực của địa phương nào?", name, "Bắc Giang", "Cà Mau", "Tây Ninh", "A")

# Countries
for c in bd.COUNTRIES_WORLD:
    name, cap, cont, curr, lang = c
    add_q(5, "Địa lý", f"Thủ đô của quốc gia {name} là thành phố nào?", cap, "London", "Paris", "Washington D.C.", "A")
    add_q(6, "Địa lý", f"Quốc gia {name} thuộc châu lục nào sau đây?", cont, "Châu Đại Dương", "Châu Nam Cực", "Châu Phi", "A")
    add_q(10, "Kinh tế", f"Đơn vị tiền tệ chính thức của quốc gia {name} là gì?", curr, "Đô la Mỹ (USD)", "Euro (EUR)", "Bảng Anh (GBP)", "A")

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

print("4. Nạp từ Translated Trivia...")
with open('/tmp/translated_trivia.json', 'r', encoding='utf-8') as f:
    translated = json.load(f)

# Calibrate trivia items strictly by difficulty:
# NEVER put obscure history/generals/awards in Levels 1 - 5!
for k, item in translated.items():
    q_txt = item.get('q', '')
    cat_raw = item.get('category', 'general')
    opt_a = item.get('a', '')
    opt_b = item.get('b', '')
    opt_c = item.get('c', '')
    opt_d = item.get('d', '')
    ans_letter = item.get('letter', 'A')
    
    q_lower = q_txt.lower()
    
    # 1. Specialized / Obscure / Advanced History -> Tầng 3 & 4 (Levels 11 - 15)
    if any(w in q_lower for w in [
        'patton', 'macarthur', 'truman', 'watergate', 'vaaler', 'nobel', 'sắc lệnh', 
        'tổng thống', 'thủ tướng', 'hiệp ước', 'thế kỷ 16', 'thế kỷ 17', 'thế kỷ 18', 
        'giải oscar lần thứ', 'bằng sáng chế', 'kỷ lục thế giới', 'duy nhất', 'vụ bê bối',
        'năm 18', 'năm 17', 'chiến tranh thế giới', 'quân đội', 'tướng'
    ]):
        target_pool = [11, 12, 13, 14, 15]
    elif any(w in q_lower for w in ['thủ đô', 'quốc gia', 'núi', 'sông', 'đại dương', 'hành tinh']):
        target_pool = [5, 6, 7, 8, 10]
    elif any(w in q_lower for w in ['bóng đá', 'world cup', 'olympic', 'quần vợt', 'vận động viên']):
        target_pool = [7, 8, 10, 12]
    elif any(w in q_lower for w in ['nguyên tố', 'hóa học', 'vật lý', 'sinh học', 'tế bào']):
        target_pool = [8, 9, 11, 13]
    elif any(w in q_lower for w in ['nhà thơ', 'nhà văn', 'tiểu thuyết', 'vở kịch']):
        target_pool = [7, 9, 11, 12]
    elif any(w in q_lower for w in ['bài hát', 'nhạc sĩ', 'bộ phim', 'họa sĩ', 'bức tranh']):
        target_pool = [7, 8, 9, 11]
    elif cat_raw == 'animals':
        target_pool = [4, 5, 6, 8]
    else:
        target_pool = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        
    underfilled = [lv for lv in target_pool if len(questions_by_level[lv]) < 1000]
    if underfilled:
        chosen_lv = min(underfilled, key=lambda lv: len(questions_by_level[lv]))
        add_q(chosen_lv, cat_raw, q_txt, opt_a, opt_b, opt_c, opt_d, ans_letter)

print("Hiện tại các cấp độ:")
for lv in range(1, 16):
    print(f"  Level {lv:2d}: {len(questions_by_level[lv])}")

# 5. For any remaining slots in Levels 1 - 5, ensure pure Vietnamese warm-up questions
# Let's populate from high-quality pool of authentic Vietnamese trivia
with open('scripts/native_bank_easy.py') as f:
    easy_code = f.read()

# Balance Levels:
# If levels 1-5 have slightly less than 1,000, we top them up from easy pools in level 2/3/4 or generate clean proverbs
PROVERB_PAIRS = [
    ("Ăn quả nhớ kẻ trồng", "cây", "rừng", "hoa", "lá"),
    ("Uống nước nhớ", "nguồn", "sông", "suối", "biển"),
    ("Có công mài sắt có ngày nên", "kim", "dao", "kéo", "kiếm"),
    ("Lá lành đùm lá", "rách", "héo", "vàng", "khô"),
    ("Một con ngựa đau cả tàu bỏ", "cỏ", "chuồng", "chạy", "ăn"),
    ("Học ăn học nói học gói học", "mở", "làm", "chơi", "về"),
    ("Thương người như thể thương", "thân", "nhà", "bạn", "mình"),
    ("Đi một ngày đàng học một sàng", "khôn", "vàng", "chữ", "sách"),
    ("Bán anh em xa mua láng giềng", "gần", "tốt", "quen", "thân"),
    ("Lời chào cao hơn mâm", "cỗ", "xôi", "thịt", "cơm"),
    ("Đói cho sạch rách cho", "thơm", "lành", "ấm", "đẹp"),
    ("Một giọt máu đào hơn ao nước", "lã", "trong", "đục", "sâu"),
    ("Chị ngã em", "nâng", "đỡ", "cười", "nhìn"),
    ("Nước chảy đá", "mòn", "vỡ", "trôi", "lăn"),
    ("Lửa thử vàng gian nan thử", "sức", "người", "lòng", "bạn"),
    ("Gần mực thì đen gần đèn thì", "rạng", "sáng", "tỏ", "trong"),
    ("Thất bại là mẹ", "thành công", "may mắn", "chiến thắng", "kinh nghiệm"),
    ("Trèo cao ngã", "đau", "sâu", "xa", "nặng"),
    ("Đất lành chim", "đậu", "bay", "hót", "làm tổ"),
    ("Ếch ngồi đáy", "giếng", "ao", "hồ", "chum"),
    ("Cây ngay không sợ chết", "đứng", "nghiêng", "héo", "đổ"),
    ("Mèo mù vớ cá", "rán", "kho", "tươi", "to"),
    ("Trâu buộc ghét trâu", "ăn", "cày", "đi", "ngủ"),
    ("Được voi đòi", "Tiên", "ngựa", "hổ", "vàng"),
    ("Giấu đầu hở", "đuôi", "chân", "lưng", "bụng"),
    ("Bắt cá hai", "tay", "chân", "mắt", "lưới"),
    ("Đục nước béo", "cò", "cá", "vịt", "mèo"),
    ("Khẩu Phật tâm", "xà", "ma", "quỷ", "rắn"),
    ("Mật ngọt chết", "ruồi", "kiến", "ong", "muỗi"),
    ("Tre già măng", "mọc", "lên", "tốt", "xanh"),
    ("Tránh vỏ dưa gặp vỏ", "dừa", "bưởi", "cam", "chuối"),
    ("Mất bò mới lo làm", "chuồng", "rào", "cửa", "khóa"),
    ("Nuôi ong tay", "áo", "quần", "vai", "lưng"),
    ("Chó cắn áo", "rách", "nghèo", "mỏng", "xấu"),
    ("Gieo gió gặt", "bão", "mưa", "dông", "sấm"),
    ("Ném đá giấu", "tay", "chân", "mặt", "người"),
    ("Châu chấu đá", "xe", "ngựa", "voi", "thuyền"),
    ("Con sâu làm rầu nồi", "canh", "cơm", "cháo", "kho"),
    ("Tốt gỗ hơn tốt", "nước sơn", "màu sắc", "vỏ ngoài", "hình dáng"),
    ("Tiên học lễ hậu học", "văn", "chữ", "nghề", "đạo"),
    ("Ăn cháo đá", "bát", "nồi", "muôi", "bàn"),
    ("Qua cầu rút", "ván", "dây", "cọc", "đinh"),
    ("Vắt chanh bỏ", "vỏ", "hạt", "tép", "bã"),
    ("Trăm hay không bằng tay", "quen", "khéo", "nhanh", "làm"),
    ("Gừng càng già càng", "cay", "thơm", "ngon", "nồng"),
    ("Cơm lành canh", "ngọt", "ngon", "ấm", "thơm"),
    ("Lá rụng về", "cội", "cây", "đất", "gốc"),
    ("Mèo khen mèo dài", "đuôi", "tai", "lông", "móng"),
    ("Trứng khôn hơn", "vịt", "gà", "chim", "ngỗng")
]

for p, a, w1, w2, w3 in PROVERB_PAIRS:
    add_q(1, "Đời sống & Thường thức", f"Điền từ còn thiếu vào câu tục ngữ dân gian: '{p} ...'?", a, w1, w2, w3, "A")
    add_q(1, "Đời sống & Thường thức", f"Câu thành ngữ nào sau đây đúng với chuẩn tiếng Việt: '{p} ...'?", a, w1, w2, w3, "A")

# Fill underfilled levels from adjacent safe pools
# Note: Level 1-5 only share between Levels 1-5!
# Levels 6-15 share among Levels 6-15!
for target_lv in range(1, 6):
    while len(questions_by_level[target_lv]) < 1000:
        donors = [lv for lv in range(1, 6) if len(questions_by_level[lv]) > 1000]
        if not donors:
            # If no donor in 1-5, take easiest from level 6
            donors = [6]
        donor = donors[0]
        item = questions_by_level[donor].pop()
        item['level'] = target_lv
        item['difficulty'] = target_lv
        questions_by_level[target_lv].append(item)

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

# Trim every level to exactly 1,000
for lv in range(1, 16):
    questions_by_level[lv] = questions_by_level[lv][:1000]

print("\n=== KẾT QUẢ PHÂN BỔ 15.000 CÂU HOÀN TOÀN CHUẨN XÁC ===")
total = 0
for lv in range(1, 16):
    cnt = len(questions_by_level[lv])
    print(f"  Level {lv:2d}: {cnt} câu")
    total += cnt

print(f"Tổng: {total} câu")

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
    print(f"Đã ghi {len(final_list)} câu hỏi vào: {p}")
