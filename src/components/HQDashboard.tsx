"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTracking, ArchivedOrder, User } from '@/context/TrackingContext';
import { Shield, TrendingUp, Users, LogOut, Lock, Edit3, Save, Power, Clock, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useMenuData } from '@/hooks/useMenuData';
import { MenuCategory, MenuItem } from '@/types/menu';

export default function HQDashboard() {
  const { 
    getAllHQOrders, getAllUsers,
    isAdminVerified, verifyAdminState,
    isShopClosed, setShopClosed,
    setAdminTimeOffset
  } = useTracking();
  
  const [hqOrders, setHqOrders] = useState<ArchivedOrder[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  
  // Menu Editor State
  const { menuData, refetchMenu } = useMenuData();
  const [localMenu, setLocalMenu] = useState<MenuCategory[]>([]);
  const [isSavingMenu, setIsSavingMenu] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [timeSlider, setTimeSlider] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<{catId: string, itemId: string} | null>(null);

  useEffect(() => {
    if (isAdminVerified) {
      setHqOrders(getAllHQOrders());
      setUsers(getAllUsers());
    }
  }, [isAdminVerified, getAllHQOrders, getAllUsers]);

  useEffect(() => {
    if (menuData.length > 0) {
      setLocalMenu(menuData);
    }
  }, [menuData]);

  const handleAdminVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await verifyAdminState(adminUsername, adminPassword);
    if (isValid) {
      toast.success('Access Granted: Welcome to Mission Shadow 04 HQ', { style: { background: '#1A1A1A', color: '#808080' }});
    } else {
      toast.error('Access Denied: Invalid Credentials', { style: { background: '#1A1A1A', color: '#808080' }});
    }
  };

  const handleLogout = () => {
    toast.success('Admin Session Closed.', { style: { background: '#1A1A1A', color: '#808080' }});
    window.location.href = '/'; 
  };

  const handleMenuChange = (categoryId: string, itemId: string, field: keyof MenuItem, value: string | number | boolean) => {
    setHasChanges(true);
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

  const triggerImageUpload = (categoryId: string, itemId: string) => {
    setUploadTarget({ catId: categoryId, itemId: itemId });
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTarget) return;

    const formData = new FormData();
    formData.append('file', file);
    
    toast.loading('Uploading image...', { id: 'upload' });
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        handleMenuChange(uploadTarget.catId, uploadTarget.itemId, 'image', data.url);
        toast.success('Image uploaded successfully', { id: 'upload', style: { background: '#1A1A1A', color: '#808080' } });
      } else {
        toast.error('Failed to upload image', { id: 'upload' });
      }
    } catch (err) {
      toast.error('Server error during upload', { id: 'upload' });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setUploadTarget(null);
    }
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
        toast.success('Menu updated successfully on server', { style: { background: '#1A1A1A', color: '#808080' }});
        setHasChanges(false);
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
      toast.error('EMERGENCY: Kitchen is now CLOSED globally.', { style: { background: '#1A1A1A', color: '#808080' }});
    } else {
      toast.success('Kitchen is now OPEN.', { style: { background: '#1A1A1A', color: '#808080' }});
    }
  };

  const handleTimeUpdate = (val: number) => {
    setTimeSlider(val);
    setAdminTimeOffset(val);
  };

  // Shiny Dark Glassmorphism Theme Styles
  const theme = {
    bg: '#000000',
    panelBg: 'rgba(26, 26, 26, 0.7)',
    text: '#808080',
    border: '1px solid #333333',
    inputBg: 'rgba(10, 10, 10, 0.8)',
    boxShadow: '0 0 15px rgba(51, 51, 51, 0.5)'
  };

  if (!isAdminVerified) {
    return (
      <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: theme.panelBg, backdropFilter: 'blur(16px)', border: theme.border, boxShadow: theme.boxShadow, padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center', borderRadius: '4px' }}>
          <Shield size={64} style={{ color: theme.text, marginBottom: '20px' }} />
          <h2 style={{ fontFamily: 'monospace', color: theme.text, marginBottom: '20px', letterSpacing: '2px' }}>HQ VERIFICATION</h2>
          <form onSubmit={handleAdminVerify} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="text"
              placeholder="Enter Access ID"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '4px', border: theme.border, backgroundColor: theme.inputBg, color: theme.text, outline: 'none' }}
              autoFocus
            />
            <input
              type="password"
              placeholder="Enter Master Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '4px', border: theme.border, backgroundColor: theme.inputBg, color: theme.text, outline: 'none' }}
            />
            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: theme.text, color: theme.bg, border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'none' }}>
              <Lock size={18} /> UNLOCK SYSTEM
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
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', padding: '60px 20px', fontFamily: 'monospace' }}>
      <style>{`
        @keyframes goldPulse {
          0% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.5); }
          50% { box-shadow: 0 0 20px rgba(212, 175, 55, 1); }
          100% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.5); }
        }
      `}</style>
      
      {/* Hidden File Input for Image Upload */}
      <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileSelected} style={{ display: 'none' }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px', borderBottom: theme.border, paddingBottom: '20px' }}>
          <div>
            <h1 style={{ margin: '0 0 5px 0', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '2px', color: '#fff' }}>
              <Shield size={28} /> MISSION SHADOW 04 HQ
            </h1>
            <p style={{ margin: 0, fontSize: '0.9rem', color: theme.text, textTransform: 'uppercase' }}>
              Central Command Database & Analytics // SHADOW AURA ACTIVE
            </p>
          </div>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: theme.panelBg, border: theme.border, color: theme.text, cursor: 'pointer' }}>
            <LogOut size={16} /> TERMINATE SESSION
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
          
          {/* Global Control Panel */}
          <div style={{ backgroundColor: theme.panelBg, backdropFilter: 'blur(16px)', border: theme.border, boxShadow: theme.boxShadow, padding: '30px', borderRadius: '4px' }}>
            <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase' }}>
              <Power size={20} /> Mission Control
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
              
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '15px', color: theme.text }}>EMERGENCY PROTOCOL</h3>
                <button 
                  onClick={toggleEmergencyShutdown}
                  style={{ 
                    width: '100%', padding: '16px', border: theme.border, cursor: 'pointer',
                    backgroundColor: isShopClosed ? theme.inputBg : theme.text,
                    color: isShopClosed ? theme.text : theme.bg, 
                    fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', textTransform: 'uppercase'
                  }}
                >
                  <Power size={20} /> {isShopClosed ? 'OPEN KITCHEN' : 'EMERGENCY SHUTDOWN'}
                </button>
                <p style={{ marginTop: '10px', fontSize: '0.8rem', color: theme.text }}>
                  STATUS: {isShopClosed ? 'CLOSED' : 'OPEN'}
                </p>
              </div>

              <div style={{ flex: '1 1 300px', backgroundColor: theme.inputBg, border: theme.border, padding: '20px', borderRadius: '4px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: theme.text }}>
                  <Clock size={16} /> TIME MANIPULATION (ETA OFFSET)
                </h3>
                <input 
                  type="range" 
                  min="-30" max="60" step="5"
                  value={timeSlider}
                  onChange={(e) => handleTimeUpdate(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: theme.text }}
                />
                <div style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '10px', color: '#fff' }}>
                  {timeSlider > 0 ? `+${timeSlider}` : timeSlider} MIN
                </div>
              </div>

            </div>
          </div>

          {/* Dynamic Menu Editor */}
          <div style={{ backgroundColor: theme.panelBg, backdropFilter: 'blur(16px)', border: theme.border, boxShadow: theme.boxShadow, padding: '30px', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '20px' }}>
              <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase' }}>
                <Edit3 size={20} /> MASTER MENU EDITOR
              </h2>
              <button onClick={saveMenuToDisk} disabled={isSavingMenu} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: theme.text, color: theme.bg, border: 'none', fontWeight: 'bold', cursor: 'pointer', animation: hasChanges ? 'goldPulse 2s infinite' : 'none', transition: 'all 0.3s ease' }}>
                <Save size={16} /> {isSavingMenu ? 'SAVING...' : 'COMMIT TO DISK'}
              </button>
            </div>
            
            <div style={{ maxHeight: '600px', overflowY: 'auto', border: theme.border }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: theme.inputBg, color: theme.text, borderBottom: theme.border }}>
                    <th style={{ padding: '12px' }}>ID</th>
                    <th style={{ padding: '12px' }}>NAME</th>
                    <th style={{ padding: '12px' }}>PRICE</th>
                    <th style={{ padding: '12px' }}>DESCRIPTION</th>
                    <th style={{ padding: '12px' }}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {localMenu.flatMap(cat => cat.items.map(item => (
                    <tr key={item.id} style={{ borderBottom: theme.border, backgroundColor: item.isActive ? 'transparent' : theme.inputBg }}>
                      <td style={{ padding: '12px', color: '#555' }}>{item.id}</td>
                      <td style={{ padding: '12px', color: '#fff' }}>{item.name}</td>
                      <td style={{ padding: '12px' }}>
                        <input 
                          type="number" 
                          value={item.price} 
                          onChange={(e) => handleMenuChange(cat.categoryId, item.id, 'price', parseFloat(e.target.value))}
                          style={{ width: '80px', padding: '6px', backgroundColor: theme.inputBg, color: theme.text, border: theme.border, outline: 'none' }}
                        />
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input 
                            type="text" 
                            value={item.description || ''} 
                            onChange={(e) => handleMenuChange(cat.categoryId, item.id, 'description', e.target.value)}
                            style={{ width: '100%', minWidth: '200px', padding: '6px', backgroundColor: theme.inputBg, color: theme.text, border: theme.border, outline: 'none' }}
                          />
                          <button onClick={() => triggerImageUpload(cat.categoryId, item.id)} title="Upload Image" style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.text, padding: '4px' }}>
                            <Upload size={18} />
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                          <input 
                            type="checkbox" 
                            checked={item.isActive} 
                            onChange={(e) => handleMenuChange(cat.categoryId, item.id, 'isActive', e.target.checked)}
                            style={{ width: '16px', height: '16px', accentColor: theme.text }}
                          />
                          <span style={{ color: item.isActive ? theme.text : '#555', fontWeight: 'bold' }}>
                            {item.isActive ? 'ACTIVE' : 'HIDDEN'}
                          </span>
                        </label>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </div>

          {/* LTV & Global Ledger Components */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
            {/* LTV Matrix */}
            <div style={{ backgroundColor: theme.panelBg, backdropFilter: 'blur(16px)', border: theme.border, boxShadow: theme.boxShadow, padding: '30px', borderRadius: '4px' }}>
              <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase' }}>
                <Users size={20} /> LTV MATRIX
              </h2>
              <div style={{ maxHeight: '400px', overflowY: 'auto', border: theme.border }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: theme.inputBg, borderBottom: theme.border, color: theme.text }}>
                      <th style={{ padding: '12px' }}>RANK</th>
                      <th style={{ padding: '12px' }}>CUSTOMER</th>
                      <th style={{ padding: '12px' }}>LTV (Rs.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ltvArray.map((customer, idx) => (
                      <tr key={customer.customerId} style={{ borderBottom: theme.border }}>
                        <td style={{ padding: '12px', color: '#555' }}>#{idx + 1}</td>
                        <td style={{ padding: '12px', color: '#fff' }}>{customer.customerId}</td>
                        <td style={{ padding: '12px', color: theme.text, fontWeight: 'bold' }}>{customer.totalSpent.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ledger */}
            <div style={{ backgroundColor: theme.panelBg, backdropFilter: 'blur(16px)', border: theme.border, boxShadow: theme.boxShadow, padding: '30px', borderRadius: '4px' }}>
              <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase' }}>
                <TrendingUp size={20} /> GLOBAL ORDER LEDGER
              </h2>
              <div style={{ maxHeight: '400px', overflowY: 'auto', border: theme.border, backgroundColor: theme.inputBg }}>
                {hqOrders.map(order => (
                  <div key={order.id} style={{ padding: '12px', borderBottom: theme.border }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
                      <strong>{order.id} ({order.customerId})</strong>
                      <span style={{ color: order.finalStatus === 'Delivered' ? theme.text : '#555' }}>{order.finalStatus}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '4px' }}>{new Date(order.placedAt).toLocaleString()} - Rs. {order.total}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
