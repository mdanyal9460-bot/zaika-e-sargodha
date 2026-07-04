"use client";

import React from 'react';
import Image from 'next/image';
import { X, CheckCircle, Clock, Utensils, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number | string;
    name: string;
    price: string;
    image: string;
    description?: string;
  } | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    const numPrice = parseInt(product.price.replace(/\D/g, ''), 10);
    
    addToCart({ 
      id: product.id, 
      name: product.name, 
      price: numPrice, 
      image: product.image, 
      quantity: 1 
    });
    
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: 'var(--color-primary)',
        color: 'var(--color-white)',
        borderRadius: '50px',
        fontWeight: '500'
      },
      iconTheme: {
        primary: 'var(--color-accent)',
        secondary: 'var(--color-primary)',
      },
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ display: 'block', visibility: 'visible' }}
          />
          <motion.div 
            className="modal-container"
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ display: 'block', visibility: 'visible' }}
          >
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>
            
            <div className="modal-grid">
              <div className="modal-image-col">
                <div className="modal-image-wrapper">
                  <Image src={product.image} alt={product.name} fill style={{objectFit: 'cover'}} />
                </div>
              </div>
              
              <div className="modal-content-col">
                <div className="modal-badges">
                  <span className="trust-badge"><CheckCircle size={14} /> Authentic Recipe</span>
                  <span className="trust-badge"><Utensils size={14} /> Premium Hygiene</span>
                </div>
                
                <h2 style={{marginBottom: '8px'}}>{product.name}</h2>
                <div className="modal-price">{product.price}</div>
                
                <p className="modal-description">
                  {product.description || "Experience the authentic taste of homemade Pakistani cuisine, prepared with the finest ingredients and delivered fresh."}
                </p>
                
                <div className="modal-meta">
                  <div className="meta-item"><Utensils size={16} /> 1 Serving</div>
                  <div className="meta-item"><Clock size={16} /> 30-45 mins</div>
                </div>
                
                <div className="modal-actions">
                  <button className="btn-primary full-width" onClick={handleAddToCart}>
                    <ShoppingBag size={18} style={{marginRight: '8px'}}/> Add to Cart
                  </button>
                  
                  <div className="external-order-buttons">
                    <button 
                      onClick={() => {
                        import('@/utils/whatsapp').then(({ getWhatsAppLink }) => {
                          const link = getWhatsAppLink(`I'd like to order ${product.name}`);
                          window.open(link, '_blank');
                        });
                      }}
                      className="btn-whatsapp"
                    >
                      <MessageCircle size={18} style={{marginRight: '8px'}}/> Order via WhatsApp
                    </button>
                    <button className="btn-foodpanda">
                      Order via FoodPanda
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
