/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'promo' | 'system';
  read: boolean;
  orderId?: string;
  actionUrl?: string;
}

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

export interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  toasts: ToastItem[];
  addNotification: (notif: Omit<AppNotification, 'id' | 'time' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'seed-1',
    title: 'Promo Kilat Hari Ini!',
    message: 'Gunakan kode HEMATSEGAR untuk diskon 15% semua sayuran segar.',
    time: 'Baru saja',
    type: 'promo',
    read: false,
    actionUrl: '/category/Sayuran'
  },
  {
    id: 'seed-2',
    title: 'Selamat Datang di Minimo Mart',
    message: 'Belanja aneka kebutuhan segar dan sembako berkualitas dengan harga terbaik.',
    time: '1 jam lalu',
    type: 'system',
    read: true,
    actionUrl: '/'
  }
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('minimo_notifications') || localStorage.getItem('nusantara_notifications');
      return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  });

  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    try {
      channelRef.current = new BroadcastChannel('minimo_notifications_sync');
      channelRef.current.onmessage = (event) => {
        if (event.data?.type === 'SYNC_NOTIFICATIONS' && Array.isArray(event.data.payload)) {
          setNotifications(event.data.payload);
        }
      };
    } catch {
      // BroadcastChannel fallback silently handled
    }

    const handleStorage = (e: StorageEvent) => {
      if ((e.key === 'minimo_notifications' || e.key === 'nusantara_notifications') && e.newValue) {
        try {
          setNotifications(JSON.parse(e.newValue));
        } catch {}
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      if (channelRef.current) channelRef.current.close();
    };
  }, []);

  const persistNotifications = (items: AppNotification[]) => {
    setNotifications(items);
    try {
      localStorage.setItem('minimo_notifications', JSON.stringify(items));
      channelRef.current?.postMessage({ type: 'SYNC_NOTIFICATIONS', payload: items });
    } catch {}
  };

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastItem = { id, title, message, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'time' | 'read'>) => {
    const newItem: AppNotification = {
      ...notif,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
      time: 'Baru saja',
      read: false
    };

    persistNotifications([newItem, ...notifications]);
    showToast(newItem.title, newItem.message, notif.type === 'promo' ? 'info' : 'success');
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    persistNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    persistNotifications(updated);
  };

  const clearNotifications = () => {
    persistNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      toasts,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications,
      showToast,
      removeToast
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
