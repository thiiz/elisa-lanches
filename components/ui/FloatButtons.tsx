"use client";

import { motion } from "framer-motion";
import { MessageCircle, ShoppingCart } from "lucide-react";

interface FloatButtonsProps {
  onCartClick: () => void;
  totalQuantity: number;
}

export const FloatButtons = ({
  onCartClick,
  totalQuantity,
}: FloatButtonsProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col gap-3">
      <motion.button
        onClick={onCartClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-red-600 text-white shadow-2xl dark:border-slate-900"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ShoppingCart size={28} />
        {totalQuantity > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-yellow-400 text-xs font-bold text-slate-900 dark:border-slate-900">
            {totalQuantity}
          </span>
        )}
      </motion.button>
      <motion.a
        href="https://wa.me/5551990070708"
        target="_blank"
        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-green-500 text-white shadow-2xl dark:border-slate-900"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <MessageCircle size={28} />
      </motion.a>
    </div>
  );
};
