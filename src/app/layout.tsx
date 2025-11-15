import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clipmage",
  description: "Clipmage for OCR and fast paste",
  icons: {
    icon: "assets/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative bg-linear-to-br from-gray-50 via-blue-50 to-yellow-50">
        <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] bg-size-[10px_10px] pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
