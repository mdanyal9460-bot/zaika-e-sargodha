"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ProductModal from '@/components/ProductModal';
import { menuData } from '@/data/menuData';

export default function FeaturedDishes() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const mainCourseCategory = menuData.find(cat => cat.categoryId === 'main-course');
  const featuredDishes = mainCourseCategory 
    ? [
        mainCourseCategory.items.find(i => i.id === 'mc-3'), // Biryani
        mainCourseCategory.items.find(i => i.id === 'mc-13'), // Karahi
        mainCourseCategory.items.find(i => i.id === 'mc-4')  // Economy Deal
      ].filter(Boolean) as any[]
    : [];

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
                  style={{ width: '100%' }}
                  onClick={() => setSelectedProduct(dish)}
                >
                  Order Options
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
