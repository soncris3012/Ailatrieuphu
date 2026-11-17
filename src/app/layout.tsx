import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro, Montserrat, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['vietnamese', 'latin'],
  weight: ['700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-mono-clock',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ai Là Triệu Phú - VTV3 Online Game',
  description:
    'Trò chơi Ai Là Triệu Phú trực tuyến chuẩn VTV3 với 15.000 câu hỏi thuần Việt, âm thanh MC Lại Văn Sâm, hệ thống trợ giúp 50:50, gọi điện người thân, người đồng hành và 2 nhà thông thái.',
  icons: {
    icon: '/images/icon_logo_app.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${montserrat.variable} ${jetBrainsMono.variable}`}
    >
      <body className="antialiased selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
