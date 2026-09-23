import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Copy, CheckCircle, ShoppingBag, Sparkles, Clock } from "lucide-react";
import { getActivePromos } from "../context/promo"; // Import dari context, bukan data
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Promo() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const activePromos = getActivePromos();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activePromos.length]);

  const handlePromoClick = (category?: string) => {
    if (category) {
      navigate(`/category/${encodeURIComponent(category)}`);
    } else {
      navigate("/products");
    }
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section ref={sectionRef} className="w-full bg-gradient-to-b from-gray-50 to-white py-10 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section dengan dekorasi */}
        <div className="text-center mb-8 md:mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-5">
            <Sparkles size={120} className="text-forest" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3 tracking-tight">
            Promo Spesial
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-2">
            Dapatkan diskon menarik untuk berbagai produk pilihan. 
            Gunakan kode promo sebelum checkout!
          </p>
          <div className="w-20 sm:w-24 h-1.5 bg-forest mx-auto mt-3 sm:mt-4 rounded-full"></div>
        </div>

        {activePromos.length === 0 ? (
          /* Tampilan ketika tidak ada promo */
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-mist-border">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Promo Aktif</h3>
            <p className="text-gray-500 mb-6">Nantikan promo menarik lainnya!</p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 bg-forest hover:bg-forest-dark text-white px-6 py-3 rounded-full font-semibold transition shadow-md"
            >
              Belanja Sekarang <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <>
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {activePromos.map((promo) => (
                <div 
                  key={promo.id} 
                  className="relative h-60 sm:h-64 md:h-72 rounded-3xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-mist-border/50"
                  onClick={() => handlePromoClick(promo.category)}
                >
                  {/* Background Image */}
                  <img 
                    src={promo.image} 
                    alt={promo.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/60 to-forest/20 opacity-85 group-hover:opacity-95 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-4 sm:p-5 md:p-6 flex flex-col justify-between">
                    {/* Top part: Discount Badge */}
                    <div className="flex justify-between items-start">
                      <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] md:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-wider">
                        {promo.category || 'Spesial'}
                      </span>
                      <div className="bg-honey text-gray-950 text-xs md:text-sm font-black px-3.5 py-1.5 rounded-full shadow-lg">
                        {promo.discountType === "percentage" ? `${promo.discountValue}% OFF` : `Rp${promo.discountValue/1000}k OFF`}
                      </div>
                    </div>

                    {/* Bottom part: Text & Code */}
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-white text-xl md:text-2xl leading-tight mb-2 group-hover:text-honey transition-colors">
                        {promo.title}
                      </h3>
                      <p className="text-gray-300 text-xs md:text-sm line-clamp-2 mb-4">
                        {promo.description}
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-white/20 pt-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest">Gunakan Kode</span>
                          <div className="bg-white/10 backdrop-blur-sm border border-white/25 px-3 py-1.5 rounded-lg text-honey font-mono font-black text-sm tracking-widest w-max">
                            {promo.code}
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            copyPromoCode(promo.code);
                          }}
                          className={`p-3 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                            copiedCode === promo.code 
                              ? "bg-forest border-forest-light text-white shadow-[0_0_15px_rgba(0,110,89,0.6)]" 
                              : "bg-white/10 border-white/30 text-white hover:bg-honey hover:text-gray-950 hover:border-honey hover:scale-110"
                          }`}
                          title="Salin kode"
                        >
                          {copiedCode === promo.code ? <CheckCircle size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Informasi Promo */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-honey-soft to-honey-light/70 px-6 py-3 rounded-full border border-honey/30 shadow-sm">
                <Clock size={16} className="text-honey-dark shrink-0" />
                <p className="text-xs md:text-sm text-honey-dark font-medium">
                  Klaim kode voucher di atas saat proses pembayaran (checkout).
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}