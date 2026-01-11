"use client";

import { motion } from "framer-motion";
import { Clock, Smartphone } from "lucide-react";

const FLOATING_ICONS = [
  { icon: "🥟", left: "5%", initialY: "70vh", duration: 25, delay: -5, size: "text-4xl" },
  { icon: "🥡", left: "25%", initialY: "90vh", duration: 18, delay: -2, size: "text-5xl" },
  { icon: "🌮", left: "45%", initialY: "75vh", duration: 22, delay: -10, size: "text-3xl" },
  { icon: "🍟", left: "65%", initialY: "70vh", duration: 16, delay: -8, size: "text-4xl" },
  { icon: "🍔", left: "85%", initialY: "85vh", duration: 20, delay: -4, size: "text-5xl" },
  { icon: "🥐", left: "92%", initialY: "100vh", duration: 19, delay: -1, size: "text-3xl" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
} as const;

const titleLine1Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 100,
    },
  },
} as const;

const titleLine2Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 100,
    },
  },
} as const;

const itemUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
} as const;

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 px-4 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 md:py-32">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200/20 rounded-full blur-[120px] dark:bg-orange-900/10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-200/20 rounded-full blur-[120px] dark:bg-red-900/10" />
        
        {FLOATING_ICONS.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.size} opacity-10 dark:opacity-5 cursor-default select-none`}
            initial={{ 
              y: "110vh", 
              x: 0,
              rotate: 0,
              left: item.left 
            }}
            animate={{
              y: "-20vh",
              x: [0, 20, -20, 0],
              rotate: 360,
            }}
            transition={{
              y: {
                duration: item.duration,
                repeat: Infinity,
                ease: "linear",
                delay: item.delay,
              },
              x: {
                duration: item.duration / 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: item.duration,
                repeat: Infinity,
                ease: "linear",
              }
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-hidden mb-2">
          <motion.h1 
            variants={titleLine1Variants}
            className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-7xl lg:text-8xl"
          >
            O Sabor que você
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-6">
          <motion.h1 
            variants={titleLine2Variants}
            className="text-4xl font-black tracking-tight md:text-7xl lg:text-8xl"
          >
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 bg-clip-text text-transparent drop-shadow-sm">
              Ama com Paixão!
            </span>
          </motion.h1>
        </div>

        <motion.p 
          variants={itemUpVariants}
          className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300 md:text-xl font-medium leading-relaxed"
        >
          Salgados artesanais, quentinhos e irresistíveis. 
          <span className="text-orange-600 dark:text-orange-400 font-semibold"> O toque especial da Elisa </span> 
          na sua festa ou no seu lanche da tarde.
        </motion.p>

        <motion.div 
          variants={itemUpVariants}
          className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2"
        >
          <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white/80 p-5 shadow-lg shadow-blue-100/20 backdrop-blur-md transition-all dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none"
          >
            <div className="flex-shrink-0 rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Smartphone size={24} />
            </div>
            <div className="text-left">
              <span className="block text-base font-bold text-slate-900 dark:text-white">
                Entrega Rápida
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Via Uber, 99 ou Retirada na loja.
              </span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex items-center gap-4 rounded-2xl border border-green-100 bg-white/80 p-5 shadow-lg shadow-green-100/20 backdrop-blur-md transition-all dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none"
          >
            <div className="flex-shrink-0 rounded-xl bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <Clock size={24} />
            </div>
            <div className="text-left">
              <span className="block text-base font-bold text-slate-900 dark:text-white">
                Pronto a Entrega
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Seu pedido pronto em 15 a 20 min.
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
