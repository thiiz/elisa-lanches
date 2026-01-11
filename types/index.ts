export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string;
}

export interface CartItem extends Product {
  quantity: number;
  cartId: number;
}

export interface Order {
  id: number;
  timestamp: string;
  status: string;
  customer: {
    name: string;
    address: string;
    payment: string;
  };
  items: {
    name: string;
    qty: number;
    price: number;
  }[];
  total: string;
  totalValue: number;
}
