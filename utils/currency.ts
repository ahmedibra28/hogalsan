export const currency = (amount: number) =>
  Number(amount)?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
