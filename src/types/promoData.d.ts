export type PromoData = {
  event: { eventId: number };
  promotionType: string;
  promotionCode: string;
  discountPercentage: number;
  availableUses?: number;
  startDate: string | Date;
  endDate: string | Date;
}