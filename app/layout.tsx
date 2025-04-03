import type { Metadata } from "next"; 
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css"; 
import Header from "@/components/common/Header"; 
import Footer from "@/components/common/Footer"; 
import { ClerkProvider } from "@clerk/nextjs";

// Initializing fonts with CSS variables
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Defining metadata for SEO
export const metadata: Metadata = {
  title: "Proj",
  description: "Proj is an app for summarizing PDF documents",
};

// Root layout for the application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"> {/* Setting language for better accessibility */}
      <ClerkProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            <Header /> {/* Navigation/Header section */}
            <main className="flex-1">{children}</main> {/* Main content area */}
            <Footer /> {/* Footer section */}
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
