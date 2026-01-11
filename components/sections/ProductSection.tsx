"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Product } from "../../types";
import { ProductCard } from "../product/ProductCard";

interface ProductSectionProps {
  products: Product[];
  combos: Product[];
  onAdd: (item: Product) => void;
}

export const ProductSection = ({
  products,
  combos,
  onAdd,
}: ProductSectionProps) => {
  return (
    <main className="mx-auto max-w-6xl space-y-12 px-4 py-8">
      <section>
        <div className="mb-6 flex items-center gap-2">
          <span className="h-8 w-2 rounded-full bg-orange-500"></span>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Nossos Salgados
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} item={product} onAdd={onAdd} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center gap-2">
          <span className="h-8 w-2 rounded-full bg-yellow-500"></span>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Combos Especiais
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {combos.map((combo) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-yellow-500/30 bg-white shadow-xl dark:bg-slate-800 md:flex-row"
            >
              <div className="group relative h-48 overflow-hidden md:h-auto md:w-1/3">
                <img
                  src={combo.img}
                  alt={combo.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-2 top-2 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-slate-900 shadow-md">
                  OFERTA
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 md:w-2/3">
                <h3 className="mb-2 text-xl font-bold dark:text-white">
                  {combo.name}
                </h3>
                <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                  {combo.desc}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-500">
                    {combo.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAdd(combo)}
                    className="flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition-colors dark:bg-yellow-400 dark:text-slate-900"
                  >
                    Adicionar <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};
