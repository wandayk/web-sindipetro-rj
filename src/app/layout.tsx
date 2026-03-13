import type { Metadata } from "next";
import { Source_Sans_3, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Filiação Sindical Online",
  description: "Sistema de cadastro de filiação sindical com assinatura eletrônica",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#6d0201",
  icons: {
    icon: "/fvicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${sourceSans.variable} ${libreBaskerville.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
