import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Data kategori yang sudah difilter: Frozen food, Sayuran, Makanan Cepat Saji, Minuman Instan, Snacks
const categories = [
  {
    title: "Frozen Food",
    image: "/crispy%20nugget%20ayam.jpg",
    bg: "bg-green-100",
  },
  {
    title: "Sayuran",
    image: "/wortel.jpg",
    bg: "bg-orange-100",
  },
  {
    title: "Makanan Cepat Saji",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    bg: "bg-red-100",
  },
  {
    title: "Minuman Instan",
    image: "/kopi%20bubuk%20robusta.jpg",
    bg: "bg-blue-100",
  },
  {
    title: "Snacks",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60",
    bg: "bg-yellow-100",
  },
  {
    title: "Daging",
    image: "/daging%20sapi.jpg",
    bg: "bg-rose-100",
  },
];

export default function Category() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Category cards stagger pop
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 35, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 88%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryClick = (categoryTitle: string) => {
    const encodedCategory = encodeURIComponent(categoryTitle);
    navigate(`/category/${encodedCategory}`);
  };

  return (
    <section ref={sectionRef} className="w-full py-10 md:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div ref={headerRef} className="flex justify-between items-end mb-6 md:mb-10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Kategori</h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">Pilihan kategori untuk Anda</p>
          </div>
        </div>

        {/* Grid Ikon Kategori (6 Kategori) */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-6 gap-x-4 md:gap-6 justify-items-center max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.title)}
              className="flex flex-col items-center gap-3 cursor-pointer group w-full max-w-[120px]"
            >
              {/* Ikon Bulat */}
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-full ${category.bg} flex items-center justify-center shadow-xs group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden border-2 border-transparent group-hover:border-forest`}>
                <img
                  src={category.image.startsWith('/') ? category.image : `${category.image}?auto=format&fit=crop&w=200&q=80`}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Teks Kategori */}
              <span className="text-xs md:text-sm font-semibold text-gray-700 text-center leading-tight group-hover:text-forest transition-colors line-clamp-2">
                {category.title}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}