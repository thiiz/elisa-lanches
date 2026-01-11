"use client";

import { useEffect, useState } from "react";
import { CartModal } from "../components/cart/CartModal";
import { CheckoutModal } from "../components/cart/CheckoutModal";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { AboutSection } from "../components/sections/AboutSection";
import { Hero } from "../components/sections/Hero";
import { ProductSection } from "../components/sections/ProductSection";
import { AdminPanel } from "../components/ui/AdminPanel";
import { FloatButtons } from "../components/ui/FloatButtons";
import { Toast } from "../components/ui/Toast";
import { useCart } from "../hooks/useCart";
import { db } from "../lib/db";
import { Order, Product } from "../types";

export default function Home() {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [combos, setCombos] = useState<Product[]>([]);
  const [dbOrders, setDbOrders] = useState<Order[]>([]);
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

  useEffect(() => {
    setProducts(db.getProducts());
    setCombos(db.getCombos());
    setDbOrders(db.getAllOrders());
  }, []);



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

    db.saveOrder(orderData);
    setDbOrders(db.getAllOrders());

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

      <Footer onAdminClick={() => setIsAdminOpen(true)} />

      <FloatButtons
        onCartClick={() => setIsCartOpen(true)}
        totalQuantity={totalQuantity}
      />

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

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={dbOrders}
      />

      <Toast message={toastMsg} show={!!toastMsg} />
    </div>
  );
}
