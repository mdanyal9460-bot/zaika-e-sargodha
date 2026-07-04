export const getWhatsAppLink = (message: string): string => {
  // Load balancing logic: Randomly select between the two numbers
  const numbers = ["923000253932", "923066973844"];
  const selectedNumber = numbers[Math.floor(Math.random() * numbers.length)];
  
  return `https://wa.me/${selectedNumber}?text=${encodeURIComponent(message)}`;
};

export const sendOrderToWhatsApp = (cartItems: any[], cartTotal: number): void => {
  if (cartItems.length === 0) return;

  const itemList = cartItems.map(item => `${item.quantity}x ${item.name}`).join(', ');
  const message = `Hi Zaikai Sargodha, I would like to order: ${itemList} for a total of ${cartTotal} PKR.`;
  
  const link = getWhatsAppLink(message);
  
  // Open WhatsApp in a new tab
  window.open(link, '_blank');
};
