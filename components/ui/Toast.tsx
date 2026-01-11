"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface ToastProps {
  message: string | null;
  show: boolean;
}

export const Toast = ({ message, show }: ToastProps) => (
  <AnimatePresence>
    {show && message && (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-20 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-800 px-6 py-3 text-white shadow-2xl dark:bg-slate-700"
      >
        <CheckCircle size={18} className="text-green-400" />
        <span className="text-sm font-medium">{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);
