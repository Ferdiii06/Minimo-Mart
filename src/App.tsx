import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Category from './components/Category'
import Product from './components/Product'
import Promo from './components/Promo'
import FlashSale from './components/FlashSale'
import AppDownload from './components/AppDownload'
import ProductDetail from './components/ProductDetail'
import Checkout from './components/Checkout'
import OrderHistory from './components/OrderHistory'
import AllProduct from './components/AllProduct'
import CategoryProducts from './components/CategoryProducts'
import { useEffect, useRef, useState } from 'react'
import { Leaf, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

// Halaman Utama
function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Fresh Produce
    "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Vegetables
    "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Market
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Text Reveal
    if (textRef.current) {
      const texts = textRef.current.children;
      gsap.fromTo(texts, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }

    // 2. Text Scrubbing (Parallax Text)
    if (bgTextRef.current) {
      gsap.to(bgTextRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    // 3. Parallax Banner
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Floating badges loop
    if (badge1Ref.current) {
      gsap.fromTo(badge1Ref.current, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.8, ease: "back.out(1.7)" }
      );
      gsap.to(badge1Ref.current, {
        y: -10,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.4
      });
    }

    if (badge2Ref.current) {
      gsap.fromTo(badge2Ref.current, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.6, delay: 1, ease: "back.out(1.7)" }
      );
      gsap.to(badge2Ref.current, {
        y: 10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.6
      });
    }

    // 4. Banner Slider Sweep timer
    const interval = setInterval(() => {
      // Swipe out current
      if (sliderRef.current) {
        gsap.to(sliderRef.current, {
          clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          duration: 0.5,
          onComplete: () => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            // Swipe in next
            gsap.fromTo(sliderRef.current,
              { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
              { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 0.5 }
            );
          }
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative py-8 sm:py-12 md:py-20 px-4 sm:px-6 bg-white overflow-hidden min-h-[75vh] md:min-h-[80vh] flex items-center">
        {/* Background Parallax Text */}
        <div 
          ref={bgTextRef} 
          className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-black text-gray-50 whitespace-nowrap z-0 select-none pointer-events-none"
        >
          FRESH GROCERY EVERYDAY
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center relative z-10 w-full">
          <div ref={textRef} className="space-y-4 sm:space-y-6 text-center md:text-left order-2 md:order-1">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight tracking-tight">
              Selamat Datang di <br />
              <span className="text-forest">Minimo<span className="text-honey">Mart</span></span>
            </h1>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
              <span className="italic font-medium">Minimo Mart</span> adalah pusat belanja ritel modern kebanggaan lokal yang menghadirkan pengalaman berbelanja harian terbaik. Kami menyediakan aneka ragam kebutuhan pokok, mulai dari sayuran segar berkualitas, produk olahan daging pilihan, hingga kebutuhan rumah tangga sehari-hari dengan harga terjangkau dan pelayanan yang ramah.
            </p>
            <div className="pt-2 sm:pt-4">
              <a 
                href="#product" 
                className="inline-block w-full sm:w-auto text-center bg-forest text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold hover:bg-forest-dark transition-all shadow-lg hover:shadow-forest/25 active:scale-95"
              >
                Lihat Produk
              </a>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-end order-1 md:order-2 h-full">
            <div className="relative group w-full max-w-[260px] sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square">
              <div className="absolute -inset-4 bg-forest-soft rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
              
              {/* Floating Chip 1 */}
              <div ref={badge1Ref} className="absolute -top-3 left-0 sm:-left-3 md:-left-6 scale-90 sm:scale-100 origin-left bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl shadow-xl border border-mist-border z-20 flex items-center gap-2 sm:gap-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-forest-soft flex items-center justify-center text-forest shrink-0">
                  <Leaf size={14} className="sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] font-extrabold text-gray-900 leading-tight">100% Produk Lokal</p>
                  <p className="text-[8px] sm:text-[9px] text-forest font-semibold">Segar Setiap Hari</p>
                </div>
              </div>

              {/* Floating Chip 2 */}
              <div ref={badge2Ref} className="absolute -bottom-3 right-0 sm:-right-3 md:-right-6 scale-90 sm:scale-100 origin-right bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl shadow-xl border border-mist-border z-20 flex items-center gap-2 sm:gap-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-honey-soft flex items-center justify-center text-honey-dark shrink-0">
                  <Zap size={14} className="fill-honey sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] font-extrabold text-gray-900 leading-tight">Pengiriman Cepat</p>
                  <p className="text-[8px] sm:text-[9px] text-honey-dark font-semibold">Ke Seluruh Indonesia</p>
                </div>
              </div>

              <div ref={sliderRef} className="w-full h-full relative" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
                <img 
                  src={slides[currentSlide]} 
                  className="w-full h-full object-cover rounded-3xl drop-shadow-2xl"
                  alt="Minimo Hero"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="flash-sale">
        <FlashSale />
      </div>

      <div id="category">
        <Category />
      </div>

      <div id="product">
        <Product /> {/* INI YANG MENAMPILKAN 8 PRODUK */}
      </div>

      <div id="promo">
        <Promo />
      </div>

      <div id="app-download">
        <AppDownload />
      </div>
    </>
  );
}

import ScrollToTop from './components/ScrollToTop'
import ToastContainer from './components/ToastContainer'

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/products" element={<AllProduct />} /> {/* INI YANG MENAMPILKAN 50 PRODUK */}
        <Route path="/category/:category" element={<CategoryProducts />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App