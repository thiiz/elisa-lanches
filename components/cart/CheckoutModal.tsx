"use client";

import { motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { useState } from "react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; address: string; payment: string }) => void;
}

export const CheckoutModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CheckoutModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    payment: "PIX",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-[95%] max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-800 md:w-full md:p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white md:text-xl">
            Finalizar Pedido
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X size={20} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Seu Nome
            </label>
            <input
              required
              type="text"
              className="w-full h-12 rounded-lg border border-stone-300 bg-stone-50 px-4 text-base text-slate-800 outline-none focus:ring-2 focus:ring-orange-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="Ex: Maria Silva"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Endereço Completo
            </label>
            <input
              required
              type="text"
              className="w-full h-12 rounded-lg border border-stone-300 bg-stone-50 px-4 text-base text-slate-800 outline-none focus:ring-2 focus:ring-orange-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="Rua, Bairro, Número"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Pagamento
            </label>
            <select
              className="w-full h-12 rounded-lg border border-stone-300 bg-stone-50 px-4 text-base text-slate-800 outline-none focus:ring-2 focus:ring-orange-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              value={formData.payment}
              onChange={(e) =>
                setFormData({ ...formData, payment: e.target.value })
              }
            >
              <option value="PIX">PIX</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão">Cartão de Crédito/Débito</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-stone-300 py-3 text-sm font-semibold text-slate-600 transition hover:bg-stone-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 md:text-base"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-sm font-bold text-white shadow-md transition hover:bg-green-700 md:text-base"
            >
              Enviar Pedido <Send size={18} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
