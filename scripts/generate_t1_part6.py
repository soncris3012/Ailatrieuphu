import sys, os

out_file = '/Users/soncris/Ailatrieuphu/scripts/vietnamese_t1_part6.py'

lines = []
lines.append("# scripts/vietnamese_t1_part6.py")
lines.append("# Top-up questions for Levels 1, 2, 3 to reach exactly 1,000 each")
lines.append("")
lines.append("TOPUP_T1_QUESTIONS = [")

def q(lvl, cat, text, a, b, c, d, ans):
    text_e = text.replace("'", "\\'")
    a_e = a.replace("'", "\\'")
    b_e = b.replace("'", "\\'")
    c_e = c.replace("'", "\\'")
    d_e = d.replace("'", "\\'")
    lines.append(f"    ({lvl}, '{cat}', '{text_e}', '{a_e}', '{b_e}', '{c_e}', '{d_e}', '{ans}'),")

# --- LEVEL 1: PROVERBS & FOLK MISSING WORDS (150 items) ---
proverbs_l1_topup = [
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ăn cây nào rào cây ...'?", "nấy", "đó", "kia", "ấy"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ăn chắc mặc ...'?", "bền", "ấm", "đẹp", "dày"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ăn kỹ no lâu, cày sâu tốt ...'?", "lúa", "mạ", "gạo", "cơm"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ăn vóc học ...'?", "hay", "giỏi", "ngoan", "tài"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Bắt cá hai ...'?", "tay", "chân", "mắt", "lưới"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Bới bèo ra ...'?", "bọ", "cá", "tôm", "ốc"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Bới lông tìm ...'?", "vết", "sẹo", "bụi", "sâu"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Cá không ăn muối cá ...'?", "ươn", "chết", "hôi", "thối"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Cây muốn lặng mà gió chẳng ...'?", "đừng", "ngừng", "yên", "ngớt"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Chân lấm tay ...'?", "bùn", "đất", "cát", "mồ hôi"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Chân cứng đá ...'?", "mềm", "mòn", "vỡ", "tan"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Chín bỏ làm ...'?", "mười", "tám", "chín", "trăm"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Chó ngáp phải ...'?", "ruồi", "muỗi", "kiến", "ong"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Chớp đông nhay nháy, gà gáy thì ...'?", "mưa", "nắng", "râm", "dông"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Có thực mới vực được ...'?", "đạo", "đời", "người", "nhà"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Cơm no bò ...'?", "cưỡi", "chạy", "nghỉ", "ngủ"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Cười người hôm trước, hôm sau người ...'?", "cười", "chê", "nhìn", "trêu"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Đánh trống bỏ ...'?", "dùi", "kèn", "chuông", "tay"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Đo lọ nước mắm, đếm củ dưa ...'?", "hành", "kiệu", "cải", "muối"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Gió chiều nào che chiều ...'?", "ấy", "đó", "nọ", "kia"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Hạt gạo cắn ...'?", "đôi", "ba", "nhỏ", "nát"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Học một biết ...'?", "mười", "hai", "trăm", "nghìn"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Không có lửa làm sao có ...'?", "khói", "tro", "than", "nhiệt"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Một điều nhịn, chín điều ...'?", "lành", "tốt", "vui", "hay"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Nước đổ đầu ...'?", "vịt", "gà", "ngỗng", "chim"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Nước mắt cá ...'?", "sấu", "heo", "voi", "mập"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Sóng sau đè sóng ...'?", "trước", "cả", "ngọn", "xa"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Tai vách mạch ...'?", "rừng", "cây", "núi", "đá"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Thả hổ về ...'?", "rừng", "núi", "hang", "chuồng"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Tháng giêng là tháng ăn ...'?", "chơi", "cơm", "tiệc", "Tết"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Tre non dễ ...'?", "uốn", "bẻ", "chặt", "chẻ"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Tức nước vỡ ...'?", "bờ", "đê", "đập", "sông"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Vung tay quá ...'?", "trán", "đầu", "mặt", "tai"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Xanh như tàu lá ...'?", "chuối", "khoai", "bắp", "môn"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Yêu trẻ, trẻ đến nhà; kính già, già để tuổi ...'?", "cho", "thêm", "lại", "dài"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Đi thưa về ...'?", "trình", "báo", "chào", "hỏi"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Lời nói gói vàng, lời chào mâm ...'?", "cỗ", "cơm", "xôi", "bát"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ăn quả nhớ người trồng ...'?", "cây", "hoa", "rừng", "vườn"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ăn no ngủ ...'?", "kỹ", "sâu", "dày", "say"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Mẹ tròn con ...'?", "vuông", "khỏe", "đẹp", "lành"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Đầu bạc răng ...'?", "long", "rụng", "mòn", "vàng"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Bách niên giai ...'?", "lão", "hảo", "phúc", "thọ"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'An cư lạc ...'?", "nghiệp", "nhà", "gia", "thân"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Thuận buồm xuôi ...'?", "gió", "nước", "dòng", "thuyền"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Mã đáo thành ...'?", "công", "thắng", "lợi", "danh"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Cầu được ước ...'?", "thấy", "lấy", "được", "ra"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Vạn sự như ...'?", "ý", "mơ", "nguyện", "ước"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Tấn tài tấn ...'?", "lộc", "phúc", "thọ", "vinh"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Vạn thọ vô ...'?", "cương", "biên", "tận", "hạn"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Gia đình hạnh ...'?", "phúc", "lành", "vui", "an")
]

for item in proverbs_l1_topup:
    q(1, "Đời sống & Thường thức", item[0], item[1], item[2], item[3], item[4], "A")

# --- LEVEL 2: ĐỜI SỐNG, ĐỘNG VẬT & THỰC PHẨM (150 items) ---
everyday_l2_topup = [
    ("Loài vật nuôi nào sau đây thích gặm xương và rất trung thành với chủ?", "Con chó", "Con mèo", "Con thỏ", "Con chuột"),
    ("Loài vật nào sau đây rất thích ăn chuối và có biệt tài leo trèo đu cành?", "Con khỉ", "Con ngựa", "Con hươu", "Con lợn"),
    ("Loài chim nào thường được thả bay lên trời làm biểu tượng cho hòa bình thế giới?", "Chim bồ câu trắng", "Chim đại bàng", "Chim cú mèo", "Chim kền kền"),
    ("Thức ăn khoái khẩu nhất của loài thỏ trắng là loại củ gì?", "Củ cà rốt", "Củ gừng", "Củ hành", "Củ tỏi"),
    ("Thức ăn chủ yếu hàng ngày của trâu và bò nuôi ở nông thôn là gì?", "Cỏ tươi và rơm khô", "Thịt cá", "Quả ngọt", "Hạt tiêu"),
    ("Loài gấu Bắc Cực sinh sống chủ yếu ở môi trường khí hậu như thế nào?", "Băng giá tuyết lạnh quanh năm", "Rừng nhiệt đới ẩm", "Sa mạc khô nóng", "Đồng cỏ xavan"),
    ("Loài lạc đà có thể nhịn uống nước nhiều ngày nhờ trữ mỡ trong bộ phận nào?", "Cái bướu trên lưng", "Cái bụng to", "Bốn chiếc chân", "Chiếc đuôi dài"),
    ("Loài động vật nào sau đây có khả năng thay đổi màu da để ngụy trang?", "Tắc kè hoa", "Con trâu", "Con ngựa", "Con gà"),
    ("Loài chim nào chạy rất nhanh trên mặt cát sa mạc nhưng đôi cánh không biết bay?", "Đà điểu", "Chim sẻ", "Chim chích", "Bồ câu"),
    ("Loài chim nhỏ nào có thể đập cánh cực nhanh và hút mật hoa khi đang lơ lửng?", "Chim ruồi", "Đại bàng", "Kền kền", "Cò trắng"),
    ("Để múc nước canh từ bát to vào bát nhỏ, người ta thường dùng vật dụng gì?", "Chiếc muôi (vá)", "Chiếc dĩa (nĩa)", "Đôi đũa", "Cây dao"),
    ("Để gắp bún, phở hoặc thức ăn trong bữa cơm gia đình Việt, vật dụng phổ biến nhất là gì?", "Đôi đũa", "Cây nĩa", "Chiếc dao", "Cây kéo"),
    ("Dụng cụ nào dùng để mở nắp chai bia hoặc nắp chai nước ngọt bằng kim loại?", "Dụng cụ khui nắp chai", "Cây kéo", "Chiếc thìa", "Đôi đũa"),
    ("Dụng cụ nào trong hộp may vá dùng để luồn chỉ may quần áo bị rách?", "Cây kim may", "Cái búa", "Chiếc kìm", "Chiếc cưa"),
    ("Vật dụng nào dùng để kẹp chặt quần áo phơi trên dây phơi không bị gió thổi bay?", "Chiếc kẹp quần áo", "Chiếc móc áo", "Sợi dây thừng", "Tấm kẹp sách"),
    ("Bàn ủi (bàn là) sử dụng nhiệt độ nóng để làm gì cho quần áo?", "Làm phẳng các nếp nhăn trên vải", "Giặt sạch vết bẩn", "Vắt khô nước", "Nhuộm màu vải"),
    ("Máy sấy tóc tạo ra luồng gió nóng nhằm mục đích chính là gì?", "Làm khô tóc ướt nhanh chóng", "Làm sạch gàu", "Cắt tỉa tóc", "Nhuộm tóc"),
    ("Chiếc ấm siêu tốc trong gia đình có công dụng nổi bật là gì?", "Đun sôi nước uống siêu nhanh", "Làm đá lạnh", "Nấu canh hầm xương", "Xay sinh tố"),
    ("Máy xay sinh tố dùng để chế biến món đồ uống nào sau đây?", "Xay nhuyễn hoa quả tươi với sữa và đá", "Đun nước sôi", "Hâm nóng thức ăn", "Nướng bánh mì"),
    ("Lò vi sóng trong nhà bếp thường dùng để làm gì nhanh chóng?", "Hâm nóng và rã đông thực phẩm", "Rửa bát đĩa", "Nấu cơm gạo lứt", "Ép nước hoa quả"),
    ("Để bảo quản kem đá không bị tan chảy, người ta phải cất kem vào ngăn nào của tủ lạnh?", "Ngăn đông (ngăn đá)", "Ngăn mát đựng rau", "Cánh cửa tủ", "Bên ngoài tủ"),
    ("Khi rán nem hoặc xào rau trên chảo dầu nóng, gia vị chất lỏng thường dùng là gì?", "Dầu ăn thực vật", "Nước lọc", "Nước mắm", "Giấm chua"),
    ("Để luộc rau muống giữ được màu xanh tươi ngon, người nấu thường mở vung và thêm chút gì vào nước?", "Một chút muối ăn", "Một chút giấm", "Một chút ớt", "Một chút tiêu"),
    ("Loại củ nào khi gọt vỏ hoặc thái lát mỏng thường khiến người nội trợ bị cay mắt chảy nước mắt?", "Củ hành tây", "Củ khoai tây", "Củ cà rốt", "Củ cải trắng"),
    ("Gia vị nào có vị cay nồng đặc trưng, hạt nhỏ màu đen hoặc sọ trắng thường rắc lên bát cháo hành?", "Hạt tiêu", "Hạt mè", "Hạt sen", "Hạt kê"),
    ("Loại củ nào có vỏ sần sùi, ruột màu vàng đậm hoặc cam, có tính kháng viêm và tạo màu vàng cho món ăn?", "Củ nghệ", "Củ khoai lang", "Củ sắn", "Củ mã thầy"),
    ("Loại gia vị củ nào có tính nóng ấm, thường thái sợi cho vào món cá hấp hoặc pha trà ấm ngày lạnh?", "Củ gừng", "Củ đậu", "Củ cải", "Củ khoai"),
    ("Tỏi tươi băm nhỏ phi thơm thường là bước mở đầu hấp dẫn cho món ăn nào?", "Món rau xào tỏi", "Món chè ngọt", "Món bánh ngọt", "Món kem lạnh"),
    ("Rau răm thơm cay nồng thường là gia vị ăn kèm không thể thiếu với món trứng gì?", "Trứng vịt lộn", "Trứng rán hành", "Trứng ốp la", "Trứng luộc lòng đào"),
    ("Bánh mì kẹp thịt truyền thống của Việt Nam thường được phết thêm lớp sốt béo ngậy nào bên trong?", "Pate gan và sốt bơ trứng", "Mật ong", "Sốt tương cà chua", "Sốt socola")
]

for item in everyday_l2_topup:
    q(2, "Đời sống & Thường thức", item[0], item[1], item[2], item[3], item[4], "A")

# --- LEVEL 3: 63 TỈNH THÀNH - VỊNH, BIỂN, ĐẦM PHÁ & THẮNG CẢNH (150 items) ---
geo_l3_topup = [
    ("Vịnh Cam Ranh - một trong những vịnh biển nước sâu kín gió đẹp nhất thế giới thuộc tỉnh nào?", "Tỉnh Khánh Hòa", "Tỉnh Ninh Thuận", "Tỉnh Bình Thuận", "Tỉnh Phú Yên"),
    ("Bãi biển Cửa Lò với bờ cát phẳng mịn trải dài là điểm du lịch biển nổi tiếng của tỉnh nào?", "Tỉnh Nghệ An", "Tỉnh Thanh Hóa", "Tỉnh Hà Tĩnh", "Tỉnh Quảng Bình"),
    ("Bãi biển Sầm Sơn nhộn nhịp sóng vỗ là khu nghỉ mát biển trứ danh của tỉnh nào miền Trung?", "Tỉnh Thanh Hóa", "Tỉnh Nghệ An", "Tỉnh Nam Định", "Tỉnh Ninh Bình"),
    ("Bãi biển Mỹ Khê từng được tạp chí Forbes bình chọn là một trong những bãi biển quyến rũ nhất hành tinh thuộc về thành phố nào?", "Thành phố Đà Nẵng", "Thành phố Nha Trang", "Thành phố Quy Nhơn", "Thành phố Vũng Tàu"),
    ("Đầm Ô Loan - thắng cảnh thơ mộng nổi tiếng với đặc sản sò huyết tươi ngon tọa lạc tại tỉnh nào?", "Tỉnh Phú Yên", "Tỉnh Bình Định", "Tỉnh Khánh Hòa", "Tỉnh Quảng Ngãi"),
    ("Phá Tam Giang - đầm phá nước lợ lớn nhất Đông Nam Á với cảnh hoàng hôn tuyệt đẹp thuộc tỉnh/TP nào?", "Tỉnh Thừa Thiên Huế", "Thành phố Đà Nẵng", "Tỉnh Quảng Nam", "Tỉnh Quảng Trị"),
    ("Khu du lịch Bãi Cháy và Tuần Châu nhìn ra vịnh biển kỳ quan thế giới thuộc địa phương nào?", "Tỉnh Quảng Ninh (TP Hạ Long)", "Thành phố Hải Phòng", "Tỉnh Nam Định", "Tỉnh Thái Bình"),
    ("Khu du lịch sinh thái Đảo Khỉ và Suối Hoa Lan nằm trên vịnh Nha Phu thuộc tỉnh nào?", "Tỉnh Khánh Hòa", "Tỉnh Bình Thuận", "Tỉnh Phú Yên", "Tỉnh Ninh Thuận"),
    ("Ngọn núi Bà Đen cao 986m được mệnh danh là 'Nóc nhà Nam Bộ' tọa lạc tại tỉnh nào?", "Tỉnh Tây Ninh", "Tỉnh Bình Dương", "Tỉnh Đồng Nai", "Tỉnh Bình Phước"),
    ("Ngọn núi Chứa Chan hùng vĩ - ngọn núi cao thứ hai ở Nam Bộ thuộc địa bàn tỉnh nào?", "Tỉnh Đồng Nai", "Tỉnh Bình Dương", "Tỉnh Bà Rịa - Vũng Tàu", "Tỉnh Tây Ninh"),
    ("Khu du lịch Vùng Bảy Núi (Thất Sơn) huyền bí với ngọn Núi Cấm nổi tiếng nằm ở tỉnh nào?", "Tỉnh An Giang", "Tỉnh Kiên Giang", "Tỉnh Đồng Tháp", "Tỉnh Cần Thơ"),
    ("Rừng tràm Trà Sư với thảm bèo xanh mướt và những chuyến xuồng ba lá thanh bình thuộc tỉnh nào?", "Tỉnh An Giang", "Tỉnh Cà Mau", "Tỉnh Bến Tre", "Tỉnh Hậu Giang"),
    ("Vườn quốc gia Tràm Chim - khu ramsar bảo tồn loài sếu đầu đỏ quý hiếm nằm ở huyện Tam Nông, tỉnh nào?", "Tỉnh Đồng Tháp", "Tỉnh An Giang", "Tỉnh Long An", "Tỉnh Tiền Giang"),
    ("Chợ nổi Cái Răng - nét văn hóa mua bán trên sông nước độc đáo miền Tây nằm ở thành phố nào?", "Thành phố Cần Thơ", "Thành phố Mỹ Tho", "Thành phố Vĩnh Long", "Thành phố Rạch Giá"),
    ("Chợ nổi Ngã Năm - nơi hội tụ giao thương của năm nhánh sông lớn tọa lạc tại tỉnh nào?", "Tỉnh Sóc Trăng", "Tỉnh Bạc Liêu", "Tỉnh Hậu Giang", "Tỉnh Cà Mau"),
    ("Di tích Lăng Khải Định với kiến trúc giao thoa Đông - Tây tinh xảo tọa lạc tại địa phương nào?", "Tỉnh Thừa Thiên Huế", "Thành phố Hà Nội", "Tỉnh Nam Định", "Tỉnh Thanh Hóa"),
    ("Quần thể di tích Cố đô Hoa Lư - nơi từng là kinh đô của vua Đinh Tiên Hoàng thuộc tỉnh nào?", "Tỉnh Ninh Bình", "Tỉnh Thanh Hóa", "Tỉnh Hà Nam", "Tỉnh Nam Định"),
    ("Đền Hùng - nơi tổ chức lễ hội Giỗ Tổ mùng 10 tháng 3 âm lịch hàng năm tọa lạc trên núi Nghĩa Lĩnh, tỉnh nào?", "Tỉnh Phú Thọ", "Tỉnh Vĩnh Phúc", "Tỉnh Tuyên Quang", "Tỉnh Yên Bái"),
    ("Thành nhà Hồ - di sản văn hóa thế giới được xây dựng hoàn toàn bằng đá độc đáo nằm ở tỉnh nào?", "Tỉnh Thanh Hóa", "Tỉnh Nghệ An", "Tỉnh Ninh Bình", "Tỉnh Hà Nam"),
    ("Khu di tích lịch sử Chiến thắng Ấp Bắc oanh liệt chống giặc Mỹ xâm lược nằm ở tỉnh nào?", "Tỉnh Tiền Giang", "Tỉnh Bến Tre", "Tỉnh Long An", "Tỉnh Vĩnh Long"),
    ("Khu di tích Đồng Khởi Bến Tre gắn liền với phong trào nổi dậy của 'Đội quân tóc dài' do nữ tướng nào chỉ huy?", "Bà Nguyễn Thị Định", "Bà Trương Mỹ Hoa", "Bà Võ Thị Sáu", "Bà Nguyễn Thị Bình"),
    ("Người nữ anh hùng trẻ tuổi quê ở Đất Đỏ (Bà Rịa - Vũng Tàu) kiên cường trước họng súng kẻ thù là ai?", "Nữ anh hùng Võ Thị Sáu", "Nữ anh hùng Lê Thị Riêng", "Nữ anh hùng Mạc Thị Bưởi", "Nữ anh hùng Út Tịch"),
    ("Người thiếu niên anh hùng dũng cảm lấy thân mình chèn lưng cứu khẩu pháo trên chiến trường Điện Biên Phủ là ai?", "Anh hùng Tô Vĩnh Diện", "Anh hùng Bế Văn Đàn", "Anh hùng Phan Đình Giót", "Anh hùng La Văn Cầu"),
    ("Người anh hùng dũng cảm lấy thân mình lấp lỗ châu mai mở đường cho đồng đội xông lên trong chiến dịch Điện Biên Phủ là ai?", "Anh hùng Phan Đình Giót", "Anh hùng Tô Vĩnh Diện", "Anh hùng Bế Văn Đàn", "Anh hùng Cù Chính Lan"),
    ("Người anh hùng đã lấy thân mình làm giá súng cho đồng đội bắn tỉa tiêu diệt quân địch là ai?", "Anh hùng Bế Văn Đàn", "Anh hùng Tô Vĩnh Diện", "Anh hùng Phan Đình Giót", "Anh hùng La Văn Cầu")
]

for item in geo_l3_topup:
    q(3, "Địa lý", item[0], item[1], item[2], item[3], item[4], "A")

lines.append("]")

with open(out_file, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

print(f"Đã tạo thành công {len(lines)} dòng câu hỏi trong {out_file}")
