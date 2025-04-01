// lib/utils.ts

/**
 * Formats a date string to a readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g. "31 mars 2023")
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "Non spécifiée";
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

/**
 * Formats a number as currency
 * @param amount - The amount to format (can be string or number)
 * @param currency - Currency code (default: 'EUR')
 * @returns Formatted currency string (e.g. "10 000,00 €")
 */
export function formatCurrency(
  amount: string | number, 
  currency: string = 'EUR'
): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) return "0,00 €";
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericAmount);
}

/**
 * Utility function to combine class names
 */
export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}