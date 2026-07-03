"use client";

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartSidebar() {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            style={{ display: 'block', visibility: 'visible' }}
          />
          
          <motion.div 
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ display: 'flex', right: 0 }}
          >
            <div className="cart-header">
              <h2>Your Order</h2>
              <button onClick={toggleCart} className="cart-close-btn">
                <X size={24} />
              </button>
            </div>
            
            <div className="cart-body">
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={48} color="#ccc" style={{margin: '0 auto 16px'}} />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="cart-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-img">
                        <Image src={item.image} alt={item.name} fill style={{objectFit: 'cover'}} />
                      </div>
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <div className="cart-item-price">Rs. {item.price}</div>
                        <div className="cart-item-quantity">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-subtotal">
                  <span>Subtotal</span>
                  <span>Rs. {cartTotal}</span>
                </div>
                <a 
                  href={`https://wa.me/923000000000?text=${encodeURIComponent(`Hello Zaika-e-Sargodha! I would like to place an order:\n\n${cartItems.map(item => `${item.quantity}x ${item.name} (Rs. ${item.price * item.quantity})`).join('\n')}\n\nTotal: Rs. ${cartTotal}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary checkout-btn" 
                  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                  onClick={() => {/* optional tracking or clearing */}}
                >
                  Checkout via WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
