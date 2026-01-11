"use client";

import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section className="relative overflow-hidden border-t border-stone-100 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-12 md:flex-row"
        >
          <div className="relative w-full md:w-1/2">
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-yellow-500/20 blur-2xl"></div>
            <img
              src="https://res.cloudinary.com/dk7i8ud3p/image/upload/v1768106791/Gemini_Generated_Image_q0mi3hq0mi3hq0mi_wothl8.png"
              alt="Cozinha da Elisa"
              className="relative z-10 h-[300px] w-full rounded-2xl object-cover shadow-2xl md:h-[350px]"
            />
          </div>
          <div className="w-full text-center md:w-1/2 md:text-left">
            <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-orange-500">
              Nossa Essência
            </span>
            <h2 className="mb-6 text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
              Sabor Artesanal em Cada Mordida
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Bem-vindo à <strong>Elisa Salgados</strong>. Mais do que uma loja
              de salgados, somos apaixonados por gastronomia e momentos felizes.
              Utilizamos receitas tradicionais com um toque moderno, garantindo
              o frescor e a qualidade que você merece.
            </p>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              Seja para um café da tarde especial ou para tornar sua festa
              inesquecível, estamos prontos para atender com agilidade e
              carinho. Nossa missão é levar alegria através da boa comida.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
