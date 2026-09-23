import { useNotifications } from '../context/NotificationContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useNotifications();

  if (toasts.length === 0) return null;

  return (
    <aside aria-label="Notifikasi popup" className="fixed top-20 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl p-4 flex items-start gap-3 transition-all transform animate-in slide-in-from-top-4 duration-300"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-forest" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-blue-600" />
            )}
            {toast.type === 'warning' && (
              <AlertTriangle className="w-5 h-5 text-honey-dark" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-900 leading-tight">
              {toast.title}
            </h4>
            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-gray-400 hover:text-gray-600 p-1 rounded-lg transition"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </aside>
  );
}
