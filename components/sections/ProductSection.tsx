"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
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
        <div className="flex flex-wrap justify-center gap-6">
          {combos.map((combo) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex w-full min-w-[300px] flex-1 flex-col overflow-hidden rounded-2xl border border-yellow-500/30 bg-white shadow-xl dark:bg-slate-800 md:flex-row lg:max-w-[calc(33.333%-1rem)]"
            >
              <div className="group relative h-48 overflow-hidden md:h-auto lg:w-1/1 md:w-1/2">
                <Image
                  src={combo.img}
                  alt={combo.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-2 top-2 flex flex-col gap-1">
                  <div className="rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-bold text-slate-900 shadow-md uppercase">
                    OFERTA
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center p-4 md:w-2/3">
                <h3 className="mb-2 text-xl font-bold dark:text-white">
                  {combo.name}
                </h3>
                <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                  {combo.desc}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
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
                    className="flex w-full flex-grow items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors dark:bg-yellow-400 dark:text-slate-900 sm:w-auto sm:flex-grow-0"
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
