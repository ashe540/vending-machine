export const isValidDepositAmount = (amount: number) => {
  const validDepositAmounts = [5, 10, 20, 50, 100];
  return validDepositAmounts.includes(amount);
};
