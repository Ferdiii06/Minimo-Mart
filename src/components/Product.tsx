import { useState, useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { type Product, productsData } from "../data/products";
import gsap from "gsap";

// Card Component untuk menampilkan setiap produk
function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState<number>(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);
  
  const increase = () => setQty(qty + 1);
  const decrease = () => qty > 1 && setQty(qty - 1);

  const formatRupiah = (price: number) => {
    return price.toLocaleString('id-ID');
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    setQty(1);

    // Flying animation
    const cartIcon = document.getElementById("cart-icon");
    if (!cartIcon || !imgRef.current) return;

    const imgRect = imgRef.current.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyingImg = imgRef.current.cloneNode(true) as HTMLImageElement;
    flyingImg.style.position = "fixed";
    flyingImg.style.left = `${imgRect.left}px`;
    flyingImg.style.top = `${imgRect.top}px`;
    flyingImg.style.width = `${imgRect.width}px`;
    flyingImg.style.height = `${imgRect.height}px`;
    flyingImg.style.zIndex = "9999";
    flyingImg.style.pointerEvents = "none";
    flyingImg.style.borderRadius = "12px";
    
    document.body.appendChild(flyingImg);

    gsap.to(flyingImg, {
      x: cartRect.left - imgRect.left,
      y: cartRect.top - imgRect.top,
      scale: 0.1,
      opacity: 0.5,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        flyingImg.remove();
        
        // Pop animation for the cart icon itself
        gsap.fromTo(cartIcon, 
          { scale: 1.3 }, 
          { scale: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 p-3 sm:p-4 md:p-5 flex flex-col">
      
      {/* Container Gambar */}
      <div 
        onClick={() => navigate(`/product/${product.id}`)}
        className="h-28 sm:h-36 md:h-40 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center mb-3 sm:mb-4 cursor-pointer hover:opacity-90 transition"
      >
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          className="h-full object-contain hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Nama Produk */}
      <h3 
        onClick={() => navigate(`/product/${product.id}`)}
        className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate cursor-pointer hover:text-forest transition"
      >
        {product.name}
      </h3>
      <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mb-1 sm:mb-2">{product.weight}</p>
      <p className="text-base sm:text-xl md:text-2xl font-bold text-forest mb-2 sm:mb-4">
        Rp {formatRupiah(product.price)}
      </p>

      {/* Action Buttons */}
      <div className="mt-auto flex items-center justify-between gap-1.5 sm:gap-2">
        <div className="flex items-center border border-gray-200 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white">
          <button
            onClick={decrease}
            className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-xs sm:text-base text-gray-500 hover:text-forest cursor-pointer"
          >
            -
          </button>
          <span className="w-5 sm:w-6 md:w-8 text-center font-medium text-xs sm:text-sm md:text-base text-gray-800">
            {qty}
          </span>
          <button
            onClick={increase}
            className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-xs sm:text-base text-gray-500 hover:text-forest cursor-pointer"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-forest hover:bg-forest-dark text-white p-2 sm:p-2.5 md:p-3 rounded-full transition shadow-md hover:shadow-forest/30 hover:scale-105 cursor-pointer active:scale-95 shrink-0"
        >
          <ShoppingCart size={15} className="sm:w-[17px] sm:h-[17px]" />
        </button>
      </div>
    </div>
  );
}

// Main component
export default function Product() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const categoryTabs = ["Semua", "Frozen Food", "Sayuran", "Makanan Cepat Saji", "Minuman Instan", "Snacks", "Daging"];

  const filteredProducts = selectedCategory === "Semua"
    ? productsData.slice(0, 8)
    : productsData.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  // Animate grid cards whenever selectedCategory changes
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 25, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.04, ease: "power2.out" }
      );
    }
  }, [selectedCategory]);

  return (
    <section ref={sectionRef} id="product" className="w-full bg-mist-surface/60 py-10 md:py-16 px-4 md:px-6 border-b border-mist-border">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Produk Pilihan
            </h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
              Pilihan produk segar, lezat, dan berkualitas untuk Anda
            </p>
          </div>

          {/* Tombol Selengkapnya - navigasi ke halaman semua produk */}
          <button 
            onClick={() => navigate('/products')}
            className="w-full md:w-auto bg-forest hover:bg-forest-dark text-white px-6 py-2.5 rounded-full font-semibold transition shadow-md hover:shadow-forest/20 hover:scale-105 cursor-pointer"
          >
            Lihat Semua Produk ({productsData.length})
          </button>
        </div>

        {/* Filter Kategori Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedCategory(tab)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === tab
                  ? "bg-forest text-white shadow-md shadow-forest/25 scale-105"
                  : "bg-white text-gray-700 hover:bg-forest-soft hover:text-forest border border-mist-border"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid System */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}