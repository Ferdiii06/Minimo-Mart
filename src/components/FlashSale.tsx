import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { productsData } from "../data/products";
import { useCart } from "../context/useCart";
import { useNotifications } from "../context/NotificationContext";
import { Clock, Zap, ShoppingCart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FlashSale() {
  const { addToCart } = useCart();
  const { showToast } = useNotifications();
  const sectionRef = useRef<HTMLElement>(null);
  const zapRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Ambil 4 produk acak untuk flash sale
  const flashSaleProducts = productsData.slice(0, 4).map(product => ({
    ...product,
    originalPrice: product.price,
    price: Math.floor(product.price * 0.5) // Diskon 50%
  }));

  const getTargetEndTime = () => {
    const saved = localStorage.getItem('minimo_flash_sale_end') || localStorage.getItem('nusantara_flash_sale_end');
    const now = Date.now();
    if (saved && Number(saved) > now) {
      return Number(saved);
    }
    // Set 3 jam 24 menit dari sekarang
    const target = now + (3 * 3600 + 24 * 60 + 15) * 1000;
    localStorage.setItem('minimo_flash_sale_end', target.toString());
    return target;
  };

  const calculateTimeLeft = (endTime: number) => {
    const diff = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(getTargetEndTime()));

  useEffect(() => {
    const endTime = getTargetEndTime();

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Zap pulse loop
      if (zapRef.current) {
        gsap.to(zapRef.current, {
          scale: 1.15,
          repeat: -1,
          yoyo: true,
          duration: 0.7,
          ease: "power1.inOut"
        });
      }

      // Cards stagger reveal on scroll
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 88%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num: number) => num.toLocaleString('id-ID');
  const formatTime = (num: number) => num.toString().padStart(2, '0');

  const handleAddFlashSale = (product: typeof flashSaleProducts[0]) => {
    addToCart(product, 1);
    showToast('Dimasukkan ke Keranjang', `${product.name} diskon 50% berhasil ditambahkan!`, 'success');
  };

  return (
    <section ref={sectionRef} className="py-10 md:py-14 bg-honey-soft/40 border-b border-mist-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Flash Sale */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div ref={zapRef} className="p-2.5 bg-honey text-gray-950 rounded-2xl shadow-xs">
              <Zap className="fill-gray-950 text-gray-950" size={24} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Flash Sale Kilat</h2>
              <p className="text-xs text-forest font-bold tracking-wide">Diskon spesial hingga 50% setiap hari</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-full shadow-xs border border-honey/30">
            <div className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm font-semibold">
              <Clock size={18} className="text-honey-dark" />
              <span>Berakhir dalam:</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <div className="bg-forest text-white font-black px-2.5 py-1 rounded-lg text-sm shadow-xs">
                {formatTime(timeLeft.hours)}
              </div>
              <span className="text-forest font-bold">:</span>
              <div className="bg-forest text-white font-black px-2.5 py-1 rounded-lg text-sm shadow-xs">
                {formatTime(timeLeft.minutes)}
              </div>
              <span className="text-forest font-bold">:</span>
              <div className="bg-forest text-white font-black px-2.5 py-1 rounded-lg text-sm shadow-xs">
                {formatTime(timeLeft.seconds)}
              </div>
            </div>
          </div>
        </div>

        {/* Daftar Produk Flash Sale */}
        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {flashSaleProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden border border-mist-border hover:border-honey/60 group relative flex flex-col justify-between">
              {/* Badge Diskon */}
              <div className="absolute top-3 right-3 bg-honey text-gray-950 text-xs font-black px-2.5 py-1 rounded-full z-10 shadow-xs tracking-wider">
                50% OFF
              </div>
              
              <div>
                <Link to={`/product/${product.id}`}>
                  <div className="relative overflow-hidden aspect-square bg-mist-surface/50 flex items-center justify-center p-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 mb-1 truncate hover:text-forest transition text-sm sm:text-base">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 mb-2">{product.weight}</p>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-400 line-through">
                      Rp {formatNumber(product.originalPrice)}
                    </p>
                    <p className="text-base sm:text-lg font-extrabold text-forest">
                      Rp {formatNumber(product.price)}
                    </p>
                  </div>

                  <div className="mb-2 bg-honey-light rounded-full h-1.5 overflow-hidden">
                    <div className="bg-honey-dark h-full w-3/4 rounded-full"></div>
                  </div>
                  <p className="text-[11px] text-honey-dark font-bold mb-3 text-center">Tersisa 5 barang!</p>
                </div>
              </div>

              <div className="px-4 pb-4">
                <button
                  onClick={() => handleAddFlashSale(product)}
                  className="w-full bg-forest-soft hover:bg-forest text-forest hover:text-white border border-forest/20 hover:border-forest py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 group/btn cursor-pointer shadow-xs active:scale-95"
                >
                  <ShoppingCart size={16} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                  <span>Tambah ke Keranjang</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
