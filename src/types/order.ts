export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export type PaymentMethod = 'COD' | 'CARD' | 'BANK_TRANSFER' | 'E_WALLET';

export type OrderSummaryItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type Order = {
  id: string;
  orderNumber?: string;
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  items: OrderSummaryItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  createdAt?: string;
};

export type CheckoutSummary = {
  items: OrderSummaryItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
};

export type CreateOrderRequest = {
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  note?: string;
};
