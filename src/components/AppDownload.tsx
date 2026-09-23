import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Smartphone, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Star, 
  QrCode, 
  Truck, 
  Tag, 
  ShoppingBag, 
  Search,
  Bell,
  ArrowRight
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AppDownload() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const floatBadge1Ref = useRef<HTMLDivElement>(null);
  const floatBadge2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(phoneRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        scale: 0.92,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.4)",
      });

      // Floating ambient bobbing for badges
      if (floatBadge1Ref.current) {
        gsap.to(floatBadge1Ref.current, {
          y: -10,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (floatBadge2Ref.current) {
        gsap.to(floatBadge2Ref.current, {
          y: 8,
          duration: 2.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.3,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="app-download" 
      className="w-full py-16 md:py-24 bg-gradient-to-br from-[#00382e] via-forest-dark to-[#00261f] text-white relative overflow-hidden"
    >
      {/* Background Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-forest/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-honey/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_at_center,rgba(247,189,83,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Kolom Kiri: Copy, Manfaat, CTA */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 w-fit text-xs font-semibold text-honey tracking-wide">
              <Smartphone size={14} className="text-honey" />
              <span>Aplikasi Mobile Minimo</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
              Belanja Kebutuhan Harian <br />
              <span className="text-honey">Lebih Cepat & Praktis</span> di Ponsel
            </h2>

            {/* Sub-headline */}
            <p className="text-sm md:text-base text-mist/90 max-w-xl leading-relaxed">
              Nikmati kemudahan belanja sayur segar, sembako, dan aneka produk UMKM lokal langsung dari genggaman. Lacak pesanan langsung ke seluruh Indonesia dengan jaminan mutu terbaik.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl">
                <div className="w-8 h-8 rounded-xl bg-honey/20 flex items-center justify-center text-honey mb-2">
                  <Zap size={18} />
                </div>
                <h4 className="text-sm font-bold text-white mb-0.5">Flash Sale Prioritas</h4>
                <p className="text-xs text-mist/70">Akses deal murah 15 menit lebih awal</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl">
                <div className="w-8 h-8 rounded-xl bg-forest-light/30 flex items-center justify-center text-emerald-300 mb-2">
                  <Sparkles size={18} />
                </div>
                <h4 className="text-sm font-bold text-white mb-0.5">Kupon Rp 50.000</h4>
                <p className="text-xs text-mist/70">Kupon khusus pengguna baru aplikasi</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl">
                <div className="w-8 h-8 rounded-xl bg-honey/20 flex items-center justify-center text-honey mb-2">
                  <ShieldCheck size={18} />
                </div>
                <h4 className="text-sm font-bold text-white mb-0.5">Garansi Segar</h4>
                <p className="text-xs text-mist/70">Retur dana instan tanpa ribet</p>
              </div>
            </div>

            {/* Download Buttons + QR Code */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Button App Store & Play Store */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* Google Play */}
                <a
                  href="#download-play"
                  onClick={(e) => { e.preventDefault(); alert("Aplikasi Android sedang dalam tahap rilis Play Store!"); }}
                  className="group flex items-center gap-3 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-honey/60 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md"
                >
                  <svg className="w-6 h-6 fill-current text-white group-hover:text-honey transition" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.793 12 3.61 22.186c-.368-.372-.61-.951-.61-1.686V3.5c0-.735.242-1.314.609-1.686zm11.256 11.258l2.368-2.368-11.83-6.842 9.462 9.21zm2.368-3.444l2.457 1.42c.813.47.813 1.238 0 1.708l-2.457 1.42-2.148-2.148 2.148-2.4zM5.403 20.938l11.83-6.842-2.368-2.368-9.462 9.21z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] uppercase text-mist/70 tracking-wider leading-none">Temukan di</p>
                    <p className="text-sm font-bold text-white leading-tight">Google Play</p>
                  </div>
                </a>

                {/* App Store */}
                <a
                  href="#download-apple"
                  onClick={(e) => { e.preventDefault(); alert("Aplikasi iOS sedang dalam tahap rilis App Store!"); }}
                  className="group flex items-center gap-3 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-honey/60 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md"
                >
                  <svg className="w-6 h-6 fill-current text-white group-hover:text-honey transition" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.64-.78 1.08-1.86.96-2.95-1 .04-2.16.67-2.85 1.46-.57.65-1.07 1.76-.94 2.82 1.11.09 2.19-.55 2.83-1.33z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] uppercase text-mist/70 tracking-wider leading-none">Unduh di</p>
                    <p className="text-sm font-bold text-white leading-tight">App Store</p>
                  </div>
                </a>
              </div>

              {/* QR Mini Pill */}
              <div className="hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                <div className="bg-white p-1.5 rounded-lg shrink-0">
                  <QrCode size={32} className="text-gray-900" />
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-white flex items-center gap-1">
                    Scan Unduh <ArrowRight size={12} className="text-honey" />
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-honey mt-0.5">
                    <Star size={11} className="fill-honey text-honey" />
                    <span className="font-bold">4.9</span>
                    <span className="text-mist/70">(48rb ulasan)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Mockup Smartphone Interaktif */}
          <div ref={phoneRef} className="lg:col-span-5 flex justify-center relative">
            
            {/* Floating Badge 1 - Order Status */}
            <div 
              ref={floatBadge1Ref}
              className="absolute -top-4 -left-4 sm:left-4 z-20 bg-white text-gray-800 px-3.5 py-2.5 rounded-2xl shadow-2xl border border-mist-border flex items-center gap-2.5 max-w-[210px]"
            >
              <div className="w-8 h-8 rounded-xl bg-forest-soft text-forest flex items-center justify-center shrink-0">
                <Truck size={18} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-forest uppercase tracking-wider">Sedang Dikirim</p>
                <p className="text-xs font-bold text-gray-900 truncate">Paket Sayur Segar</p>
              </div>
            </div>

            {/* Floating Badge 2 - Promo Alert */}
            <div 
              ref={floatBadge2Ref}
              className="absolute -bottom-4 -right-4 sm:right-4 z-20 bg-white text-gray-800 px-3.5 py-2.5 rounded-2xl shadow-2xl border border-mist-border flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-honey-soft text-honey-dark flex items-center justify-center shrink-0">
                <Tag size={18} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-honey-dark uppercase tracking-wider">Kupon Siap Pakai</p>
                <p className="text-xs font-bold text-gray-900">Diskon 50% Aktif</p>
              </div>
            </div>

            {/* Smartphone Frame Outer */}
            <div className="w-[280px] sm:w-[310px] h-[580px] bg-slate-900 rounded-[44px] p-3 shadow-2xl shadow-black/60 border-4 border-slate-700/80 relative">
              {/* Dynamic Island Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-end px-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>

              {/* Smartphone Inner Screen */}
              <div className="w-full h-full bg-gray-50 rounded-[34px] overflow-hidden flex flex-col text-gray-800 relative text-left select-none">
                
                {/* App Screen Header */}
                <div className="bg-forest px-4 pt-8 pb-4 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[10px] text-white/80">Lokasi Antar</p>
                      <p className="text-xs font-bold flex items-center gap-1">
                        Seluruh Indonesia <span className="text-honey text-[10px]">▼</span>
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                      <Bell size={14} />
                    </div>
                  </div>

                  {/* Mockup Search Bar */}
                  <div className="bg-white rounded-xl px-3 py-1.5 flex items-center gap-2 text-gray-400 text-xs shadow-inner">
                    <Search size={14} className="text-forest" />
                    <span className="text-gray-500 text-[11px]">Cari mangga, kopi, beras...</span>
                  </div>
                </div>

                {/* NusaPay Balance Card in App */}
                <div className="mx-3 -mt-2 bg-white rounded-xl p-2.5 shadow-sm border border-gray-100 flex items-center justify-between text-xs z-10">
                  <div>
                    <span className="text-[9px] text-gray-400 font-semibold block">SALDO MinimoPAY</span>
                    <span className="text-sm font-extrabold text-forest">Rp 245.000</span>
                  </div>
                  <div className="h-6 w-px bg-gray-200" />
                  <div className="text-right">
                    <span className="text-[9px] text-gray-400 font-semibold block">POIN BONUS</span>
                    <span className="text-xs font-bold text-honey-dark flex items-center gap-0.5 justify-end">
                      <Star size={11} className="fill-honey text-honey" /> 1.250 Pts
                    </span>
                  </div>
                </div>

                {/* Quick App Category Pills */}
                <div className="px-3 pt-3">
                  <p className="text-[11px] font-bold text-gray-700 mb-1.5">Kategori Cepat</p>
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    {[
                      { name: "Sayur", bg: "bg-emerald-50", iconColor: "text-emerald-700" },
                      { name: "Daging", bg: "bg-rose-50", iconColor: "text-rose-700" },
                      { name: "Minuman", bg: "bg-amber-50", iconColor: "text-amber-700" },
                      { name: "Snack", bg: "bg-yellow-50", iconColor: "text-yellow-700" },
                    ].map((item, idx) => (
                      <div key={idx} className={`${item.bg} rounded-xl p-1.5 flex flex-col items-center gap-1 border border-black/5`}>
                        <div className={`w-6 h-6 rounded-lg bg-white flex items-center justify-center ${item.iconColor} shadow-xs`}>
                          <ShoppingBag size={12} />
                        </div>
                        <span className="text-[9px] font-medium text-gray-700">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promo Card in Mockup */}
                <div className="mx-3 mt-3 p-2.5 rounded-xl bg-gradient-to-r from-forest to-forest-light text-white flex items-center justify-between">
                  <div>
                    <span className="text-[8px] bg-honey text-gray-900 font-black px-1.5 py-0.5 rounded uppercase">Flash Deal</span>
                    <p className="text-xs font-extrabold mt-1">Diskon Hingga 60%</p>
                    <p className="text-[9px] text-white/80">Khusus belanja di aplikasi</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Sparkles size={18} className="text-honey" />
                  </div>
                </div>

                {/* Mockup Bottom Navigation Bar */}
                <div className="mt-auto bg-white border-t border-gray-100 py-2 px-6 flex items-center justify-between text-gray-400">
                  <div className="flex flex-col items-center text-forest">
                    <div className="w-1.5 h-1.5 rounded-full bg-forest mb-0.5" />
                    <span className="text-[8px] font-bold">Beranda</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Search size={14} />
                    <span className="text-[8px]">Eksplor</span>
                  </div>
                  <div className="flex flex-col items-center relative">
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white rounded-full text-[7px] flex items-center justify-center font-bold">2</span>
                    <ShoppingBag size={14} />
                    <span className="text-[8px]">Keranjang</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-gray-300" />
                    <span className="text-[8px]">Akun</span>
                  </div>
                </div>

                {/* Home Indicator Bar */}
                <div className="w-24 h-1 bg-gray-300 rounded-full mx-auto my-1.5" />

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
