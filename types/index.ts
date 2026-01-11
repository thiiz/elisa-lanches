export type Category = "combos especiais" | "nosso salgados";

export interface Product {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  category: Category;
}

export interface CartItem extends Product {
  quantity: number;
  cartId: string;
}


