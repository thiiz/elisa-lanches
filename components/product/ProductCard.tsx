"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Product } from "../../types";

interface ProductCardProps {
  item: Product;
  onAdd: (item: Product) => void;
}

export const ProductCard = ({ item, onAdd }: ProductCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5 }}
    className="flex flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"
  >
    <div className="group relative h-48 overflow-hidden">
      <img
        src={item.img}
        alt={item.name}
        className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
    </div>
    <div className="flex flex-grow flex-col p-4">
      <h3 className="mb-1 text-lg font-bold leading-tight text-slate-800 dark:text-white">
        {item.name}
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        {item.desc}
      </p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-2xl font-bold text-orange-500">
          {item.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onAdd(item)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition-colors hover:bg-red-700"
        >
          <Plus size={20} />
        </motion.button>
      </div>
    </div>
  </motion.div>
);
