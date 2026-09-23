import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import type { OrderStatus } from "../context/OrderContext";
import { 
  FileDown, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  ChevronDown, 
  Package, 
  Truck, 
  CheckCircle2, 
  Trash2,
  FastForward
} from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import gsap from "gsap";

export default function OrderHistory() {
  const { orders, clearHistory, updateOrderStatus } = useOrders();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  // Refs for each order card to capture for PDF
  const orderRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const detailsRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const formatRupiah = (price: number) => {
    return price.toLocaleString('id-ID');
  };

  const handleDownloadInvoice = async (orderId: string, orderNumber: string) => {
    const element = orderRefs.current[orderId];
    if (!element) return;
    
    try {
      // Sembunyikan elemen yang tidak perlu masuk PDF
      const actionBtns = element.querySelectorAll('.no-print') as NodeListOf<HTMLElement>;
      actionBtns.forEach(btn => { btn.style.display = 'none'; });

      const canvas = await html2canvas(element, { scale: 2 });
      
      // Kembalikan tombol
      actionBtns.forEach(btn => { btn.style.display = ''; });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${orderNumber}.pdf`);
    } catch (error) {
      console.error("Gagal membuat PDF", error);
      alert("Terjadi kesalahan saat mengunduh invoice.");
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    const isExpanding = expandedOrderId !== orderId;
    
    if (expandedOrderId && expandedOrderId !== orderId) {
      const currentRef = detailsRefs.current[expandedOrderId];
      if (currentRef) {
        gsap.to(currentRef, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
      }
    }

    const targetRef = detailsRefs.current[orderId];
    if (targetRef) {
      if (isExpanding) {
        setExpandedOrderId(orderId);
        gsap.fromTo(targetRef, 
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      } else {
        gsap.to(targetRef, { 
          height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut",
          onComplete: () => setExpandedOrderId(null)
        });
      }
    } else {
      setExpandedOrderId(isExpanding ? orderId : null);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Menunggu Pembayaran',
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: <Clock size={14} className="animate-spin" />
        };
      case 'paid':
        return {
          label: 'Pembayaran Terverifikasi',
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <CheckCircle size={14} />
        };
      case 'processed':
        return {
          label: 'Sedang Dikemas',
          bg: 'bg-honey-soft text-honey-dark border-honey/30',
          icon: <Package size={14} />
        };
      case 'shipped':
        return {
          label: 'Dalam Pengiriman',
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <Truck size={14} />
        };
      case 'delivered':
        return {
          label: 'Pesanan Selesai',
          bg: 'bg-forest-soft text-forest border-forest/20',
          icon: <CheckCircle2 size={14} />
        };
      case 'cancelled':
        return {
          label: 'Dibatalkan',
          bg: 'bg-red-50 text-red-700 border-red-200',
          icon: <Clock size={14} />
        };
    }
  };

  const advanceOrderStatus = (orderId: string, currentStatus: OrderStatus) => {
    const nextMap: Record<OrderStatus, OrderStatus> = {
      pending: 'paid',
      paid: 'processed',
      processed: 'shipped',
      shipped: 'delivered',
      delivered: 'delivered',
      cancelled: 'cancelled'
    };
    const next = nextMap[currentStatus];
    if (next !== currentStatus) {
      updateOrderStatus(orderId, next);
    }
  };

  const STEPS: { status: OrderStatus; label: string }[] = [
    { status: 'pending', label: 'Pesanan Dibuat' },
    { status: 'paid', label: 'Dibayar' },
    { status: 'processed', label: 'Dikemas' },
    { status: 'shipped', label: 'Dikirim' },
    { status: 'delivered', label: 'Tiba' }
  ];

  const getStepIndex = (status: OrderStatus) => {
    return STEPS.findIndex(s => s.status === status);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-forest-soft text-forest rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={36} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Pesanan</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Keranjang Anda masih menanti! Pesan kebutuhan pokok atau minuman instan segar sekarang.
          </p>
          <Link
            to="/"
            className="inline-block bg-forest hover:bg-forest-dark text-white px-8 py-3 rounded-full font-semibold transition shadow-md"
          >
            Mulai Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-10">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-forest transition">
            <ArrowLeft size={20} />
            <span className="font-medium text-sm md:text-base">Kembali ke Beranda</span>
          </Link>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2 px-3 py-1 bg-forest-soft text-forest rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-forest animate-ping"></span>
              Live Tracking Aktif
            </div>
            <button
              onClick={() => {
                if (confirm('Yakin ingin mengosongkan semua riwayat pesanan?')) {
                  clearHistory();
                }
              }}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition"
              title="Hapus riwayat"
            >
              <Trash2 size={14} />
              <span>Hapus Riwayat</span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {orders.map((order) => {
            const currentStepIdx = getStepIndex(order.status);
            const badge = getStatusBadge(order.status);

            return (
              <div 
                key={order.id} 
                ref={(el) => { orderRefs.current[order.id] = el; }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 relative transition hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4 mb-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      {new Date(order.date).toLocaleDateString('id-ID', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900 text-base">{order.orderNumber}</p>
                      {order.trackingNumber && (
                        <span className="bg-forest-soft text-forest text-xs px-2.5 py-0.5 rounded-full font-mono font-medium">
                          Resi: {order.trackingNumber}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center flex-wrap gap-2">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </div>

                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <button
                        onClick={() => advanceOrderStatus(order.id, order.status)}
                        className="no-print flex items-center gap-1 text-xs bg-honey-soft hover:bg-honey/30 text-honey-dark border border-honey/40 px-3 py-1 rounded-full font-medium transition"
                        title="Simulasikan langkah status berikutnya langsung"
                      >
                        <FastForward size={13} />
                        <span>Percepat</span>
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDownloadInvoice(order.id, order.orderNumber)}
                      className="no-print flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white px-3.5 py-1 rounded-full text-xs font-medium transition shadow-sm"
                    >
                      <FileDown size={14} />
                      <span>Invoice PDF</span>
                    </button>

                    <button 
                      onClick={() => toggleOrderDetails(order.id)}
                      className="no-print p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition"
                      aria-label="Detail Pesanan"
                    >
                      <ChevronDown size={18} className={`transform transition-transform duration-300 ${expandedOrderId === order.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Realtime Stepper Timeline */}
                {order.status !== 'cancelled' && (
                  <div className="my-5 px-2">
                    <div className="flex items-center justify-between relative">
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
                      <div 
                        className="absolute top-1/2 left-0 h-1 bg-forest -translate-y-1/2 z-0 transition-all duration-700"
                        style={{ width: `${(Math.max(0, currentStepIdx) / (STEPS.length - 1)) * 100}%` }}
                      />

                      {STEPS.map((step, idx) => {
                        const isDone = currentStepIdx >= idx;
                        const isCurrent = currentStepIdx === idx;

                        return (
                          <div key={step.status} className="relative z-10 flex flex-col items-center">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                              isCurrent 
                                ? 'bg-forest text-white ring-4 ring-forest-soft scale-110 shadow-sm' 
                                : isDone 
                                  ? 'bg-forest text-white' 
                                  : 'bg-gray-200 text-gray-500'
                            }`}>
                              {idx + 1}
                            </div>
                            <span className={`text-[10px] md:text-xs mt-1.5 font-medium whitespace-nowrap ${
                              isCurrent ? 'text-forest font-bold' : isDone ? 'text-gray-800' : 'text-gray-400'
                            }`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Accordion Content */}
                <div 
                  ref={(el) => { detailsRefs.current[order.id] = el; }} 
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0 }}
                >
                  <div className="pt-3 border-t border-gray-100 mt-3">
                    <div className="space-y-3 mb-6">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-3">
                            <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-xl border border-gray-100" />
                            <div>
                              <p className="font-semibold text-gray-900">{item.product.name}</p>
                              <p className="text-gray-500 text-xs">{item.quantity} x Rp {formatRupiah(item.price)}</p>
                            </div>
                          </div>
                          <p className="font-bold text-gray-900">
                            Rp {formatRupiah(item.quantity * item.price)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <div className="space-y-2 text-sm text-gray-600 mb-3 border-b border-gray-200 pb-3">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>Rp {formatRupiah(order.subtotal)}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between text-forest font-medium">
                            <span>Diskon {order.promoCode ? `(${order.promoCode})` : ''}</span>
                            <span>- Rp {formatRupiah(order.discount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Ongkos Kirim</span>
                          <span>Rp {formatRupiah(order.shippingCost)}</span>
                        </div>
                        {order.tax && (
                          <div className="flex justify-between">
                            <span>Pajak (11%)</span>
                            <span>Rp {formatRupiah(order.tax)}</span>
                          </div>
                        )}
                        {order.serviceFee && (
                          <div className="flex justify-between">
                            <span>Biaya Layanan</span>
                            <span>Rp {formatRupiah(order.serviceFee)}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900 text-base">Total Pembayaran</span>
                        <span className="font-extrabold text-forest text-xl">Rp {formatRupiah(order.total)}</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 text-right">
                        Metode: <span className="uppercase font-semibold text-gray-700">{order.paymentMethod}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-xs text-gray-600 bg-gray-50/60 p-3 rounded-xl">
                      <p className="font-bold text-gray-800 mb-1">Alamat Pengiriman:</p>
                      <p className="font-medium text-gray-900">{order.shippingAddress.name} ({order.shippingAddress.phone})</p>
                      <p>{order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}</p>
                      {order.shippingAddress.notes && (
                        <p className="italic text-gray-500 mt-1">Catatan: {order.shippingAddress.notes}</p>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
