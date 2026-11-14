# scripts/native_bank_more.py
# Bổ sung các câu hỏi thuần Việt chuẩn mực cho Level 1 đến Level 5

MORE_VIETNAMESE_QUESTIONS = [
    # -------------------------------------------------------------
    # LEVEL 1: KHỞI ĐỘNG (Đời sống, con vật, nhận biết, thường nhật)
    # -------------------------------------------------------------
    (1, "Thiên nhiên", "Con gì có cánh, biết bơi dưới nước và hay kêu cạp cạp?", "Con vịt", "Con chó", "Con bò", "Con mèo", "A"),
    (1, "Thiên nhiên", "Lông của loài quạ đen thường có màu gì?", "Màu đen tuyền", "Màu trắng tinh", "Màu vàng chanh", "Màu hồng", "A"),
    (1, "Ẩm thực", "Nước lọc tinh khiết dùng để uống thường có màu gì?", "Không màu trong suốt", "Màu đỏ", "Màu đen", "Màu vàng đậm", "A"),
    (1, "Đời sống", "Vật dụng nào sau đây người ta thường dùng để chải tóc cho mượt mà?", "Cái lược", "Cái thìa", "Cái chổi", "Cái thìa", "A"),
    (1, "Đời sống", "Đồ dùng học tập nào dùng để viết hoặc vẽ nét chì lên trang vở?", "Bút chì", "Cục tẩy", "Thước kẻ", "Cặp sách", "A"),
    (1, "Đời sống", "Dụng cụ nào dùng để tẩy sạch những vết bút chì viết sai trên giấy?", "Cục tẩy (gôm)", "Bút mực", "Cái kéo", "Hộp bút", "A"),
    (1, "Đời sống", "Vật dụng dùng để đo độ dài đoạn thẳng và kẻ đường thẳng là gì?", "Cây thước kẻ", "Cục tẩy", "Bút chì", "Hộp màu", "A"),
    (1, "Đời sống", "Đồ vật thường dùng để đựng sách vở và đồ dùng khi đi học là gì?", "Cặp sách (ba lô)", "Cái nón", "Cái gối", "Cái bát", "A"),
    (1, "Ẩm thực", "Hạt gạo sau khi được nấu chín bằng nồi cơm điện trở thành món gì?", "Cơm", "Chè", "Bánh rán", "Kẹo", "A"),
    (1, "Ẩm thực", "Muối ăn hạt tinh khiết thường ngày có vị đặc trưng gì?", "Vị mặn", "Vị ngọt", "Vị cay", "Vị chua", "A"),
    (1, "Ẩm thực", "Đường mía tinh luyện thường dùng có vị đặc trưng gì?", "Vị ngọt", "Vị mặn", "Vị đắng", "Vị cay", "A"),
    (1, "Ẩm thực", "Quả chanh tươi khi vắt lấy nước cốt có vị gì rõ rệt nhất?", "Vị chua", "Vị ngọt", "Vị mặn", "Vị béo", "A"),
    (1, "Ẩm thực", "Trái ớt tươi cay nồng có vị gì đặc trưng?", "Vị cay", "Vị ngọt lịm", "Vị mặn chát", "Vị chua thanh", "A"),
    (1, "Ẩm thực", "Mướp đắng (khổ qua) khi ăn sống hoặc nấu canh có vị gì đặc trưng?", "Vị đắng", "Vị ngọt", "Vị cay", "Vị mặn", "A"),
    (1, "Khoa học", "Khi thời tiết mùa hè oi bức, nhiệt độ không khí thường như thế nào?", "Rất nóng bức", "Đóng băng lạnh buốt", "Rơi tuyết dày", "Âm độ C", "A"),
    (1, "Khoa học", "Vào mùa đông giá rét ở miền Bắc, người ta thường mặc trang phục gì để giữ ấm?", "Áo ấm (áo khoác)", "Áo ba lỗ", "Quần đùi", "Đồ bơi", "A"),
    (1, "Đời sống", "Phương tiện giao thông nào sau đây có hai bánh và chuyển động nhờ bàn đạp của người lái?", "Xe đạp", "Xe ô tô con", "Xe buýt", "Tàu hỏa", "A"),
    (1, "Đời sống", "Phương tiện giao thông chạy trên đường ray nối nhiều toa tàu dài gọi là gì?", "Tàu hỏa (xe lửa)", "Máy bay", "Tàu thủy", "Xe máy", "A"),
    (1, "Đời sống", "Phương tiện giao thông nào bay trên bầu trời để chở hành khách đi xa?", "Máy bay", "Tàu ngầm", "Xe đạp điện", "Thuyền nan", "A"),
    (1, "Đời sống", "Phương tiện giao thông nào di chuyển trên mặt nước sông, biển?", "Tàu thủy (thuyền)", "Xe máy", "Tàu hỏa", "Xe buýt", "A"),

    # -------------------------------------------------------------
    # LEVEL 2: DỄ (Cổ tích, tục ngữ, ẩm thực, gia đình, ngày lễ)
    # -------------------------------------------------------------
    (2, "Văn hóa xã hội", "Người sinh thành ra bố hoặc mẹ của mình được gọi là gì?", "Ông, bà", "Cô, chú", "Anh, chị", "Bác, dì", "A"),
    (2, "Văn hóa xã hội", "Người phụ nữ sinh ra chính bản thân mình được gọi là gì?", "Mẹ", "Chị", "Em gái", "Cô giáo", "A"),
    (2, "Văn hóa xã hội", "Người đàn ông sinh thành ra chính bản thân mình được gọi là gì?", "Bố (cha)", "Bác", "Chú", "Anh trai", "A"),
    (2, "Văn học", "Điền từ còn thiếu vào câu thành ngữ: 'Mẹ tròn con ...'?", "Vuông", "Dài", "Tròn", "Lớn", "A"),
    (2, "Văn học", "Điền từ còn thiếu vào câu thành ngữ: 'Thuận buồm xuôi ...'?", "Gió", "Nước", "Dòng", "Sóng", "A"),
    (2, "Văn học", "Điền từ còn thiếu vào câu thành ngữ: 'Chân cứng đá ...'?", "Mềm", "Mòn", "Tan", "Vỡ", "A"),
    (2, "Văn học", "Điền từ còn thiếu vào câu thành ngữ: 'Cầu được ước ...'?", "Thấy", "Gặp", "Vui", "Đạt", "A"),
    (2, "Văn học", "Điền từ còn thiếu vào câu thành ngữ: 'Khỏe như ...'?", "Voi (hoặc vâm)", "Mèo", "Chuột", "Kiến", "A"),
    (2, "Văn học", "Điền từ còn thiếu vào câu thành ngữ: 'Nhanh như ...'?", "Chớp (hoặc sóc)", "Rùa", "Ốc", "Sên", "A"),
    (2, "Văn học", "Điền từ còn thiếu vào câu thành ngữ: 'Chậm như ...'?", "Rùa", "Thỏ", "Báo", "Ngựa", "A"),
    (2, "Văn học", "Điền từ còn thiếu vào câu thành ngữ: 'Nhát như ...'?", "Thỏ đế", "Cọp", "Sư tử", "Đại bàng", "A"),
    (2, "Văn học", "Điền từ còn thiếu vào câu thành ngữ: 'Đen như ...'?", "Than", "Tuyết", "Mây", "Ngọc", "A"),
    (2, "Văn học", "Điền từ còn thiếu vào câu thành ngữ: 'Trắng như ...'?", "Tuyết", "Than", "Đất", "Mực", "A"),
    (2, "Văn học", "Trong truyện ngụ ngôn 'Rùa và Thỏ', con vật nào vì chủ quan ngủ quên nên đã thua cuộc chạy thi?", "Con thỏ", "Con rùa", "Con hươu", "Con sóc", "A"),
    (2, "Văn học", "Trong truyện 'Ba cô con gái', cô con gái út hiếu thảo vội vã về thăm mẹ khi đang làm việc gì?", "Đang se chỉ", "Đang dệt vải", "Đang quét nhà", "Đang nấu cơm", "A"),
    (2, "Ẩm thực", "Món bánh truyền thống hình tròn dẹt làm từ bột nếp, nhân đậu xanh và thịt mỡ bọc lá chuối ở miền Trung là gì?", "Bánh ít", "Bánh đậu xanh", "Bánh cáy", "Bánh pía", "A"),
    (2, "Ẩm thực", "Món bún bò trứ danh với nước dùng sả ruốc đậm đà là đặc sản nổi tiếng của cố đô nào?", "Huế", "Hà Nội", "Đà Lạt", "Vũng Tàu", "A"),
    (2, "Ẩm thực", "Đặc sản kẹo cu đơ nổi tiếng làm từ mật mía, gừng tươi và lạc giòn rụm là của tỉnh nào?", "Hà Tĩnh", "Nam Định", "Hải Dương", "Hưng Yên", "A"),
    (2, "Ẩm thực", "Bánh đậu xanh thơm ngon nức tiếng gần xa là đặc sản truyền thống của tỉnh nào?", "Hải Dương", "Hưng Yên", "Bắc Ninh", "Thái Bình", "A"),
    (2, "Ẩm thực", "Bánh cáy truyền thống thơm bùi nồng nàn là đặc sản nổi tiếng của vùng quê lúa nào?", "Thái Bình", "Nam Định", "Hà Nam", "Ninh Bình", "A"),

    # -------------------------------------------------------------
    # LEVEL 3: KHỞI SẮC (Địa danh, đơn vị, khoa học cơ bản, tục ngữ)
    # -------------------------------------------------------------
    (3, "Địa lý", "Thành phố ngàn hoa với khí hậu mát mẻ quanh năm trên cao nguyên Lâm Viên là thành phố nào?", "Đà Lạt", "Buôn Ma Thuột", "Pleiku", "Kon Tum", "A"),
    (3, "Địa lý", "Cố đô Hoa Lư - kinh đô đầu tiên của nhà nước phong kiến tập quyền Việt Nam thuộc tỉnh nào?", "Ninh Bình", "Nam Định", "Thanh Hóa", "Phú Thọ", "A"),
    (3, "Địa lý", "Cột cờ Lũng Cú - điểm cực Bắc địa đầu thiêng liêng của Tổ quốc tọa lạc tại tỉnh nào?", "Hà Giang", "Cao Bằng", "Lào Cai", "Lai Châu", "A"),
    (3, "Địa lý", "Mũi Cà Mau - điểm cực Nam trên đất liền của dải đất hình chữ S thuộc tỉnh nào?", "Cà Mau", "Bạc Liêu", "Kiên Giang", "Sóc Trăng", "A"),
    (3, "Địa lý", "Vịnh Cam Ranh - một trong những vịnh nước sâu kín gió đẹp nhất thế giới thuộc tỉnh nào?", "Khánh Hòa", "Bình Thuận", "Ninh Thuận", "Phú Yên", "A"),
    (3, "Địa lý", "Dòng sông nào chảy qua trung tâm thủ đô Hà Nội và có cầu Long Biên bắc qua?", "Sông Hồng", "Sông Cửu Long", "Sông Lam", "Sông Đồng Nai", "A"),
    (3, "Địa lý", "Sông Tiền và Sông Hậu là hai nhánh sông chính đổ ra biển của dòng sông lớn nào?", "Sông Mê Kông (Cửu Long)", "Sông Hồng", "Sông Đồng Nai", "Sông Mã", "A"),
    (3, "Khoa học", "Hành tinh nào gần Mặt Trời nhất trong Hệ Mặt Trời của chúng ta?", "Sao Thủy (Mercury)", "Sao Kim", "Trái Đất", "Sao Hỏa", "A"),
    (3, "Khoa học", "Hành tinh nào trong Hệ Mặt Trời được gọi là Hành tinh Đỏ vì bề mặt chứa nhiều oxit sắt?", "Sao Hỏa (Mars)", "Sao Thủy", "Sao Kim", "Sao Mộc", "A"),
    (3, "Khoa học", "Hành tinh nào có kích thước và khối lượng lớn nhất trong Hệ Mặt Trời?", "Sao Mộc (Jupiter)", "Sao Thổ", "Sao Hải Vương", "Sao Thiên Vương", "A"),
    (3, "Khoa học", "Khí nào sau đây chiếm tỷ lệ khoảng 21% trong khí quyển và duy trì sự cháy?", "Khí Oxy (O2)", "Khí Nitơ (N2)", "Khí Cacbonic (CO2)", "Khí Argon", "A"),
    (3, "Khoa học", "Công thức hóa học quen thuộc của nước nguyên chất là gì?", "H2O", "CO2", "NaCl", "O2", "A"),
    (3, "Khoa học", "Công thức hóa học của muối ăn thông thường hàng ngày là gì?", "NaCl", "H2O", "CaCO3", "HCl", "A"),
    (3, "Thể thao", "Trong một trận thi đấu bóng đá tiêu chuẩn, mỗi đội có bao nhiêu cầu thủ thi đấu chính thức trên sân?", "11 cầu thủ", "9 cầu thủ", "7 cầu thủ", "5 cầu thủ", "A"),
    (3, "Thể thao", "Trong môn thể thao bóng chuyền trong nhà, mỗi đội có bao nhiêu cầu thủ thi đấu trên sân?", "6 cầu thủ", "5 cầu thủ", "7 cầu thủ", "8 cầu thủ", "A"),
    (3, "Thể thao", "Trong môn bóng rổ tiêu chuẩn, mỗi đội thi đấu trên sân gồm có bao nhiêu cầu thủ?", "5 cầu thủ", "6 cầu thủ", "4 cầu thủ", "7 cầu thủ", "A"),

    # -------------------------------------------------------------
    # LEVEL 4: TỰ TIN (Lịch sử anh hùng, văn hóa truyền thống, danh thắng)
    # -------------------------------------------------------------
    (4, "Lịch sử", "Trận chiến trên sông Bạch Đằng năm 1288 đánh tan đoàn thuyền lương của quân Nguyên Mông do ai chỉ huy?", "Trần Hưng Đạo", "Ngô Quyền", "Lê Hoàn", "Trần Thái Tông", "A"),
    (4, "Lịch sử", "Hội nghị Diên Hồng lịch sử thời nhà Trần trưng cầu ý kiến của tầng lớp nào về việc đánh giặc?", "Các bậc bô lão", "Các quan lại triều đình", "Các thương gia", "Các tướng lĩnh trẻ", "A"),
    (4, "Lịch sử", "Hội nghị Bình Than thời nhà Trần được tổ chức dưới thuyền rồng bàn việc quân diễn ra vào năm nào?", "Năm 1282", "Năm 1258", "Năm 1285", "Năm 1288", "A"),
    (4, "Lịch sử", "Ai là tác giả của bản thiên cổ hùng văn 'Hịch tướng sĩ' khích lệ tinh thần ba quân?", "Trần Hưng Đạo", "Nguyễn Trãi", "Lý Thường Kiệt", "Quang Trung", "A"),
    (4, "Lịch sử", "Ai là tác giả của áng thiên cổ hùng văn 'Bình Ngô đại cáo' tuyên bố toàn thắng giặc Minh?", "Nguyễn Trãi", "Lê Lợi", "Trần Hưng Đạo", "Lê Thánh Tông", "A"),
    (4, "Lịch sử", "Hồ Gươm (Hồ Hoàn Kiếm) gắn liền với truyền thuyết vua Lê Lợi trả gươm báu Thuận Thiên cho ai?", "Rùa vàng (Kim Quy)", "Cá chép thần", "Rồng vàng", "Chim phụng", "A"),
    (4, "Lịch sử", "Nữ tướng Bùi Thị Xuân - người chỉ huy đội tượng binh dũng mãnh là tướng lĩnh kiệt xuất của triều đại nào?", "Nhà Tây Sơn", "Nhà Lê", "Nhà Trần", "Nhà Lý", "A"),
    (4, "Lịch sử", "Chiến thắng Ngọc Hồi - Đống Đa xuân Kỷ Dậu 1789 diễn ra đúng vào dịp lễ tết nào của dân tộc?", "Tết Nguyên Đán", "Tết Trung thu", "Tết Đoan Ngọ", "Tết Hàn thực", "A"),
    (4, "Nghệ thuật", "Làn điệu Dân ca Ví Giặm mộc mạc ân tình là di sản văn hóa phi vật thể của vùng đất nào?", "Nghệ An và Hà Tĩnh", "Thanh Hóa", "Quảng Bình", "Quảng Trị", "A"),
    (4, "Nghệ thuật", "Đờn ca tài tử - loại hình nghệ thuật dân gian độc đáo là nét đặc sắc gắn liền với vùng đất nào?", "Nam Bộ", "Tây Bắc", "Bắc Bộ", "Tây Nguyên", "A"),

    # -------------------------------------------------------------
    # LEVEL 5: MỐC 1 AN TOÀN (2.000.000đ - Di sản thế giới, thủ đô, văn học)
    # -------------------------------------------------------------
    (5, "Địa lý", "Thủ đô của đất nước Chùa Vàng Thái Lan là thành phố nào?", "Bangkok (Băng Cốc)", "Chiang Mai", "Phuket", "Pattaya", "A"),
    (5, "Địa lý", "Thủ đô của đất nước triệu voi Lào là thành phố nào?", "Vientiane (Viêng Chăn)", "Luang Prabang", "Pakse", "Savannakhet", "A"),
    (5, "Địa lý", "Thủ đô của Vương quốc Campuchia nơi có hoàng cung tráng lệ là thành phố nào?", "Phnom Penh (Phnôm Pênh)", "Siem Reap", "Battambang", "Sihanoukville", "A"),
    (5, "Địa lý", "Thủ đô của đất nước vạn đảo Indonesia là thành phố nào?", "Jakarta", "Surabaya", "Bandung", "Medan", "A"),
    (5, "Địa lý", "Thủ đô của đất nước Malaysia với tháp đôi Petronas sừng sững là thành phố nào?", "Kuala Lumpur", "George Town", "Johor Bahru", "Malacca", "A"),
    (5, "Di sản", "Kỳ quan cổ đại Kim tự tháp Giza và tượng Nhân sư khổng lồ tọa lạc tại quốc gia nào?", "Ai Cập", "Hy Lạp", "Ý", "Thổ Nhĩ Kỳ", "A"),
    (5, "Di sản", "Kỳ quan Vạn Lý Trường Thành uốn lượn hàng ngàn cây số nằm ở quốc gia nào?", "Trung Quốc", "Mông Cổ", "Hàn Quốc", "Ấn Độ", "A"),
    (5, "Di sản", "Công trình lăng mộ bằng đá cẩm thạch trắng Taj Mahal tuyệt mỹ là biểu tượng của quốc gia nào?", "Ấn Độ", "Pakistan", "Iran", "Thổ Nhĩ Kỳ", "A"),
    (5, "Di sản", "Đấu trường La Mã cổ đại Colosseum tráng lệ tọa lạc tại thành phố nào của nước Ý?", "Rome", "Milan", "Venice", "Naples", "A"),
    (5, "Văn học", "Bộ tiểu thuyết 'Chiến tranh và hòa bình' nổi tiếng là kiệt tác của đại văn hào người Nga nào?", "Lev Tolstoy", "Fyodor Dostoevsky", "Anton Chekhov", "Maxim Gorky", "A"),
    (5, "Văn học", "Tác phẩm kịch kinh điển 'Romeo và Juliet' là sáng tác bất hủ của đại thi hào người Anh nào?", "William Shakespeare", "Charles Dickens", "George Orwell", "Arthur Conan Doyle", "A")
]
