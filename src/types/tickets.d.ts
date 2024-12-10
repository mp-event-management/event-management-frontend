export type Ticket = {
  id: number;
  transactionId: number;
  eventId: number;
  customerId: number;
  customerName: string;
  eventName: string;
  eventImagesUrl: string;
  eventStartDate: Date;
  eventEndDate: Date;
  price: number;
  status: string;
  issuedate: Date;
  validUntil: Date;
};

export type TicketDetails = {
  id: number;
  transactionId: number;
  eventId: number;
  customerId: number;
  customerName: string;
  eventName: string;
  eventImagesUrl: string;
  eventStartDate: Date;
  eventEndDate: Date;
  price: number;
  status: string;
  issuedate: Date;
  validUntil: Date;
};
