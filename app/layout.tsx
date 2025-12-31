import "./globals.css";
import BottomNav from "./components/BottomNav";

import ThemeToggle from "./components/ThemeToggle";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html id="themeRoot" className="dark">
      <body className="min-h-screen bg-white dark:bg-[#0B0F19] text-black dark:text-gray-200 transition-colors duration-300">
        <ThemeToggle />
        {children}
        <BottomNav />

      </body>
    </html>
  );
}
