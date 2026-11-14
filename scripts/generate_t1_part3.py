import sys, os

out_file = '/Users/soncris/Ailatrieuphu/scripts/vietnamese_t1_part3.py'

lines = []
lines.append("# scripts/vietnamese_t1_part3.py")
lines.append("# Final high-quality authentic Vietnamese questions to complete Tầng 1 (1,000 per level)")
lines.append("")
lines.append("EXPANDED_T1_QUESTIONS = [")

def q(lvl, cat, text, a, b, c, d, ans):
    text_e = text.replace("'", "\\'")
    a_e = a.replace("'", "\\'")
    b_e = b.replace("'", "\\'")
    c_e = c.replace("'", "\\'")
    d_e = d.replace("'", "\\'")
    lines.append(f"    ({lvl}, '{cat}', '{text_e}', '{a_e}', '{b_e}', '{c_e}', '{d_e}', '{ans}'),")

# --- 63 PROVINCES BIỂN SỐ XE (Level 2 & 3) ---
plates = [
    ("Hà Nội", "29, 30"), ("Hải Phòng", "15, 16"), ("Quảng Ninh", "14"), ("Bắc Ninh", "99"),
    ("Bắc Giang", "98"), ("Bắc Kạn", "97"), ("Cao Bằng", "11"), ("Lạng Sơn", "12"),
    ("Thái Nguyên", "20"), ("Tuyên Quang", "22"), ("Hà Giang", "23"), ("Lào Cai", "24"),
    ("Yên Bái", "21"), ("Điện Biên", "27"), ("Lai Châu", "25"), ("Sơn La", "26"),
    ("Hòa Bình", "28"), ("Phú Thọ", "19"), ("Vĩnh Phúc", "88"), ("Hải Dương", "34"),
    ("Hưng Yên", "89"), ("Thái Bình", "17"), ("Nam Định", "18"), ("Hà Nam", "90"),
    ("Ninh Bình", "35"), ("Thanh Hóa", "36"), ("Nghệ An", "37"), ("Hà Tĩnh", "38"),
    ("Quảng Bình", "73"), ("Quảng Trị", "74"), ("Thừa Thiên Huế", "75"), ("Đà Nẵng", "43"),
    ("Quảng Nam", "92"), ("Quảng Ngãi", "76"), ("Bình Định", "77"), ("Phú Yên", "78"),
    ("Khánh Hòa", "79"), ("Ninh Thuận", "85"), ("Bình Thuận", "86"), ("Kon Tum", "82"),
    ("Gia Lai", "81"), ("Đắk Lắk", "47"), ("Đắk Nông", "48"), ("Lâm Đồng", "49"),
    ("Bình Phước", "93"), ("Tây Ninh", "70"), ("Bình Dương", "61"), ("Đồng Nai", "60"),
    ("Bà Rịa - Vũng Tàu", "72"), ("TP Hồ Chí Minh", "50 - 59"), ("Long An", "62"),
    ("Tiền Giang", "63"), ("Bến Tre", "71"), ("Trà Vinh", "84"), ("Vĩnh Long", "64"),
    ("Đồng Tháp", "66"), ("An Giang", "67"), ("Kiên Giang", "68"), ("Cần Thơ", "65"),
    ("Hậu Giang", "95"), ("Sóc Trăng", "83"), ("Bạc Liêu", "94"), ("Cà Mau", "69")
]

for p, num in plates:
    q(2, "Đời sống & Thường thức", f"Ký hiệu biển số xe dân sự nào sau đây được cấp cho tỉnh/thành phố {p}?", f"Biển số {num}", "Biển số 91", "Biển số 00", "Biển số 100", "A")

# --- PROVERBS MEANING & MISSING (Level 1 & 2) ---
proverbs_more = [
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Ăn cây nào rào cây ...'?", "ấy", "nọ", "kia", "khác"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Ăn ốc nói ...'?", "mò", "ngang", "leo", "dối"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Bắt cóc bỏ ...'?", "đĩa", "hộp", "chum", "nồi"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Bình chân như ...'?", "vại", "chum", "nồi", "bát"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Bụng làm dạ ...'?", "chịu", "lo", "mang", "sầu"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Cá chậu chim ...'?", "lồng", "lưới", "chuồng", "tổ"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Cưỡi ngựa xem ...'?", "hoa", "cỏ", "trăng", "mây"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Đầu voi đuôi ...'?", "chuột", "thỏ", "mèo", "chó"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Gần chùa gọi bụt bằng ...'?", "anh", "ông", "chú", "bác"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Lạt mềm buộc ...'?", "chặt", "chắc", "kỹ", "êm"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Liệu cơm gắp ...'?", "mắm", "cá", "thịt", "rau"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Miếng trầu là đầu câu ...'?", "chuyện", "nói", "hỏi", "chào"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Mưa dầm thấm ...'?", "lâu", "sâu", "nhanh", "mau"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Năng nhặt chặt ...'?", "bị", "túi", "bao", "giỏ"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Ở hiền gặp ...'?", "lành", "may", "phúc", "vui"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Rừng vàng biển ...'?", "bạc", "kim cương", "ngọc", "châu báu"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Thẳng như ruột ...'?", "ngựa", "bò", "trâu", "dê"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Thuốc đắng dã tật, sự thật mất ...'?", "lòng", "tình", "người", "bạn"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Tích tiểu thành ...'?", "đại", "to", "lớn", "nhiều"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Vạn sự khởi đầu ...'?", "nan", "khó", "chậm", "gian"),
    (1, "Điền từ còn thiếu vào câu thành ngữ quen thuộc: 'Vừa đấm vừa ...'?", "xoa", "vuốt", "cười", "nhìn"),
    (2, "Thành ngữ 'Bắt cóc bỏ đĩa' miêu tả tình trạng sự việc như thế nào?", "Lộn xộn, đâu lại hoàn đấy, không có trật tự quy củ", "Gọn gàng ngăn nắp", "Rất nhanh chóng", "Thành công mỹ mãn"),
    (2, "Thành ngữ 'Cưỡi ngựa xem hoa' dùng để chỉ hành động như thế nào?", "Xem xét một cách lướt qua, vội vàng, không sâu sắc", "Chăm chú tỉ mỉ", "Yêu thích thiên nhiên", "Tập luyện thể thao"),
    (2, "Thành ngữ 'Liệu cơm gắp mắm' khuyên răn con người điều gì?", "Phải biết căn cứ vào hoàn cảnh thực tế để chi tiêu và ứng xử cho phù hợp", "Ăn nhiều món ngon", "Tiết kiệm quá mức", "Mua sắm thoải mái"),
    (2, "Thành ngữ 'Thuốc đắng dã tật, sự thật mất lòng' mang ý nghĩa gì?", "Lời nói thật dù khó nghe nhưng giúp người khác tiến bộ", "Không nên nói thật", "Thuốc nào cũng đắng", "Cần nói dối khéo léo"),
    (2, "Thành ngữ 'Năng nhặt chặt bị' đề cao phẩm chất tốt đẹp nào của con người?", "Sự cần cù, tích lũy kiên trì từng chút một để thành công lớn", "Tính vội vã nhanh nhẹn", "Lòng dũng cảm", "Tính hào phóng rộng rãi")
]

for item in proverbs_more:
    q(item[0], "Đời sống & Thường thức", item[1], item[2], item[3], item[4], item[5], "A")

# --- TOÁN HỌC & HÌNH HỌC PHỔ THÔNG (Level 4 & 5) ---
math_geo = [
    (4, "Khoa học & Tự nhiên", "Hình chữ nhật có chiều dài 8m và chiều rộng 5m thì diện tích bằng bao nhiêu mét vuông?", "40 mét vuông", "26 mét vuông", "13 mét vuông", "80 mét vuông", "A"),
    (4, "Khoa học & Tự nhiên", "Một hình vuông có độ dài mỗi cạnh bằng 6cm thì chu vi bằng bao nhiêu xentimét?", "24 cm", "36 cm", "12 cm", "18 cm", "A"),
    (4, "Khoa học & Tự nhiên", "Hình tam giác có độ dài đáy 10cm và chiều cao tương ứng 4cm thì diện tích bằng bao nhiêu?", "20 cm2", "40 cm2", "14 cm2", "28 cm2", "A"),
    (4, "Khoa học & Tự nhiên", "Tích của phép nhân 9 nhân với 8 bằng bao nhiêu?", "72", "81", "64", "56", "A"),
    (4, "Khoa học & Tự nhiên", "Tích của phép nhân 7 nhân với 7 bằng bao nhiêu?", "49", "42", "56", "63", "A"),
    (4, "Khoa học & Tự nhiên", "Kết quả của phép chia 120 chia cho 4 bằng bao nhiêu?", "30", "40", "25", "20", "A"),
    (4, "Khoa học & Tự nhiên", "Chữ số La Mã 'X' biểu thị giá trị số học bằng bao nhiêu?", "10", "5", "50", "1", "A"),
    (4, "Khoa học & Tự nhiên", "Chữ số La Mã 'V' biểu thị giá trị số học bằng bao nhiêu?", "5", "10", "50", "1", "A"),
    (4, "Khoa học & Tự nhiên", "Chữ số La Mã 'L' biểu thị giá trị số học bằng bao nhiêu?", "50", "100", "500", "10", "A"),
    (4, "Khoa học & Tự nhiên", "Chữ số La Mã 'C' biểu thị giá trị số học bằng bao nhiêu?", "100", "50", "500", "1.000", "A"),
    (5, "Khoa học & Tự nhiên", "Chữ số La Mã 'M' biểu thị giá trị số học bằng bao nhiêu?", "1.000", "100", "500", "10.000", "A"),
    (5, "Khoa học & Tự nhiên", "Một dặm biển (hải lý quốc tế) quy đổi bằng bao nhiêu mét?", "1.852 mét", "1.000 mét", "1.500 mét", "2.000 mét", "A"),
    (5, "Khoa học & Tự nhiên", "Một inch (in-sơ) theo hệ đo lường Anh-Mỹ bằng bao nhiêu xentimét?", "2,54 cm", "2,0 cm", "3,14 cm", "1,5 cm", "A"),
    (5, "Khoa học & Tự nhiên", "Năm ánh sáng là đơn vị dùng để đo đại lượng vật lý nào trong thiên văn học?", "Khoảng cách trong vũ trụ", "Thời gian tồn tại", "Cường độ ánh sáng", "Khối lượng ngôi sao", "A")
]

for item in math_geo:
    q(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7])

# --- ÂM NHẠC & HỘI HỌA VIỆT NAM (Level 2 & 3) ---
music_art_vn = [
    (2, "Nghệ thuật & Giải trí", "Ai là nhạc sĩ sáng tác ca khúc thiếu nhi trứ danh 'Chú voi con ở Bản Đôn'?", "Nhạc sĩ Phạm Tuyên", "Nhạc sĩ Trịnh Công Sơn", "Nhạc sĩ Văn Cao", "Nhạc sĩ Phong Nhã", "A"),
    (2, "Nghệ thuật & Giải trí", "Bài hát thiếu nhi 'Em là hoa hồng nhỏ' do nhạc sĩ tài hoa nào sáng tác?", "Nhạc sĩ Trịnh Công Sơn", "Nhạc sĩ Phạm Tuyên", "Nhạc sĩ Hoàng Vân", "Nhạc sĩ Trần Tiến", "A"),
    (2, "Nghệ thuật & Giải trí", "Bài hát 'Bụi phấn' tri ân thầy cô giáo kính yêu do nhạc sĩ nào đồng sáng tác?", "Vũ Hoàng và Lê Văn Lộc", "Trịnh Công Sơn", "Văn Cao", "Phạm Tuyên", "A"),
    (2, "Nghệ thuật & Giải trí", "Tác phẩm 'Tiến quân ca' - Quốc ca hùng tráng của nước Việt Nam do ai sáng tác?", "Nhạc sĩ Văn Cao", "Nhạc sĩ Lưu Hữu Phước", "Nhạc sĩ Đỗ Nhuận", "Nhạc sĩ Hoàng Việt", "A"),
    (3, "Nghệ thuật & Giải trí", "Bộ phim truyền hình 'Đất phương Nam' nổi tiếng chuyển thể từ tiểu thuyết của nhà văn nào?", "Nhà văn Đoàn Giỏi", "Nhà văn Sơn Nam", "Nhà văn Nguyễn Ngọc Tư", "Nhà văn Anh Đức", "A"),
    (3, "Nghệ thuật & Giải trí", "Kiệt tác hội họa 'Thiếu nữ bên hoa huệ' là tác phẩm để đời của danh họa Việt Nam nào?", "Họa sĩ Tô Ngọc Vân", "Họa sĩ Trần Văn Cẩn", "Họa sĩ Nguyễn Gia Trí", "Họa sĩ Bùi Xuân Phái", "A"),
    (3, "Nghệ thuật & Giải trí", "Danh họa nổi tiếng với những bức tranh sơn dầu vẽ về Phố cổ Hà Nội là ai?", "Họa sĩ Bùi Xuân Phái", "Họa sĩ Tô Ngọc Vân", "Họa sĩ Nguyễn Phan Chánh", "Họa sĩ Nguyễn Sáng", "A"),
    (3, "Nghệ thuật & Giải trí", "Bức tranh sơn mài 'Vườn xuân Trung Nam Bắc' là tác phẩm trứ danh của danh họa nào?", "Họa sĩ Nguyễn Gia Trí", "Họa sĩ Trần Văn Cẩn", "Họa sĩ Tô Ngọc Vân", "Họa sĩ Nguyễn Tư Nghiêm", "A")
]

for item in music_art_vn:
    q(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7])

# --- HISTORICAL & GEOGRAPHY VIETNAM (Level 4 & 5) ---
hist_geo_vn2 = [
    (4, "Lịch sử", "Thành Cổ Loa với kiến trúc hình xoáy ốc độc đáo được xây dựng dưới triều đại vị vua nào?", "An Dương Vương (Thục Phán)", "Hùng Vương", "Ngô Quyền", "Lý Nam Đế", "A"),
    (4, "Lịch sử", "Cố đô Hoa Lư lịch sử gắn liền với sự nghiệp dựng nước của hai triều đại phong kiến nào?", "Nhà Đinh và Tiền Lê", "Nhà Lý và Nhà Trần", "Nhà Lê và Nhà Nguyễn", "Nhà Hồ và Nhà Mạc", "A"),
    (4, "Lịch sử", "Vị tướng anh hùng nào đã chỉ huy nghĩa quân Lam Sơn giành lại độc lập sau 10 năm gian khổ?", "Lê Lợi (Lê Thái Tổ)", "Nguyễn Huệ", "Trần Hưng Đạo", "Đinh Bộ Lĩnh", "A"),
    (4, "Lịch sử", "Địa đạo Củ Chi - hệ thống công sự phòng thủ trong lòng đất độc đáo tọa lạc tại đâu?", "Thành phố Hồ Chí Minh", "Tỉnh Tây Ninh", "Tỉnh Bình Dương", "Tỉnh Đồng Nai", "A"),
    (4, "Lịch sử", "Cầu Hiền Lương và sông Bến Hải là giới tuyến lịch sử chia cắt hai miền tại vĩ tuyến bao nhiêu?", "Vĩ tuyến 17", "Vĩ tuyến 16", "Vĩ tuyến 18", "Vĩ tuyến 20", "A"),
    (4, "Lịch sử", "Khu di tích Ngã ba Đồng Lộc ghi dấu sự hy sinh anh dũng của bao nhiêu cô gái thanh niên xung phong?", "10 cô gái thanh niên xung phong", "12 cô gái", "8 cô gái", "15 cô gái", "A"),
    (5, "Lịch sử", "Đại tướng đầu tiên và Tổng tư lệnh tối cao của Quân đội Nhân dân Việt Nam là ai?", "Đại tướng Võ Nguyên Giáp", "Đại tướng Nguyễn Chí Thanh", "Đại tướng Văn Tiến Dũng", "Đại tướng Lê Trọng Tấn", "A"),
    (5, "Địa lý", "Điểm cực Bắc trên đất liền của Tổ quốc ta nằm tại xã Lũng Cú thuộc tỉnh nào?", "Tỉnh Hà Giang", "Tỉnh Cao Bằng", "Tỉnh Lào Cai", "Tỉnh Lạng Sơn", "A"),
    (5, "Địa lý", "Điểm cực Tây trên đất liền của Tổ quốc tại ngã ba biên giới A Pa Chải thuộc tỉnh nào?", "Tỉnh Điện Biên", "Tỉnh Lai Châu", "Tỉnh Sơn La", "Tỉnh Lào Cai", "A"),
    (5, "Địa lý", "Điểm cực Đông trên đất liền của Việt Nam - nơi đón ánh bình minh sớm nhất tại Mũi Đôi thuộc tỉnh nào?", "Tỉnh Khánh Hòa", "Tỉnh Phú Yên", "Tỉnh Bình Định", "Tỉnh Ninh Thuận", "A"),
    (5, "Địa lý", "Điểm cực Nam trên đất liền của Việt Nam tại Mũi Cà Mau thuộc tỉnh nào?", "Tỉnh Cà Mau", "Tỉnh Kiên Giang", "Tỉnh Bạc Liêu", "Tỉnh Sóc Trăng", "A")
]

for item in hist_geo_vn2:
    q(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7])

lines.append("]")

with open(out_file, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

print(f"Đã tạo thành công {len(lines)} dòng câu hỏi trong {out_file}")
