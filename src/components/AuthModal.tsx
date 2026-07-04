"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, LogIn } from 'lucide-react';
import { useTracking } from '@/context/TrackingContext';
import { toast } from 'react-hot-toast';

export default function AuthModal() {
  const { isAuthModalOpen, toggleAuthModal, registerCustomer, loginCustomer, currentUser } = useTracking();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      if (activeTab === 'register') {
        const success = await registerCustomer(customerId, password);
        if (success) {
          toast.success('Registration successful! Welcome to Zaika-e-Sargodha.');
          toggleAuthModal();
        } else {
          toast.error('Customer ID already exists. Please login.');
        }
      } else {
        const success = await loginCustomer(customerId, password);
        if (success) {
          toast.success('Login successful!');
          toggleAuthModal();
        } else {
          toast.error('Invalid Customer ID or Password.');
        }
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && !currentUser && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cart-backdrop"
            onClick={toggleAuthModal}
            style={{ zIndex: 2000 }}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glassmorphism"
            style={{ 
              position: 'fixed', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              zIndex: 2001,
              width: '90%',
              maxWidth: '400px',
              padding: '30px',
              borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-heavy)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', color: 'var(--color-primary)' }}>
                {activeTab === 'login' ? 'Welcome Back' : 'Join the Empire'}
              </h3>
              <button onClick={toggleAuthModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
              <button 
                onClick={() => setActiveTab('login')}
                style={{ 
                  flex: 1, 
                  padding: '10px', 
                  border: 'none', 
                  background: activeTab === 'login' ? 'var(--color-primary)' : 'rgba(128,0,0,0.1)',
                  color: activeTab === 'login' ? '#fff' : 'var(--color-primary)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <LogIn size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Login
              </button>
              <button 
                onClick={() => setActiveTab('register')}
                style={{ 
                  flex: 1, 
                  padding: '10px', 
                  border: 'none', 
                  background: activeTab === 'register' ? 'var(--color-primary)' : 'rgba(128,0,0,0.1)',
                  color: activeTab === 'register' ? '#fff' : 'var(--color-primary)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <UserPlus size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px', color: 'var(--color-text)' }}>Customer ID (Username)</label>
                <input 
                  type="text" 
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  placeholder="e.g., shadow_01"
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: 'var(--border-radius-sm)', 
                    border: '1px solid #ccc',
                    fontSize: '1rem',
                    background: 'rgba(255,255,255,0.8)'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px', color: 'var(--color-text)' }}>Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: 'var(--border-radius-sm)', 
                    border: '1px solid #ccc',
                    fontSize: '1rem',
                    background: 'rgba(255,255,255,0.8)'
                  }}
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary" 
                style={{ width: '100%', marginTop: '10px', padding: '14px', fontSize: '1.1rem' }}
              >
                {isLoading ? 'Processing...' : activeTab === 'login' ? 'Login Securely' : 'Create Account'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
