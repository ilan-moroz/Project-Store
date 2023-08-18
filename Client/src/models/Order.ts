export interface Order {
  id?: string;
  customerId: string;
  cartId: string;
  finalPrice: number;
  deliveryCity: string;
  deliveryStreet: string;
  deliveryDate: string;
  paymentMethodLast4Digits: string;
}
