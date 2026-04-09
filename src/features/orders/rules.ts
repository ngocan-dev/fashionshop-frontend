import type { Order, OrderStatus } from '@/types/order';
import type { Payment } from '@/types/payment';

const cancellableStatuses: OrderStatus[] = ['PENDING', 'CONFIRMED'];
const payableStatuses: OrderStatus[] = ['PENDING', 'CONFIRMED', 'PROCESSING'];

export function isOrderCancellable(status: OrderStatus) {
  return cancellableStatuses.includes(status);
}

export function isOrderPayable(order: Order, payment?: Payment | null) {
  if (order.paymentMethod === 'COD') return false;
  if (!payableStatuses.includes(order.status)) return false;
  if (payment?.status === 'PAID') return false;
  return true;
}
