import type { Metadata } from "next"; 
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css"; 
import Header from "@/components/common/Header"; 
import Footer from "@/components/common/Footer"; 
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner"; // ✅ Added this

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Proj",
  description: "Proj is an app for summarizing PDF documents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster /> {/* ✅ This will now work */}
        </body>
      </ClerkProvider>
    </html>
  );
}
