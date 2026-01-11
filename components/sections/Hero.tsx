"use client";

import { motion } from "framer-motion";
import { Clock, Smartphone } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 px-4 pb-16 pt-24 dark:from-slate-900 dark:to-slate-800">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10 dark:opacity-5"
            initial={{ y: "100vh", rotate: 0, left: `${Math.random() * 100}%` }}
            animate={{ y: "-20vh", rotate: 360 }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            {["🥟", "🥡", "🌮", "🍟", "🍔", "🥐"][i]}
          </motion.div>
        ))}
      </div>
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-6xl">
            O Sabor que você <br />
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Ama com Paixão!
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Salgados artesanais, quentinhos e irresistíveis. O toque especial da
            Elisa na sua festa ou lanche da tarde.
          </p>

          <div className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center justify-center gap-3 rounded-xl border border-blue-100 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800/70">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <Smartphone size={20} />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-slate-800 dark:text-white">
                  Entrega Rápida
                </span>
                <span className="text-xs leading-tight text-slate-500 dark:text-slate-400">
                  Via Uber, 99 ou Retirada na loja.
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-xl border border-red-100 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800/70">
              <div className="rounded-full bg-red-100 p-2 text-red-600">
                <Clock size={20} />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-slate-800 dark:text-white">
                  Pronto a Entrega
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  15 a 20 minutos
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
