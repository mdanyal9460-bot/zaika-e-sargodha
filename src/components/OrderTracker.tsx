"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ChefHat, Bike, CheckCircle } from 'lucide-react';
import { useTracking, OrderStatus } from '@/context/TrackingContext';

const STATUS_STAGES = [
  { status: 'Pending', icon: Clock, label: 'Pending' },
  { status: 'In Kitchen', icon: ChefHat, label: 'In Kitchen' },
  { status: 'Out for Delivery', icon: Bike, label: 'On the Way' },
  { status: 'Delivered', icon: CheckCircle, label: 'Delivered' }
];

export default function OrderTracker() {
  const { isTrackerOpen, toggleTracker, activeOrder, currentStatus, clearTracking } = useTracking();

  const getCurrentStageIndex = () => {
    return STATUS_STAGES.findIndex(stage => stage.status === currentStatus);
  };

  const currentIndex = getCurrentStageIndex();

  return (
    <AnimatePresence>
      {isTrackerOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cart-backdrop"
            onClick={toggleTracker}
            style={{ zIndex: 1000 }}
          />
          
          {/* Tracker Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="cart-sidebar glassmorphism"
            style={{ zIndex: 1001, padding: '24px' }}
          >
            <div className="cart-header" style={{ marginBottom: '30px' }}>
              <h3>Live Order Tracking</h3>
              <button onClick={toggleTracker} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }}>
                <X size={24} />
              </button>
            </div>

            {!activeOrder ? (
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <Clock size={48} color="var(--color-primary)" style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p>No active orders found.</p>
              </div>
            ) : (
              <div>
                <div style={{ background: 'var(--color-white)', padding: '16px', borderRadius: 'var(--border-radius-lg)', marginBottom: '30px', boxShadow: 'var(--shadow-soft)' }}>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Order ID: {activeOrder.id}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>Total: Rs. {activeOrder.total}</div>
                </div>

                {/* Vertical Progress Tracker */}
                <div style={{ position: 'relative', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  {/* Connecting Line */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '32px', 
                    top: '20px', 
                    bottom: '20px', 
                    width: '3px', 
                    background: '#e0e0e0', 
                    zIndex: -1 
                  }} />
                  <div style={{ 
                    position: 'absolute', 
                    left: '32px', 
                    top: '20px', 
                    height: `${(currentIndex / (STATUS_STAGES.length - 1)) * 100}%`,
                    width: '3px', 
                    background: 'var(--color-primary)', 
                    zIndex: -1,
                    transition: 'height 1s ease-in-out'
                  }} />

                  {STATUS_STAGES.map((stage, index) => {
                    const isCompleted = index <= currentIndex;
                    const isActive = index === currentIndex;
                    const Icon = stage.icon;

                    return (
                      <div key={stage.status} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ 
                          width: '28px', 
                          height: '28px', 
                          borderRadius: '50%', 
                          background: isCompleted ? 'var(--color-primary)' : '#e0e0e0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-white)',
                          boxShadow: isActive ? '0 0 0 4px rgba(128, 0, 0, 0.2)' : 'none',
                          transition: 'all 0.3s'
                        }}>
                          {isCompleted ? <CheckCircle size={16} /> : <div style={{width:'8px', height:'8px', borderRadius:'50%', background:'#fff'}}/>}
                        </div>
                        <div>
                          <div style={{ fontWeight: isActive ? 'bold' : 'normal', color: isActive ? 'var(--color-primary)' : 'var(--color-text)', fontSize: '1.1rem' }}>
                            {stage.label}
                          </div>
                          {isActive && (
                            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>
                              {stage.status === 'Pending' && "Waiting for restaurant to confirm..."}
                              {stage.status === 'In Kitchen' && "Chefs are preparing your meal."}
                              {stage.status === 'Out for Delivery' && "Rider is on the way!"}
                              {stage.status === 'Delivered' && "Enjoy your food!"}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {currentStatus === 'Delivered' && (
                  <button 
                    onClick={clearTracking}
                    className="btn-secondary"
                    style={{ width: '100%', marginTop: '40px' }}
                  >
                    Clear Order History
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
