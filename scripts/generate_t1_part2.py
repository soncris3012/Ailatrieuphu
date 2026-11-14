import sys, os

out_file = '/Users/soncris/Ailatrieuphu/scripts/vietnamese_t1_part2.py'

lines = []
lines.append("# scripts/vietnamese_t1_part2.py")
lines.append("# More authentic Vietnamese questions for Levels 1, 2, 3")
lines.append("")
lines.append("MORE_T1_QUESTIONS = [")

def q(lvl, cat, text, a, b, c, d, ans):
    text_e = text.replace("'", "\\'")
    a_e = a.replace("'", "\\'")
    b_e = b.replace("'", "\\'")
    c_e = c.replace("'", "\\'")
    d_e = d.replace("'", "\\'")
    lines.append(f"    ({lvl}, '{cat}', '{text_e}', '{a_e}', '{b_e}', '{c_e}', '{d_e}', '{ans}'),")

# 1. TRUYỀN THỐNG TẾT & LỄ HỘI DÂN TỘC (Level 1 & 2)
festivals = [
    (1, "Đời sống & Thường thức", "Tết Nguyên Đán còn được người dân Việt Nam gọi bằng tên thân thương nào sau đây?", "Tết Cổ truyền", "Tết Độc lập", "Tết Dương lịch", "Tết Trăng tròn", "A"),
    (1, "Đời sống & Thường thức", "Ngày 23 tháng Chạp âm lịch hàng năm là ngày lễ gì trong phong tục người Việt?", "Tết ông Công, ông Táo về trời", "Lễ mừng thọ", "Lễ hội Chùa Hương", "Tết Hàn thực", "A"),
    (1, "Đời sống & Thường thức", "Phương tiện nào theo truyền thuyết dân gian được ông Táo cưỡi để bay về chầu trời?", "Con cá chép vàng", "Con rồng bay", "Cỗ xe ngựa", "Con chim hạc", "A"),
    (1, "Đời sống & Thường thức", "Người đầu tiên bước vào chúc Tết gia đình vào sáng mùng 1 Tết được gọi là người gì?", "Người xông đất (xông nhà)", "Người gõ cửa", "Người đưa đò", "Người viếng cảnh", "A"),
    (1, "Đời sống & Thường thức", "Món quà tiền mừng tuổi đầu năm đựng trong phong bao màu đỏ dành cho trẻ em và người già gọi là gì?", "Tiền lì xì may mắn", "Tiền học phí", "Tiền đóng góp", "Tiền tích lũy", "A"),
    (1, "Đời sống & Thường thức", "Mâm ngũ quả ngày Tết của người miền Nam thường có 5 loại quả tượng trưng cho câu cầu chúc nào?", "'Cầu - Sung - Vừa - Đủ - Xài'", "'Cầu - Tài - Đắc - Lộc - Phát'", "'An - Khang - Thịnh - Vượng - Phát'", "'Phúc - Lộc - Thọ - Khang - Ninh'", "A"),
    (1, "Đời sống & Thường thức", "Câu nói dân gian 'Mùng một tết Cha, mùng hai tết Mẹ, mùng ba tết ...' là tết ai?", "Tết Thầy", "Tết Bạn", "Tết Hàng xóm", "Tết Đồng nghiệp", "A"),
    (1, "Đời sống & Thường thức", "Tết Đoan Ngọ diễn ra vào ngày mùng mấy tháng mấy âm lịch hàng năm?", "Mùng 5 tháng 5 âm lịch", "Mùng 1 tháng 1 âm lịch", "Rằm tháng 7 âm lịch", "Rằm tháng 8 âm lịch", "A"),
    (1, "Đời sống & Thường thức", "Tết Đoan Ngọ trong dân gian Việt Nam còn có tên gọi dân dã quen thuộc là gì?", "Tết giết sâu bọ", "Tết cơm mới", "Tết hoa đăng", "Tết trăng rằm", "A"),
    (1, "Đời sống & Thường thức", "Tết Trung Thu dành cho thiếu nhi được tổ chức vào đêm rằm tháng mấy âm lịch?", "Rằm tháng 8 âm lịch", "Rằm tháng giêng", "Rằm tháng 7 âm lịch", "Rằm tháng 10 âm lịch", "A"),
    (1, "Đời sống & Thường thức", "Hai loại bánh truyền thống không thể thiếu trong dịp Tết Trung Thu là bánh gì?", "Bánh nướng và bánh dẻo", "Bánh chưng và bánh giầy", "Bánh rán và bánh gai", "Bánh cuốn và bánh xèo", "A"),
    (1, "Đời sống & Thường thức", "Đồ chơi dân gian hình ngôi sao năm cánh thắp nến cho trẻ em rước đèn đêm Trung Thu gọi là gì?", "Đèn ông sao", "Đèn pin điện tử", "Đèn dầu hỏa", "Đèn chùm pha lê", "A"),
    (1, "Đời sống & Thường thức", "Nhân vật nào gắn liền với gốc cây đa trên cung trăng trong truyền thuyết đêm rằm Trung Thu?", "Chú Cuội và chị Hằng", "Thạch Sanh", "Lang Liêu", "Thánh Gióng", "A"),
    (1, "Đời sống & Thường thức", "Ngày Giỗ Tổ Hùng Vương được tổ chức hàng năm vào ngày tháng nào theo âm lịch?", "Mùng 10 tháng 3 âm lịch", "Mùng 1 tháng 1 âm lịch", "Ngày 2 tháng 9", "Ngày 30 tháng 4", "A"),
    (1, "Đời sống & Thường thức", "Lễ hội Đền Hùng tưởng nhớ các Vua Hùng dựng nước diễn ra tại tỉnh nào?", "Phú Thọ", "Vĩnh Phúc", "Bắc Ninh", "Hà Nội", "A"),
    (1, "Đời sống & Thường thức", "Lễ hội Chùa Hương - lễ hội mùa xuân dài nhất nước ta diễn ra tại huyện Mỹ Đức thuộc tỉnh/TP nào?", "Thành phố Hà Nội", "Hà Nam", "Ninh Bình", "Nam Định", "A"),
    (1, "Đời sống & Thường thức", "Lễ hội đua thuyền rồng truyền thống thường diễn ra trên môi trường nào?", "Trên sông hoặc trên hồ nước", "Trên đường chạy điền kinh", "Trên sườn đồi núi cao", "Trên sân vận động cỏ", "A"),
    (1, "Đời sống & Thường thức", "Hội Lim - lễ hội quan họ nổi tiếng của vùng đất Kinh Bắc diễn ra tại tỉnh nào?", "Bắc Ninh", "Bắc Giang", "Hải Dương", "Hưng Yên", "A"),
    (1, "Đời sống & Thường thức", "Trang phục biểu diễn của các liền anh, liền chị quan họ Bắc Ninh thường là áo gì?", "Áo the khăn xếp và áo tứ thân", "Áo vest com-lê", "Áo dạ hội hiện đại", "Quần jean áo phông", "A")
]

for item in festivals:
    q(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7])

# 2. NHẠC CỤ & NGHỆ THUẬT DÂN GIAN VIỆT NAM (Level 2 & 3)
arts_vn = [
    (2, "Nghệ thuật & Giải trí", "Nhạc cụ dân tộc truyền thống độc đáo của Việt Nam chỉ có duy nhất một dây gảy được gọi là gì?", "Đàn bầu (Độc huyền cầm)", "Đàn tranh", "Đàn tỳ bà", "Đàn nhị", "A"),
    (2, "Nghệ thuật & Giải trí", "Nhạc cụ nào có hai dây, kéo bằng cung vĩ và thân đàn làm bằng ống gỗ bọc da trăn?", "Đàn nhị", "Đàn tranh", "Đàn nguyệt", "Đàn guitar", "A"),
    (2, "Nghệ thuật & Giải trí", "Nhạc cụ nào có thùng đàn hình tròn tựa như vầng trăng tròn nên được đặt tên là gì?", "Đàn nguyệt (Đàn kìm)", "Đàn tranh", "Đàn bầu", "Đàn tỳ bà", "A"),
    (2, "Nghệ thuật & Giải trí", "Đàn tranh truyền thống của người Việt Nam thường có bao nhiêu dây kim loại?", "16 dây (Thập lục huyền cầm)", "1 dây duy nhất", "4 dây tơ", "6 dây nilon", "A"),
    (2, "Nghệ thuật & Giải trí", "Nhạc cụ cổ xưa đúc bằng đồng là bảo vật của nền văn hóa Đông Sơn thời Hùng Vương là gì?", "Trống đồng Đông Sơn", "Cồng chiêng Tây Nguyên", "Chuông đồng Chùa Một Cột", "Khánh đồng", "A"),
    (2, "Nghệ thuật & Giải trí", "Không gian văn hóa nào của Việt Nam đã được UNESCO vinh danh là Kiệt tác di sản truyền khẩu và phi vật thể của nhân loại?", "Không gian văn hóa Cồng chiêng Tây Nguyên", "Hội chợ đêm Đà Lạt", "Hội hoa đăng Hội An", "Lễ hội cầu mưa", "A"),
    (2, "Nghệ thuật & Giải trí", "Nghệ thuật sân khấu truyền thống độc nhất vô nhị của Việt Nam biểu diễn dưới nước gọi là gì?", "Múa rối nước", "Kịch nói hiện đại", "Múa ba lê", "Hát bội trên thuyền", "A"),
    (2, "Nghệ thuật & Giải trí", "Nhân vật hài hước, dí dỏm làm nhiệm vụ mở màn trong các tích múa rối nước truyền thống tên là gì?", "Chú Tễu", "Bờm", "Cuội", "Trạng Quỳnh", "A"),
    (2, "Nghệ thuật & Giải trí", "Làn điệu dân ca trứ danh gắn liền với vùng đất Nam Bộ mộc mạc hữu tình là điệu gì?", "Đờn ca tài tử Nam Bộ", "Hát xoan Phú Thọ", "Ca trù Hà Nội", "Hát chầu văn", "A"),
    (2, "Nghệ thuật & Giải trí", "Hát then đàn tính là loại hình nghệ thuật dân gian đặc trưng của đồng bào dân tộc nào ở miền núi phía Bắc?", "Dân tộc Tày, Nùng, Thái", "Dân tộc Kinh", "Dân tộc Chăm", "Dân tộc Khmer", "A")
]

for item in arts_vn:
    q(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7])

# 3. TRÒ CHƠI DÂN GIAN VIỆT NAM (Level 1 & 2)
games_vn = [
    (1, "Đời sống & Thường thức", "Trò chơi dân gian nào người chơi dùng các viên sỏi nhỏ rải đều vào các ô quân và hai ô quan lớn?", "Trò chơi Ô ăn quan", "Trò chơi Bắn bi", "Trò chơi Nhảy bao bố", "Trò chơi Bịt mắt bắt dê", "A"),
    (1, "Đời sống & Thường thức", "Trò chơi tập thể nào hai đội cùng nắm chặt một sợi dây thừng và ra sức kéo về phía mình?", "Kéo co", "Đấu vật", "Đẩy gậy", "Nhảy dây", "A"),
    (1, "Đời sống & Thường thức", "Trò chơi dân gian nào một người bị dùng khăn che kín mắt đi tìm bắt các bạn xung quanh?", "Bịt mắt bắt dê", "Trốn tìm (Ú òa)", "Trò chơi Thả đỉa ba ba", "Trò chơi Dung dăng dung dẻ", "A"),
    (1, "Đời sống & Thường thức", "Trong trò chơi 'Rồng rắn lên mây', người đứng đầu hàng rồng rắn có nhiệm vụ gì?", "Dang tay che chở bảo vệ các bạn nhỏ phía sau khỏi thầy thuốc", "Đuổi bắt thầy thuốc", "Chạy trốn thật nhanh", "Ngồi im một chỗ", "A"),
    (1, "Đời sống & Thường thức", "Bài đồng dao 'Chi chi chành chành, cái đanh thổi lửa...' gắn liền với trò chơi dân gian nào?", "Trò chơi Chi chi chành chành", "Trò chơi Kéo cưa lừa xẻ", "Trò chơi Nu na nu nống", "Trò chơi Tập tầm vông", "A"),
    (1, "Đời sống & Thường thức", "Bài đồng dao 'Tập tầm vông, tay không tay có, tập tầm vó, tay có tay không...' là trò đố gì?", "Đoán đồ vật giấu trong bàn tay nắm chặt", "Đoán tên bạn bè", "Đoán chiều cao cây xanh", "Đoán số tiền trong ví", "A"),
    (1, "Đời sống & Thường thức", "Trò chơi dân gian dùng một que gỗ hoặc quả bóng tung lên rồi nhanh tay nhặt từng que đũa dưới đất gọi là gì?", "Chơi chuyền (Đánh chuyền)", "Chơi ô ăn quan", "Chơi cờ tướng", "Chơi cờ vua", "A"),
    (1, "Đời sống & Thường thức", "Hoạt động vui chơi nào người ta dùng tre dán giấy hoặc nilon buộc dây dài để đón gió bay lên trời cao?", "Thả diều", "Ném còn", "Bắn ná", "Phóng phi tiêu", "A")
]

for item in games_vn:
    q(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7])

# 4. DANH THẮNG, ĐÈO, SÔNG NÚI NỔI TIẾNG VIỆT NAM (Level 3)
landmarks_vn = [
    (3, "Địa lý", "Đèo nào được mệnh danh là 'Thiên hạ đệ nhất hùng quan' nằm giữa tỉnh Thừa Thiên Huế và TP Đà Nẵng?", "Đèo Hải Vân", "Đèo Ngang", "Đèo Cả", "Đèo Prenn", "A"),
    (3, "Địa lý", "Bài thơ bất hủ 'Bước tới Đèo Ngang bóng xế tà...' của Bà Huyện Thanh Quan viết về con đèo nằm giữa hai tỉnh nào?", "Hà Tĩnh và Quảng Bình", "Quảng Bình và Quảng Trị", "Thanh Hóa và Nghệ An", "Nghệ An và Hà Tĩnh", "A"),
    (3, "Địa lý", "Đèo Ô Quy Hồ - một trong 'Tứ đại đỉnh đèo' hiểm trở bậc nhất miền Bắc nối liền hai tỉnh nào?", "Lào Cai và Lai Châu", "Yên Bái và Sơn La", "Hà Giang và Cao Bằng", "Điện Biên và Sơn La", "A"),
    (3, "Địa lý", "Đèo Mã Pí Lèng nổi tiếng uốn lượn bên dòng sông Nho Quế xanh ngọc bích thuộc tỉnh nào?", "Hà Giang", "Cao Bằng", "Lào Cai", "Lạng Sơn", "A"),
    (3, "Địa lý", "Đèo Khau Phạ - cung đèo quanh co ngắm thung lũng lúa Mù Cang Chải tuyệt đẹp thuộc tỉnh nào?", "Yên Bái", "Lào Cai", "Hòa Bình", "Phú Thọ", "A"),
    (3, "Địa lý", "Đèo Pha Đin - địa danh lịch sử tiếp tế cho chiến dịch Điện Biên Phủ nằm giữa hai tỉnh nào?", "Điện Biên và Sơn La", "Lai Châu và Lào Cai", "Sơn La và Hòa Bình", "Yên Bái và Phú Thọ", "A"),
    (3, "Địa lý", "Con sông nào dài nhất chảy hoàn toàn trong lãnh thổ đất nước Việt Nam?", "Sông Đồng Nai", "Sông Hồng", "Sông Đà", "Sông Mã", "A"),
    (3, "Địa lý", "Hai nhánh sông lớn của hạ lưu sông Mê Kông khi chảy vào lãnh thổ Việt Nam là sông Tiền và sông gì?", "Sông Hậu", "Sông Sài Gòn", "Sông Vàm Cỏ", "Sông Bé", "A"),
    (3, "Địa lý", "Con sông nào chảy qua thủ đô Hà Nội ngàn năm văn hiến bồi đắp phù sa đỏ quạch cho đồng bằng Bắc Bộ?", "Sông Hồng (Hồng Hà)", "Sông Đáy", "Sông Cầu", "Sông Đuống", "A"),
    (3, "Địa lý", "Con sông nào chảy qua trung tâm thành phố Huế soi bóng chùa Thiên Mụ và Kinh thành cổ kính?", "Sông Hương", "Sông Thu Bồn", "Sông Hàn", "Sông Trà Khúc", "A"),
    (3, "Địa lý", "Dòng sông nào bắt nguồn từ dãy Trường Sơn chảy qua thành phố Đà Nẵng với 6 cây cầu nổi tiếng?", "Sông Hàn", "Sông Hương", "Sông Côn", "Sông Ba", "A"),
    (3, "Địa lý", "Hồ nước ngọt nhân tạo lớn nhất Đông Nam Á hình thành từ đập thủy điện trên sông Đà thuộc tỉnh nào?", "Hòa Bình", "Sơn La", "Điện Biên", "Yên Bái", "A"),
    (3, "Địa lý", "Đảo Cát Bà - khu dự trữ sinh quyển thế giới với những bãi tắm cát trắng mịn trực thuộc thành phố nào?", "Thành phố Hải Phòng", "Tỉnh Quảng Ninh", "Tỉnh Thái Bình", "Tỉnh Nam Định", "A"),
    (3, "Địa lý", "Hang Sơn Đoòng - hang động tự nhiên lớn nhất hành tinh được phát hiện tại Vườn quốc gia nào?", "Vườn quốc gia Phong Nha - Kẻ Bàng (Quảng Bình)", "Vườn quốc gia Cát Tiên", "Vườn quốc gia Cúc Phương", "Vườn quốc gia Ba Vì", "A"),
    (3, "Địa lý", "Vườn quốc gia Cúc Phương - vườn quốc gia đầu tiên của Việt Nam nằm trên địa bàn 3 tỉnh nào?", "Ninh Bình, Hòa Bình và Thanh Hóa", "Hà Nội, Hà Nam và Nam Định", "Bắc Giang, Lạng Sơn và Thái Nguyên", "Quảng Bình, Quảng Trị và Thừa Thiên Huế", "A")
]

for item in landmarks_vn:
    q(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7])

lines.append("]")

with open(out_file, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

print(f"Đã tạo thành công {len(lines)} dòng câu hỏi trong {out_file}")
