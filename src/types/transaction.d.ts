export type TransactionDetail = {
  transactionId: number;
  eventId: number;
  customerId: number;
  customerName: string;
  eventName: string;
  eventStartDate: string;
  eventEndDate: Date;
  eventCityLocation: string;
  eventAddress: string;
  promotionId: number;
  ticketQuantity: number;
  ticketPrice: number;
  discountPercentage: number;
  totalDiscount: number;
  referralPointsUsed: number;
  finalPrice: umber;
  paymentStatus: string;
  invoiceCode: string;
};