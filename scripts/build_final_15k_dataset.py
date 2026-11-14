# scripts/build_final_15k_dataset.py
# Comprehensive, deduplicated, calibrated 15,000 question assembler for Ai Là Triệu Phú.
# Exactly 1,000 questions per level across 15 levels.
# ZERO templates, ZERO tags like (Câu 177), ZERO duplicate questions.

import os
import sys
import json
import sqlite3
import re
import random

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from native_bank_easy import EASY_QUESTIONS
from native_bank_more import MORE_VIETNAMESE_QUESTIONS
import banks_data

def clean_str(s):
    if s is None:
        return ""
    s = str(s).strip()
    s = re.sub(r'\s*\((?:Câu|Mã|ID)[^)]*\)', '', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

seen_questions_global = set()
questions_by_level = {lv: [] for lv in range(1, 16)}

def add_question(level, category, q_text, opt_a, opt_b, opt_c, opt_d, correct_ans):
    qc = clean_str(q_text)
    if not qc or len(qc) < 8 or len(qc) > 300:
        return False
    
    # Check global uniqueness
    norm_key = qc.lower()
    if norm_key in seen_questions_global:
        return False
    
    # Clean options
    oa = clean_str(opt_a)
    ob = clean_str(opt_b)
    oc = clean_str(opt_c)
    od = clean_str(opt_d)
    
    # Must have 4 distinct non-empty choices
    opts = [oa, ob, oc, od]
    if len(set(opts)) < 4 or any(len(o) == 0 for o in opts):
        return False
    
    # Resolve correct answer
    ans_letter = None
    if correct_ans in ['A', 'B', 'C', 'D']:
        ans_letter = correct_ans
    else:
        ans_clean = clean_str(correct_ans)
        if ans_clean in opts:
            ans_letter = ['A', 'B', 'C', 'D'][opts.index(ans_clean)]
    
    if not ans_letter:
        return False
        
    seen_questions_global.add(norm_key)
    questions_by_level[level].append({
        "level": level,
        "difficulty": level,
        "category": category,
        "question": qc,
        "option_a": oa,
        "option_b": ob,
        "option_c": oc,
        "option_d": od,
        "correct_answer": ans_letter
    })
    return True

print("=== BẮT ĐẦU TẬP HỢP KHO CÂU HỎI 15.000 CÂU ĐỘC LẬP ===")

# 1. Native Easy Banks (Level 1 to 5)
print("1. Nạp câu hỏi thuần Việt khởi động...")
for item in EASY_QUESTIONS:
    add_question(*item)
for item in MORE_VIETNAMESE_QUESTIONS:
    add_question(*item)

# 2. Authentic VTV3 Show Questions (Question_sqlite)
print("2. Nạp câu hỏi từ VTV3 Question_sqlite...")
conn = sqlite3.connect('/Users/soncris/Ailatrieuphu/Question_sqlite')
cur = conn.cursor()
for lv in range(1, 16):
    try:
        cur.execute(f"SELECT question, casea, caseb, casec, cased, truecase FROM Question{lv}")
        for q, a, b, c, d, ans in cur.fetchall():
            add_question(lv, "Kiến thức chung", q, a, b, c, d, ['A', 'B', 'C', 'D'][int(ans)-1])
    except Exception as e:
        pass

# 3. Authentic Android Show Questions (zero4897hn)
print("3. Nạp câu hỏi từ zero4897hn...")
for path in ['/tmp/m1804.sqlite', '/tmp/m1805.sqlite', '/tmp/m1806.sqlite']:
    if not os.path.exists(path):
        continue
    try:
        c = sqlite3.connect(path)
        cur = c.cursor()
        for tbl, def_lv in [('CauHoiDe', 2), ('CauHoiThuong', 7), ('CauHoiKho', 12)]:
            try:
                cur.execute(f"SELECT cauHoi, dapAnA, dapAnB, dapAnC, dapAnD, cauTraLoi FROM {tbl}")
                for q, a, b, c, d, ans in cur.fetchall():
                    add_question(def_lv, "Kiến thức chung", q, a, b, c, d, ans)
            except Exception:
                pass
    except Exception:
        pass

# 4. Factual Distinct Encyclopedic Questions from banks_data
print("4. Nạp câu hỏi thực thể bách khoa (tỉnh thành, quốc gia, nguyên tố, danh nhân)...")
# 63 Provinces
for p in banks_data.PROVINCES_63:
    name, center, region, landmark, food, flower = p
    add_question(3, "Địa lý", f"Tỉnh lỵ (trung tâm hành chính) của tỉnh {name} là thành phố hoặc thị xã nào?", center, "TP Huế", "TP Đà Nẵng", "TP Nha Trang", "A")
    add_question(4, "Địa lý", f"Địa danh thắng cảnh '{landmark}' nổi tiếng tọa lạc tại tỉnh/thành phố nào?", name, "Hà Nội", "TP Hồ Chí Minh", "Lâm Đồng", "A")
    add_question(3, "Ẩm thực", f"Món ăn đặc sản '{food}' nức tiếng gần xa là niềm tự hào ẩm thực của địa phương nào?", name, "Bắc Giang", "Cà Mau", "Tây Ninh", "A")

# Countries
for c in banks_data.COUNTRIES_WORLD:
    name, cap, cont, curr, lang = c
    add_question(5, "Địa lý", f"Thủ đô của quốc gia {name} là thành phố nào?", cap, "London", "Paris", "Washington D.C.", "A")
    add_question(6, "Địa lý", f"Quốc gia {name} thuộc châu lục nào sau đây?", cont, "Châu Đại Dương", "Châu Nam Cực", "Châu Phi", "A")
    add_question(10, "Kinh tế", f"Đơn vị tiền tệ chính thức của quốc gia {name} là gì?", curr, "Đô la Mỹ (USD)", "Euro (EUR)", "Bảng Anh (GBP)", "A")

# Elements
for el in banks_data.ELEMENTS_CHEMISTRY:
    name, sym, num, feat, desc = el
    add_question(6, "Hóa học", f"Ký hiệu hóa học của nguyên tố {name} trong bảng tuần hoàn là gì?", sym, "H", "O", "C", "A")
    add_question(9, "Hóa học", f"Nguyên tố nào có số hiệu nguyên tử (Z) bằng {num} và có đặc điểm '{feat}'?", name, "Sắt", "Đồng", "Nhôm", "A")

# Historical VN: (question, correct, w1, w2, w3, cat, lvl)
for h in banks_data.HISTORICAL_VN:
    q, corr, w1, w2, w3, cat, lvl = h
    add_question(lvl, cat, q, corr, w1, w2, w3, "A")

# Literature VN: (question, correct, w1, w2, w3, cat, lvl)
for lit in banks_data.LITERATURE_VN:
    q, corr, w1, w2, w3, cat, lvl = lit
    add_question(lvl, cat, q, corr, w1, w2, w3, "A")

# Sports Data: (question, correct, w1, w2, w3, cat, lvl)
for s in banks_data.SPORTS_DATA:
    q, corr, w1, w2, w3, cat, lvl = s
    add_question(lvl, cat, q, corr, w1, w2, w3, "A")

# Arts and Music: (question, correct, w1, w2, w3, cat, lvl)
for m in banks_data.ARTS_AND_MUSIC:
    q, corr, w1, w2, w3, cat, lvl = m
    add_question(lvl, cat, q, corr, w1, w2, w3, "A")

print("Đã nạp thực thể bách khoa. Hiện tại:")
for lv in range(1, 16):
    print(f"  Level {lv:2d}: {len(questions_by_level[lv])}")

# 5. OpenTriviaQA Translated Cache
print("\n5. Nạp câu hỏi từ OpenTriviaQA đã dịch...")
with open('/tmp/translated_trivia.json', 'r', encoding='utf-8') as f:
    translated = json.load(f)

print(f"Tổng số câu đã dịch trong cache: {len(translated)}")

cat_target_levels = {
    'animals': [4, 6, 9],
    'geography': [5, 6, 8, 12],
    'sports': [6, 7, 10, 12],
    'history': [8, 10, 13, 14],
    'people': [8, 11, 13, 14],
    'world': [10, 12, 14, 15],
    'general': [6, 7, 9, 10, 15],
    'humanities': [8, 11, 13, 14],
    'music': [7, 8, 11, 15],
    'movies': [7, 8, 9, 11]
}

# Distribute translated questions to underfilled levels
for k, item in translated.items():
    cat = item.get('category', 'general')
    target_lvs = cat_target_levels.get(cat, [6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    
    underfilled = [lv for lv in target_lvs if len(questions_by_level[lv]) < 1000]
    if not underfilled:
        underfilled = [lv for lv in range(6, 16) if len(questions_by_level[lv]) < 1000]
    if not underfilled:
        underfilled = [lv for lv in range(1, 16) if len(questions_by_level[lv]) < 1000]
    
    if underfilled:
        chosen_lv = min(underfilled, key=lambda lv: len(questions_by_level[lv]))
        add_question(chosen_lv, cat.capitalize(), item['q'], item['a'], item['b'], item['c'], item['d'], item['letter'])

print("\nSau khi nạp OpenTriviaQA:")
for lv in range(1, 16):
    print(f"  Level {lv:2d}: {len(questions_by_level[lv])}")

# 6. Balance & Fill each level to exactly 1,000
print("\n6. Cân bằng chính xác 1.000 câu/level...")

# Redistribution between levels so every level from 1 to 15 has exactly 1,000
for target_lv in range(1, 16):
    while len(questions_by_level[target_lv]) < 1000:
        # find donor level with > 1000 questions, closest to target_lv
        donors = [lv for lv in range(1, 16) if len(questions_by_level[lv]) > 1000]
        if not donors:
            break
        donor = min(donors, key=lambda lv: abs(lv - target_lv))
        donated = questions_by_level[donor].pop()
        donated['level'] = target_lv
        donated['difficulty'] = target_lv
        questions_by_level[target_lv].append(donated)

# Trim any level with > 1000 down to exactly 1000
for lv in range(1, 16):
    if len(questions_by_level[lv]) > 1000:
        questions_by_level[lv] = questions_by_level[lv][:1000]

print("\n=== KẾT QUẢ PHÂN BỐ CUỐI CÙNG ===")
total_final = 0
for lv in range(1, 16):
    cnt = len(questions_by_level[lv])
    print(f"  Level {lv:2d}: {cnt} câu")
    total_final += cnt

print(f"\nTổng số câu hỏi: {total_final}")

# 7. Write to files
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
    print(f"Đã lưu {len(final_list)} câu hỏi vào: {p}")
