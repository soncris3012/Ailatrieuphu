import sys, os

out_file = '/Users/soncris/Ailatrieuphu/scripts/vietnamese_t1_part4.py'

lines = []
lines.append("# scripts/vietnamese_t1_part4.py")
lines.append("# Massive authentic Vietnamese questions to ensure 1,000 distinct questions per level")
lines.append("")
lines.append("FINAL_EXPANSION_QUESTIONS = [")

def q(lvl, cat, text, a, b, c, d, ans):
    text_e = text.replace("'", "\\'")
    a_e = a.replace("'", "\\'")
    b_e = b.replace("'", "\\'")
    c_e = c.replace("'", "\\'")
    d_e = d.replace("'", "\\'")
    lines.append(f"    ({lvl}, '{cat}', '{text_e}', '{a_e}', '{b_e}', '{c_e}', '{d_e}', '{ans}'),")

# --- 1. TỪ ĐỒNG NGHĨA & TRÁI NGHĨA TIẾNG VIỆT (Level 1) ---
syn_ant = [
    ("Từ nào sau đây đồng nghĩa với từ 'chăm chỉ'?", "Cần cù", "Lười biếng", "Bảo thủ", "Nóng vội"),
    ("Từ nào sau đây đồng nghĩa với từ 'dũng cảm'?", "Can đảm", "Hèn nhát", "Rụt rè", "Nhút nhát"),
    ("Từ nào sau đây đồng nghĩa với từ 'thật thà'?", "Trung thực", "Gian dối", "Lươn lẹo", "Điêu ngoa"),
    ("Từ nào sau đây đồng nghĩa với từ 'đoàn kết'?", "Gắn bó", "Chia rẽ", "Rời rạc", "Phân tán"),
    ("Từ nào sau đây đồng nghĩa với từ 'tiết kiệm'?", "Chắt chiu", "Lãng phí", "Hoang phí", "Tiêu xài"),
    ("Từ nào sau đây đồng nghĩa với từ 'thông minh'?", "Sáng dạ", "Ngốc nghếch", "Chậm chạp", "Tối dạ"),
    ("Từ nào sau đây đồng nghĩa với từ 'bình yên'?", "Thanh bình", "Bất an", "Hỗn loạn", "Sóng gió"),
    ("Từ nào sau đây đồng nghĩa với từ 'giàu có'?", "Phú quý", "Nghèo khó", "Bần hàn", "Cơ cực"),
    ("Từ nào sau đây đồng nghĩa với từ 'vui vẻ'?", "Hân hoan", "U sầu", "Buồn rầu", "Bi quan"),
    ("Từ nào sau đây đồng nghĩa với từ 'nhanh nhẹn'?", "Tháo vát", "Chậm chạp", "Ù lì", "Lề mề"),
    ("Từ nào sau đây trái nghĩa với từ 'chăm chỉ'?", "Lười biếng", "Cần mẫn", "Chuyên cần", "Chịu khó"),
    ("Từ nào sau đây trái nghĩa với từ 'dũng cảm'?", "Hèn nhát", "Kiên cường", "Bất khuất", "Quả cảm"),
    ("Từ nào sau đây trái nghĩa với từ 'thật thà'?", "Gian dối", "Chân thành", "Ngay thẳng", "Bộc trực"),
    ("Từ nào sau đây trái nghĩa với từ 'đoàn kết'?", "Chia rẽ", "Hòa hợp", "Thống nhất", "Tương trợ"),
    ("Từ nào sau đây trái nghĩa với từ 'tiết kiệm'?", "Lãng phí", "Căn cơ", "Dành dụm", "Bủn xỉn"),
    ("Từ nào sau đây trái nghĩa với từ 'khéo léo'?", "Vụng về", "Tinh tế", "Nhanh nhẹn", "Tỉ mỉ"),
    ("Từ nào sau đây trái nghĩa với từ 'thành công'?", "Thất bại", "Thắng lợi", "Vinh quang", "Thành đạt"),
    ("Từ nào sau đây trái nghĩa với từ 'hòa bình'?", "Chiến tranh", "Thái bình", "An lạc", "Yên vui"),
    ("Từ nào sau đây trái nghĩa với từ 'yêu thương'?", "Căm ghét", "Quý mến", "Trân trọng", "Thương cảm"),
    ("Từ nào sau đây trái nghĩa với từ 'rộng rãi'?", "Chật hẹp", "Thênh thang", "Bao la", "Mênh mông")
]

for item in syn_ant:
    q(1, "Đời sống & Thường thức", item[0], item[1], item[2], item[3], item[4], "A")

# --- 2. ĐỜI SỐNG, ĐỒ DÙNG, GIA ĐÌNH & AN TOÀN (Level 1 & 2) ---
everyday_items = [
    (1, "Vật dụng nào dùng để soi gương mặt khi chải tóc, trang điểm hoặc chỉnh trang áo quần?", "Chiếc gương soi", "Cây quạt", "Bức tranh", "Tấm rèm"),
    (1, "Vật dụng nào thường được cài vào khuy áo sơ mi để giữ hai vạt áo khép kín?", "Cúc áo (khuy áo)", "Chiếc kẹp tóc", "Dây buộc giày", "Ghim bấm giấy"),
    (1, "Loại giày nào có đế mềm êm ái, rất phù hợp cho chạy bộ, tập gym và chơi thể thao?", "Giày thể thao (sneaker)", "Giày cao gót", "Dép lê xỏ ngón", "Ủng đi mưa"),
    (1, "Dụng cụ học tập nào của học sinh dùng để đo độ dài các đoạn thẳng có vạch milimét và xentimét?", "Cây thước kẻ", "Cục tẩy gôm", "Bút lông dầu", "Kéo cắt thủ công"),
    (1, "Dụng cụ học tập nào có hai chân kim loại dùng để vẽ hình tròn chuẩn xác trong môn toán?", "Chiếc com-pa", "Cây ê-ke", "Thước đo độ", "Bút chì màu"),
    (1, "Thiết bị điện gia dụng nào có cánh quạt quay tạo luồng gió mát mẻ trong những ngày hè oi ả?", "Quạt điện", "Bếp từ", "Lò vi sóng", "Bình nóng lạnh"),
    (1, "Nồi cơm điện sử dụng nguồn năng lượng nào để chuyển hóa thành nhiệt năng nấu chín hạt gạo?", "Điện năng", "Năng lượng gió", "Quang năng", "Thủy năng"),
    (1, "Bình giữ nhiệt gia dụng có công dụng chủ yếu là gì?", "Giữ cho đồ uống nóng hoặc lạnh được lâu", "Đun sôi nước tức thì", "Làm đá lạnh siêu tốc", "Lọc nước biển thành nước ngọt"),
    (1, "Đồng hồ báo thức trong phòng ngủ có chức năng chính là gì?", "Đổ chuông nhắc nhở giờ thức dậy", "Đo nhiệt độ cơ thể", "Chiếu sáng ban đêm", "Chụp ảnh lưu niệm"),
    (1, "Vật dụng nào thường dùng để che mưa nắng cho một hoặc hai người khi đi bộ ngoài trời?", "Chiếc ô (dù)", "Tấm bạt phủ xe", "Cái mũ len", "Áo khoác gió"),
    (1, "Kính râm (kính mát) đeo vào mắt khi đi ngoài trời nắng gắt nhằm mục đích gì?", "Bảo vệ mắt khỏi ánh sáng chói chang và tia cực tím", "Nhìn rõ hơn trong đêm tối", "Thay đổi màu mắt", "Đo thị lực"),
    (1, "Khẩu trang y tế đeo khi ra đường có tác dụng gì đối với sức khỏe?", "Ngăn ngừa khói bụi và vi khuẩn lây lan qua đường hô hấp", "Làm ấm đôi tai", "Giữ ẩm cho tóc", "Chống ù tai"),
    (1, "Mũ bảo hiểm đạt chuẩn có lớp đệm xốp EPS bên trong nhằm mục đích gì?", "Hấp thụ xung lực giảm chấn động bảo vệ đầu khi va chạm", "Làm cho mũ nhẹ hơn", "Tạo mùi thơm", "Chống bám bụi bẩn"),
    (1, "Dây đai an toàn trên xe ô tô có tác dụng gì quan trọng nhất khi xe phanh gấp?", "Giữ chặt người ngồi trên ghế không bị văng về phía trước", "Giúp người ngồi ngủ ngon hơn", "Làm đẹp nội thất xe", "Báo hiệu tốc độ xe"),
    (2, "Khi tham gia giao thông trên đường bộ, người điều khiển xe máy phải đi về phía bên nào?", "Bên phải theo chiều đi của mình", "Bên trái theo chiều đi", "Đi giữa làn phân cách", "Thích đi bên nào cũng được"),
    (2, "Biển báo giao thông hình tròn viền đỏ nền trắng có hình vẽ màu đen là loại biển báo gì?", "Biển báo cấm", "Biển chỉ dẫn", "Biển hiệu lệnh", "Biển cảnh báo nguy hiểm"),
    (2, "Biển báo giao thông hình tam giác đều viền đỏ nền vàng có hình vẽ màu đen là biển báo gì?", "Biển cảnh báo nguy hiểm", "Biển cấm", "Biển chỉ dẫn", "Biển phụ"),
    (2, "Người đi bộ muốn sang đường an toàn nhất nên đi qua vị trí nào?", "Vạch kẻ đường dành cho người đi bộ hoặc cầu vượt bộ hành", "Bất kỳ vị trí nào trên đường", "Trèo qua dải phân cách", "Chạy cắt ngang dòng xe đang chạy"),
    (2, "Hành vi nào sau đây tuyệt đối bị cấm khi điều khiển phương tiện tham gia giao thông?", "Đã uống rượu bia thì không lái xe", "Đội mũ bảo hiểm đúng quy cách", "Dừng lại trước đèn đỏ", "Đi đúng tốc độ cho phép")
]

for item in everyday_items:
    q(item[0], "Đời sống & Thường thức", item[1], item[2], item[3], item[4], item[5], "A")

# --- 3. ẨM THỰC TRUYỀN THỐNG VIỆT NAM (Level 2 & 3) ---
foods_vn = [
    (2, "Món phở truyền thống Việt Nam nước dùng thơm ngọt chủ yếu được ninh kỹ từ nguyên liệu gì?", "Xương bò hoặc xương gà", "Thịt lợn nạc", "Cá biển", "Cua đồng"),
    (2, "Món bún chả Hà Nội trứ danh thường ăn kèm với loại nước chấm pha như thế nào?", "Nước mắm chua ngọt tỏi ớt kèm đu đủ cà rốt giòn", "Nước tương đen đặc", "Mắm tôm nguyên chất", "Sốt mayonaise"),
    (2, "Món bún đậu mắm tôm chuẩn vị miền Bắc thường ăn kèm với loại rau thơm nào sau đây?", "Rau kinh giới và tía tô", "Rau cần tây", "Rau ngót", "Rau đay"),
    (2, "Món bánh xèo miền Tây Nam Bộ có màu vàng ươm bắt mắt nhờ cho thêm gia vị gì vào bột?", "Bột nghệ", "Bột ớt", "Bột tiêu", "Bột cacao"),
    (2, "Món chả cá Lã Vọng nức tiếng đất Hà thành được chế biến chủ yếu từ loại cá nước ngọt nào?", "Cá lăng", "Cá mè", "Cá trôi", "Cá rô phi"),
    (2, "Món cá kho làng Vũ Đại nổi tiếng ở Hà Nam được kho ròng rã nhiều giờ trong vật dụng gì?", "Niêu đất nung", "Nồi áp suất điện", "Chảo gang mỏng", "Âu thủy tinh"),
    (2, "Món cơm lam thơm dẻo của đồng bào vùng cao Tây Bắc được nấu chín bên trong vật liệu gì?", "Ống tre nứa non", "Vỏ quả dừa", "Nồi cơm điện", "Lá sen bọc kín"),
    (2, "Món thắng cố độc đáo ở các phiên chợ vùng cao Tây Bắc là món ăn truyền thống nấu từ thịt con gì?", "Thịt ngựa", "Thịt thỏ", "Thịt vịt", "Thịt gà"),
    (2, "Món mì Quảng trứ danh của xứ Quảng thường được rắc thêm loại hạt thơm bùi nào lên trên?", "Đậu phộng (lạc) rang giòn", "Hạt điều tẩm ớt", "Hạt dưa đỏ", "Hạt vừng trắng"),
    (2, "Món bánh bèo chén xứ Huế thường được rắc lớp nhân gì bắt mắt lên trên mặt bánh?", "Tôm chấy cháy vàng và tóp mỡ giòn", "Thịt bò băm", "Thịt gà xé", "Chả lụa thái sợi"),
    (2, "Món gỏi cuốn tôm thịt Nam Bộ thường được chấm kèm với loại nước chấm đậm đà nào?", "Tương đen pha đậu phộng hoặc mắm nêm", "Nước tương xì dầu", "Muối tiêu chanh", "Dầu hào"),
    (2, "Bánh ít lá gai truyền thống của Bình Định được nhuộm màu đen óng tự nhiên bằng loại lá nào?", "Lá cây gai", "Lá cẩm tím", "Lá dứa xanh", "Lá mồng tơi"),
    (2, "Kẹo mè xửng dẻo thơm mạch nha và mè rang nức tiếng gần xa là đặc sản của vùng đất nào?", "Cố đô Huế", "Hà Nội", "Đà Nẵng", "Cần Thơ"),
    (2, "Cốm dẹp Làng Vòng xanh non thơm mùi nếp mới thường được bọc cẩn thận trong loại lá nào?", "Lá sen tươi", "Lá chuối khô", "Lá bàng", "Lá ổi"),
    (2, "Quả sấu tươi chua giòn thường dùng nấu canh chua và ngâm đường giải khát là nét đặc trưng của mùa hè ở đâu?", "Thủ đô Hà Nội", "Thành phố Cần Thơ", "Thành phố Đà Lạt", "Thành phố Rạch Giá"),
    (3, "Đặc sản 'Bánh cáy làng Nguyễn' nức tiếng thơm bùi là niềm tự hào ẩm thực của tỉnh nào?", "Tỉnh Thái Bình", "Tỉnh Hưng Yên", "Tỉnh Nam Định", "Tỉnh Hà Nam"),
    (3, "Đặc sản 'Kẹo cu đơ' thơm bùi vị mật mía, gừng tươi và lạc rang là niềm tự hào của tỉnh nào?", "Tỉnh Hà Tĩnh", "Tỉnh Thanh Hóa", "Tỉnh Quảng Bình", "Tỉnh Nghệ An"),
    (3, "Đặc sản 'Bánh pía sầu riêng' với lớp vỏ ngàn lớp mềm bùi nổi tiếng khắp nơi gắn liền với tỉnh nào?", "Tỉnh Sóc Trăng", "Tỉnh Trà Vinh", "Tỉnh Bạc Liêu", "Tỉnh Cà Mau"),
    (3, "Đặc sản 'Cua Năm Căn' thịt chắc ngọt thơm trứ danh được nuôi tại vùng ngập mặn của tỉnh nào?", "Tỉnh Cà Mau", "Tỉnh Bến Tre", "Tỉnh Kiên Giang", "Tỉnh Tiền Giang"),
    (3, "Đặc sản 'Yến sào' thượng hạng quý giá gắn liền với các đảo yến tự nhiên của tỉnh nào miền Trung?", "Tỉnh Khánh Hòa", "Tỉnh Bình Định", "Tỉnh Phú Yên", "Tỉnh Quảng Ngãi")
]

for item in foods_vn:
    q(item[0], "Ẩm thực & Văn hóa", item[1], item[2], item[3], item[4], item[5], "A")

# --- 4. THẾ GIỚI LOÀI VẬT & THIÊN NHIÊN (Level 4 & 5) ---
nature_animals = [
    (4, "Loài động vật nào sau đây thuộc nhóm bò sát nhưng cơ thể hoàn toàn không có chân?", "Con trăn, con rắn", "Con cá sấu", "Con thằn lằn", "Con rùa biển"),
    (4, "Loài lưỡng cư nào khi còn nhỏ sống dưới nước thở bằng mang (gọi là nòng nọc), lớn lên sống trên cạn thở bằng phổi và da?", "Con ếch đồng", "Con cá chép", "Con ốc bươu", "Con tôm đồng"),
    (4, "Loài chim nào bơi lặn rất giỏi dưới biển băng giá ở Nam Cực nhưng đôi cánh đã tiêu giảm không biết bay?", "Chim cánh cụt", "Chim bồ câu", "Chim đại bàng", "Chim thiên nga"),
    (4, "Loài thú đặc hữu của nước Úc có chiếc túi trước bụng để che chở nuôi dưỡng con non là con gì?", "Chuột túi (Kangaroo)", "Gấu Bắc Cực", "Hổ Siberia", "Chó sói hoang"),
    (4, "Loài gấu nào có hai quầng mắt đen nhánh, thích ăn lá trúc và là biểu tượng quốc gia của Trung Quốc?", "Gấu trúc (Panda)", "Gấu nâu", "Gấu ngựa", "Gấu chó"),
    (4, "Loài thú săn mồi nào chạy nhanh nhất trên cạn với tốc độ có thể đạt tới 100 - 120 km/h?", "Báo săn (Cheetah)", "Sư tử châu Phi", "Chó săn mồi", "Ngựa vằn"),
    (4, "Loài chim có kích thước tí hon có khả năng bay lùi và đập cánh hàng chục lần mỗi giây là loài nào?", "Chim ruồi", "Chim sâu", "Chim chích chòe", "Chim sẻ"),
    (4, "Thằn lằn có khả năng kỳ diệu gì để đánh lừa kẻ thù khi bị tấn công dồn vào chân tường?", "Tự đứt đuôi để phân tâm kẻ thù", "Phun nọc độc cực mạnh", "Đổi màu mắt", "Biến hình to lớn hơn"),
    (4, "Con tắc kè hoa có khả năng đặc biệt nào giúp nó ẩn nấp và săn mồi hiệu quả?", "Tự thay đổi màu sắc da theo môi trường", "Biết bay trên không trung", "Biết bơi dưới đáy biển", "Tự phát ra tiếng kêu sấm sét"),
    (4, "San hô lung linh dưới đáy đại dương thực chất là loài sinh vật thuộc giới nào?", "Động vật", "Thực vật", "Nấm", "Khoáng vật vô sinh"),
    (5, "Dòng hải lưu nào mang nước ấm từ vịnh Mexico qua Đại Tây Dương làm ấm khí hậu Tây Âu?", "Dòng hải lưu Gulf Stream (Hải lưu Vịnh)", "Hải lưu Kuroshio", "Hải lưu Humboldt", "Hải lưu Benguela"),
    (5, "Khí quyển Trái Đất gồm các tầng khí, tầng nào nằm gần bề mặt đất nhất nơi diễn ra mọi hiện tượng thời tiết?", "Tầng đối lưu", "Tầng bình lưu", "Tầng trung lưu", "Tầng nhiệt"),
    (5, "Lớp khí nào trong tầng bình lưu có tác dụng như tấm lá chắn hấp thụ hầu hết tia cực tím (UV) nguy hại từ Mặt Trời?", "Tầng Ozon (O3)", "Khí Metan", "Khí Cacbonic", "Khí Hidro"),
    (5, "Vùng cực bắc và cực nam của Trái Đất thường xuất hiện hiện tượng ánh sáng huyền ảo trên bầu trời đêm gọi là gì?", "Cực quang (Bắc cực quang / Nam cực quang)", "Sao băng", "Cầu vồng đôi", "Nhật thực toàn phần"),
    (5, "Thủy triều lên xuống hàng ngày trên các đại dương là do lực hấp dẫn của thiên thể nào tác động mạnh nhất lên Trái Đất?", "Mặt Trăng", "Sao Hỏa", "Sao Kim", "Sao Thủy")
]

for item in nature_animals:
    q(item[0], "Khoa học & Tự nhiên", item[1], item[2], item[3], item[4], item[5], "A")

lines.append("]")

with open(out_file, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

print(f"Đã tạo thành công {len(lines)} dòng câu hỏi trong {out_file}")
