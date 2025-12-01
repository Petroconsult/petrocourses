export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "completed" | "failed";
};
