export function formatAmount(amount) {
  if (amount == null || typeof amount !== 'number') {
    return '';
  }

  return amount.toFixed(1);
}
