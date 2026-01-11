import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Elisa Salgados | Delivery Premium",
  description: "O Sabor que você Ama com Paixão! Salgados artesanais, quentinhos e irresistíveis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
