"use client";

import React from 'react';
import Image from 'next/image';
import { menuData } from '@/data/menuData';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';

export default function Menu() {
  const { addToCart } = useCart();

  const handleAddToOrder = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image || '/hero.png',
      quantity: 1
    });

    toast.success(`${item.name} added to order!`, {
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
  };

  return (
    <section className="section container" id="full-menu" style={{ paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-playfair)' }}>Our Full Menu</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem', color: 'var(--color-text)' }}>
          Authentic, fresh, and meticulously prepared. Choose from our wide selection of homemade specialties.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {menuData.map((category) => (
          <div key={category.categoryId} className="menu-category-section">
            <h3 style={{ 
              fontSize: '2rem', 
              color: 'var(--color-primary)', 
              borderBottom: '2px solid var(--color-accent)',
              paddingBottom: '10px',
              marginBottom: '30px',
              display: 'inline-block'
            }}>
              {category.categoryName}
            </h3>
            
            <div className="grid-3">
              {category.items.map((item, idx) => (
                <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                    <Image 
                      src={item.image || '/hero.png'} 
                      alt={item.name} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={idx < 3} /* Priority for top row items */
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-text)' }}>{item.name}</h4>
                      <div style={{ color: '#B8860B', fontWeight: '700', fontSize: '1.2rem', marginBottom: '16px' }}>
                        Rs. {item.price}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToOrder(item)}
                      className="btn-primary"
                      style={{ 
                        width: '100%', 
                        padding: '12px 20px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '1rem',
                        minHeight: '54px', /* Ensuring touch target meets guidelines */
                        marginTop: 'auto'
                      }}
                    >
                      <Plus size={18} /> Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
