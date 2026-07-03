import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/923000000000?text=Hello%20Zaika-e-Sargodha!%20I'd%20like%20to%20place%20an%20order." 
      target="_blank" 
      rel="noreferrer" 
      className="fab-whatsapp"
    >
      <MessageCircle size={32} color="#fff" />
    </a>
  );
}
