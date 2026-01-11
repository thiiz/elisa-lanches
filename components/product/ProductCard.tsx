"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
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
    <div className="group relative h-48 w-full overflow-hidden md:h-56">
      <Image
        src={item.img}
        alt={item.name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
    </div>
    <div className="flex flex-grow flex-col p-3 md:p-4">
      <h3 className="mb-1 text-base font-bold leading-tight text-slate-800 dark:text-white md:text-lg">
        {item.name}
      </h3>
      <p className="mb-3 text-[11px] text-slate-500 dark:text-slate-400 md:mb-4 md:text-xs">
        {item.desc}
      </p>
      <div className="mt-auto flex items-center justify-between pt-2 md:pt-4">
        <span className="text-lg font-bold text-orange-500 md:text-2xl">
          {item.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onAdd(item)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition-colors hover:bg-red-700 md:h-10 md:w-10"
        >
          <Plus className="h-4 w-4 md:h-5 md:w-5" />
        </motion.button>
      </div>
    </div>
  </motion.div>
);
