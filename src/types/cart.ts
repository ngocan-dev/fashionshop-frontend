import type { Product } from './product';

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
};

export type Cart = {
  id: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
};

export type AddCartItemRequest = {
  productId: string;
  quantity: number;
};

export type UpdateCartItemRequest = {
  quantity: number;
};
