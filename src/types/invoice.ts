export type Invoice = {
  id: string;
  orderId: string;
  invoiceNumber?: string;
  billingName: string;
  billingAddress: string;
  total: number;
  issuedAt?: string;
};
