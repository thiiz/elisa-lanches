"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { CartItem } from "../../types";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onCheckout: () => void;
}

export const CartModal = ({
  isOpen,
  onClose,
  cart,
  total,
  onUpdateQuantity,
  onCheckout,
}: CartModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative flex max-h-[85vh] w-full max-w-md flex-col rounded-2xl bg-white shadow-2xl dark:bg-slate-800"
          >
            {/* Header */}
            <div className="z-10 flex shrink-0 items-center justify-between rounded-t-2xl bg-orange-600 p-5 text-white">
              <div>
                <h2 className="text-xl font-bold">Seu Pedido</h2>
                <p className="text-sm text-orange-100">Elisa Salgados</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-white/20 p-2 transition hover:bg-white/30"
              >
                <X size={20} />
              </button>
            </div>

            {/* List of Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="py-10 text-center text-slate-400">
                  <ShoppingBag size={48} className="mx-auto mb-3 opacity-50" />
                  <p>Seu carrinho está vazio.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.cartId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 rounded-xl bg-stone-50 p-3 dark:bg-slate-700/50"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="line-clamp-2 text-sm font-semibold dark:text-white">
                        {item.name}
                      </h4>
                      <p className="font-bold text-orange-500 text-sm">
                        {item.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onUpdateQuantity(item.cartId, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-600"
                      >
                        <Minus size={14} />
                      </motion.button>
                      <span className="w-4 text-center font-bold dark:text-white">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onUpdateQuantity(item.cartId, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white"
                      >
                        <Plus size={14} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="z-10 shrink-0 rounded-b-2xl border-t border-stone-100 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Total</span>
                <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              {cart.length > 0 && (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={onCheckout}
                  className="flex min-h-[60px] w-full items-center justify-center gap-3 rounded-xl bg-green-600 text-lg font-bold text-white shadow-xl transition-all hover:bg-green-700 active:bg-green-800"
                >
                  <MessageCircle size={24} />
                  <span>Finalizar no WhatsApp</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
