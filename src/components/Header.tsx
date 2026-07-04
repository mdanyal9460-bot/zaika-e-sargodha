"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useTracking } from '@/context/TrackingContext';
import { MapPin, User } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const { toggleTracker, activeOrder, toggleAuthModal, currentUser, logoutCustomer } = useTracking();

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
          {activeOrder && (
            <button 
              onClick={toggleTracker} 
              className="btn-secondary" 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', fontSize: '0.9rem' }}
            >
              <MapPin size={16} /> <span className="mobile-hidden">Track Order</span>
            </button>
          )}

          {currentUser ? (
            <Link 
              href="/dashboard"
              className="header-link"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: 'inherit' }}
              title={`Logged in as ${currentUser.customerId}`}
            >
              <User size={18} />
              <span className="mobile-hidden">Dashboard</span>
            </Link>
          ) : (
            <button 
              onClick={toggleAuthModal}
              className="header-link"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit' }}
              title="Login / Register"
            >
              <User size={18} />
              <span className="mobile-hidden">Login</span>
            </button>
          )}

          <button onClick={toggleCart} className="cart-icon" style={{background:'none', border:'none', cursor:'pointer'}}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
