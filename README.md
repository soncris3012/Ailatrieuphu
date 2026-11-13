# Trò Chơi Ai Là Triệu Phú (VTV3 Online)

Bản mô phỏng hoàn chỉnh trò chơi truyền hình nổi tiếng **"Ai Là Triệu Phú"** với tiền thưởng chuẩn hiện tại, ngân hàng **15.000 câu hỏi** phân cấp độ khó chi tiết, âm thanh giọng đọc MC Lại Văn Sâm, hệ thống quyền trợ giúp nâng cao và tấm séc tiền thưởng danh giá.

![Ai Là Triệu Phú](/public/images/icon_logo_app.png)

---

## 🌟 Tính Năng Nổi Bật

### 1. Thang Tiền Thưởng Cập Nhật Mới Nhất
Gồm 15 câu hỏi với 3 mốc quan trọng:
* **Câu 1 - 4**: Khởi động (200.000đ → 1.000.000đ)
* **Câu 5**: **MỐC 1 (Bảo đảm)**: 2.000.000đ
* **Câu 6 - 9**: Thử thách (3.000.000đ → 14.000.000đ)
* **Câu 10**: **MỐC 2 (Bảo đảm) + TẤM SÉC 22.000.000đ**: Hiển thị tấm séc tiền thưởng trang trọng với tên người chơi và chữ ký MC Lại Văn Sâm!
* **Câu 11 - 14**: Đỉnh cao trí tuệ (30.000.000đ → 85.000.000đ)
* **Câu 15**: **MỐC 3 (ĐỈNH CAO)**: **150.000.000đ**

### 2. Kho Tri Thức Đồ Sộ: 15.000 Câu Hỏi
* **1.000 câu hỏi cho mỗi mốc** (tổng cộng 15.000 câu hỏi) trải rộng trên 12 lĩnh vực:
  * Lịch sử
  * Địa lý
  * Khoa học & Vũ trụ
  * Văn học
  * Hội họa & Mỹ thuật
  * Âm nhạc
  * Thể thao & Thống kê
  * Văn hóa xã hội
  * Kinh tế
  * Công nghệ
  * Ẩm thực
  * Thiên nhiên
* **Độ khó tăng dần theo mốc:**
  * Càng lên cao, các câu hỏi càng chuyên sâu về số liệu, năm diễn ra sự kiện, thống kê thể thao (World Cup, Olympic), tác phẩm hội họa, chi tiết văn học, hoặc các kiến thức rất ít người để ý trong cuộc sống.
  * Các phương án gây nhiễu được thiết kế tinh vi, đòi hỏi suy luận và kiến thức vững chắc.

### 3. Hệ Thống Khởi Tạo & 4 Quyền Trợ Giúp
* **Khởi tạo đầu vào phong phú:**
  * Đặt tên người chơi
  * Chọn người đồng hành (Bạn, Bố, Mẹ, Vợ/Chồng, Người yêu, Đồng nghiệp...) và chọn **Lĩnh vực sở trường (Master Field)** của họ
  * Đặt tên người thân khi gọi điện
  * Thiết lập **2 Nhà Thông Thái** ở 2 lĩnh vực chuyên môn khác nhau
* **Quyền Trợ Giúp:**
  1. **50:50**: Loại bỏ ngẫu nhiên 2 phương án sai.
  2. **Gọi điện thoại cho người thân**: Gọi cho người thân đã thiết lập (xác suất gợi ý đúng 70%).
  3. **Hỏi ý kiến người đồng hành**:
     * Nếu câu hỏi trùng đúng lĩnh vực sở trường của người đồng hành: Xác suất trả lời đúng là **70%**.
     * Nếu lệch lĩnh vực: Xác suất trả lời đúng thấp hơn (~35%).
  4. **Hỏi ý kiến 2 Nhà Thông Thái (Tổ tư vấn)**:
     * **Mở khóa khi vượt qua câu hỏi số 5 và bắt đầu từ câu hỏi số 6!**
     * Nếu câu hỏi rơi đúng lĩnh vực của Nhà Thông Thái nào: Xác suất trả lời đúng của vị học giả đó là **100%**!
  5. **Dừng cuộc chơi (Walk Away)**: Người chơi có quyền chủ động bảo toàn số tiền thưởng đã đạt được ở câu hỏi trước đó.

### 4. Âm Thanh & Hiệu Ứng Sân Khấu
* Tích hợp toàn bộ **81 file âm thanh chuẩn** giọng MC Lại Văn Sâm và nhạc nền hồi hộp của chương trình:
  * Lời dẫn MC đọc từng câu hỏi (Câu 1 đến Câu 15)
  * Đọc xác nhận phương án chọn A, B, C, D
  * Nhạc hồi hộp trước khi công bố kết quả ở các mốc quan trọng
  * Âm thanh chúc mừng vượt mốc 5 và mốc 10
  * Hiệu ứng âm thanh khi sử dụng các quyền trợ giúp
  * Pháo hoa giấy (confetti) rực rỡ khi vượt mốc và đạt giải thưởng

---

## 🛠️ Công Nghệ Sử Dụng

* **Frontend**: Next.js 14+ (App Router), React 19, TypeScript, Tailwind CSS
* **Database**: Supabase (PostgreSQL), Row Level Security (RLS)
* **Deployment**: Vercel
* **Audio Engine**: HTML5 Audio & Web Audio API
* **Effects**: Canvas Confetti

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

1. **Cài đặt thư viện:**
```bash
npm install
```

2. **Cấu hình môi trường (.env.local):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://bnvnjuqsekqwqmoiqvcl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

3. **Chạy máy chủ phát triển:**
```bash
npm run dev
```
Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

---

## 📜 Giấy Phép & Lời Cảm Ơn
* Dự án tham khảo template UI và bộ âm thanh từ repo [ngdathd/AiLaTrieuPhu](https://github.com/ngdathd/AiLaTrieuPhu).
* Chương trình "Ai Là Triệu Phú" thuộc bản quyền của Đài Truyền hình Việt Nam (VTV3) và Sony Pictures Television. Dự án được phát triển nhằm mục đích học tập và giải trí phi thương mại.
