"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ProductModal from '@/components/ProductModal';
import { useMenuData } from '@/hooks/useMenuData';
import { useTracking } from '@/context/TrackingContext';

export default function FeaturedDishes() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { menuData, loading } = useMenuData();
  const { isShopClosed } = useTracking();

  if (loading) return null;

  // Flatten all items and only include active ones
  const allItems = menuData.flatMap(category => category.items).filter(item => item.isActive);
  
  // Extract the exact 6 premium items requested by Alpha
  const featuredDishes = [
    allItems.find(i => i.id === 'mc-3'),  // Shahi Hyderabadi Biryani
    allItems.find(i => i.id === 'mc-9'),  // Chicken Karahi
    allItems.find(i => i.id === 'des-1'), // Special Sugi ka halwa
    allItems.find(i => i.id === 'mc-7'),  // Beef Korma
    allItems.find(i => i.id === 'mc-1'),  // Homestyle Bhindi Chicken
    allItems.find(i => i.id === 'dl-1')   // Deal 1
  ].filter(Boolean) as any[];

  return (
    <>
      <section className="section container" id="menu">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2>Featured Dishes</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
            Experience our most loved, authentic recipes prepared fresh every day.
          </p>
        </div>

        <div className="grid-3">
          {featuredDishes.map((dish) => (
            <div className="card" key={dish.id}>
              <div style={{ position: 'relative', width: '100%', height: '280px' }}>
                <Image 
                  src={dish.image} 
                  alt={dish.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="dish-card-img"
                />
              </div>
              <div className="dish-card-content">
                <h3>{dish.name}</h3>
                <div className="dish-price">{dish.price}</div>
                <button 
                  className="btn-primary" 
                  style={{ 
                    width: '100%', 
                    opacity: isShopClosed ? 0.5 : 1, 
                    cursor: isShopClosed ? 'not-allowed' : 'pointer' 
                  }}
                  onClick={() => !isShopClosed && setSelectedProduct(dish)}
                  disabled={isShopClosed}
                >
                  {isShopClosed ? 'Kitchen Closed' : 'Order Options'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProductModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </>
  );
}
