"use client";

import React, { useState, useEffect } from 'react';
import { useTracking, ArchivedOrder } from '@/context/TrackingContext';
import { useRouter } from 'next/navigation';
import { LogOut, Key, CheckCircle, XCircle, TrendingUp, Award, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function UserDashboard() {
  const { currentUser, logoutCustomer, getUserHistory, changePassword } = useTracking();
  const router = useRouter();
  
  const [history, setHistory] = useState<ArchivedOrder[]>([]);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [isUpdatingPass, setIsUpdatingPass] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
    } else {
      setHistory(getUserHistory(currentUser.customerId));
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  // Analytics Computation
  const totalSpent = history.reduce((sum, order) => sum + (order.finalStatus === 'Delivered' ? order.total : 0), 0);
  
  const itemFreq: Record<string, number> = {};
  history.forEach(order => {
    if (order.finalStatus === 'Delivered') {
      order.items.forEach(item => {
        itemFreq[item.name] = (itemFreq[item.name] || 0) + item.quantity;
      });
    }
  });
  
  let favoriteDish = 'No data yet';
  let maxFreq = 0;
  for (const [name, count] of Object.entries(itemFreq)) {
    if (count > maxFreq) {
      maxFreq = count;
      favoriteDish = name;
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPass || !newPass) {
      toast.error('Please fill both password fields');
      return;
    }
    setIsUpdatingPass(true);
    const success = await changePassword(oldPass, newPass);
    setIsUpdatingPass(false);
    
    if (success) {
      toast.success('Password updated successfully!');
      setOldPass('');
      setNewPass('');
    } else {
      toast.error('Incorrect current password.');
    }
  };

  const handleLogout = () => {
    logoutCustomer();
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <div className="container" style={{ padding: '120px 20px 60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-playfair)', color: 'var(--color-primary)', margin: '0 0 10px 0', fontSize: '2.5rem' }}>
            Empire Dashboard
          </h1>
          <p style={{ color: 'var(--color-text)', margin: 0, fontSize: '1.1rem' }}>
            Welcome back, <strong>{currentUser.customerId}</strong>
          </p>
        </div>
        <button 
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(128,0,0,0.1)', color: 'var(--color-primary)', border: 'none', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer', fontWeight: 'bold' }}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        
        {/* Analytics Engine */}
        <div className="glassmorphism" style={{ padding: '30px', borderRadius: 'var(--border-radius-lg)', gridColumn: '1 / -1' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair)', color: 'var(--color-primary)', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={24} /> Analytics Engine
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.5)', padding: '20px', borderRadius: 'var(--border-radius-sm)', textAlign: 'center' }}>
              <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Empire Investment</p>
              <h3 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '2rem' }}>Rs. {totalSpent.toLocaleString()}</h3>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.5)', padding: '20px', borderRadius: 'var(--border-radius-sm)', textAlign: 'center' }}>
              <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Most Ordered Dish</p>
              <h3 style={{ margin: 0, color: 'var(--color-accent)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Award size={20} /> {favoriteDish}
              </h3>
            </div>
          </div>
        </div>

        {/* Order Ledger */}
        <div className="glassmorphism" style={{ padding: '30px', borderRadius: 'var(--border-radius-lg)' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair)', color: 'var(--color-primary)', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={24} /> Historical Ledger
          </h2>
          
          <div style={{ marginTop: '20px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
            {history.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center', marginTop: '40px' }}>No orders placed yet.</p>
            ) : (
              history.map(order => (
                <div key={order.id} style={{ background: 'rgba(255,255,255,0.6)', padding: '16px', borderRadius: '8px', marginBottom: '16px', borderLeft: `4px solid ${order.finalStatus === 'Delivered' ? '#28a745' : '#dc3545'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <strong style={{ color: '#333' }}>{order.id}</strong>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      background: order.finalStatus === 'Delivered' ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
                      color: order.finalStatus === 'Delivered' ? '#28a745' : '#dc3545',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {order.finalStatus === 'Delivered' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                      {order.finalStatus}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '10px' }}>
                    {new Date(order.placedAt).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#444' }}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{item.quantity}x {item.name}</span>
                        <span>Rs. {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px dashed #ccc', marginTop: '10px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                    <span>Total</span>
                    <span>Rs. {order.total}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Profile Management */}
        <div className="glassmorphism" style={{ padding: '30px', borderRadius: 'var(--border-radius-lg)', height: 'fit-content' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair)', color: 'var(--color-primary)', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Key size={24} /> Profile Security
          </h2>
          <form onSubmit={handlePasswordChange} style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px', color: 'var(--color-text)' }}>Current Password</label>
              <input 
                type="password" 
                value={oldPass}
                onChange={e => setOldPass(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ccc', background: 'rgba(255,255,255,0.8)' }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px', color: 'var(--color-text)' }}>New Password</label>
              <input 
                type="password" 
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ccc', background: 'rgba(255,255,255,0.8)' }}
              />
            </div>
            <button 
              type="submit"
              disabled={isUpdatingPass}
              className="btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              {isUpdatingPass ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
