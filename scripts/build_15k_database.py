# scripts/build_15k_database.py
import sqlite3
import json
import random
import os

print("Starting generation of 15,000 questions...")

# Connect to reference database
ref_conn = sqlite3.connect("/Users/soncris/Ailatrieuphu/Question_sqlite")
ref_cursor = ref_conn.cursor()

def guess_category(q):
    ql = q.lower()
    if any(k in ql for k in ["vua", "triều đại", "chiến dịch", "năm 19", "thế kỷ", "lịch sử", "kháng chiến", "hiệp định", "chiến tranh", "cách mạng"]):
        return "Lịch sử"
    if any(k in ql for k in ["tỉnh", "thành phố", "sông", "núi", "biển", "đảo", "thủ đô", "quốc gia", "châu lục", "huyện", "vịnh", "đèo"]):
        return "Địa lý"
    if any(k in ql for k in ["thơ", "nhà văn", "tác phẩm", "tiểu thuyết", "truyện kiều", "ca dao", "tục ngữ", "nhân vật", "tác giả"]):
        return "Văn học"
    if any(k in ql for k in ["bóng đá", "vô địch", "world cup", "olympic", "sea games", "huy chương", "thể thao", "cầu thủ", "quần vợt", "cờ vua"]):
        return "Thể thao"
    if any(k in ql for k in ["họa sĩ", "bức tranh", "tranh", "nghệ thuật", "điêu khắc", "bảo tàng", "trường phái"]):
        return "Hội họa"
    if any(k in ql for k in ["bài hát", "nhạc sĩ", "ca sĩ", "nhạc cụ", "giao hưởng", "âm nhạc", "opera", "album"]):
        return "Âm nhạc"
    if any(k in ql for k in ["nguyên tố", "vật lý", "hóa học", "sinh học", "hành tinh", "khoa học", "thiên văn", "tế bào", "định luật"]):
        return "Khoa học"
    if any(k in ql for k in ["máy tính", "phần mềm", "internet", "công nghệ", "điện thoại", "website", "lập trình", "trí tuệ nhân tạo"]):
        return "Công nghệ"
    if any(k in ql for k in ["món ăn", "đặc sản", "bánh", "ẩm thực", "nấu", "chè", "gia vị", "rượu"]):
        return "Ẩm thực"
    if any(k in ql for k in ["loài chim", "động vật", "loài cây", "hoa", "sinh vật", "rừng", "loài cá", "côn trùng"]):
        return "Thiên nhiên"
    return "Văn hóa xã hội"

# Load existing questions
existing_by_level = {i: [] for i in range(1, 16)}

ref_cursor.execute("SELECT question, casea, caseb, casec, cased, truecase, level FROM Question")
rows = ref_cursor.fetchall()

int_to_letter = {1: 'A', 2: 'B', 3: 'C', 4: 'D'}

for r in rows:
    q_text, a, b, c, d, true_case, lv = r
    if not (1 <= lv <= 15):
        continue
    if not (1 <= true_case <= 4):
        continue
    if not (q_text and a and b and c and d):
        continue
    
    category = guess_category(q_text)
    correct_letter = int_to_letter[true_case]
    
    existing_by_level[lv].append({
        "level": lv,
        "difficulty": lv,
        "category": category,
        "question": q_text.strip(),
        "option_a": a.strip(),
        "option_b": b.strip(),
        "option_c": c.strip(),
        "option_d": d.strip(),
        "correct_answer": correct_letter
    })

print("Existing questions loaded:")
for lv in range(1, 16):
    print(f"Level {lv}: {len(existing_by_level[lv])} questions")

# Build target generator for missing questions
# We will create rich generator banks
exec(open("/Users/soncris/Ailatrieuphu/scripts/generator_banks.py").read())
