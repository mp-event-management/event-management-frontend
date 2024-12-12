export type PromoData = {
  event: { eventId: number };
  promotionType: string;
  promotionCode: string;
  discountPercentage: number;
  availableUses?: number;
  startDate: Date;
  endDate: Date;
}