import type { Metadata, Viewport } from "next";
import { Archivo, Noto_Serif_Display, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Archivo({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500"],
});

const serif = Noto_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["200", "300"],
  style: ["normal", "italic"],
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Cherry Studio | Chụp ảnh mẹ bầu Hà Nội & Phú Thọ",
  description:
    "Chụp ảnh bầu của Cherry Studio: đa dạng concept, có sẵn trang phục và phụ kiện, ê-kíp giàu kinh nghiệm. Cơ sở Đống Đa, Hà Nội và TX Phú Thọ.",
  openGraph: {
    title: "Cherry Studio | Tôn vinh vẻ đẹp, ghi dấu khoảnh khắc",
    description: "Đa dạng concept chụp bầu, có sẵn trang phục, ê-kíp hiểu mẹ bầu.",
    images: ["/images/a-from-girl-a-to-mom/a-from-girl-a-to-mom-01.webp"],
    locale: "vi_VN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${sans.variable} ${serif.variable} ${display.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
