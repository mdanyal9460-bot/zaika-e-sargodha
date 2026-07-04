"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type OrderStatus = 'Pending' | 'In Kitchen' | 'Out for Delivery' | 'Delivered';

export interface TrackedOrder {
  id: string;
  items: any[];
  total: number;
  placedAt: number; // timestamp
}

interface TrackingContextType {
  activeOrder: TrackedOrder | null;
  currentStatus: OrderStatus;
  isTrackerOpen: boolean;
  timeOffsetMinutes: number;
  estimatedRemainingMinutes: number;
  startTracking: (items: any[], total: number) => void;
  toggleTracker: () => void;
  clearTracking: () => void;
  setAdminTimeOffset: (minutes: number) => void;
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

  // Load from local storage on mount
  useEffect(() => {
    const savedOrder = localStorage.getItem('zaika_active_order');
    if (savedOrder) {
      setActiveOrder(JSON.parse(savedOrder));
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
  
  const clearTracking = () => {
    setActiveOrder(null);
    localStorage.removeItem('zaika_active_order');
    setIsTrackerOpen(false);
    setTimeOffsetMinutes(0);
  };
  
  const setAdminTimeOffset = (minutes: number) => {
    setTimeOffsetMinutes(minutes);
  };

  return (
    <TrackingContext.Provider value={{ 
      activeOrder, 
      currentStatus, 
      isTrackerOpen, 
      timeOffsetMinutes,
      estimatedRemainingMinutes,
      startTracking, 
      toggleTracker, 
      clearTracking,
      setAdminTimeOffset
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
