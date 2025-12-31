"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const path = usePathname();

  const tab = (href: string, label: string, icon: string) => (
    <Link href={href}>
      <div className={`flex flex-col items-center text-xs ${path === href ? "text-indigo-500" : "text-gray-400"}`}>
        <span className="text-lg">{icon}</span>
        {label}
      </div>
    </Link>
  );

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around py-2">
      {tab("/dashboard", "Home", "🏠")}
      {tab("/weekly", "Weekly", "📅")}
      {tab("/daily", "Daily", "✅")}
    </div>
  );
}
