/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { Product } from '../data/products';
import type { ReactNode } from 'react';
import { useNotifications } from './NotificationContext';

// Tipe untuk item dalam order
export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

// Tipe untuk alamat pengiriman
export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

// Tipe untuk metode pembayaran
export type PaymentMethod = 'qris' | 'bca' | 'bri' | 'mandiri' | 'bni';

// Tipe untuk status order
export type OrderStatus = 'pending' | 'paid' | 'processed' | 'shipped' | 'delivered' | 'cancelled';

// Tipe untuk order
export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  createdAt?: number;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax?: number;
  serviceFee?: number;
  total: number;
  promoCode?: string;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

// Tipe untuk context
export interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status' | 'createdAt'>) => string;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByStatus: (status: OrderStatus) => Order[];
  updateOrderStatus: (id: string, status: OrderStatus, trackingNumber?: string) => void;
  simulatePaymentSuccess: (id: string) => void;
  cancelOrder: (id: string) => void;
  clearHistory: () => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const { addNotification } = useNotifications();
  const channelRef = useRef<BroadcastChannel | null>(null);

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem('orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch {
      return [];
    }
  });

  // Sinkronisasi antar tab
  useEffect(() => {
    try {
      channelRef.current = new BroadcastChannel('minimo_orders_sync');
      channelRef.current.onmessage = (event) => {
        if (event.data?.type === 'SYNC_ORDERS' && Array.isArray(event.data.payload)) {
          setOrders(event.data.payload);
        }
      };
    } catch {
      // Fallback
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'orders' && e.newValue) {
        try {
          setOrders(JSON.parse(e.newValue));
        } catch {}
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      if (channelRef.current) channelRef.current.close();
    };
  }, []);

  const persistOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    try {
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      channelRef.current?.postMessage({ type: 'SYNC_ORDERS', payload: updatedOrders });
    } catch {}
  };

  // Generate nomor order unik
  const generateOrderNumber = (): string => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `INV/${year}${month}${day}/${random}`;
  };

  // Hitung estimasi pengiriman (3 hari dari sekarang)
  const calculateEstimatedDelivery = (): string => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toISOString().split('T')[0];
  };

  // Tambah order baru
  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status' | 'createdAt'>): string => {
    const newId = Date.now().toString();
    const newOrderNumber = generateOrderNumber();

    const newOrder: Order = {
      ...orderData,
      id: newId,
      orderNumber: newOrderNumber,
      date: new Date().toISOString(),
      createdAt: Date.now(),
      status: 'pending',
      estimatedDelivery: calculateEstimatedDelivery()
    };

    const updated = [newOrder, ...orders];
    persistOrders(updated);

    addNotification({
      title: 'Pesanan Berhasil Dibuat',
      message: `Pesanan ${newOrderNumber} menunggu konfirmasi pembayaran.`,
      type: 'order',
      orderId: newId,
      actionUrl: '/order-history'
    });

    return newId;
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  const getOrdersByStatus = (status: OrderStatus): Order[] => {
    return orders.filter(order => order.status === status);
  };

  const updateOrderStatus = (id: string, status: OrderStatus, trackingNumber?: string) => {
    const targetOrder = orders.find(o => o.id === id);
    if (!targetOrder || targetOrder.status === status) return;

    const updatedOrders = orders.map(order => {
      if (order.id === id) {
        return {
          ...order,
          status,
          ...(trackingNumber ? { trackingNumber } : {})
        };
      }
      return order;
    });

    persistOrders(updatedOrders);

    // Kirim notifikasi realtime sesuai status
    if (status === 'paid') {
      addNotification({
        title: 'Pembayaran Diterima',
        message: `Pembayaran pesanan ${targetOrder.orderNumber} telah diverifikasi. Kami segera menyiapkan pesanan.`,
        type: 'order',
        orderId: id,
        actionUrl: '/order-history'
      });
    } else if (status === 'processed') {
      addNotification({
        title: 'Pesanan Sedang Dikemas',
        message: `Produk segar pesanan ${targetOrder.orderNumber} sedang dikemas dengan standar higienis.`,
        type: 'order',
        orderId: id,
        actionUrl: '/order-history'
      });
    } else if (status === 'shipped') {
      addNotification({
        title: 'Pesanan Dalam Pengiriman',
        message: `Pesanan ${targetOrder.orderNumber} telah diserahkan ke kurir (Resi: ${trackingNumber || 'NTR-9921'}).`,
        type: 'order',
        orderId: id,
        actionUrl: '/order-history'
      });
    } else if (status === 'delivered') {
      addNotification({
        title: 'Pesanan Telah Tiba',
        message: `Pesanan ${targetOrder.orderNumber} telah sampai di tujuan. Terima kasih telah berbelanja!`,
        type: 'order',
        orderId: id,
        actionUrl: '/order-history'
      });
    }
  };

  // Shortcut simulasi pembayaran sukses instan
  const simulatePaymentSuccess = (id: string) => {
    updateOrderStatus(id, 'paid');
  };

  // Batalkan pesanan
  const cancelOrder = (id: string) => {
    const targetOrder = orders.find(o => o.id === id);
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status: 'cancelled' as OrderStatus } : order
    );
    persistOrders(updatedOrders);

    if (targetOrder) {
      addNotification({
        title: 'Pesanan Dibatalkan',
        message: `Pesanan ${targetOrder.orderNumber} telah berhasil dibatalkan.`,
        type: 'order',
        orderId: id,
        actionUrl: '/order-history'
      });
    }
  };

  const clearHistory = () => {
    persistOrders([]);
  };

  // Simulated Order Lifecycle Engine (Berjalan Real-Time di background)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      let hasChanges = false;

      const updated = orders.map(order => {
        if (order.status === 'cancelled' || order.status === 'delivered') {
          return order;
        }

        const createdAt = order.createdAt || new Date(order.date).getTime() || now;
        const elapsedSeconds = Math.floor((now - createdAt) / 1000);

        // Timeline:
        // 0 - 15 detik: pending
        // 15 - 35 detik: paid
        // 35 - 70 detik: processed
        // 70 - 120 detik: shipped
        // > 120 detik: delivered
        let nextStatus: OrderStatus = order.status;
        let trackingNumber = order.trackingNumber;

        if (order.status === 'pending' && elapsedSeconds >= 15) {
          nextStatus = 'paid';
          hasChanges = true;
          addNotification({
            title: 'Pembayaran Diterima (Realtime)',
            message: `Pembayaran pesanan ${order.orderNumber} terverifikasi otomatis.`,
            type: 'order',
            orderId: order.id,
            actionUrl: '/order-history'
          });
        } else if (order.status === 'paid' && elapsedSeconds >= 35) {
          nextStatus = 'processed';
          hasChanges = true;
          addNotification({
            title: 'Pesanan Sedang Dikemas',
            message: `Pesanan ${order.orderNumber} sedang disiapkan oleh tim gudang.`,
            type: 'order',
            orderId: order.id,
            actionUrl: '/order-history'
          });
        } else if (order.status === 'processed' && elapsedSeconds >= 70) {
          nextStatus = 'shipped';
          trackingNumber = trackingNumber || `NTR-${Math.floor(100000 + Math.random() * 900000)}`;
          hasChanges = true;
          addNotification({
            title: 'Pesanan Dikirim Kurir',
            message: `Pesanan ${order.orderNumber} telah dalam perjalanan. Resi: ${trackingNumber}`,
            type: 'order',
            orderId: order.id,
            actionUrl: '/order-history'
          });
        } else if (order.status === 'shipped' && elapsedSeconds >= 120) {
          nextStatus = 'delivered';
          hasChanges = true;
          addNotification({
            title: 'Pesanan Sampai di Rumah',
            message: `Pesanan ${order.orderNumber} telah diterima. Selamat menikmati hidangan segar!`,
            type: 'order',
            orderId: order.id,
            actionUrl: '/order-history'
          });
        }

        if (nextStatus !== order.status) {
          return {
            ...order,
            status: nextStatus,
            trackingNumber: trackingNumber || order.trackingNumber
          };
        }

        return order;
      });

      if (hasChanges) {
        persistOrders(updated);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [orders]);

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      getOrderById,
      getOrdersByStatus,
      updateOrderStatus,
      simulatePaymentSuccess,
      cancelOrder,
      clearHistory
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}