"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword } from '@/utils/auth';

export type OrderStatus = 'Pending' | 'In Kitchen' | 'Out for Delivery' | 'Delivered';
export type UserRole = 'customer' | 'admin';

export interface TrackedOrder {
  id: string;
  items: any[];
  total: number;
  placedAt: number; // timestamp
}

export interface ArchivedOrder extends TrackedOrder {
  customerId: string;
  finalStatus: 'Delivered' | 'Cancelled';
}

export interface User {
  customerId: string;
  role: UserRole;
}

interface TrackingContextType {
  activeOrder: TrackedOrder | null;
  currentStatus: OrderStatus;
  isTrackerOpen: boolean;
  timeOffsetMinutes: number;
  estimatedRemainingMinutes: number;
  
  // Auth state
  currentUser: User | null;
  isAuthModalOpen: boolean;

  startTracking: (items: any[], total: number) => void;
  toggleTracker: () => void;
  clearTracking: (finalStatus?: 'Delivered' | 'Cancelled') => void;
  setAdminTimeOffset: (minutes: number) => void;
  
  // Auth & History actions
  toggleAuthModal: () => void;
  registerCustomer: (customerId: string, password: string) => Promise<boolean>;
  loginCustomer: (customerId: string, password: string) => Promise<boolean>;
  logoutCustomer: () => void;
  changePassword: (oldPass: string, newPass: string) => Promise<boolean>;
  adminIssueTempPassword: (targetId: string, tempPassword: string) => Promise<void>;
  getUserHistory: (customerId: string) => ArchivedOrder[];
  getAllHQOrders: () => ArchivedOrder[];
  getAllUsers: () => User[];
  
  // Phase 4 Admin State
  isShopClosed: boolean;
  setShopClosed: (closed: boolean) => void;
  isAdminVerified: boolean;
  verifyAdminState: (password: string) => boolean;
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

// CONFIGURATION: Adjust these timeframes (in minutes) to control order progression.
export const TRACKING_CONFIG = {
  MINUTES_IN_KITCHEN: 5,     // Switches from Pending to In Kitchen
  MINUTES_OUT_FOR_DELIVERY: 20, // Switches to Out for Delivery
  MINUTES_DELIVERED: 45      // Switches to Delivered
};

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const [activeOrder, setActiveOrder] = useState<TrackedOrder | null>(null);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('Pending');
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [timeOffsetMinutes, setTimeOffsetMinutes] = useState(0);
  const [estimatedRemainingMinutes, setEstimatedRemainingMinutes] = useState(TRACKING_CONFIG.MINUTES_DELIVERED);

  // Phase 4 Admin State
  const [isShopClosed, setShopClosed] = useState(false);
  const [isAdminVerified, setIsAdminVerified] = useState(false);

  const verifyAdminState = (password: string): boolean => {
    // Master password for Mission Shadow 04 HQ
    if (password === 'shadowactual') {
      setIsAdminVerified(true);
      return true;
    }
    return false;
  };

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedOrder = localStorage.getItem('zaika_active_order');
    if (savedOrder) {
      setActiveOrder(JSON.parse(savedOrder));
    }
    
    const savedUser = localStorage.getItem('zaika_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Update status based on elapsed time and admin offset
  useEffect(() => {
    if (!activeOrder) return;

    const calculateStatus = () => {
      const realElapsedMinutes = (Date.now() - activeOrder.placedAt) / 1000 / 60;
      const effectiveElapsedMinutes = realElapsedMinutes + timeOffsetMinutes;
      
      const remaining = Math.max(0, Math.ceil(TRACKING_CONFIG.MINUTES_DELIVERED - effectiveElapsedMinutes));
      setEstimatedRemainingMinutes(remaining);
      
      if (effectiveElapsedMinutes < TRACKING_CONFIG.MINUTES_IN_KITCHEN) {
        setCurrentStatus('Pending');
      } else if (effectiveElapsedMinutes < TRACKING_CONFIG.MINUTES_OUT_FOR_DELIVERY) {
        setCurrentStatus('In Kitchen');
      } else if (effectiveElapsedMinutes < TRACKING_CONFIG.MINUTES_DELIVERED) {
        setCurrentStatus('Out for Delivery');
      } else {
        setCurrentStatus('Delivered');
      }
    };

    calculateStatus();
    // Re-check every minute
    const interval = setInterval(calculateStatus, 60000);
    
    return () => clearInterval(interval);
  }, [activeOrder, timeOffsetMinutes]);

  const startTracking = (items: any[], total: number) => {
    const newOrder: TrackedOrder = {
      id: `ZKS-${Math.floor(Math.random() * 100000)}`,
      items,
      total,
      placedAt: Date.now()
    };
    setActiveOrder(newOrder);
    setCurrentStatus('Pending');
    setTimeOffsetMinutes(0);
    localStorage.setItem('zaika_active_order', JSON.stringify(newOrder));
    setIsTrackerOpen(true);
  };

  const toggleTracker = () => setIsTrackerOpen(!isTrackerOpen);
  
  const clearTracking = (finalStatus?: 'Delivered' | 'Cancelled') => {
    if (activeOrder && currentUser && finalStatus) {
      const history = JSON.parse(localStorage.getItem('zaika_order_history') || '[]');
      history.push({
        ...activeOrder,
        customerId: currentUser.customerId,
        finalStatus
      });
      localStorage.setItem('zaika_order_history', JSON.stringify(history));
    }
    
    setActiveOrder(null);
    localStorage.removeItem('zaika_active_order');
    setIsTrackerOpen(false);
    setTimeOffsetMinutes(0);
  };
  
  const setAdminTimeOffset = (minutes: number) => {
    setTimeOffsetMinutes(minutes);
  };

  // Auth & History Methods
  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);

  const getUserHistory = (customerId: string): ArchivedOrder[] => {
    const history = JSON.parse(localStorage.getItem('zaika_order_history') || '[]');
    return history.filter((order: ArchivedOrder) => order.customerId === customerId).sort((a: ArchivedOrder, b: ArchivedOrder) => b.placedAt - a.placedAt);
  };

  const getAllHQOrders = (): ArchivedOrder[] => {
    const history = JSON.parse(localStorage.getItem('zaika_order_history') || '[]');
    return history.sort((a: ArchivedOrder, b: ArchivedOrder) => b.placedAt - a.placedAt);
  };

  const getAllUsers = (): User[] => {
    return JSON.parse(localStorage.getItem('zaika_users') || '[]');
  };

  const changePassword = async (oldPass: string, newPass: string): Promise<boolean> => {
    if (!currentUser) return false;
    const users = JSON.parse(localStorage.getItem('zaika_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.customerId === currentUser.customerId);
    if (userIndex === -1) return false;

    const oldHash = await hashPassword(oldPass);
    if (users[userIndex].passwordHash !== oldHash) return false;

    users[userIndex].passwordHash = await hashPassword(newPass);
    localStorage.setItem('zaika_users', JSON.stringify(users));
    return true;
  };

  const registerCustomer = async (customerId: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('zaika_users') || '[]');
    if (users.find((u: any) => u.customerId === customerId)) {
      return false; // User exists
    }
    const passwordHash = await hashPassword(password);
    users.push({ customerId, passwordHash, role: 'customer' });
    localStorage.setItem('zaika_users', JSON.stringify(users));
    
    const newUser = { customerId, role: 'customer' as UserRole };
    setCurrentUser(newUser);
    localStorage.setItem('zaika_current_user', JSON.stringify(newUser));
    return true;
  };

  const loginCustomer = async (customerId: string, password: string): Promise<boolean> => {
    // Hidden back-door admin for demo purposes
    if (customerId === 'admin' && password === 'admin123') {
      const adminUser = { customerId: 'admin', role: 'admin' as UserRole };
      setCurrentUser(adminUser);
      localStorage.setItem('zaika_current_user', JSON.stringify(adminUser));
      return true;
    }

    const users = JSON.parse(localStorage.getItem('zaika_users') || '[]');
    const user = users.find((u: any) => u.customerId === customerId);
    if (!user) return false;

    const passwordHash = await hashPassword(password);
    if (user.passwordHash === passwordHash) {
      const loggedInUser = { customerId: user.customerId, role: user.role };
      setCurrentUser(loggedInUser);
      localStorage.setItem('zaika_current_user', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logoutCustomer = () => {
    setCurrentUser(null);
    localStorage.removeItem('zaika_current_user');
  };

  const adminIssueTempPassword = async (targetId: string, tempPassword: string) => {
    const users = JSON.parse(localStorage.getItem('zaika_users') || '[]');
    const passwordHash = await hashPassword(tempPassword);
    
    const userIndex = users.findIndex((u: any) => u.customerId === targetId);
    if (userIndex !== -1) {
      users[userIndex].passwordHash = passwordHash;
    } else {
      users.push({ customerId: targetId, passwordHash, role: 'customer' });
    }
    localStorage.setItem('zaika_users', JSON.stringify(users));
  };

  return (
    <TrackingContext.Provider value={{ 
      activeOrder, 
      currentStatus, 
      isTrackerOpen, 
      timeOffsetMinutes,
      estimatedRemainingMinutes,
      currentUser,
      isAuthModalOpen,
      startTracking, 
      toggleTracker, 
      clearTracking,
      setAdminTimeOffset,
      toggleAuthModal,
      registerCustomer,
      loginCustomer,
      logoutCustomer,
      adminIssueTempPassword,
      getUserHistory,
      changePassword,
      getAllHQOrders,
      getAllUsers,
      isShopClosed,
      setShopClosed,
      isAdminVerified,
      verifyAdminState
    }}>
      {children}
    </TrackingContext.Provider>
  );
}

export function useTracking() {
  const context = useContext(TrackingContext);
  if (context === undefined) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
}
