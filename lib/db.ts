import { Order, Product } from "../types";

export class LocalDatabase {
  private dbName = "elisa_salgados_db";

  getProducts(): Product[] {
    return [
      {
        id: 4,
        name: "Mini Churros (10 un)",
        desc: "Cilíndricos com açúcar e canela",
        price: 9.99,
        img: "https://res.cloudinary.com/dk7i8ud3p/image/upload/v1768100389/WhatsApp_Image_2026-01-10_at_22.47.10_kxa52n.jpg",
      },
      {
        id: 5,
        name: "Coxinha de Frango (10 un)",
        desc: "Formato gota com tempero verde",
        price: 9.99,
        img: "https://res.cloudinary.com/dk7i8ud3p/image/upload/v1768100775/Gemini_Generated_Image_y4c6m9y4c6m9y4c6_yrfglv.png",
      },
      {
        id: 6,
        name: "Coxinha de Queijo (10 un)",
        desc: "Recheada com muito queijo",
        price: 9.99,
        img: "https://res.cloudinary.com/dk7i8ud3p/image/upload/v1768104425/WhatsApp_Image_2026-01-11_at_01.02.15_1_fb1baa.jpg",
      },
      {
        id: 7,
        name: "Coxinha de Carne (10 un)",
        desc: "Recheada com carne moída temperada",
        price: 9.99,
        img: "https://res.cloudinary.com/dk7i8ud3p/image/upload/v1768104425/WhatsApp_Image_2026-01-11_at_01.02.15_2_ysr1ku.jpg",
      },
      {
        id: 8,
        name: "Coxinha de Presunto e Queijo (10 un)",
        desc: "Recheada com presunto e queijo",
        price: 9.99,
        img: "https://res.cloudinary.com/dk7i8ud3p/image/upload/v1768104425/WhatsApp_Image_2026-01-11_at_01.02.15_ydylpd.jpg",
      },
    ];
  }

  getCombos(): Product[] {
    return [
      {
        id: 101,
        name: "Festa Completa",
        desc: "100 salgadinhos + 2L Guaraná",
        price: 69.99,
        img: "https://res.cloudinary.com/dk7i8ud3p/image/upload/v1768107584/Gemini_Generated_Image_e2oi0re2oi0re2oi_1_t67g0w.png",
      },
      {
        id: 102,
        name: "Galera Feliz",
        desc: "25 Salgadinhos + 10 mini churros + 1 Coca lata",
        price: 24.99,
        img: "https://res.cloudinary.com/dk7i8ud3p/image/upload/v1768107584/Gemini_Generated_Image_9284ke9284ke9284_yk5ugk.png",
      },
      {
        id: 103,
        name: "Sobremesa",
        desc: "20 mini churros",
        price: 11.99,
        img: "https://res.cloudinary.com/dk7i8ud3p/image/upload/v1768100389/WhatsApp_Image_2026-01-10_at_23.33.12_1_wdjjfw.jpg",
      },
    ];
  }

  saveOrder(orderData: Omit<Order, "id" | "timestamp" | "status">): Order {
    if (typeof window === "undefined") return {} as Order;
    const orders = this.getAllOrders();
    const newOrder: Order = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: "Pendente",
      ...orderData,
    };
    orders.push(newOrder);
    localStorage.setItem(this.dbName, JSON.stringify(orders));
    return newOrder;
  }

  getAllOrders(): Order[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(this.dbName);
    return data ? JSON.parse(data) : [];
  }
}

export const db = new LocalDatabase();
