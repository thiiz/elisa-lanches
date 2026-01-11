"use client";

import { Shield } from "lucide-react";

interface FooterProps {
  onAdminClick: () => void;
}

export const Footer = ({ onAdminClick }: FooterProps) => {
  return (
    <footer className="flex flex-col items-center gap-2 border-t border-stone-200 bg-stone-50 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600">
      <p>&copy; {new Date().getFullYear()} Elisa Salgados. Todos os direitos reservados.</p>
      <button
        onClick={onAdminClick}
        className="flex items-center gap-1 text-xs underline opacity-50 hover:opacity-100"
      >
        <Shield size={12} /> Painel Admin (Demo)
      </button>
    </footer>
  );
};
