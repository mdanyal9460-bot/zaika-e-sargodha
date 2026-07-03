import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', padding: '60px 0 20px', marginTop: '80px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        
        <div>
          <h3 style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', marginBottom: '16px' }}>
            Zaika-e-Sargodha
          </h3>
          <p style={{ color: '#e0e0e0', lineHeight: 1.6, marginBottom: '24px' }}>
            Bringing the authentic, homemade taste of Pakistan straight to your dining table. Fresh, hygienic, and prepared with love.
          </p>
        </div>

        <div>
          <h4 style={{ color: 'var(--color-white)', marginBottom: '20px', fontSize: '1.2rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link href="/#menu" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Our Menu</Link></li>
            <li><Link href="/#deals" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Deals & Offers</Link></li>
            <li><Link href="/#about" style={{ color: '#e0e0e0', textDecoration: 'none' }}>About Us</Link></li>
            <li><Link href="#contact" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--color-white)', marginBottom: '20px', fontSize: '1.2rem' }}>Legal</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link href="/privacy-policy" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Privacy Policy</Link></li>
            <li><Link href="/terms-conditions" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Terms & Conditions</Link></li>
            <li><Link href="/refund-policy" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Refund Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--color-white)', marginBottom: '20px', fontSize: '1.2rem' }}>Contact Us</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', color: '#e0e0e0' }}>
            <li>📞 +92 300 0000000</li>
            <li>✉️ order@zaikaesargodha.com</li>
            <li>📍 Main Boulevard, Sargodha, Pakistan</li>
          </ul>
        </div>

      </div>
      
      <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', color: '#aaa', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} Zaika-e-Sargodha. All rights reserved.</p>
      </div>
    </footer>
  );
}
