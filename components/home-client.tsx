"use client";

import { CartModal } from "@/components/cart/CartModal";
import { CheckoutModal } from "@/components/cart/CheckoutModal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { Hero } from "@/components/sections/Hero";
import { ProductSection } from "@/components/sections/ProductSection";
import { FloatButtons } from "@/components/ui/FloatButtons";
import { Toast } from "@/components/ui/Toast";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";
import { useState } from "react";

interface HomeClientProps {
  products: Product[];
  combos: Product[];
}

export function HomeClient({ products, combos }: HomeClientProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const {
    cart,
    total,
    totalQuantity,
    cartShake,
    addToCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setToastMsg(`Adicionado: ${product.name.split("(")[0]}`);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const handleWhatsAppCheckout = (formData: {
    name: string;
    address: string;
    payment: string;
  }) => {
    const orderData = {
      customer: formData,
      items: cart.map((i) => ({ name: i.name, qty: i.quantity, price: i.price })),
      total: total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      totalValue: total,
    };

    const itemsList = cart
      .map((item) => `▪️ ${item.quantity}x ${item.name}`)
      .join("\n");

    const message = `*Novo Pedido - Elisa Salgados*\n------------------------------\n*Cliente:* ${formData.name}\n*Endereço:* ${formData.address}\n*Pagamento:* ${formData.payment}\n------------------------------\n*Itens:*\n${itemsList}\n------------------------------\n*Total:* ${orderData.total}`;

    window.open(
      `https://wa.me/5551990070708?text=${encodeURIComponent(message)}`,
      "_blank",
    );

    setToastMsg("Pedido enviado e salvo!");
    setTimeout(() => setToastMsg(null), 3000);
    setIsCheckoutOpen(false);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-stone-50 transition-colors duration-300 dark:bg-slate-900">
      <Header
        cartShake={cartShake}
        totalQuantity={totalQuantity}
        onCartClick={() => setIsCartOpen(true)}
      />

      <Hero />

      <ProductSection
        products={products}
        combos={combos}
        onAdd={handleAddToCart}
      />

      <AboutSection />

      <Footer />
      <FloatButtons />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        total={total}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={handleWhatsAppCheckout}
      />

      <Toast message={toastMsg} show={!!toastMsg} />
    </div>
  );
}
