"use client";

import React, { useState, useEffect } from 'react';
import { useTracking, ArchivedOrder, User } from '@/context/TrackingContext';
import { useRouter } from 'next/navigation';
import { Shield, TrendingUp, Users, CheckCircle, XCircle, LogOut, Lock, Edit3, Save, Power, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useMenuData } from '@/hooks/useMenuData';
import { MenuCategory, MenuItem } from '@/types/menu';

export default function HQDashboard() {
  const { 
    currentUser, logoutCustomer, getAllHQOrders, getAllUsers,
    isAdminVerified, verifyAdminState,
    isShopClosed, setShopClosed,
    setAdminTimeOffset
  } = useTracking();
  const router = useRouter();
  
  const [hqOrders, setHqOrders] = useState<ArchivedOrder[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [adminPassword, setAdminPassword] = useState('');
  
  // Menu Editor State
  const { menuData, loading, refetchMenu } = useMenuData();
  const [localMenu, setLocalMenu] = useState<MenuCategory[]>([]);
  const [isSavingMenu, setIsSavingMenu] = useState(false);
  const [timeSlider, setTimeSlider] = useState(0);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/');
    } else {
      setHqOrders(getAllHQOrders());
      setUsers(getAllUsers());
    }
  }, [currentUser, router]);

  useEffect(() => {
    if (menuData.length > 0) {
      setLocalMenu(menuData);
    }
  }, [menuData]);

  if (!currentUser || currentUser.role !== 'admin') return null;

  const handleAdminVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await verifyAdminState(adminPassword);
    if (isValid) {
      toast.success('Access Granted: Welcome to Mission Shadow 04 HQ');
    } else {
      toast.error('Access Denied: Invalid Master Password');
    }
  };

  const handleLogout = () => {
    logoutCustomer();
    toast.success('Admin logged out.');
    router.push('/');
  };

  const handleMenuChange = (categoryId: string, itemId: string, field: keyof MenuItem, value: string | number | boolean) => {
    setLocalMenu(prev => prev.map(cat => {
      if (cat.categoryId !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => {
          if (item.id !== itemId) return item;
          return { ...item, [field]: value };
        })
      };
    }));
  };

  const saveMenuToDisk = async () => {
    setIsSavingMenu(true);
    try {
      const res = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localMenu)
      });
      if (res.ok) {
        toast.success('Menu updated successfully on server');
        refetchMenu();
      } else {
        toast.error('Failed to update menu');
      }
    } catch (err) {
      toast.error('Server error while saving menu');
    } finally {
      setIsSavingMenu(false);
    }
  };

  const toggleEmergencyShutdown = () => {
    setShopClosed(!isShopClosed);
    if (!isShopClosed) {
      toast.error('EMERGENCY: Kitchen is now CLOSED globally.');
    } else {
      toast.success('Kitchen is now OPEN.');
    }
  };

  const handleTimeUpdate = (val: number) => {
    setTimeSlider(val);
    setAdminTimeOffset(val);
  };

  // If not verified with the Master Password, show the lock screen
  if (!isAdminVerified) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glassmorphism" style={{ padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center', borderRadius: 'var(--border-radius-lg)' }}>
          <Shield size={64} style={{ color: 'var(--color-primary)', marginBottom: '20px' }} />
          <h2 style={{ fontFamily: 'var(--font-playfair)', color: 'var(--color-primary)', marginBottom: '20px' }}>HQ Verification</h2>
          <form onSubmit={handleAdminVerify}>
            <input
              type="password"
              placeholder="Enter Master Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="form-input"
              style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ccc' }}
              autoFocus
            />
            <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <Lock size={18} /> Unlock Central Command
            </button>
          </form>
        </div>
      </div>
    );
  }

  // LTV Computation
  const ltvMap: Record<string, { totalSpent: number; totalOrders: number }> = {};
  users.forEach(u => { ltvMap[u.customerId] = { totalSpent: 0, totalOrders: 0 }; });
  hqOrders.forEach(order => {
    if (!ltvMap[order.customerId]) ltvMap[order.customerId] = { totalSpent: 0, totalOrders: 0 };
    ltvMap[order.customerId].totalOrders++;
    if (order.finalStatus === 'Delivered') ltvMap[order.customerId].totalSpent += order.total;
  });
  const ltvArray = Object.keys(ltvMap).map(customerId => ({
    customerId, totalSpent: ltvMap[customerId].totalSpent, totalOrders: ltvMap[customerId].totalOrders
  })).sort((a, b) => b.totalSpent - a.totalSpent);

  return (
    <div className="container" style={{ padding: '120px 20px 60px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-playfair)', color: 'var(--color-primary)', margin: '0 0 10px 0', fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield size={36} /> Mission Shadow 04 HQ
          </h1>
          <p style={{ color: 'var(--color-text)', margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>
            Central Command Database & Analytics
          </p>
        </div>
        <button onClick={handleLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
        
        {/* Global Control Panel */}
        <div className="glassmorphism" style={{ padding: '30px', borderRadius: 'var(--border-radius-lg)' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair)', color: 'var(--color-primary)', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Power size={24} /> Mission Control
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
            
            <div style={{ flex: '1 1 300px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Emergency Protocol</h3>
              <button 
                onClick={toggleEmergencyShutdown}
                style={{ 
                  width: '100%', padding: '20px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                  background: isShopClosed ? '#28a745' : '#dc3545',
                  color: 'white', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  boxShadow: 'var(--shadow-soft)'
                }}
              >
                <Power size={24} /> {isShopClosed ? 'OPEN KITCHEN' : 'EMERGENCY SHUTDOWN'}
              </button>
              <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
                {isShopClosed ? 'Kitchen is currently CLOSED globally.' : 'Kitchen is currently OPEN.'}
              </p>
            </div>

            <div style={{ flex: '1 1 300px', background: 'rgba(255,255,255,0.5)', padding: '20px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={20} /> Time Manipulation (Global ETA Offset)
              </h3>
              <input 
                type="range" 
                min="-30" max="60" step="5"
                value={timeSlider}
                onChange={(e) => handleTimeUpdate(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '10px', color: 'var(--color-primary)' }}>
                {timeSlider > 0 ? `+${timeSlider}` : timeSlider} Minutes
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Menu Editor */}
        <div className="glassmorphism" style={{ padding: '30px', borderRadius: 'var(--border-radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair)', color: 'var(--color-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Edit3 size={24} /> Master Menu Editor
            </h2>
            <button onClick={saveMenuToDisk} disabled={isSavingMenu} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Save size={18} /> {isSavingMenu ? 'Saving to Disk...' : 'Save Changes to Disk'}
            </button>
          </div>
          
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: 'var(--color-primary)', color: 'white' }}>
                  <th style={{ padding: '12px' }}>ID</th>
                  <th style={{ padding: '12px' }}>Name</th>
                  <th style={{ padding: '12px' }}>Price (Rs.)</th>
                  <th style={{ padding: '12px' }}>Description</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {localMenu.flatMap(cat => cat.items.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', background: item.isActive ? 'transparent' : 'rgba(220,53,69,0.05)' }}>
                    <td style={{ padding: '12px', fontSize: '0.9rem', color: '#666' }}>{item.id}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.name}</td>
                    <td style={{ padding: '12px' }}>
                      <input 
                        type="number" 
                        value={item.price} 
                        onChange={(e) => handleMenuChange(cat.categoryId, item.id, 'price', parseFloat(e.target.value))}
                        style={{ width: '80px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <input 
                        type="text" 
                        value={item.description || ''} 
                        onChange={(e) => handleMenuChange(cat.categoryId, item.id, 'description', e.target.value)}
                        style={{ width: '100%', minWidth: '200px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                        <input 
                          type="checkbox" 
                          checked={item.isActive} 
                          onChange={(e) => handleMenuChange(cat.categoryId, item.id, 'isActive', e.target.checked)}
                          style={{ width: '18px', height: '18px' }}
                        />
                        <span style={{ color: item.isActive ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                          {item.isActive ? 'Active' : 'Hidden'}
                        </span>
                      </label>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>

        {/* LTV & Global Ledger Components Restored */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
          {/* LTV Matrix */}
          <div className="glassmorphism" style={{ padding: '30px', borderRadius: 'var(--border-radius-lg)' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair)', color: 'var(--color-primary)', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Users size={24} /> LTV Matrix
            </h2>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.1)', color: '#666', fontSize: '0.8rem' }}>
                    <th style={{ padding: '8px' }}>Rank</th>
                    <th style={{ padding: '8px' }}>Customer</th>
                    <th style={{ padding: '8px' }}>LTV (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {ltvArray.map((customer, idx) => (
                    <tr key={customer.customerId} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <td style={{ padding: '8px', fontWeight: 'bold' }}>#{idx + 1}</td>
                      <td style={{ padding: '8px' }}>{customer.customerId}</td>
                      <td style={{ padding: '8px', color: 'var(--color-primary)', fontWeight: 'bold' }}>{customer.totalSpent.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ledger */}
          <div className="glassmorphism" style={{ padding: '30px', borderRadius: 'var(--border-radius-lg)' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair)', color: 'var(--color-primary)', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <TrendingUp size={24} /> Global Order Ledger
            </h2>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {hqOrders.map(order => (
                <div key={order.id} style={{ padding: '12px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{order.id} ({order.customerId})</strong>
                    <span style={{ color: order.finalStatus === 'Delivered' ? '#28a745' : '#dc3545' }}>{order.finalStatus}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{new Date(order.placedAt).toLocaleString()} - Rs. {order.total}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
