import "./globals.css";


export const metadata = {
  title: "UniDue Next",
  description: "大学生向け課題期日管理アプリ",
};

export default function RootLayout({children}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

