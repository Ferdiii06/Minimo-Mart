export type Product = {
  id: number;
  name: string;
  weight: string;
  price: number;
  image: string;
  description?: string;
  category: string;
};

export const productsData: Product[] = [
  // 1. FROZEN FOOD
  {
    id: 1,
    name: "Frozen Pratha",
    weight: "250 gram",
    price: 21000,
    image: "/paratha.jpg",
    description: "Frozen pratha siap saji, praktis dan lezat.",
    category: "Frozen Food"
  },
  {
    id: 2,
    name: "Krispi Nugget Ayam",
    weight: "500 gram",
    price: 48000,
    image: "/crispy%20nugget%20ayam.jpg",
    description: "Nugget ayam crispy, terbuat dari daging ayam pilihan.",
    category: "Frozen Food"
  },
  {
    id: 3,
    name: "Sosis Sapi Keju",
    weight: "250 gram",
    price: 50000,
    image: "/sosis%20sapi.jpg",
    description: "Sosis sapi berkualitas, siap masak untuk berbagai olahan.",
    category: "Frozen Food"
  },
  {
    id: 4,
    name: "Siomay Ayam",
    weight: "500 gram",
    price: 42000,
    image: "/siomay%20ayam.jpg",
    description: "Dimsum ayam dengan kulit tipis, siap kukus.",
    category: "Frozen Food"
  },
  {
    id: 5,
    name: "Kentang Goreng",
    weight: "1 kg",
    price: 32000,
    image: "/kentang%20goreng.jpg",
    description: "Kentang goreng beku, crispy dan lezat.",
    category: "Frozen Food"
  },
  {
    id: 6,
    name: "Bakso Sapi",
    weight: "500 gram",
    price: 30000,
    image: "/bakso%20sapi.jpg",
    description: "Bakso sapi kenyal, cocok untuk bakso kuah atau goreng.",
    category: "Frozen Food"
  },
  {
    id: 7,
    name: "Otak-Otak",
    weight: "250 gram",
    price: 20000,
    image: "/otak%20otak.jpg",
    description: "Otak-otak ikan, siap bakar atau goreng.",
    category: "Frozen Food"
  },
  {
    id: 8,
    name: "Pizza Mini",
    weight: "500 gram",
    price: 27000,
    image: "/pizza%20mini.jpg",
    description: "Pizza mini frozen, siap dipanggang untuk camilan lezat.",
    category: "Frozen Food"
  },
  {
    id: 9,
    name: "Cireng Isi",
    weight: "250 gram",
    price: 23000,
    image: "/cireng%20isi.jpg",
    description: "Cireng isi ayam pedas, siap goreng.",
    category: "Frozen Food"
  },
  {
    id: 10,
    name: "Piscok",
    weight: "300 gram",
    price: 18000,
    image: "/piscok.jpg",
    description: "Pisang cokelat frozen, siap goreng untuk camilan manis.",
    category: "Frozen Food"
  },

  // 2. SAYURAN
  {
    id: 11,
    name: "Wortel",
    weight: "500 gram",
    price: 3000,
    image: "/wortel.jpg",
    description: "Wortel segar langsung dari petani. Kaya vitamin A dan serat.",
    category: "Sayuran"
  },
  {
    id: 12,
    name: "Kentang",
    weight: "1 kg",
    price: 12000,
    image: "/kentang.jpg",
    description: "Kentang lokal berkualitas, cocok untuk berbagai masakan.",
    category: "Sayuran"
  },
  {
    id: 13,
    name: "Tomat",
    weight: "500 gram",
    price: 5000,
    image: "https://i.pinimg.com/control1/1200x/29/40/61/294061c8da24641b45df7c7f672faf32.jpg",
    description: "Tomat segar, cocok untuk sayur atau jus.",
    category: "Sayuran"
  },
  {
    id: 14,
    name: "Bawang Merah",
    weight: "250 gram",
    price: 8000,
    image: "https://i.pinimg.com/1200x/ca/c6/fe/cac6fecef55f0230ba45e8df9352c446.jpg",
    description: "Bawang merah segar, bumbu dapur wajib.",
    category: "Sayuran"
  },
  {
    id: 15,
    name: "Bawang Putih",
    weight: "250 gram",
    price: 9000,
    image: "https://i.pinimg.com/736x/e0/d4/af/e0d4af286c7e714be1c3df2b0ffb43c3.jpg",
    description: "Bawang putih kualitas terbaik untuk bumbu masakan.",
    category: "Sayuran"
  },
  {
    id: 16,
    name: "Cabai Merah",
    weight: "250 gram",
    price: 15000,
    image: "https://i.pinimg.com/1200x/82/b7/29/82b729fb22b9e2fd02a08d995c1ffbd7.jpg",
    description: "Cabai merah segar, pedasnya nampol.",
    category: "Sayuran"
  },
  {
    id: 17,
    name: "Bayam",
    weight: "200 gram",
    price: 2500,
    image: "https://i.pinimg.com/736x/86/78/c2/8678c2798bbba0dd966a369dc074a142.jpg",
    description: "Bayam segar, kaya zat besi untuk kesehatan.",
    category: "Sayuran"
  },
  {
    id: 18,
    name: "Kangkung",
    weight: "200 gram",
    price: 2500,
    image: "https://i.pinimg.com/736x/10/10/eb/1010eb02f235cab544776d9e73777bd3.jpg",
    description: "Kangkung segar, cocok untuk tumis.",
    category: "Sayuran"
  },
  {
    id: 19,
    name: "Brokoli",
    weight: "300 gram",
    price: 8000,
    image: "https://i.pinimg.com/736x/1f/b5/2b/1fb52b1cd5d1b28a9c934dfb39a6b50c.jpg",
    description: "Brokoli segar, kaya antioksidan.",
    category: "Sayuran"
  },
  {
    id: 20,
    name: "Kol",
    weight: "500 gram",
    price: 4000,
    image: "https://i.pinimg.com/736x/51/23/44/5123441660081d5ef55f9c4731ce5c93.jpg",
    description: "Kol segar, cocok untuk sayur sop atau lalapan.",
    category: "Sayuran"
  },

  // 3. MAKANAN CEPAT SAJI
  {
    id: 21,
    name: "Burger Sapi Spesial",
    weight: "250 gram",
    price: 26000,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    description: "Burger daging sapi pilihan dengan keju leleh dan saus spesial.",
    category: "Makanan Cepat Saji"
  },
  {
    id: 22,
    name: "Ayam Geprek Crispy",
    weight: "300 gram",
    price: 22000,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
    description: "Ayam goreng tepung renyah dengan sambal korek pedas gurih.",
    category: "Makanan Cepat Saji"
  },
  {
    id: 23,
    name: "French Fries Mayo",
    weight: "200 gram",
    price: 18000,
    image: "/french%20fries%20mayo.jpg",
    description: "Kentang goreng renyah disajikan dengan saus keju dan mayones gurih.",
    category: "Makanan Cepat Saji"
  },
  {
    id: 24,
    name: "Pizza Slice Mozzarella",
    weight: "250 gram",
    price: 28000,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    description: "Pizza keju mozzarella meleleh dengan saus tomat Italia kaya rasa.",
    category: "Makanan Cepat Saji"
  },
  {
    id: 25,
    name: "Hotdog Sosis Jumbo",
    weight: "200 gram",
    price: 21000,
    image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80",
    description: "Roti lembut dengan sosis sapi jumbo, mustard, dan acar timun segar.",
    category: "Makanan Cepat Saji"
  },
  {
    id: 26,
    name: "Kebab Daging Sapi",
    weight: "250 gram",
    price: 24000,
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80",
    description: "Kulit tortilla gurih membungkus daging sapi panggang dan sayur renyah.",
    category: "Makanan Cepat Saji"
  },
  {
    id: 27,
    name: "Dimsum Mentai Bakar",
    weight: "300 gram",
    price: 27000,
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80",
    description: "Dimsum ayam lembut dengan saus mentai gurih dibakar harum.",
    category: "Makanan Cepat Saji"
  },
  {
    id: 28,
    name: "Bento Chicken Katsu",
    weight: "400 gram",
    price: 32000,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    description: "Paket nasi lengkap dengan fillet ayam katsu renyah dan salad segar.",
    category: "Makanan Cepat Saji"
  },

  // 4. MINUMAN INSTAN
  {
    id: 29,
    name: "Kopi Bubuk Robusta",
    weight: "200 gram",
    price: 25000,
    image: "/kopi%20bubuk%20robusta.jpg",
    description: "Kopi bubuk robusta murni pilihan, aroma pekat siap seduh.",
    category: "Minuman Instan"
  },
  {
    id: 30,
    name: "Teh Celup",
    weight: "1 box (25 kantong)",
    price: 12000,
    image: "/teh%20celup.jpg",
    description: "Teh celup dengan wangi aroma melati alami yang menyegarkan.",
    category: "Minuman Instan"
  },
  {
    id: 31,
    name: "Jahe Merah",
    weight: "1 box (10 sachet)",
    price: 22000,
    image: "/jahe%20merah.jpg",
    description: "Minuman serbuk jahe merah hangat dengan gula aren, menjaga kebugaran tubuh.",
    category: "Minuman Instan"
  },
  {
    id: 32,
    name: "Coklat Bubuk Malt",
    weight: "1 pack (10 sachet)",
    price: 24000,
    image: "/coklat%20bubuk%20malt.jpg",
    description: "Minuman serbuk coklat malt kaya energi dan vitamin, nikmat diseduh hangat atau dingin.",
    category: "Minuman Instan"
  },
  {
    id: 33,
    name: "Susu Bubuk",
    weight: "400 gram",
    price: 45000,
    image: "/susu%20bubuk.jpg",
    description: "Susu bubuk full cream bernutrisi tinggi dan gurih, mudah larut dalam air hangat.",
    category: "Minuman Instan"
  },
  {
    id: 34,
    name: "Sereal Bubuk",
    weight: "1 pack (10 sachet)",
    price: 20000,
    image: "/sereal%20bubuk.jpg",
    description: "Minuman sereal dan oat bergizi tinggi, pilihan tepat sarapan praktis mengenyangkan.",
    category: "Minuman Instan"
  },
  {
    id: 35,
    name: "Matcha Latte Bubuk",
    weight: "1 box (5 sachet)",
    price: 28000,
    image: "/matcha%20latte%20bubuk.jpg",
    description: "Serbuk matcha latte lembut perpaduan teh hijau Jepang dan susu creamy siap seduh.",
    category: "Minuman Instan"
  },

  // 5. SNACKS
  {
    id: 36,
    name: "Keripik Singkong",
    weight: "200 gram",
    price: 12000,
    image: "https://i.pinimg.com/1200x/94/7c/77/947c77c8304048e5f825b6220fcbc28f.jpg",
    description: "Keripik singkong gurih, renyah.",
    category: "Snacks"
  },
  {
    id: 37,
    name: "Silverqueen Cokelat",
    weight: "100 gram",
    price: 15000,
    image: "https://i.pinimg.com/1200x/10/6a/e7/106ae78f8460fecbe2c34ffef71d4246.jpg",
    description: "Cokelat batang manis, lezat.",
    category: "Snacks"
  },
  {
    id: 38,
    name: "Biskuit Roma Sari Gandum",
    weight: "250 gram",
    price: 10000,
    image: "https://i.pinimg.com/1200x/d6/71/a1/d671a106858bfe17d8058fb6c22479ab.jpg",
    description: "Biskuit renyah, cocok untuk camilan.",
    category: "Snacks"
  },
  {
    id: 39,
    name: "Kerupuk Udang",
    weight: "200 gram",
    price: 8000,
    image: "https://i.pinimg.com/1200x/0d/66/f4/0d66f49e2f1e2c27b5820c3e99bee69a.jpg",
    description: "Kerupuk udang gurih, renyah.",
    category: "Snacks"
  },
  {
    id: 40,
    name: "Permen Karet",
    weight: "100 gram",
    price: 5000,
    image: "https://i.pinimg.com/736x/bf/87/29/bf87290575d630dd7b0eaff2a2ca085e.jpg",
    description: "Permen aneka rasa, manis segar.",
    category: "Snacks"
  },
  {
    id: 41,
    name: "Kacang Atom",
    weight: "200 gram",
    price: 10000,
    image: "https://i.pinimg.com/736x/17/b5/ec/17b5ec4f6992166e20507fb3f636665e.jpg",
    description: "Kacang atom gurih, renyah.",
    category: "Snacks"
  },
  {
    id: 42,
    name: "Wafer Cokelat",
    weight: "150 gram",
    price: 12000,
    image: "https://i.pinimg.com/1200x/f7/e5/45/f7e545784b78aef4c7c94daeb762390f.jpg",
    description: "Wafer cokelat crispy, lezat.",
    category: "Snacks"
  },
  // 6. DAGING MENTAH SEGAR LOKAL
  {
    id: 43,
    name: "Daging Sapi Potong Rendang Mentah",
    weight: "500 gram",
    price: 72000,
    image: "/daging%20rendang.jpg",
    description: "Daging sapi mentah segar potongan dadu siap masak, serat padat alami, sangat pas untuk rendang, semur, dan gulai.",
    category: "Daging"
  },
  {
    id: 44,
    name: "Daging Sapi Has Mentah Segar",
    weight: "500 gram",
    price: 82000,
    image: "/daging%20sapi.jpg",
    description: "Steak daging sapi mentah segar pilihan berkualitas super empuk, dipotong harian langsung dari rumah potong lokal, higienis dan bersih.",
    category: "Daging"
  },
  {
    id: 45,
    name: "Daging Sapi Slice Mentah",
    weight: "500 gram",
    price: 75000,
    image: "/daging%20slice%20sapi.jpg",
    description: "Irisan tipis daging sapi mentah berlemak gurih dengan marbling merata, cocok untuk sukiyaki, shabu-shabu, dan yakiniku BBQ.",
    category: "Daging"
  },
  {
    id: 46,
    name: "Daging Iga Kambing / Mutton Mentah",
    weight: "500 gram",
    price: 78000,
    image: "/daging%20mutton%20sapi.jpg",
    description: "Potongan iga daging kambing/mutton mentah segar bertulang, aroma segar alami, sempurna untuk tongseng, kari, dan bakar madu.",
    category: "Daging"
  },
  {
    id: 47,
    name: "Dada Ayam Filet Mentah Segar",
    weight: "1 kg",
    price: 46000,
    image: "/dada%20ayam%20filet.jpg",
    description: "Dada ayam fillet mentah segar tanpa tulang dan kulit, dipotong higienis harian dari peternak lokal, tinggi protein.",
    category: "Daging"
  },
  {
    id: 48,
    name: "Paha Daging Ayam Mentah Segar",
    weight: "1 kg",
    price: 42000,
    image: "/paha%20daging%20ayam.jpg",
    description: "Paha ayam bawah (drumstick) mentah segar dan juicy, bersih siap bumbu untuk ayam goreng krispi atau ungkep rempah.",
    category: "Daging"
  }
];

// Fungsi helper untuk mendapatkan semua kategori yang unik
export const getAllCategories = (): string[] => {
  const categories = productsData.map(product => product.category);
  return [...new Set(categories)];
};

// Fungsi untuk mendapatkan produk berdasarkan kategori
export const getProductsByCategory = (category: string): Product[] => {
  return productsData.filter(product => product.category.toLowerCase() === category.toLowerCase());
};