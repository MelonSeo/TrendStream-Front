import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TrendStream | AI-Powered IT News",
  description: "Stay ahead with AI-analyzed IT news and trends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        <Providers>
          {/* Navigation */}
          <header className="sticky top-0 z-50 glass border-b border-slate-200/50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold gradient-text hidden sm:block">TrendStream</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-1">
                  <Link
                    href="/"
                    className="px-4 py-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
                  >
                    <span className="hidden sm:inline">Home</span>
                    <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </Link>
                  <Link
                    href="/popular"
                    className="px-4 py-2 rounded-xl text-slate-600 hover:text-orange-600 hover:bg-orange-50 font-medium transition-all duration-200 flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" />
                    </svg>
                    <span className="hidden sm:inline">Popular</span>
                  </Link>
                  <Link
                    href="/trends"
                    className="px-4 py-2 rounded-xl text-slate-600 hover:text-purple-600 hover:bg-purple-50 font-medium transition-all duration-200 flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="hidden sm:inline">Trends</span>
                  </Link>
                  <Link
                    href="/news/category"
                    className="px-4 py-2 rounded-xl text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 font-medium transition-all duration-200 flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="hidden sm:inline">Category</span>
                  </Link>
                  <Link
                    href="/news/source"
                    className="px-4 py-2 rounded-xl text-slate-600 hover:text-orange-600 hover:bg-orange-50 font-medium transition-all duration-200 flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <span className="hidden sm:inline">Source</span>
                  </Link>
                  <Link
                    href="/news/search"
                    className="px-4 py-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="hidden sm:inline">Search</span>
                  </Link>
                  <Link
                    href="/stats"
                    className="px-4 py-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-200 flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="hidden sm:inline">Stats</span>
                  </Link>
                  <Link
                    href="/subscriptions"
                    className="px-4 py-2 rounded-xl text-slate-600 hover:text-pink-600 hover:bg-pink-50 font-medium transition-all duration-200 flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="hidden sm:inline">Subscribe</span>
                  </Link>
                </div>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-200px)]">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200 bg-white/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <span className="text-lg font-bold text-slate-800">TrendStream</span>
                  </div>
                  <p className="text-slate-500 text-sm max-w-md leading-relaxed">
                    AI-powered news aggregation and analysis platform. Stay informed with intelligent insights on the latest IT trends and technology news.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">Quick Links</h3>
                  <ul className="space-y-3">
                    <li><Link href="/" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Latest News</Link></li>
                    <li><Link href="/popular" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Popular</Link></li>
                    <li><Link href="/trends" className="text-slate-500 hover:text-purple-600 text-sm transition-colors">Trends</Link></li>
                    <li><Link href="/news/category" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors">Category</Link></li>
                    <li><Link href="/news/source" className="text-slate-500 hover:text-orange-600 text-sm transition-colors">Source</Link></li>
                    <li><Link href="/news/search" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Search</Link></li>
                    <li><Link href="/stats" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Stats</Link></li>
                    <li><Link href="/subscriptions" className="text-slate-500 hover:text-pink-600 text-sm transition-colors">Subscribe</Link></li>
                  </ul>
                </div>

                {/* Topics */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">Topics</h3>
                  <ul className="space-y-3">
                    <li><span className="text-slate-500 text-sm">AI & Machine Learning</span></li>
                    <li><span className="text-slate-500 text-sm">Cloud Computing</span></li>
                    <li><span className="text-slate-500 text-sm">Cybersecurity</span></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-slate-200 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-slate-400 text-sm">
                  © 2026 TrendStream. All rights reserved.
                </p>
                <p className="text-slate-400 text-sm flex items-center gap-1">
                  Powered by
                  <span className="font-medium text-slate-500">AI Analysis</span>
                </p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
