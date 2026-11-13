import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ai Là Triệu Phú - VTV3 Online Game',
  description: 'Trò chơi Ai Là Triệu Phú trực tuyến với 15.000 câu hỏi, âm thanh MC Lại Văn Sâm, hệ thống trợ giúp 50:50, gọi điện người thân, hỏi người đồng hành và 2 nhà thông thái.',
  icons: {
    icon: '/images/icon_logo_app.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full antialiased dark">
      <body className="min-h-full bg-[#050714] text-white flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
