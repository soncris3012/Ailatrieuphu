import sys, os

out_file = '/Users/soncris/Ailatrieuphu/scripts/vietnamese_t1_part5.py'

lines = []
lines.append("# scripts/vietnamese_t1_part5.py")
lines.append("# Final high-quality authentic Vietnamese questions to ensure 1,000 distinct questions per level")
lines.append("")
lines.append("EXTRA_AUTHENTIC_QUESTIONS = [")

def q(lvl, cat, text, a, b, c, d, ans):
    text_e = text.replace("'", "\\'")
    a_e = a.replace("'", "\\'")
    b_e = b.replace("'", "\\'")
    c_e = c.replace("'", "\\'")
    d_e = d.replace("'", "\\'")
    lines.append(f"    ({lvl}, '{cat}', '{text_e}', '{a_e}', '{b_e}', '{c_e}', '{d_e}', '{ans}'),")

# --- 1. CA DAO & TỤC NGỮ KINH ĐIỂN (Level 1) ---
folk_l1 = [
    ("Điền từ còn thiếu vào câu ca dao: 'Bầu ơi thương lấy bí cùng, tuy rằng khác giống nhưng chung một ...'?", "giàn", "nhà", "vườn", "cây"),
    ("Điền từ còn thiếu vào câu ca dao: 'Nhiễu điều phủ lấy giá gương, người trong một nước phải thương nhau ...'?", "cùng", "hoài", "nhiều", "đều"),
    ("Điền từ còn thiếu vào câu ca dao: 'Dù ai đi ngược về xuôi, nhớ ngày Giỗ Tổ mùng mười tháng ...'?", "ba", "giêng", "bảy", "chạp"),
    ("Điền từ còn thiếu vào câu ca dao: 'Tháp Mười đẹp nhất bông sen, Việt Nam đẹp nhất có tên Bác ...'?", "Hồ", "Tôn", "Giáp", "Đồng"),
    ("Điền từ còn thiếu vào câu ca dao: 'Công cha như núi Thái Sơn, nghĩa mẹ như nước trong ... chảy ra'?", "nguồn", "sông", "suối", "biển"),
    ("Điền từ còn thiếu vào câu ca dao: 'Một lòng thờ mẹ kính cha, cho tròn chữ hiếu mới là đạo ...'?", "con", "người", "trời", "đời"),
    ("Điền từ còn thiếu vào câu ca dao: 'Chim khôn kêu tiếng rảnh rang, người khôn nói tiếng dịu dàng dễ ...'?", "nghe", "thương", "hiểu", "yêu"),
    ("Điền từ còn thiếu vào câu ca dao: 'Đường vô xứ Huế quanh quanh, non xanh nước biếc như tranh họa ...'?", "đồ", "sơn", "màu", "thơ"),
    ("Điền từ còn thiếu vào câu ca dao: 'Hỡi cô tát nước bên đàng, sao cô múc ánh trăng vàng đổ ...'?", "đi", "sông", "ao", "đồng"),
    ("Điền từ còn thiếu vào câu ca dao: 'Cày đồng đang buổi ban trưa, mồ hôi thánh thót như mưa ruộng ...'?", "cày", "sâu", "nông", "nhà"),
    ("Điền từ còn thiếu vào câu ca dao: 'Trâu ơi ta bảo trâu này, trâu ra ngoài ruộng trâu cày với ...'?", "ta", "ai", "ông", "bác"),
    ("Điền từ còn thiếu vào câu ca dao: 'Rủ nhau đi cấy đi cày, bây giờ khó nhọc có ngày phong ...'?", "lưu", "thịnh", "phú", "vinh"),
    ("Điền từ còn thiếu vào câu ca dao: 'Ơn trời mưa nắng phải thì, nơi thì bừa cạn nơi thì cày ...'?", "sâu", "kỹ", "nhanh", "mau"),
    ("Điền từ còn thiếu vào câu ca dao: 'Chuồn chuồn bay thấp thì mưa, bay cao thì nắng, bay vừa thì ...'?", "râm", "gió", "mát", "dông"),
    ("Điền từ còn thiếu vào câu ca dao: 'Đêm tháng năm chưa nằm đã sáng, ngày tháng mười chưa cười đã ...'?", "tối", "khuya", "tắt", "đêm"),
    ("Điền từ còn thiếu vào câu ca dao: 'Mau sao thì nắng, vắng sao thì ...'?", "mưa", "dông", "gió", "sấm"),
    ("Điền từ còn thiếu vào câu ca dao: 'Trăng quầng thì hạn, trăng tán thì ...'?", "mưa", "lụt", "bão", "nắng"),
    ("Điền từ còn thiếu vào câu ca dao: 'Muốn no thì phải chăm làm, một hạt thóc vàng chín hạt mồ ...'?", "hôi", "rơi", "đầy", "cay"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Có làm thì mới có ăn, không dưng ai dễ đem phần đến ...'?", "cho", "nhà", "tay", "mồm"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Của bền tại người, của tốt tại ...'?", "ta", "tiền", "mua", "dùng"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Khéo ăn thì no, khéo co thì ...'?", "ấm", "vừa", "đủ", "êm"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Buôn có bạn, bán có ...'?", "phường", "chợ", "người", "hội"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Thuận vợ thuận chồng, tát biển Đông cũng ...'?", "cạn", "hết", "khô", "đầy"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ăn trông nồi, ngồi trông ...'?", "hướng", "chỗ", "người", "bàn"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Gần mực thì đen, gần đèn thì ...'?", "rạng", "sáng", "tỏ", "trong"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi ...'?", "cao", "to", "lớn", "dày"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Dốt đến đâu học lâu cũng ...'?", "biết", "hiểu", "giỏi", "thông"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ăn chắc mặc ...'?", "bền", "ấm", "đẹp", "dày"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Đói cho sạch, rách cho ...'?", "thơm", "lành", "ấm", "đẹp"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ăn miếng trả ...'?", "miếng", "bát", "nồi", "gói")
]

for item in folk_l1:
    q(1, "Đời sống & Thường thức", item[0], item[1], item[2], item[3], item[4], "A")

# --- 2. VĂN MINH, AN TOÀN & ĐỜI SỐNG HÀNG NGÀY (Level 2) ---
habits_l2 = [
    (2, "Khi ho hoặc hắt hơi ở nơi công cộng đông người, ta nên làm gì để lịch sự và tránh lây lan vi khuẩn?", "Dùng khăn giấy hoặc khuỷu tay áo che miệng", "Quay thẳng vào mặt người bên cạnh", "Hắt hơi thật to", "Không cần che"),
    (2, "Thời điểm nào sau đây quan trọng nhất cần rửa tay bằng xà phòng để bảo vệ sức khỏe?", "Trước khi ăn và sau khi đi vệ sinh", "Trước khi đi ngủ", "Sau khi xem tivi", "Trước khi đọc sách"),
    (2, "Để bảo vệ hàm răng trắng sáng và khỏe mạnh, nha sĩ khuyên nên đánh răng ít nhất mấy lần mỗi ngày?", "2 lần mỗi ngày (sáng và tối)", "Mỗi tuần một lần", "Chỉ khi nào thấy bẩn", "Mỗi tháng một lần"),
    (2, "Khi bước vào thư viện hoặc phòng khám bệnh viện, hành vi văn minh nào cần được thực hiện?", "Đi nhẹ, nói khẽ, giữ trật tự chung", "Nói cười thật to", "Bật loa điện thoại hết cỡ", "Chạy nhảy nô đùa"),
    (2, "Khi đi xe buýt công cộng, nét đẹp văn minh nào được khuyến khích thực hiện?", "Nhường ghế cho người già, phụ nữ mang thai và trẻ nhỏ", "Chiếm nhiều ghế để đồ", "Chen lấn xô đẩy", "Gác chân lên ghế phía trước"),
    (2, "Khi nhận được sự giúp đỡ hoặc món quà từ người khác, câu nói lịch sự đầu tiên nên nói là gì?", "Lời cảm ơn chân thành", "Hỏi giá tiền bao nhiêu", "Chê bai món quà", "Quay mặt bỏ đi"),
    (2, "Khi vô tình va phải hoặc làm rơi đồ của người khác, thái độ đúng đắn cần có là gì?", "Nói lời xin lỗi và nhặt đồ giúp họ", "Bỏ chạy thật nhanh", "Đổ lỗi cho người ta", "Cười cợt trêu chọc"),
    (2, "Để phòng tránh tai nạn đuối nước thương tâm, trẻ em tuyệt đối không được làm gì?", "Tự ý rủ nhau tắm ao, hồ, sông, suối khi không có người lớn", "Uống nhiều nước lọc", "Tập bơi có phao và người lớn hướng dẫn", "Học kỹ năng bơi lội"),
    (2, "Khi ngửi thấy mùi khí gas nồng nặc trong nhà bếp, hành động nào tuyệt đối không được thực hiện?", "Bật que diêm, bật lửa hoặc bật công tắc điện", "Mở toang tất cả các cửa sổ cho thoáng khí", "Khóa van bình gas ngay lập tức", "Báo cho người lớn xử lý"),
    (2, "Số điện thoại khẩn cấp gọi lực lượng Cảnh sát Phòng cháy chữa cháy và Cứu nạn cứu hộ là gì?", "114", "113", "115", "111"),
    (2, "Số điện thoại khẩn cấp gọi lực lượng Cảnh sát phản ứng nhanh xử lý an ninh trật tự là gì?", "113", "114", "115", "111"),
    (2, "Số điện thoại khẩn cấp gọi xe Cấp cứu y tế vận chuyển bệnh nhân là gì?", "115", "113", "114", "111"),
    (2, "Đầu số tổng đài quốc gia tiếp nhận thông tin bảo vệ và chăm sóc trẻ em tại Việt Nam là gì?", "111", "113", "114", "115"),
    (2, "Hành động nào sau đây giúp tiết kiệm năng lượng và bảo vệ môi trường trong gia đình?", "Tắt đèn và các thiết bị điện khi không sử dụng", "Bật tivi cả ngày dù không xem", "Bật điều hòa mở toang cửa", "Bật vòi nước chảy tự do"),
    (2, "Rác thải hữu cơ như vỏ hoa quả, cuống rau, thức ăn thừa nên được tận dụng làm gì?", "Ủ làm phân bón hữu cơ cho cây trồng", "Vứt bừa bãi xuống cống rãnh", "Đốt tạo khói mù mịt", "Ném xuống sông ngòi")
]

for item in habits_l2:
    q(item[0], "Đời sống & Thường thức", item[1], item[2], item[3], item[4], item[5], "A")

# --- 3. ĐỊA DANH, SÔNG NÚI & LỄ HỘI 63 TỈNH THÀNH (Level 3) ---
geo_fest_l3 = [
    (3, "Địa lý", "Ngôi Chùa Một Cột cổ kính với kiến trúc tựa như đóa hoa sen mọc trên cột đá tọa lạc tại đâu?", "Thủ đô Hà Nội", "Thành phố Huế", "Tỉnh Bắc Ninh", "Tỉnh Ninh Bình"),
    (3, "Địa lý", "Văn Miếu - Quốc Tử Giám - trường đại học đầu tiên của Việt Nam tọa lạc tại địa phương nào?", "Thủ đô Hà Nội", "Tỉnh Thừa Thiên Huế", "Tỉnh Nam Định", "Thành phố Đà Nẵng"),
    (3, "Địa lý", "Chợ Bến Thành với tháp đồng hồ 4 mặt nổi tiếng là biểu tượng du lịch của đô thị nào?", "Thành phố Hồ Chí Minh", "Thành phố Cần Thơ", "Thành phố Nha Trang", "Thành phố Vũng Tàu"),
    (3, "Địa lý", "Bến Nhà Rồng - nơi Bác Hồ ra đi tìm đường cứu nước năm 1911 tọa lạc tại thành phố nào?", "Thành phố Hồ Chí Minh", "Thành phố Hải Phòng", "Thành phố Đà Nẵng", "Thành phố Quy Nhơn"),
    (3, "Địa lý", "Cây Cầu Vàng (Cầu Bàn Tay) độc đáo trên đỉnh Bà Nà Hills thuộc địa bàn thành phố nào?", "Thành phố Đà Nẵng", "Tỉnh Quảng Nam", "Tỉnh Thừa Thiên Huế", "Tỉnh Lâm Đồng"),
    (3, "Địa lý", "Quần thể Tháp Chàm Po Klong Garai kỳ vĩ bằng gạch nung đỏ là di tích Chăm Pa nổi tiếng ở tỉnh nào?", "Tỉnh Ninh Thuận", "Tỉnh Bình Thuận", "Tỉnh Khánh Hòa", "Tỉnh Phú Yên"),
    (3, "Địa lý", "Khu di tích lịch sử Pác Bó và suối Lê-nin trong vắt gắn liền với Bác Hồ thuộc tỉnh nào?", "Tỉnh Cao Bằng", "Tỉnh Bắc Kạn", "Tỉnh Hà Giang", "Tỉnh Lạng Sơn"),
    (3, "Địa lý", "Cột cờ Lũng Cú - nơi phất phới lá cờ đỏ sao vàng thiêng liêng ở cực Bắc Tổ quốc thuộc tỉnh nào?", "Tỉnh Hà Giang", "Tỉnh Cao Bằng", "Tỉnh Lào Cai", "Tỉnh Lai Châu"),
    (3, "Địa lý", "Chùa Bái Đính - ngôi chùa lớn xác lập nhiều kỷ lục châu Á và Việt Nam tọa lạc tại tỉnh nào?", "Tỉnh Ninh Bình", "Tỉnh Hà Nam", "Tỉnh Nam Định", "Tỉnh Thái Bình"),
    (3, "Địa lý", "Quần thể di tích danh thắng Yên Tử - đất tổ của Thiền phái Trúc Lâm tọa lạc tại thành phố Uông Bí, tỉnh nào?", "Tỉnh Quảng Ninh", "Tỉnh Hải Dương", "Tỉnh Bắc Giang", "Tỉnh Lạng Sơn"),
    (3, "Địa lý", "Hồ Núi Cốc gắn liền với truyền thuyết mối tình chàng Cốc nàng Công nằm ở tỉnh nào?", "Tỉnh Thái Nguyên", "Tỉnh Bắc Kạn", "Tỉnh Tuyên Quang", "Tỉnh Phú Thọ"),
    (3, "Địa lý", "Khu di tích Lam Kinh - lăng mộ và đền miếu của các vị vua nhà Hậu Lê tọa lạc tại tỉnh nào?", "Tỉnh Thanh Hóa", "Tỉnh Nghệ An", "Tỉnh Hà Tĩnh", "Tỉnh Ninh Bình"),
    (3, "Địa lý", "Khu di tích Kim Liên - nơi lưu giữ những kỷ niệm tuổi thơ của Chủ tịch Hồ Chí Minh thuộc tỉnh nào?", "Tỉnh Nghệ An (huyện Nam Đàn)", "Tỉnh Hà Tĩnh", "Tỉnh Thanh Hóa", "Tỉnh Quảng Bình"),
    (3, "Địa lý", "Địa danh 'Biển Hồ T'nưng' phẳng lặng được ví như 'Đôi mắt Pleiku' nằm ở tỉnh nào Tây Nguyên?", "Tỉnh Gia Lai", "Tỉnh Đắk Lắk", "Tỉnh Kon Tum", "Tỉnh Lâm Đồng"),
    (3, "Địa lý", "Hồ Lắk - hồ nước ngọt tự nhiên lớn nhất Tây Nguyên thơ mộng thuộc địa bàn tỉnh nào?", "Tỉnh Đắk Lắk", "Tỉnh Đắk Nông", "Tỉnh Gia Lai", "Tỉnh Lâm Đồng")
]

for item in geo_fest_l3:
    q(item[0], item[1], item[2], item[3], item[4], item[5], item[6], "A")

# --- 4. TOÁN HỌC & KHOA HỌC PHỔ THÔNG (Level 4 & 5) ---
math_sci_l45 = [
    (4, "Khoa học & Tự nhiên", "50% của số 200 bằng bao nhiêu?", "100", "50", "150", "20"),
    (4, "Khoa học & Tự nhiên", "25% của số 80 bằng bao nhiêu?", "20", "40", "15", "10"),
    (4, "Khoa học & Tự nhiên", "10% của số 500 bằng bao nhiêu?", "50", "100", "25", "5"),
    (4, "Khoa học & Tự nhiên", "Một nửa của phân số 1/2 bằng bao nhiêu?", "1/4", "1", "1/8", "2/4"),
    (4, "Khoa học & Tự nhiên", "Một phần ba của số 90 bằng bao nhiêu?", "30", "20", "45", "15"),
    (4, "Khoa học & Tự nhiên", "Hình chữ nhật có chu vi bằng 30cm, biết chiều dài 9cm thì chiều rộng bằng bao nhiêu?", "6 cm", "12 cm", "7 cm", "5 cm"),
    (4, "Khoa học & Tự nhiên", "Hình vuông có diện tích bằng 49 cm2 thì độ dài mỗi cạnh của hình vuông đó bằng bao nhiêu?", "7 cm", "14 cm", "6 cm", "8 cm"),
    (4, "Khoa học & Tự nhiên", "Hình vuông có diện tích bằng 64 cm2 thì độ dài mỗi cạnh của hình vuông đó bằng bao nhiêu?", "8 cm", "16 cm", "6 cm", "7 cm"),
    (4, "Khoa học & Tự nhiên", "Hình vuông có diện tích bằng 81 cm2 thì độ dài mỗi cạnh của hình vuông đó bằng bao nhiêu?", "9 cm", "18 cm", "8 cm", "7 cm"),
    (4, "Khoa học & Tự nhiên", "Hình vuông có diện tích bằng 100 cm2 thì độ dài mỗi cạnh của hình vuông đó bằng bao nhiêu?", "10 cm", "20 cm", "5 cm", "15 cm"),
    (5, "Khoa học & Tự nhiên", "Số La Mã 'XV' biểu thị giá trị số học bằng bao nhiêu?", "15", "14", "16", "25"),
    (5, "Khoa học & Tự nhiên", "Số La Mã 'XX' biểu thị giá trị số học bằng bao nhiêu?", "20", "10", "30", "25"),
    (5, "Khoa học & Tự nhiên", "Số La Mã 'IX' biểu thị giá trị số học bằng bao nhiêu?", "9", "11", "6", "4"),
    (5, "Khoa học & Tự nhiên", "Số La Mã 'IV' biểu thị giá trị số học bằng bao nhiêu?", "4", "6", "9", "14"),
    (5, "Khoa học & Tự nhiên", "Số La Mã 'VI' biểu thị giá trị số học bằng bao nhiêu?", "6", "4", "7", "5")
]

for item in math_sci_l45:
    q(item[0], item[1], item[2], item[3], item[4], item[5], item[6], "A")

lines.append("]")

with open(out_file, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

print(f"Đã tạo thành công {len(lines)} dòng câu hỏi trong {out_file}")
