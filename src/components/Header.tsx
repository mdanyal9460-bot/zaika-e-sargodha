"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link href="/" className="header-logo">
          Zaika-e-Sargodha
        </Link>
        
        <nav className="header-nav">
          <Link href="#menu" className="header-link">Menu</Link>
          <Link href="#deals" className="header-link">Deals & Offers</Link>
          <Link href="#catering" className="header-link">Catering</Link>
          <Link href="#about" className="header-link">About Us</Link>
        </nav>

        <div className="header-actions">
          <a href="#" className="header-link">FoodPanda</a>
          <a href="#" className="header-link">WhatsApp</a>
          <button onClick={toggleCart} className="cart-icon" style={{background:'none', border:'none', cursor:'pointer'}}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
