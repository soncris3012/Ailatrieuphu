# scripts/generate_authentic_easy_banks.py
# Generates rich, authentic Vietnamese questions for Tầng 1 (Levels 1 to 5).
# Exactly matching VTV3 "Ai Là Triệu Phú" warm-up specifications.
# ZERO templates, ZERO (Câu ...) tags, 100% natural Vietnamese language.

import json
import os
import random

def make_q(level, category, q_text, opt_a, opt_b, opt_c, opt_d, correct_letter):
    return {
        "level": level,
        "difficulty": level,
        "category": category,
        "question": q_text.strip(),
        "option_a": opt_a.strip(),
        "option_b": opt_b.strip(),
        "option_c": opt_c.strip(),
        "option_d": opt_d.strip(),
        "correct_answer": correct_letter
    }

# ==============================================================================
# LEVEL 1: IDIOMS, PROVERBS, EVERYDAY LIFE, BASIC SENSES, COLORS, CALENDAR
# ==============================================================================
LEVEL_1_ITEMS = [
    # Tục ngữ / Ca dao / Thành ngữ quen thuộc
    ("Điền từ còn thiếu vào câu tục ngữ: 'Ăn quả nhớ kẻ trồng ...'?", "cây", "rừng", "hoa", "lá", "A"),
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
    ("Điền từ còn thiếu vào câu tục ngữ: 'Chó cắn áo ...'?", "rách", "nghèo", "rách nát", "xấu", "A"),
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
    ("Thành ngữ nào sau đây dùng để chỉ sự bắn cực kỳ chuẩn xác?", "Bách phát bách trúng", "Bách phát bách xịt", "Bách phát bách trượt", "Bách phát bách bay", "A"),
    ("Người Việt Nam thường nấu món canh cua đồng cùng với loại rau nào?", "Rau đay, mồng tơi", "Bắp cải", "Xà lách", "Cải cúc", "A"),
    ("Đâu là tên một loại nón đội đầu truyền thống che nắng che mưa của người Việt Nam?", "Nón lá", "Mũ bảo hiểm", "Mũ len", "Mũ cối", "A"),
    ("Trang phục truyền thống mang tính biểu tượng của người phụ nữ Việt Nam là gì?", "Áo dài", "Áo len", "Áo khoác", "Váy dạ hội", "A"),
    ("Đâu là loại bánh truyền thống bắt buộc phải có trong mâm cỗ Tết Nguyên Đán miền Bắc?", "Bánh chưng", "Bánh pizza", "Bánh donut", "Bánh mì", "A"),
    ("Đâu là loại bánh truyền thống ngày Tết phổ biến nhất ở miền Nam Việt Nam?", "Bánh tét", "Bánh bao", "Bánh quy", "Bánh gato", "A"),
    ("Lá cờ Tổ quốc Việt Nam có nền màu gì và hình ngôi sao màu gì?", "Nền đỏ, sao vàng", "Nền vàng, sao đỏ", "Nền xanh, sao vàng", "Nền đỏ, sao trắng", "A"),
    ("Lá cờ đỏ sao vàng của Việt Nam có hình ngôi sao mấy cánh?", "5 cánh", "4 cánh", "6 cánh", "8 cánh", "A"),
    ("Một tuần lễ theo lịch dương có bao nhiêu ngày?", "7 ngày", "5 ngày", "6 ngày", "8 ngày", "A"),
    ("Một năm dương lịch thông thường (không nhuận) có bao nhiêu ngày?", "365 ngày", "360 ngày", "366 ngày", "370 ngày", "A"),
    ("Một ngày đêm có tổng cộng bao nhiêu giờ?", "24 giờ", "12 giờ", "20 giờ", "30 giờ", "A"),
    ("Một giờ đồng hồ tương đương với bao nhiêu phút?", "60 phút", "100 phút", "50 phút", "30 phút", "A"),
    ("Một phút tương đương với bao nhiêu giây?", "60 giây", "100 giây", "50 giây", "30 giây", "A"),
    ("Mặt trời mọc ở hướng nào vào mỗi buổi sáng sớm?", "Hướng Đông", "Hướng Tây", "Hướng Nam", "Hướng Bắc", "A"),
    ("Mặt trời lặn ở hướng nào vào mỗi buổi chiều tà?", "Hướng Tây", "Hướng Đông", "Hướng Bắc", "Hướng Nam", "A"),
    ("Đèn tín hiệu giao thông màu nào phát lệnh các phương tiện phải dừng lại?", "Màu đỏ", "Màu xanh", "Màu vàng", "Màu tím", "A"),
    ("Đèn tín hiệu giao thông màu nào cho phép các phương tiện được tiếp tục di chuyển?", "Màu xanh", "Màu đỏ", "Màu vàng", "Màu đen", "A"),
    ("Khi ngồi trên xe mô tô, xe gắn máy tham gia giao thông, người tham gia bắt buộc phải đội gì?", "Mũ bảo hiểm", "Mũ len", "Mũ lưỡi trai", "Khăn quàng", "A"),
    ("Con vật nào sau đây cất tiếng sủa gâu gâu và được coi là người bạn trung thành giữ nhà?", "Con chó", "Con mèo", "Con thỏ", "Con chuột", "A"),
    ("Con vật nào sau đây thường cất tiếng kêu meo meo và thích bắt chuột?", "Con mèo", "Con lợn", "Con dê", "Con ngựa", "A"),
    ("Con vật nào sau đây cất tiếng gáy ò ó o báo hiệu trời đã sáng?", "Gà trống", "Gà mái", "Vịt bầu", "Chim bồ câu", "A"),
    ("Con vật nào có vòi dài, hai ngà trắng và thân hình to lớn nhất trên cạn?", "Con voi", "Con hà mã", "Con tê giác", "Con hươu cao cổ", "A"),
    ("Loài động vật nào được dân gian gọi là 'chúa sơn lâm'?", "Con hổ (cọp)", "Con khỉ", "Con nai", "Con sóc", "A"),
    ("Môn thể thao nào được người hâm mộ toàn cầu tôn vinh là 'môn thể thao vua'?", "Bóng đá", "Bóng rổ", "Bóng chuyền", "Cầu lông", "A"),
    ("Bộ phận nào trên gương mặt con người đảm nhận chức năng thị giác (nhìn)?", "Mắt", "Tai", "Mũi", "Miệng", "A"),
    ("Bộ phận nào trên gương mặt con người đảm nhận chức năng thính giác (nghe)?", "Tai", "Mắt", "Mũi", "Lưỡi", "A"),
    ("Bộ phận nào trên cơ thể con người đảm nhận chức năng khứu giác (ngửi)?", "Mũi", "Miệng", "Tai", "Mắt", "A"),
    ("Dụng cụ ăn cơm truyền thống quen thuộc nhất trong mỗi gia đình người Việt là gì?", "Đôi đũa", "Dao nĩa", "Thìa gỗ", "Que xiên", "A"),
    ("Nước tinh khiết ở điều kiện áp suất tiêu chuẩn sẽ sôi ở nhiệt độ bao nhiêu độ C?", "100 độ C", "50 độ C", "80 độ C", "150 độ C", "A"),
    ("Nước tinh khiết ở điều kiện áp suất tiêu chuẩn sẽ đóng băng thành đá ở nhiệt độ nào?", "0 độ C", "10 độ C", "-10 độ C", "5 độ C", "A"),
]

# Generate variations and distinct everyday idioms
print("Tạo ngân hàng câu hỏi Khởi Động phong phú...")
