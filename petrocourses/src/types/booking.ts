export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  date: Date;
  status: "pending" | "confirmed" | "cancelled";
}
