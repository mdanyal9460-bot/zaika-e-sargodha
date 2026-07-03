"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ProductModal from '@/components/ProductModal';

export default function FeaturedDishes() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const featuredDishes = [
    {
      id: 1,
      name: "Chicken Biryani",
      price: "Rs. 450",
      image: "/biryani.png",
      description: "Aromatic basmati rice cooked with tender chicken pieces, blended with our secret spices and served with fresh raita."
    },
    {
      id: 2,
      name: "Chicken Karahi",
      price: "Rs. 850",
      image: "/karahi.png",
      description: "Classic street-style chicken karahi cooked in tomatoes, green chilies, and fresh ginger for that authentic dhaba taste."
    },
    {
      id: 3,
      name: "Chicken Pulao",
      price: "Rs. 400",
      image: "/biryani.png",
      description: "Delicately spiced chicken pulao made with rich broth and premium long-grain rice. Comfort food at its finest."
    }
  ];

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
