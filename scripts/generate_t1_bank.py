import os, sys

out_file = '/Users/soncris/Ailatrieuphu/scripts/vietnamese_t1_rich_bank.py'

lines = []
lines.append("# scripts/vietnamese_t1_rich_bank.py")
lines.append("# Comprehensive authentic Vietnamese questions for Tầng 1 (Level 1 - 5)")
lines.append("")
lines.append("RICH_T1_QUESTIONS = [")

def q(lvl, cat, text, a, b, c, d, ans):
    # Escape single quotes
    text_e = text.replace("'", "\\'")
    a_e = a.replace("'", "\\'")
    b_e = b.replace("'", "\\'")
    c_e = c.replace("'", "\\'")
    d_e = d.replace("'", "\\'")
    lines.append(f"    ({lvl}, '{cat}', '{text_e}', '{a_e}', '{b_e}', '{c_e}', '{d_e}', '{ans}'),")

# --- PROVERBS (Level 1) ---
proverbs_l1 = [
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ăn quả nhớ kẻ trồng ...'?", "cây", "hoa", "rừng", "lá", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Uống nước nhớ ...'?", "nguồn", "sông", "suối", "biển", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Có công mài sắt, có ngày nên ...'?", "kim", "dao", "kéo", "kiếm", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Lá lành đùm lá ...'?", "rách", "héo", "vàng", "khô", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Một con ngựa đau, cả tàu bỏ ...'?", "cỏ", "chuồng", "chạy", "ăn", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Học ăn, học nói, học gói, học ...'?", "mở", "làm", "chơi", "về", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Thương người như thể thương ...'?", "thân", "nhà", "bạn", "mình", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Đi một ngày đàng, học một sàng ...'?", "khôn", "vàng", "chữ", "sách", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Bán anh em xa, mua láng giềng ...'?", "gần", "tốt", "quen", "thân", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Lời chào cao hơn mâm ...'?", "cỗ", "xôi", "thịt", "cơm", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Đói cho sạch, rách cho ...'?", "thơm", "lành", "ấm", "đẹp", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Một giọt máu đào hơn ao nước ...'?", "lã", "trong", "đục", "sâu", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Chị ngã em ...'?", "nâng", "đỡ", "cười", "nhìn", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Nước chảy đá ...'?", "mòn", "vỡ", "trôi", "lăn", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Lửa thử vàng, gian nan thử ...'?", "sức", "người", "lòng", "bạn", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Gần mực thì đen, gần đèn thì ...'?", "rạng", "sáng", "tỏ", "trong", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Thất bại là mẹ ...'?", "thành công", "may mắn", "chiến thắng", "kinh nghiệm", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Trèo cao ngã ...'?", "đau", "sâu", "xa", "nặng", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Đất lành chim ...'?", "đậu", "bay", "hót", "làm tổ", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ếch ngồi đáy ...'?", "giếng", "ao", "hồ", "chum", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Cây ngay không sợ chết ...'?", "đứng", "nghiêng", "héo", "đổ", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Mèo mù vớ cá ...'?", "rán", "kho", "tươi", "to", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Trâu buộc ghét trâu ...'?", "ăn", "cày", "đi", "ngủ", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Được voi đòi ...'?", "Tiên", "ngựa", "hổ", "vàng", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Giấu đầu hở ...'?", "đuôi", "chân", "lưng", "bụng", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Bắt cá hai ...'?", "tay", "chân", "mắt", "lưới", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Đục nước béo ...'?", "cò", "cá", "vịt", "mèo", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Khẩu Phật tâm ...'?", "xà", "ma", "quỷ", "rắn", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Mật ngọt chết ...'?", "ruồi", "kiến", "ong", "muỗi", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Tre già măng ...'?", "mọc", "lên", "tốt", "xanh", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Tránh vỏ dưa gặp vỏ ...'?", "dừa", "bưởi", "cam", "chuối", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Mất bò mới lo làm ...'?", "chuồng", "rào", "cửa", "khóa", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Nuôi ong tay ...'?", "áo", "quần", "vai", "lưng", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Chó cắn áo ...'?", "rách", "nghèo", "mỏng", "xấu", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Gieo gió gặt ...'?", "bão", "mưa", "dông", "sấm", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ném đá giấu ...'?", "tay", "chân", "mặt", "người", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Châu chấu đá ...'?", "xe", "ngựa", "voi", "thuyền", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Con sâu làm rầu nồi ...'?", "canh", "cơm", "cháo", "kho", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Tốt gỗ hơn tốt ...'?", "nước sơn", "màu sắc", "vỏ ngoài", "hình dáng", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Tiên học lễ, hậu học ...'?", "văn", "chữ", "nghề", "đạo", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ăn cháo đá ...'?", "bát", "nồi", "muôi", "bàn", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Qua cầu rút ...'?", "ván", "dây", "cọc", "đinh", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Vắt chanh bỏ ...'?", "vỏ", "hạt", "tép", "bã", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Trăm hay không bằng tay ...'?", "quen", "khéo", "nhanh", "làm", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Gừng càng già càng ...'?", "cay", "thơm", "ngon", "nồng", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Cơm lành canh ...'?", "ngọt", "ngon", "ấm", "thơm", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Lá rụng về ...'?", "cội", "cây", "đất", "gốc", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Mèo khen mèo dài ...'?", "đuôi", "tai", "lông", "móng", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Trứng khôn hơn ...'?", "vịt", "gà", "chim", "ngỗng", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Cá lớn nuốt cá ...'?", "bé", "con", "nhỏ", "gầy", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Đầu xuôi đuôi ...'?", "lọt", "qua", "xong", "chạy", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Kính lão đắc ...'?", "thọ", "phúc", "lộc", "tài", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Môi hở răng ...'?", "lạnh", "đau", "buốt", "chảy máu", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Nước đến chân mới ...'?", "nhảy", "chạy", "bước", "đi", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Sai một ly đi một ...'?", "dặm", "thước", "mét", "cây", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Thùng rỗng kêu ...'?", "to", "vang", "lớn", "động", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Chớ thấy sóng cả mà ngã tay ...'?", "chèo", "lái", "thuyền", "bơi", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Có chí thì ...'?", "nên", "thành", "thắng", "được", "A"),
    ("Điền từ còn thiếu vào câu tục ngữ: 'Gần bùn mà chẳng hôi tanh mùi ...'?", "bùn", "cá", "nước", "rong", "A")
]

for item in proverbs_l1:
    q(1, "Đời sống & Thường thức", item[0], item[1], item[2], item[3], item[4], item[5])

# --- FOLK RIDDLES & EVERYDAY LIFE (Level 1) ---
riddles_l1 = [
    ("Con gì mào đỏ rực rỡ, gáy vang 'ò ó o' mỗi sớm mai đánh thức mọi người?", "Con gà trống", "Con vịt xiêm", "Con chim bồ câu", "Con chim chích chòe", "A"),
    ("Con gì kêu meo meo, thích leo trèo, thích ăn cá và giỏi bắt chuột?", "Con mèo", "Con chó", "Con thỏ", "Con lợn", "A"),
    ("Con gì trông nhà cho gia chủ, khi thấy người lạ thì sủa 'gâu gâu'?", "Con chó", "Con mèo", "Con cừu", "Con dê", "A"),
    ("Con gì bơi lội dưới nước, có mỏ bẹt, chân màng và kêu 'cạp cạp'?", "Con vịt", "Con gà", "Con công", "Con ngỗng", "A"),
    ("Con gì ụt à ụt ịt, ăn no nằm ngủ béo tròn trong chuồng?", "Con lợn (heo)", "Con trâu", "Con bò", "Con ngựa", "A"),
    ("Con vật nào có hai sừng cong cong, kéo cày giúp người nông dân trên đồng ruộng?", "Con trâu", "Con ngựa", "Con hươu", "Con báo", "A"),
    ("Con vật nào thích gặm cà rốt, có đôi tai dài dựng đứng và đôi mắt tròn màu hồng đỏ?", "Con thỏ", "Con chuột", "Con mèo", "Con sóc", "A"),
    ("Con vật nào thích leo trèo trên cành cây, thích ăn chuối và hay bắt chước điệu bộ con người?", "Con khỉ", "Con gấu", "Con chó sói", "Con nhím", "A"),
    ("Loài vật nào được mệnh danh là 'chúa tể sơn lâm' với tiếng gầm vang dội núi rừng?", "Con hổ (cọp)", "Con voi", "Con nai", "Con lợn rừng", "A"),
    ("Con vật nào có thân hình to lớn, có chiếc vòi dài khéo léo và cặp ngà trắng muốt?", "Con voi", "Con tê giác", "Con hà mã", "Con trâu rừng", "A"),
    ("Loài động vật nào có chiếc cổ dài nhất thế giới, giúp nó ăn lá cây trên ngọn cao?", "Hươu cao cổ", "Ngựa vằn", "Lạc đà", "Bò tót", "A"),
    ("Loài vật nào có bộ lông sọc vằn đen trắng xen kẽ rất dễ nhận biết trên thảo nguyên?", "Ngựa vằn", "Hổ vằn", "Chó đốm", "Báo gấm", "A"),
    ("Con côn trùng nào chuyên cần bay đi hút mật hoa để làm nên những giọt mật ngọt ngào?", "Con ong", "Con ruồi", "Con muỗi", "Con bọ xít", "A"),
    ("Con gì nhả tơ kéo kén để dệt nên những tấm lụa mềm mại quý giá?", "Con tằm", "Con nhện", "Con rết", "Con sâu róm", "A"),
    ("Cây gì nở hoa đỏ rực rỡ báo hiệu mùa xuân về trên khắp phố phường miền Bắc nước ta?", "Hoa đào", "Hoa mai", "Hoa cúc", "Hoa lan", "A"),
    ("Cây gì nở hoa vàng rực rỡ là biểu tượng ngày Tết truyền thống của người dân miền Nam?", "Hoa mai vàng", "Hoa đào", "Hoa hồng", "Hoa ly", "A"),
    ("Loài hoa nào thanh khiết 'gần bùn mà chẳng hôi tanh mùi bùn' và là Quốc hoa của Việt Nam?", "Hoa sen", "Hoa súng", "Hoa huệ", "Hoa nhài", "A"),
    ("Loài hoa nào nở đỏ rực góc sân trường báo hiệu mùa hè và mùa chia tay tuổi học trò?", "Hoa phượng vĩ", "Hoa bằng lăng", "Hoa điệp vàng", "Hoa phong ba", "A"),
    ("Loài hoa nào luôn quay bông về hướng Mặt Trời mọc?", "Hoa hướng dương", "Hoa bách hợp", "Hoa cẩm chướng", "Hoa đồng tiền", "A"),
    ("Đâu là món ăn truyền thống không thể thiếu trong mâm cỗ Tết cổ truyền miền Bắc?", "Bánh chưng", "Bánh pizza", "Bánh hamburger", "Bánh mì kẹp", "A"),
    ("Món canh cua đồng truyền thống của người miền Bắc thường được nấu chung với rau gì?", "Rau đay, mồng tơi và mướp hương", "Rau bắp cải", "Rau cần tây", "Rau cải cúc", "A"),
    ("Gia vị nào có vị mặn đặc trưng và được người dân làm muối thu hoạch từ nước biển?", "Muối ăn", "Hạt tiêu", "Đường kính", "Bột quế", "A"),
    ("Gia vị nào chiết xuất từ cây mía, có vị ngọt thanh thường dùng nấu chè, làm bánh?", "Đường", "Muối", "Tiêu", "Ớt", "A"),
    ("Quả gì có vị chua thanh, vỏ xanh hoặc vàng, thường vắt lấy nước pha nước giải khát?", "Quả chanh", "Quả ớt", "Quả xoài ngọt", "Quả chuối", "A"),
    ("Vật dụng nào thường dùng để quét sạch bụi rác trên sàn nhà?", "Cây chổi", "Cây búa", "Chiếc kìm", "Cái xẻng", "A"),
    ("Thiết bị gia dụng nào dùng để giặt sạch và vắt khô quần áo tự động?", "Máy giặt", "Tủ lạnh", "Lò vi sóng", "Máy hút bụi", "A"),
    ("Thiết bị nào trong gia đình dùng để bảo quản thực phẩm tươi sống ở nhiệt độ thấp?", "Tủ lạnh", "Bếp ga", "Nồi cơm điện", "Máy sấy tóc", "A"),
    ("Dụng cụ nào dùng để cắt giấy, cắt vải trong sinh hoạt hàng ngày?", "Cây kéo", "Chiếc đũa", "Cây thìa", "Cái muôi", "A"),
    ("Dụng cụ nào dùng để xới cơm, múc canh trong bữa ăn gia đình?", "Cái muôi (vá)", "Chiếc búa", "Cây cờ lê", "Cái cưa", "A")
]

for item in riddles_l1:
    q(1, "Đời sống & Thường thức", item[0], item[1], item[2], item[3], item[4], item[5])

# --- FOLK TALES & PROVERBS MEANING (Level 2) ---
folktales_l2 = [
    ("Trong truyện 'Tấm Cám', nhân vật Tấm bị dì ghẻ và Cám bắt nhặt riêng hai thứ hạt gì bị trộn lẫn?", "Thóc và gạo", "Đậu đen và đậu xanh", "Hạt tiêu và hạt muối", "Hạt mè và hạt kê", "A"),
    ("Trong truyện 'Tấm Cám', ông Bụt đã sai con vật gì xuống nhặt giúp Tấm đống thóc gạo bị trộn lẫn?", "Đàn chim sẻ", "Đàn kiến lửa", "Đàn bồ câu", "Đàn ong vàng", "A"),
    ("Trong truyện 'Thạch Sanh', Thạch Sanh sống nghèo khó dưới gốc cây gì trước khi lập nên chiến công?", "Gốc cây đa", "Gốc cây bàng", "Gốc cây mít", "Gốc cây tre", "A"),
    ("Trong truyện 'Thạch Sanh', niêu cơm thần kỳ của Thạch Sanh có đặc tính phi thường gì?", "Ăn mãi không bao giờ hết", "Tự biết nấu chín", "Tự bay lên trời", "Biến ra vàng bạc", "A"),
    ("Trong 'Sự tích cây khế', con chim thần kỳ đã nói câu gì khi ăn khế của người em tốt bụng?", "'Ăn một quả trả một cục vàng, may túi ba gang mang đi mà đựng'", "'Ăn một quả trả một đồng tiền'", "'Ăn khế ngọt ngào, bay cao vút'", "'Ăn một miếng trả một chum bạc'", "A"),
    ("Trong 'Sự tích quả dưa hấu', Mai An Tiêm đã khắc chữ gì lên vỏ quả dưa thả trôi trên biển?", "Tên của mình để tìm người mua", "Lời nguyền bí ẩn", "Bản đồ kho báu", "Bài thơ tình", "A"),
    ("Trong truyền thuyết 'Sơn Tinh, Thủy Tinh', Sơn Tinh là chúa tể cai quản vùng nào?", "Vùng núi non Ba Vì", "Vùng sông nước biển sâu", "Vùng đồng bằng màu mỡ", "Vùng đầm lầy hoang vu", "A"),
    ("Trong truyền thuyết 'Sơn Tinh, Thủy Tinh', Thủy Tinh hàng năm dâng nước đánh Sơn Tinh gây nên hiện tượng thiên tai gì?", "Mưa bão, lũ lụt", "Hạn hán khô cằn", "Động đất sóng thần", "Bão tuyết giá lạnh", "A"),
    ("Trong truyện 'Sọ Dừa', người mẹ uống nước từ vật gì trong rừng rồi mang thai sinh ra chàng Sọ Dừa?", "Chiếc sọ dừa đựng nước mưa", "Vỏ ốc biển", "Búp măng tre", "Gáo nước giếng", "A"),
    ("Thành ngữ 'Ếch ngồi đáy giếng' thường dùng để phê phán những người có tính cách như thế nào?", "Hiểu biết nông cạn nhưng lại huênh hoang tự đắc", "Hay nói dối người khác", "Lười biếng không chịu làm việc", "Keo kiệt bủn xỉn", "A"),
    ("Câu tục ngữ 'Lá lành đùm lá rách' khuyên răn con người điều gì trong cuộc sống?", "Biết yêu thương, đùm bọc và giúp đỡ người khó khăn", "Phải tiết kiệm của cải", "Không được tiêu hoang", "Cần chăm chỉ làm việc", "A"),
    ("Câu tục ngữ 'Uống nước nhớ nguồn' nhắc nhở chúng ta bài học đạo đức sâu sắc nào?", "Lòng biết ơn tổ tiên, cội nguồn và những người giúp đỡ mình", "Cần bảo vệ nguồn nước sạch", "Không được lãng phí nước sinh hoạt", "Chăm chỉ rèn luyện sức khỏe", "A"),
    ("Thành ngữ 'Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao' ca ngợi điều gì?", "Sức mạnh to lớn của tinh thần đoàn kết", "Vẻ đẹp của thiên nhiên rừng núi", "Lòng dũng cảm kiên cường", "Tính cần cù nhẫn nại", "A"),
    ("Thành ngữ 'Cháy nhà ra mặt chuột' hàm ý chỉ điều gì xảy ra khi gặp biến cố?", "Khi hoạn nạn sự thật xấu xa mới bộc lộ rõ", "Chuột sợ lửa chạy ra ngoài", "Nhà cháy làm mất của cải", "Cần cẩn thận với lửa", "A"),
    ("Thành ngữ 'Mèo khen mèo dài đuôi' phê phán hành vi nào trong giao tiếp xã hội?", "Tự khoe khoang, tự tâng bốc bản thân một cách lố bịch", "Nói xấu sau lưng bạn bè", "Bắt chước người khác", "Ăn nói vụng về thô lỗ", "A"),
    ("Thành ngữ 'Được voi đòi Tiên' phê phán thói xấu nào của con người?", "Lòng tham lam vô đáy, được điều tốt lại đòi hỏi hơn nữa", "Tính khoe khoang của cải", "Thói lười nhác dựa dẫm", "Tính ghen tị đố kỵ", "A")
]

for item in folktales_l2:
    q(2, "Văn học", item[0], item[1], item[2], item[3], item[4], item[5])

# --- 63 PROVINCES DATA (Level 3) ---
provinces_data = [
    ("Hà Nội", "Hà Nội", "Đồng bằng sông Hồng", "Hồ Gươm (Hồ Hoàn Kiếm)", "Phở Hà Nội và Cốm Làng Vòng", "29, 30"),
    ("Hải Phòng", "Hải Phòng", "Đồng bằng sông Hồng", "Quần đảo Cát Bà", "Bánh đa cua", "15, 16"),
    ("Quảng Ninh", "TP Hạ Long", "Đông Bắc Bộ", "Vịnh Hạ Long", "Chả mực Hạ Long", "14"),
    ("Ninh Bình", "TP Ninh Bình", "Đồng bằng sông Hồng", "Quần thể danh thắng Tràng An", "Cơm cháy và thịt dê núi", "35"),
    ("Hà Nam", "TP Phủ Lý", "Đồng bằng sông Hồng", "Chùa Tam Chúc", "Cá kho làng Vũ Đại", "90"),
    ("Nam Định", "TP Nam Định", "Đồng bằng sông Hồng", "Đền Trần", "Phở bò Nam Định", "18"),
    ("Thái Bình", "TP Thái Bình", "Đồng bằng sông Hồng", "Chùa Keo", "Bánh cáy làng Nguyễn", "17"),
    ("Hải Dương", "TP Hải Dương", "Đồng bằng sông Hồng", "Khu di tích Côn Sơn - Kiếp Bạc", "Bánh đậu xanh", "34"),
    ("Hưng Yên", "TP Hưng Yên", "Đồng bằng sông Hồng", "Phố Hiến cổ kính", "Nhãn lồng Hưng Yên", "89"),
    ("Bắc Ninh", "TP Bắc Ninh", "Đồng bằng sông Hồng", "Chùa Dâu và Làng gốm Phù Lãng", "Bánh phu thê (bánh xu xê)", "99"),
    ("Vĩnh Phúc", "TP Vĩnh Yên", "Đồng bằng sông Hồng", "Khu du lịch Tam Đảo", "Bò tái kiến đốt Tam Đảo", "88"),
    ("Phú Thọ", "TP Việt Trì", "Đông Bắc Bộ", "Khu di tích lịch sử Đền Hùng", "Thịt chua Thanh Sơn", "19"),
    ("Bắc Giang", "TP Bắc Giang", "Đông Bắc Bộ", "Chùa Vĩnh Nghiêm", "Vải thiều Lục Ngạn", "98"),
    ("Lạng Sơn", "TP Lạng Sơn", "Đông Bắc Bộ", "Ải Chi Lăng và Động Tam Thanh", "Vịt quay Lạng Sơn", "12"),
    ("Cao Bằng", "TP Cao Bằng", "Đông Bắc Bộ", "Thác Bản Giốc hùng vĩ", "Hạt dẻ Trùng Khánh", "11"),
    ("Bắc Kạn", "TP Bắc Kạn", "Đông Bắc Bộ", "Hồ Ba Bể", "Miến dong Na Rì", "97"),
    ("Thái Nguyên", "TP Thái Nguyên", "Đông Bắc Bộ", "Hồ Núi Cốc", "Chè Tân Cương trứ danh", "20"),
    ("Tuyên Quang", "TP Tuyên Quang", "Đông Bắc Bộ", "Khu di tích lịch sử Tân Trào", "Bánh nếp nhân trứng kiến", "22"),
    ("Hà Giang", "TP Hà Giang", "Đông Bắc Bộ", "Cao nguyên đá Đồng Văn và đèo Mã Pí Lèng", "Thắng cố và cháo ấu tẩu", "23"),
    ("Lào Cai", "TP Lào Cai", "Tây Bắc Bộ", "Đỉnh Fansipan và thị xã Sa Pa", "Thịt lợn cắp nách Sa Pa", "24"),
    ("Yên Bái", "TP Yên Bái", "Tây Bắc Bộ", "Ruộng bậc thang Mù Cang Chải", "Nếp nương Tú Lệ", "21"),
    ("Điện Biên", "TP Điện Biên Phủ", "Tây Bắc Bộ", "Quần thể di tích chiến trường Điện Biên Phủ", "Thịt trâu gác bếp", "27"),
    ("Lai Châu", "TP Lai Châu", "Tây Bắc Bộ", "Đèo Ô Quy Hồ hùng vĩ", "Pa pỉnh tộp (cá nướng gập)", "25"),
    ("Sơn La", "TP Sơn La", "Tây Bắc Bộ", "Cao nguyên Mộc Châu", "Nậm pịa và mận hậu Mộc Châu", "26"),
    ("Hòa Bình", "TP Hòa Bình", "Tây Bắc Bộ", "Thung lũng Mai Châu và Thủy điện Hòa Bình", "Cơm lam thịt nướng Mai Châu", "28"),
    ("Thanh Hóa", "TP Thanh Hóa", "Bắc Trung Bộ", "Thành nhà Hồ và bãi biển Sầm Sơn", "Nem chua Thanh Hóa", "36"),
    ("Nghệ An", "TP Vinh", "Bắc Trung Bộ", "Khu di tích Kim Liên - quê Bác Hồ", "Cháo lươn và nhút Thanh Chương", "37"),
    ("Hà Tĩnh", "TP Hà Tĩnh", "Bắc Trung Bộ", "Khu di tích Ngã ba Đồng Lộc", "Kẹo cu đơ Hà Tĩnh", "38"),
    ("Quảng Bình", "TP Đồng Hới", "Bắc Trung Bộ", "Vườn quốc gia Phong Nha - Kẻ Bàng và Hang Sơn Đoòng", "Bánh bột lọc Quảng Bình", "73"),
    ("Quảng Trị", "TP Đông Hà", "Bắc Trung Bộ", "Thành cổ Quảng Trị và Cầu Hiền Lương", "Thịt trâu lá trơng", "74"),
    ("Thừa Thiên Huế", "TP Huế", "Bắc Trung Bộ", "Quần thể Di tích Cố đô Huế và Chùa Thiên Mụ", "Bún bò Huế và mè xửng", "75"),
    ("Đà Nẵng", "Đà Nẵng", "Duyên hải Nam Trung Bộ", "Cầu Rồng và Ngũ Hành Sơn", "Mì Quảng và bánh tráng cuốn thịt heo", "43"),
    ("Quảng Nam", "TP Tam Kỳ", "Duyên hải Nam Trung Bộ", "Phố cổ Hội An và Thánh địa Mỹ Sơn", "Cao lầu Hội An và bê thui Cầu Mống", "92"),
    ("Quảng Ngãi", "TP Quảng Ngãi", "Duyên hải Nam Trung Bộ", "Đảo Lý Sơn - Vương quốc tỏi", "Kẹo gương và cá bống sông Trà", "76"),
    ("Bình Định", "TP Quy Nhơn", "Duyên hải Nam Trung Bộ", "Kỳ Co - Eo Gió và Bảo tàng Quang Trung", "Bánh ít lá gai và tré Bình Định", "77"),
    ("Phú Yên", "TP Tuy Hòa", "Duyên hải Nam Trung Bộ", "Gành Đá Đĩa kỳ vĩ", "Mắt cá ngừ đại dương", "78"),
    ("Khánh Hòa", "TP Nha Trang", "Duyên hải Nam Trung Bộ", "Vịnh Nha Trang và Tháp Bà Ponagar", "Yến sào Khánh Hòa và nem nướng Ninh Hòa", "79"),
    ("Ninh Thuận", "TP Phan Rang - Tháp Chàm", "Duyên hải Nam Trung Bộ", "Vườn quốc gia Núi Chúa và Tháp Po Klong Garai", "Nho Ninh Thuận và cừu nướng", "85"),
    ("Bình Thuận", "TP Phan Thiết", "Duyên hải Nam Trung Bộ", "Đồi cát bay Mũi Né và Hải đăng Kê Gà", "Nước mắm Phan Thiết và thanh long", "86"),
    ("Kon Tum", "TP Kon Tum", "Tây Nguyên", "Nhà thờ gỗ Kon Tum và Cầu treo Kon Klor", "Gỏi lá Kon Tum", "82"),
    ("Gia Lai", "TP Pleiku", "Tây Nguyên", "Biển Hồ T'nưng (Đôi mắt Pleiku)", "Phở hai tô (phở khô Gia Lai)", "81"),
    ("Đắk Lắk", "TP Buôn Ma Thuột", "Tây Nguyên", "Bảo tàng Thế giới Cà phê và Hồ Lắk", "Cà phê Buôn Ma Thuột và gà nướng Bản Đôn", "47"),
    ("Đắk Nông", "TP Gia Nghĩa", "Tây Nguyên", "Công viên địa chất Đắk Nông và Thác Dray Sáp", "Cà phê và bơ sáp Đắk Nông", "48"),
    ("Lâm Đồng", "TP Đà Lạt", "Tây Nguyên", "Thung lũng Tình Yêu và Hồ Xuân Hương", "Rau củ quả tươi và trà atisô Đà Lạt", "49"),
    ("Bình Phước", "TP Đồng Xoài", "Đông Nam Bộ", "Vườn quốc gia Bù Gia Mập", "Hạt điều rang muối Bình Phước", "93"),
    ("Tây Ninh", "TP Tây Ninh", "Đông Nam Bộ", "Núi Bà Đen (Nóc nhà Đông Nam Bộ)", "Bánh tráng phơi sương và muối tôm Tây Ninh", "70"),
    ("Bình Dương", "TP Thủ Dầu Một", "Đông Nam Bộ", "Khu du lịch Đại Nam Văn Hiến", "Măng cụt Lái Thiêu", "61"),
    ("Đồng Nai", "TP Biên Hòa", "Đông Nam Bộ", "Vườn quốc gia Cát Tiên", "Bưởi Tân Triều", "60"),
    ("Bà Rịa - Vũng Tàu", "TP Bà Rịa", "Đông Nam Bộ", "Ngọn hải đăng Vũng Tàu và Bãi Sau", "Bánh khọt Vũng Tàu", "72"),
    ("TP Hồ Chí Minh", "TP Hồ Chí Minh", "Đông Nam Bộ", "Dinh Độc Lập và Chợ Bến Thành", "Cơm tấm sườn bì chả", "50, 51, 52, 53, 54, 55, 56, 57, 58, 59"),
    ("Long An", "TP Tân An", "Đồng bằng sông Cửu Long", "Làng nổi Tân Lập", "Gạo Nàng Thơm Chợ Đào", "62"),
    ("Tiền Giang", "TP Mỹ Tho", "Đồng bằng sông Cửu Long", "Cù lao Thới Sơn và Chợ nổi Cái Bè", "Hủ tiếu Mỹ Tho", "63"),
    ("Bến Tre", "TP Bến Tre", "Đồng bằng sông Cửu Long", "Những vườn dừa xanh ngút ngàn", "Kẹo dừa Bến Tre", "71"),
    ("Trà Vinh", "TP Trà Vinh", "Đồng bằng sông Cửu Long", "Chùa Hang và Ao Bà Om", "Bánh tét Trà Cuôn", "84"),
    ("Vĩnh Long", "TP Vĩnh Long", "Đồng bằng sông Cửu Long", "Cù lao An Bình", "Khoai lang Bình Tân và bưởi Năm Roi", "64"),
    ("Đồng Tháp", "TP Cao Lãnh", "Đồng bằng sông Cửu Long", "Vườn quốc gia Tràm Chim và Làng hoa Sa Đéc", "Hủ tiếu Sa Đéc và nem Lai Vung", "66"),
    ("An Giang", "TP Long Xuyên", "Đồng bằng sông Cửu Long", "Miếu Bà Chúa Xứ Núi Sam và Rừng tràm Trà Sư", "Mắm Châu Đốc và bún cá Long Xuyên", "67"),
    ("Kiên Giang", "TP Rạch Giá", "Đồng bằng sông Cửu Long", "Đảo ngọc Phú Quốc và Quần đảo Nam Du", "Nước mắm Phú Quốc và gỏi cá trích", "68"),
    ("Cần Thơ", "Cần Thơ", "Đồng bằng sông Cửu Long", "Chợ nổi Cái Răng và Bến Ninh Kiều", "Bánh cống và lẩu mắm Cần Thơ", "65"),
    ("Hậu Giang", "TP Vị Thanh", "Đồng bằng sông Cửu Long", "Khu bảo tồn thiên nhiên Lung Ngọc Hoàng", "Khóm Cầu Đúc và chả cá thát lát", "95"),
    ("Sóc Trăng", "TP Sóc Trăng", "Đồng bằng sông Cửu Long", "Chùa Dơi và Chùa Chén Kiểu", "Bánh pía Sóc Trăng", "83"),
    ("Bạc Liêu", "TP Bạc Liêu", "Đồng bằng sông Cửu Long", "Nhà Công tử Bạc Liêu và Cánh đồng điện gió", "Bánh tằm Ngan Dừa", "94"),
    ("Cà Mau", "TP Cà Mau", "Đồng bằng sông Cửu Long", "Mũi Cà Mau và Rừng ngập mặn U Minh Hạ", "Cua Năm Căn và tôm khô Cà Mau", "69")
]

for p in provinces_data:
    name, center, region, landmark, food, plates = p
    # Q1: Tỉnh lỵ (Level 3)
    q(3, "Địa lý", f"Trung tâm hành chính (tỉnh lỵ) của tỉnh {name} là đô thị nào sau đây?", center, "TP Đà Nẵng", "TP Huế", "TP Cần Thơ", "A")
    # Q2: Thắng cảnh (Level 3)
    q(3, "Địa lý", f"Thắng cảnh nổi tiếng '{landmark}' tọa lạc tại địa phương nào của nước ta?", name, "Hà Nội", "TP Hồ Chí Minh", "Lâm Đồng", "A")
    # Q3: Đặc sản (Level 2)
    q(2, "Ẩm thực & Văn hóa", f"Đặc sản ẩm thực nổi tiếng '{food}' gắn liền với niềm tự hào của vùng đất nào?", name, "Bắc Giang", "Tây Ninh", "Cà Mau", "A")
    # Q4: Vùng miền (Level 3)
    q(3, "Địa lý", f"Tỉnh/thành phố {name} thuộc vùng kinh tế - địa lý nào của Việt Nam?", region, "Vùng Tây Bắc", "Vùng Tây Nguyên", "Vùng Đông Bắc", "A")

# --- ELEMENTARY SCIENCE, MATH & HUMAN BODY (Level 4 & 5) ---
elementary_science = [
    (4, "Khoa học & Tự nhiên", "Hiện tượng cầu vồng sau cơn mưa thường có bao nhiêu màu sắc cơ bản?", "7 màu sắc", "5 màu sắc", "6 màu sắc", "8 màu sắc", "A"),
    (4, "Khoa học & Tự nhiên", "Ở điều kiện áp suất khí quyển tiêu chuẩn, nước nguyên chất đóng băng ở nhiệt độ bao nhiêu?", "0 độ C", "-5 độ C", "4 độ C", "10 độ C", "A"),
    (4, "Khoa học & Tự nhiên", "Ở điều kiện tiêu chuẩn, nước nguyên chất sôi và bốc hơi ở nhiệt độ bao nhiêu?", "100 độ C", "80 độ C", "90 độ C", "120 độ C", "A"),
    (4, "Khoa học & Tự nhiên", "Khí nào cần thiết nhất cho quá trình hô hấp duy trì sự sống của con người và muông thú?", "Khí Oxy", "Khí Nitơ", "Khí Cacbonic", "Khí Hidro", "A"),
    (4, "Khoa học & Tự nhiên", "Trong quá trình quang hợp dưới ánh sáng mặt trời, lá cây hấp thụ khí CO2 và nhả ra khí gì?", "Khí Oxy", "Khí Nitơ", "Khí Metan", "Khí Clo", "A"),
    (4, "Khoa học & Tự nhiên", "Loài động vật nào sau đây là động vật có vú nhưng lại có cánh và biết bay lượn?", "Con dơi", "Con đại bàng", "Con bồ câu", "Con cú mèo", "A"),
    (4, "Khoa học & Tự nhiên", "Cá voi xanh sinh sống ở đại dương sinh sản theo hình thức nào?", "Đẻ con và nuôi con bằng sữa mẹ", "Đẻ trứng dưới cát", "Đẻ trứng nổi trên mặt nước", "Sinh sản vô tính", "A"),
    (4, "Khoa học & Tự nhiên", "Cơ quan nội tạng nào trong cơ thể con người đảm nhận vai trò co bóp bơm máu đi khắp cơ thể?", "Trái tim", "Hai lá phổi", "Dạ dày", "Hai quả thận", "A"),
    (4, "Khoa học & Tự nhiên", "Cơ quan nào trong cơ thể con người có chức năng lọc chất thải từ máu để tạo thành nước tiểu?", "Hai quả thận", "Lá gan", "Dạ dày", "Lá lách", "A"),
    (4, "Khoa học & Tự nhiên", "Cơ quan nào đóng vai trò chính trong việc trao đổi khí oxy và khí cacbonic khi ta hít thở?", "Hai lá phổi", "Trái tim", "Dạ dày", "Lá gan", "A"),
    (4, "Khoa học & Tự nhiên", "Tế bào máu nào đóng vai trò vận chuyển khí oxy từ phổi đi nuôi dưỡng các mô trong cơ thể?", "Hồng cầu", "Bạch cầu", "Tiểu cầu", "Huyết tương", "A"),
    (4, "Khoa học & Tự nhiên", "Tế bào máu nào đóng vai trò chính trong việc bảo vệ cơ thể chống lại vi khuẩn và mầm bệnh?", "Bạch cầu", "Hồng cầu", "Tiểu cầu", "Mỡ máu", "A"),
    (4, "Khoa học & Tự nhiên", "Thành phần tế bào máu nào tham gia trực tiếp vào quá trình đông máu khi cơ thể bị trầy xước?", "Tiểu cầu", "Hồng cầu", "Bạch cầu", "Albumin", "A"),
    (4, "Khoa học & Tự nhiên", "Trong hình học phẳng, tổng số đo ba góc trong của một hình tam giác luôn bằng bao nhiêu độ?", "180 độ", "90 độ", "360 độ", "270 độ", "A"),
    (4, "Khoa học & Tự nhiên", "Hình vuông có bốn góc trong bằng nhau và đều bằng bao nhiêu độ?", "90 độ (góc vuông)", "45 độ", "60 độ", "120 độ", "A"),
    (4, "Khoa học & Tự nhiên", "Số tự nhiên nhỏ nhất là số nào?", "Số 0", "Số 1", "Số 2", "Số 10", "A"),
    (4, "Khoa học & Tự nhiên", "Số nguyên tố chẵn duy nhất trong toán học là số nào?", "Số 2", "Số 0", "Số 4", "Số 6", "A"),
    (4, "Khoa học & Tự nhiên", "Quy đổi đơn vị: 1 tấn bằng bao nhiêu kilôgam (kg)?", "1.000 kg", "100 kg", "10.000 kg", "500 kg", "A"),
    (4, "Khoa học & Tự nhiên", "Quy đổi đơn vị: 1 tạ bằng bao nhiêu kilôgam (kg)?", "100 kg", "1.000 kg", "10 kg", "50 kg", "A"),
    (4, "Khoa học & Tự nhiên", "Quy đổi đơn vị: 1 kilômét (km) bằng bao nhiêu mét (m)?", "1.000 m", "100 m", "10.000 m", "500 m", "A"),
    (5, "Khoa học & Tự nhiên", "Trong hệ Mặt Trời, hành tinh nào nằm gần Mặt Trời nhất?", "Sao Thủy (Mercury)", "Sao Kim (Venus)", "Trái Đất", "Sao Hỏa (Mars)", "A"),
    (5, "Khoa học & Tự nhiên", "Hành tinh nào trong hệ Mặt Trời có kích thước lớn nhất?", "Sao Mộc (Jupiter)", "Sao Thổ (Saturn)", "Sao Hải Vương", "Sao Kim", "A"),
    (5, "Khoa học & Tự nhiên", "Hành tinh nào thường được mệnh danh là 'Hành tinh Đỏ' vì bề mặt phủ đầy oxit sắt?", "Sao Hỏa (Mars)", "Sao Mộc", "Sao Thủy", "Sao Kim", "A"),
    (5, "Khoa học & Tự nhiên", "Vận tốc truyền của ánh sáng trong môi trường chân không xấp xỉ bằng bao nhiêu?", "300.000 km/giây", "30.000 km/giây", "3.000 km/giây", "1.000 km/giây", "A"),
    (5, "Khoa học & Tự nhiên", "Ký hiệu hóa học của nguyên tố Oxi trong bảng tuần hoàn là gì?", "O", "Ox", "O2", "Oi", "A"),
    (5, "Khoa học & Tự nhiên", "Ký hiệu hóa học của nguyên tố Hidro trong bảng tuần hoàn là gì?", "H", "Hi", "Hd", "Ho", "A"),
    (5, "Khoa học & Tự nhiên", "Công thức phân tử hóa học của Nước nguyên chất là gì?", "H2O", "CO2", "NaCl", "O2", "A"),
    (5, "Khoa học & Tự nhiên", "Muối ăn hàng ngày dùng trong nấu ăn có công thức hóa học là gì?", "NaCl", "KCl", "CaCO3", "HCl", "A"),
    (5, "Khoa học & Tự nhiên", "Kim loại nào có tính dẫn điện và dẫn nhiệt tốt nhất trong tất cả các kim loại?", "Bạc (Ag)", "Đồng (Cu)", "Vàng (Au)", "Nhôm (Al)", "A"),
    (5, "Khoa học & Tự nhiên", "Kim loại duy nhất ở thể lỏng ở nhiệt độ phòng bình thường là kim loại nào?", "Thủy ngân (Hg)", "Chì (Pb)", "Kẽm (Zn)", "Thiếc (Sn)", "A")
]

for item in elementary_science:
    q(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7])

# --- HISTORICAL & LITERATURE VN HIGHLIGHTS (Level 4 & 5) ---
hist_lit_vn = [
    (4, "Lịch sử", "Hai Bà Trưng cưỡi voi xuất trận phất cờ khởi nghĩa đánh đuổi giặc ngoại xâm vào năm nào?", "Năm 40 sau Công nguyên", "Năm 938", "Năm 1010", "Năm 1288", "A"),
    (4, "Lịch sử", "Vị anh hùng dân tộc nào đã lãnh đạo nhân dân đánh tan quân Nam Hán trên sông Bạch Đằng năm 938?", "Ngô Quyền", "Trần Hưng Đạo", "Lý Thường Kiệt", "Lê Lợi", "A"),
    (4, "Lịch sử", "Vua Lý Thái Tổ đã ban Chiếu dời đô chuyển kinh đô từ Hoa Lư về Thăng Long vào năm nào?", "Năm 1010", "Năm 938", "Năm 1288", "Năm 1428", "A"),
    (4, "Lịch sử", "Vị tướng tài ba nào đã lãnh đạo quân dân nhà Trần 3 lần đại thắng giặc Nguyên Mông xâm lược?", "Hưng Đạo Đại Vương Trần Quốc Tuấn", "Lý Thường Kiệt", "Quang Trung", "Lê Hoàn", "A"),
    (4, "Lịch sử", "Người anh hùng tuổi trẻ Trần Quốc Toản vì căm giận giặc đã bóp nát vật gì trong tay tại bến Bình Than?", "Quả cam", "Quả bưởi", "Quả chanh", "Quả quýt", "A"),
    (4, "Lịch sử", "Hoàng đế Quang Trung (Nguyễn Huệ) đại phá 29 vạn quân Thanh vào mùa xuân năm nào?", "Mùa xuân năm Kỷ Dậu 1789", "Mùa xuân năm 1945", "Mùa xuân năm 1954", "Mùa xuân năm 1975", "A"),
    (4, "Lịch sử", "Bác Hồ kính yêu đọc Tuyên ngôn Độc lập khai sinh nước VNDCCH tại Quảng trường Ba Đình vào ngày nào?", "Ngày 2 tháng 9 năm 1945", "Ngày 19 tháng 8 năm 1945", "Ngày 30 tháng 4 năm 1975", "Ngày 7 tháng 5 năm 1954", "A"),
    (4, "Lịch sử", "Chiến dịch Điện Biên Phủ 'lừng lẫy năm châu, chấn động địa cầu' toàn thắng vào ngày tháng năm nào?", "Ngày 7 tháng 5 năm 1954", "Ngày 2 tháng 9 năm 1945", "Ngày 30 tháng 4 năm 1975", "Ngày 19 tháng 8 năm 1945", "A"),
    (4, "Lịch sử", "Chiến dịch Hồ Chí Minh lịch sử giải phóng hoàn toàn miền Nam, thống nhất non sông diễn ra vào ngày nào?", "Ngày 30 tháng 4 năm 1975", "Ngày 2 tháng 9 năm 1945", "Ngày 7 tháng 5 năm 1954", "Ngày 19 tháng 8 năm 1945", "A"),
    (4, "Văn học", "Tác phẩm thiếu nhi kinh điển 'Dế Mèn phiêu lưu ký' là sáng tác nổi tiếng của nhà văn nào?", "Nhà văn Tô Hoài", "Nhà văn Nam Cao", "Nhà văn Kim Lân", "Nhà văn Vũ Trọng Phụng", "A"),
    (4, "Văn học", "Ai là tác giả của truyện ngắn hiện thực 'Lão Hạc' với chú chó Vàng gắn bó sâu sắc?", "Nhà văn Nam Cao", "Nhà văn Ngô Tất Tố", "Nhà văn Thạch Lam", "Nhà văn Nguyên Hồng", "A"),
    (4, "Văn học", "Tác phẩm 'Tắt đèn' với hình tượng nhân vật người phụ nữ nông dân kiên cường Chị Dậu do ai sáng tác?", "Nhà văn Ngô Tất Tố", "Nhà văn Nam Cao", "Nhà văn Kim Lân", "Nhà văn Vũ Trọng Phụng", "A"),
    (4, "Văn học", "Truyện ngắn 'Vợ nhặt' phản ánh bức tranh nạn đói năm 1945 là tác phẩm xuất sắc của nhà văn nào?", "Nhà văn Kim Lân", "Nhà văn Nam Cao", "Nhà văn Tô Hoài", "Nhà văn Thạch Lam", "A"),
    (4, "Văn học", "Kiệt tác 'Truyện Kiều' (Đoạn trường tân thanh) bất hủ của nền văn học dân tộc là sáng tác của đại thi hào nào?", "Đại thi hào Nguyễn Du", "Bà Huyện Thanh Quan", "Hồ Xuân Hương", "Nguyễn Khuyến", "A"),
    (4, "Văn học", "Bài thơ 'Đồng chí' với hình tượng xúc động 'Đầu súng trăng treo' là sáng tác của nhà thơ nào?", "Nhà thơ Chính Hữu", "Nhà thơ Phạm Tiến Duật", "Nhà thơ Huy Cận", "Nhà thơ Quang Dũng", "A"),
    (4, "Văn học", "Tác phẩm 'Bài thơ về tiểu đội xe không kính' trên tuyến đường Trường Sơn là của nhà thơ nào?", "Nhà thơ Phạm Tiến Duật", "Nhà thơ Chính Hữu", "Nhà thơ Tố Hữu", "Nhà thơ Bằng Việt", "A"),
    (5, "Lịch sử", "Lý Thường Kiệt đọc bài thơ thần 'Nam quốc sơn hà' trên phòng tuyến con sông nào?", "Sông Như Nguyệt (Sông Cầu)", "Sông Bạch Đằng", "Sông Hồng", "Sông Gianh", "A"),
    (5, "Lịch sử", "Cuộc khởi nghĩa Lam Sơn ròng rã 10 năm giải phóng đất nước khỏi ách đô hộ nhà Minh do ai lãnh đạo?", "Bình Định Vương Lê Lợi", "Trần Hưng Đạo", "Nguyễn Huệ", "Đinh Bộ Lĩnh", "A"),
    (5, "Lịch sử", "Đại cáo bình Ngô - áng 'thiên cổ hùng văn' tổng kết thắng lợi cuộc kháng chiến chống Minh do ai soạn thảo?", "Nguyễn Trãi", "Lê Lợi", "Chu Văn An", "Trần Nguyên Đán", "A"),
    (5, "Văn học", "Tác phẩm 'Lặng lẽ Sa Pa' khắc họa người thanh niên làm công tác khí tượng trên đỉnh Yên Sơn của tác giả nào?", "Nguyễn Thành Long", "Lê Minh Khuê", "Kim Lân", "Bùi Hiển", "A")
]

for item in hist_lit_vn:
    q(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7])

# --- WORLD CAPITALS & GEOGRAPHY (Level 5) ---
world_geo_l5 = [
    ("Thủ đô chính thức của nước Cộng hòa Dân chủ Nhân dân Lào là thành phố nào?", "Viêng Chăn (Vientiane)", "Luang Prabang", "Pakse", "Savannakhet", "A"),
    ("Thủ đô chính thức của Vương quốc Campuchia là thành phố nào?", "Phnôm Pênh (Phnom Penh)", "Siem Reap", "Battambang", "Sihanoukville", "A"),
    ("Thủ đô chính thức của Vương quốc Thái Lan là thành phố nào?", "Băng Cốc (Bangkok)", "Chiang Mai", "Phuket", "Pattaya", "A"),
    ("Thủ đô chính thức của Malaysia là thành phố nào?", "Kuala Lumpur", "Putrajaya", "Penang", "Johor Bahru", "A"),
    ("Thủ đô chính thức của Indonesia là thành phố nào?", "Jakarta", "Surabaya", "Bandung", "Medan", "A"),
    ("Thủ đô chính thức của Philippines là thành phố nào?", "Manila", "Cebu", "Davao", "Quezon", "A"),
    ("Thủ đô chính thức của Nhật Bản - xứ sở hoa anh đào là thành phố nào?", "Tokyo", "Kyoto", "Osaka", "Yokohama", "A"),
    ("Thủ đô chính thức của Hàn Quốc là thành phố nào?", "Seoul", "Busan", "Incheon", "Daegu", "A"),
    ("Thủ đô chính thức của Cộng hòa Nhân dân Trung Hoa là thành phố nào?", "Bắc Kinh (Beijing)", "Thượng Hải", "Quảng Châu", "Thâm Quyến", "A"),
    ("Thủ đô chính thức của Hợp chủng quốc Hoa Kỳ (Mỹ) là thành phố nào?", "Washington, D.C.", "New York City", "Los Angeles", "Chicago", "A"),
    ("Thủ đô chính thức của Canada là thành phố nào?", "Ottawa", "Toronto", "Vancouver", "Montreal", "A"),
    ("Thủ đô chính thức của Liên hiệp Vương quốc Anh và Bắc Ireland là thành phố nào?", "Luân Đôn (London)", "Manchester", "Liverpool", "Edinburgh", "A"),
    ("Thủ đô chính thức của Cộng hòa Pháp - kinh đô ánh sáng là thành phố nào?", "Paris", "Marseille", "Lyon", "Nice", "A"),
    ("Thủ đô chính thức của Cộng hòa Liên bang Đức là thành phố nào?", "Berlin", "Munich", "Frankfurt", "Hamburg", "A"),
    ("Thủ đô chính thức của Cộng hòa Ý (Italia) là thành phố nào?", "Roma (Rome)", "Milan", "Venice", "Florence", "A"),
    ("Thủ đô chính thức của Liên bang Nga là thành phố nào?", "Mát-xcơ-va (Moscow)", "Saint Petersburg", "Novosibirsk", "Kazan", "A"),
    ("Thủ đô chính thức của nước Úc (Australia) là thành phố nào?", "Canberra", "Sydney", "Melbourne", "Brisbane", "A"),
    ("Thủ đô chính thức của Ai Cập - quê hương của Kim tự tháp Giza là thành phố nào?", "Cairo", "Alexandria", "Giza", "Luxor", "A"),
    ("Thủ đô chính thức of Ấn Độ - quốc gia đông dân hàng đầu thế giới là thành phố nào?", "New Delhi", "Mumbai", "Kolkata", "Bangalore", "A"),
    ("Thủ đô chính thức của Brazil (Bra-xin) ở Nam Mỹ là thành phố nào?", "Brasilia", "Rio de Janeiro", "Sao Paulo", "Salvador", "A"),
    ("Đại dương nào có diện tích lớn nhất và sâu nhất trên Trái Đất?", "Thái Bình Dương", "Đại Tây Dương", "Ấn Độ Dương", "Bắc Băng Dương", "A"),
    ("Châu lục nào có diện tích lớn nhất và dân số đông nhất trên thế giới?", "Châu Á", "Châu Phi", "Châu Mỹ", "Châu Âu", "A"),
    ("Dòng sông nào dài nhất thế giới chảy qua nhiều quốc gia ở châu Phi?", "Sông Nile (Nin)", "Sông Amazon", "Sông Trường Giang", "Sông Mississippi", "A"),
    ("Dãy núi Himalaya hùng vĩ với đỉnh Everest cao nhất thế giới (8.848m) nằm ở châu lục nào?", "Châu Á", "Châu Âu", "Châu Mỹ", "Châu Phi", "A")
]

for item in world_geo_l5:
    q(5, "Địa lý", item[0], item[1], item[2], item[3], item[4], item[5])

lines.append("]")

with open(out_file, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

print(f"Đã tạo thành công {len(lines)} dòng câu hỏi trong {out_file}")
