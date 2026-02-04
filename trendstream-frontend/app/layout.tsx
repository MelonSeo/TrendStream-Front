import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "TrendStream",
  description: "IT News and Trend Analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Providers>
          <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
              <a href="/" className="text-2xl font-bold text-gray-800">TrendStream</a>
              <div>
                <a href="/" className="px-4">Home</a>
                <a href="/popular" className="px-4">Popular</a>
                <a href="/news/search" className="px-4">Search</a>
              </div>
            </nav>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
