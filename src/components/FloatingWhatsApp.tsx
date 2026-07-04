"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <button 
      onClick={() => {
        import('@/utils/whatsapp').then(({ getWhatsAppLink }) => {
          const link = getWhatsAppLink("Hello Zaika-e-Sargodha! I'd like to place an order.");
          window.open(link, '_blank');
        });
      }}
      className="fab-whatsapp"
      style={{ border: 'none', cursor: 'pointer' }}
    >
      <MessageCircle size={32} color="#fff" />
    </button>
  );
}
