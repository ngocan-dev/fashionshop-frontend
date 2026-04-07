export type Payment = {
  id: string;
  orderId: string;
  method: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  transactionRef?: string;
  createdAt?: string;
};

export type PayOrderRequest = {
  paymentMethod: string;
  transactionRef?: string;
};
