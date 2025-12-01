// Validation logic for payments
export const validatePaymentAmount = (amount: number): boolean => {
  return amount > 0;
};
