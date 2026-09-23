import { useState } from "react";
import { ShoppingCart, ArrowLeft, Filter, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { productsData, getAllCategories } from "../data/products";
import type { Product } from "../data/products";

// Card Component untuk menampilkan setiap produk
function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState<number>(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const increase = () => setQty(qty + 1);
  const decrease = () => qty > 1 && setQty(qty - 1);

  const formatRupiah = (price: number) => {
    return price.toLocaleString('id-ID');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 p-4 flex flex-col h-full">
      
      {/* Container Gambar */}
      <div 
        onClick={() => navigate(`/product/${product.id}`)}
        className="h-32 md:h-40 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center mb-4 cursor-pointer hover:opacity-90 transition"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Nama Produk */}
      <h3 
        onClick={() => navigate(`/product/${product.id}`)}
        className="text-base md:text-lg font-semibold text-gray-800 truncate cursor-pointer hover:text-forest transition"
      >
        {product.name}
      </h3>
      
      {/* Berat */}
      <p className="text-xs md:text-sm text-gray-500 mb-2">{product.weight}</p>
      
      {/* Harga */}
      <p className="text-xl md:text-2xl font-bold text-forest mb-4">
        Rp {formatRupiah(product.price)}
      </p>

      {/* Kategori Badge */}
      {product.category && (
        <span className="inline-block bg-mist-surface text-gray-700 text-xs px-2.5 py-1 rounded-full mb-3 w-fit border border-mist-border font-medium">
          {product.category}
        </span>
      )}

      {/* Action Buttons */}
      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="flex items-center border border-mist-border rounded-full px-2 py-1 bg-white">
          <button
            onClick={decrease}
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-gray-500 hover:text-forest cursor-pointer"
          >
            -
          </button>
          <span className="w-6 md:w-8 text-center font-medium text-sm md:text-base text-gray-800">
            {qty}
          </span>
          <button
            onClick={increase}
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-gray-500 hover:text-forest cursor-pointer"
          >
            +
          </button>
        </div>

        <button
          onClick={() => {
            addToCart(product, qty);
            setQty(1);
          }}
          className="bg-forest hover:bg-forest-dark text-white p-2.5 md:p-3 rounded-full transition shadow-md hover:shadow-forest/25 hover:scale-105 cursor-pointer active:scale-95"
        >
          <ShoppingCart size={16} className="md:w-[18px]" />
        </button>
      </div>
    </div>
  );
}

export default function AllProduct() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high" | "name">("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  
  const categories = ["Semua", ...getAllCategories()];
  
  // Filter produk berdasarkan kategori
  const filteredProducts = selectedCategory === "Semua" 
    ? productsData 
    : productsData.filter(p => p.category === selectedCategory);
  
  // Sort produk
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return a.id - b.id;
    }
  });

  // Handler untuk memilih kategori
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="min-h-screen bg-mist-surface/40 py-6 md:py-10 border-b border-mist-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header dengan Tombol Kembali */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-forest transition cursor-pointer"
          >
            <ArrowLeft size={20} />
            <span className="text-sm md:text-base font-medium">Kembali</span>
          </button>
          
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Semua Produk ({productsData.length})
          </h1>
          
          {/* Tombol Filter Mobile */}
          <button 
            className="md:hidden p-2 bg-white rounded-xl shadow-xs border border-mist-border"
            onClick={() => setShowFilter(!showFilter)}
          >
            <Filter size={20} className="text-gray-600" />
          </button>
          
          {/* Spacer for desktop */}
          <div className="w-20 hidden md:block"></div>
        </div>

        {/* Filter dan Sort Section */}
        <div className="mb-8">
          {/* Desktop Filter */}
          <div className="hidden md:flex items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-xs border border-mist-border">
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-800 text-sm">Kategori:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
                      selectedCategory === category
                        ? "bg-forest text-white shadow-md shadow-forest/20"
                        : "bg-mist-surface text-gray-700 hover:bg-forest-soft hover:text-forest border border-mist-border"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800 text-sm">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as typeof sortBy);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-mist-border rounded-xl text-sm focus:outline-none focus:border-forest text-gray-800 font-medium bg-mist-surface/30 cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="name">Nama A-Z</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Modal */}
          {showFilter && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:hidden">
              <div className="bg-white w-full rounded-t-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Filter & Sort</h3>
                  <button onClick={() => setShowFilter(false)}>
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Kategori</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            handleCategorySelect(category);
                            setShowFilter(false);
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                            selectedCategory === category
                              ? "bg-green-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Urutkan</label>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value as typeof sortBy);
                        setCurrentPage(1);
                        setShowFilter(false);
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    >
                      <option value="default">Default</option>
                      <option value="price-low">Harga Terendah</option>
                      <option value="price-high">Harga Tertinggi</option>
                      <option value="name">Nama A-Z</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Jumlah Produk */}
        <div className="mb-4 text-gray-600">
          Menampilkan {totalProducts > 0 ? indexOfFirstProduct + 1 : 0}-{Math.min(indexOfLastProduct, totalProducts)} dari {totalProducts} produk
          {selectedCategory !== "Semua" && ` di kategori ${selectedCategory}`}
        </div>

        {/* Grid Produk */}
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => {
                    setCurrentPage(p => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="px-3 md:px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition text-sm md:text-base text-gray-700"
                >
                  Sebelumnnya
                </button>
                
                <div className="flex gap-1 overflow-x-auto max-w-[50vw] md:max-w-none scrollbar-hide py-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-lg flex items-center justify-center transition text-sm md:text-base cursor-pointer ${
                        currentPage === page 
                          ? "bg-forest text-white font-black shadow-md shadow-forest/20" 
                          : "border border-mist-border hover:bg-forest-soft hover:text-forest text-gray-700 bg-white"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setCurrentPage(p => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="px-3 md:px-4 py-2 border border-mist-border bg-white rounded-lg disabled:opacity-50 hover:bg-forest-soft hover:text-forest transition text-sm md:text-base text-gray-700 cursor-pointer"
                >
                  Selanjutnya
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada produk di kategori ini</p>
            <button
              onClick={() => setSelectedCategory("Semua")}
              className="mt-4 bg-forest text-white px-6 py-2.5 rounded-full hover:bg-forest-dark transition shadow-md font-semibold cursor-pointer"
            >
              Lihat Semua Produk
            </button>
          </div>
        )}
      </div>
    </div>
  );
}