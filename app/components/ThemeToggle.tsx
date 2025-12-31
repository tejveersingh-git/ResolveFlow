"use client";

export default function ThemeToggle() {
  const toggle = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-xl" onClick={toggle}>
      🌗
    </button>
  );
}
