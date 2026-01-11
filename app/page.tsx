"use client";

import { useEffect, useState } from "react";
import { CartModal } from "../components/cart/CartModal";
import { CheckoutModal } from "../components/cart/CheckoutModal";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { AboutSection } from "../components/sections/AboutSection";
import { Hero } from "../components/sections/Hero";
import { ProductSection } from "../components/sections/ProductSection";

import { FloatButtons } from "../components/ui/FloatButtons";
import { Toast } from "../components/ui/Toast";
import { useCart } from "../hooks/useCart";
import { Product } from "../types";

export default function Home() {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [combos, setCombos] = useState<Product[]>([]);

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || "Erro ao carregar produtos");
        }
        
        const allProducts: Product[] = data.products;
        setProducts(allProducts.filter(p => p.category === "nossos salgados"));
        setCombos(allProducts.filter(p => p.category === "combos especiais"));
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setToastMsg("Erro ao carregar produtos");
        setTimeout(() => setToastMsg(null), 3000);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
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

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        </div>
      ) : (
        <ProductSection
          products={products}
          combos={combos}
          onAdd={handleAddToCart}
        />
      )}

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

