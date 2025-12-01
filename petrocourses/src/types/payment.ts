export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  paymentMethod: string;
}
