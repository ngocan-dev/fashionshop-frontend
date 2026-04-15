export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type PaymentMethod = 'COD' | 'CARD' | 'BANK_TRANSFER' | 'E_WALLET' | 'MOMO';

export type OrderFilter = {
  keyword?: string;
  status?: OrderStatus | '';
  page?: number;
  size?: number;
};

export type OrderSummaryItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  imageUrl?: string;
};

export type Order = {
  id: string;
  orderNumber?: string;
  status: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  customerName?: string;
  customerEmail?: string;
  customerAvatar?: string;
  customerTotalOrders?: number;
  items: OrderSummaryItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  createdAt?: string;

  // New fields for details UI
  shippingAddress?: string;
  note?: string;
  activityLog?: Array<{
    status: string;
    timestamp: string;
    isPrimary?: boolean;
  }>;
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
