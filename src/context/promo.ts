export type Promo = {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: "percentage" | "nominal";
  discountValue: number;
  minPurchase: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  category?: string;
  image: string;
  bgColor: string;
  isActive: boolean;
};

export const promosData: Promo[] = [
  {
    id: "PROMO001",
    code: "SAYUR20",
    title: "Diskon Sayuran 20%",
    description: "Nikmati diskon 20% untuk semua pembelian sayuran segar. Cocok untuk kebutuhan dapur harian Anda!",
    discountType: "percentage",
    discountValue: 20,
    minPurchase: 50000,
    maxDiscount: 50000,
    startDate: "2024-01-01",
    endDate: "2030-12-31",
    category: "Sayuran",
    image: "https://i.pinimg.com/1200x/6d/63/f7/6d63f7e45d14351793b9c82ee9adf2dd.jpg",
    bgColor: "bg-gradient-to-br from-green-100 to-green-200",
    isActive: true
  },
  {
    id: "PROMO002",
    code: "BUAHSEGAR",
    title: "Buah Segar 25%",
    description: "Diskon spesial 25% untuk semua jenis buah-buahan segar. Beli lebih banyak, hemat lebih banyak!",
    discountType: "percentage",
    discountValue: 25,
    minPurchase: 75000,
    maxDiscount: 75000,
    startDate: "2024-01-01",
    endDate: "2030-12-31",
    category: "Buah",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600",
    bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    isActive: true
  },
  {
    id: "PROMO003",
    code: "FROZEN15",
    title: "Frozen Food 15%",
    description: "Hemat 15% untuk semua produk frozen food. Stok makanan beku untuk persediaan di rumah!",
    discountType: "percentage",
    discountValue: 15,
    minPurchase: 100000,
    maxDiscount: 100000,
    startDate: "2024-01-01",
    endDate: "2030-12-31",
    category: "Frozen Food",
    image: "https://images.unsplash.com/photo-1604908912710-5a0a7f9548b1?w=600",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
    isActive: true
  },
  {
    id: "PROMO004",
    code: "BELANJA30",
    title: "Potongan Rp 30.000",
    description: "Potongan langsung Rp 30.000 untuk minimal belanja Rp 200.000. Cocok untuk belanja bulanan!",
    discountType: "nominal",
    discountValue: 30000,
    minPurchase: 200000,
    startDate: "2024-01-01",
    endDate: "2030-12-31",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600",
    bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
    isActive: true
  },
  {
    id: "PROMO005",
    code: "CEPATSAJI10",
    title: "Cepat Saji 10% Off",
    description: "Diskon 10% untuk aneka makanan cepat saji lezat dan praktis!",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: 40000,
    maxDiscount: 25000,
    startDate: "2024-01-01",
    endDate: "2030-12-31",
    category: "Makanan Cepat Saji",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    bgColor: "bg-gradient-to-br from-red-100 to-orange-200",
    isActive: true
  },
  {
    id: "PROMO006",
    code: "MINUMAN5",
    title: "Minuman Instan Segar 5%",
    description: "Nikmati diskon 5% untuk semua minuman instan. Segarkan hari Anda dengan minuman favorit!",
    discountType: "percentage",
    discountValue: 5,
    minPurchase: 25000,
    maxDiscount: 25000,
    startDate: "2024-01-01",
    endDate: "2030-12-31",
    category: "Minuman Instan",
    image: "/coklat%20bubuk%20malt.jpg",
    bgColor: "bg-gradient-to-br from-cyan-100 to-cyan-200",
    isActive: true
  },
  {
    id: "PROMO007",
    code: "SNACKS10",
    title: "Snacks 10% Off",
    description: "Diskon 10% untuk semua cemilan renyah dan wafer manis!",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: 30000,
    maxDiscount: 20000,
    startDate: "2024-01-01",
    endDate: "2030-12-31",
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600",
    bgColor: "bg-gradient-to-br from-yellow-100 to-amber-200",
    isActive: true
  },
  {
    id: "PROMO008",
    code: "SNACKS15",
    title: "Camilan 15%",
    description: "Diskon 15% untuk semua camilan dan snack. Temani santai Anda dengan camilan enak!",
    discountType: "percentage",
    discountValue: 15,
    minPurchase: 30000,
    maxDiscount: 30000,
    startDate: "2024-01-01",
    endDate: "2030-12-31",
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
    bgColor: "bg-gradient-to-br from-pink-100 to-pink-200",
    isActive: true
  },
  {
    id: "PROMO009",
    code: "DAGING20",
    title: "Daging & Ikan 20%",
    description: "Hemat 20% untuk pembelian daging dan ikan segar. Protein berkualitas untuk keluarga!",
    discountType: "percentage",
    discountValue: 20,
    minPurchase: 150000,
    maxDiscount: 100000,
    startDate: "2024-01-01",
    endDate: "2030-12-31",
    category: "Daging",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600",
    bgColor: "bg-gradient-to-br from-red-100 to-red-200",
    isActive: true
  },
  {
    id: "PROMO010",
    code: "SUSU10",
    title: "Susu 10% Off",
    description: "Diskon 10% untuk semua produk susu. Kalsium untuk tulang sehat keluarga!",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: 40000,
    maxDiscount: 30000,
    startDate: "2024-01-01",
    endDate: "2030-12-31",
    category: "Susu",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600",
    bgColor: "bg-gradient-to-br from-indigo-100 to-indigo-200",
    isActive: true
  }
];

// Fungsi untuk mendapatkan promo yang aktif
export const getActivePromos = (): Promo[] => {
  const today = new Date().toISOString().split('T')[0];
  return promosData.filter(promo => 
    promo.isActive && 
    promo.startDate <= today && 
    promo.endDate >= today
  );
};

// Fungsi untuk validasi kode promo
export const validatePromoCode = (code: string, totalPrice: number, category?: string): Promo | null => {
  const promo = promosData.find(p => p.code.toUpperCase() === code.trim().toUpperCase() && p.isActive);
  
  if (!promo) return null;
  
  // Cek minimal pembelian
  if (totalPrice < promo.minPurchase) return null;
  
  // Cek kategori jika ada
  if (promo.category && category && promo.category !== category) return null;
  
  // Cek tanggal
  const today = new Date().toISOString().split('T')[0];
  if (promo.startDate > today || promo.endDate < today) return null;
  
  return promo;
};

// Fungsi untuk menghitung diskon
export const calculateDiscount = (promo: Promo, totalPrice: number): number => {
  if (promo.discountType === "percentage") {
    const discount = (totalPrice * promo.discountValue) / 100;
    return promo.maxDiscount ? Math.min(discount, promo.maxDiscount) : discount;
  } else {
    return Math.min(promo.discountValue, totalPrice);
  }
};