export interface Review {
  id: number;
  text: string;
}

export interface Product {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductsResponse {
  page: number;
  amount: number;
  total: number;
  products: Product[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (product: Product) => void;
  getTotalItems: () => number;
  clearCart: () => void;
}

export interface OrderCart {
  id: number;
  quantity: number;
}
export interface Order {
  phone: string;
  cart: OrderCart[];
}

export interface OrderResponse {
  success: number;
  error?: string;
}
