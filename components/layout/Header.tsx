"use client";

import { motion } from "framer-motion";
import { Moon, ShoppingCart, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HeaderProps {
  cartShake: number;
  totalQuantity: number;
  onCartClick: () => void;
}

export const Header = ({
  cartShake,
  totalQuantity,
  onCartClick,
}: HeaderProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 z-40 w-full border-b border-stone-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="overflow-hidden relative w-14 h-14">
            <Image src="/logo.png" alt="Logo" width={0} height={0} sizes="100vw" className="w-full object-cover absolute" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-white">
            Elisa<span className="text-orange-500">Salgados</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-slate-600 transition hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {mounted && (resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
          </button>
          <motion.button
            key={cartShake}
            animate={{ rotate: [0, -15, 15, 0] }}
            transition={{ duration: 0.4 }}
            onClick={onCartClick}
            className="relative rounded-full bg-red-600 p-2 text-white shadow-lg transition hover:bg-red-700"
          >
            <ShoppingCart size={20} />
            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-yellow-400 text-[10px] font-bold text-slate-900 dark:border-slate-900">
                {totalQuantity}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};
