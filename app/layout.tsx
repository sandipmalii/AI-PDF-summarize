import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from 'next/font/google';
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const fontSans = FontSans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "PDFSummize",
  description:
    'Save hours of reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with our advanced AI technology.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontSans.variable}>
      <ClerkProvider>
        <body className="antialiased">
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
