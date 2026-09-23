import { useCart } from '../context/useCart';
import { useNotifications } from '../context/NotificationContext';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { productsData } from '../data/products';
import { useNavigate, useLocation } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Bell, MapPin, ChevronDown, Package, Ticket, HelpCircle, LogOut, Award } from 'lucide-react';
function Navbar() {
    const { totalItems, cartItems, removeFromCart } = useCart();
    const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
    const [showCart, setShowCart] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<typeof productsData>([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const navbarRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const cartRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLDivElement>(null);

    // Click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setShowUserMenu(false);
            }
            if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
                setShowCart(false);
            }
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // ScrollSpy untuk deteksi section aktif
    useEffect(() => {
        if (location.pathname !== '/') {
            setActiveSection('');
            return;
        }

        const sectionIds = ['home', 'flash-sale', 'category', 'product', 'promo', 'app-download'];
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            for (const id of [...sectionIds].reverse()) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= scrollPosition) {
                    if (id === 'flash-sale') {
                        setActiveSection('product');
                    } else {
                        setActiveSection(id);
                    }
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        if (!navbarRef.current) return;

        const showAnim = gsap.from(navbarRef.current, { 
            yPercent: -100,
            paused: true,
            duration: 0.3,
            ease: "power2.out"
        }).progress(1);

        const st = ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                if (self.direction === 1 && self.scroll() > 50) { 
                    // scroll down
                    showAnim.reverse();
                } else { 
                    // scroll up
                    showAnim.play();
                }
            }
        });

        return () => {
            st.kill();
        };
    }, []);

    // Konfigurasi Fuse.js untuk pencarian cerdas (fuzzy search)
    const fuse = new Fuse(productsData, {
        keys: ['name', 'category', 'description'],
        threshold: 0.4, // Semakin kecil semakin ketat
    });

    const handleSearchInput = (value: string) => {
        setSearchInput(value);
        if (value.trim()) {
            const results = fuse.search(value).map(result => result.item);
            setSearchResults(results);
            setShowSearchResults(true);
        } else {
            setSearchResults([]);
            setShowSearchResults(false);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setShowSearchResults(true);
        }
    };

    const goToHome = () => {
        navigate('/');
        setShowSearchResults(false);
        setShowCart(false);
    };

    const goToProductDetail = (productId: number) => {
        navigate(`/product/${productId}`);
        setShowSearchResults(false);
        setShowCart(false);
    };

    const goToCheckout = () => {
        navigate('/checkout');
        setShowCart(false);
    };

    const goToOrderHistory = () => {
        navigate('/order-history');
        setShowCart(false);
    };

    // Fungsi untuk scroll ke section tertentu
    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        // Jika tidak di halaman utama, navigasi ke halaman utama dulu
        if (location.pathname !== '/') {
            navigate('/');
            // Tunggu sebentar agar navigasi selesai, lalu scroll
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // Jika sudah di halaman utama, langsung scroll
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setShowSearchResults(false);
        setShowCart(false);
        setShowNotifications(false);
        setShowUserMenu(false);
    };

    // Menu items dengan section ID
    const menuItems = [
        { name: 'Beranda', sectionId: 'home' },
        { name: 'Kategori', sectionId: 'category' },
        { name: 'Produk', sectionId: 'product' },
        { name: 'Promo', sectionId: 'promo' },
        { name: 'Unduh App', sectionId: 'app-download' }
    ];

    return (
        <div ref={navbarRef} className="sticky top-0 z-50 w-full bg-white shadow-sm shadow-gray-200/50">
            {/* Top Bar - Location Selector */}
            <div className="hidden md:flex bg-mist-surface text-xs py-1.5 px-4 justify-between items-center z-[52] relative border-b border-mist-border">
                <div className="flex items-center gap-1 text-gray-600 hover:text-forest cursor-pointer transition">
                    <MapPin size={14} className="text-forest" />
                    <span>Dikirim ke: <span className="font-bold">Seluruh Indonesia</span></span>
                    <ChevronDown size={14} />
                </div>
                <div className="flex gap-4 text-gray-500">
                    <a 
                        href="#app-download" 
                        onClick={(e) => { e.preventDefault(); scrollToSection('app-download'); }}
                        className="hover:text-forest transition cursor-pointer font-medium"
                    >
                        Download App
                    </a>
                    <a href="#footer-contact" onClick={(e) => { e.preventDefault(); scrollToSection('footer-contact'); }} className="hover:text-forest transition cursor-pointer">
                        Bantuan
                    </a>
                </div>
            </div>

            {/* Navbar Utama */}
            <div className='flex flex-col md:flex-row items-center justify-between p-4 bg-white/95 backdrop-blur-md border-b border-mist-border gap-4 relative z-[51] shadow-xs'>
                {/* Logo - klik ke beranda */}
                <h1 
                    onClick={goToHome}
                    className='text-2xl md:text-3xl font-extrabold text-forest cursor-pointer hover:text-forest-dark transition flex items-center gap-1 tracking-tight'
                >
                    Minimo<span className="text-honey">Mart</span>
                </h1>
                
                <header className='flex items-center w-full md:w-auto gap-3 justify-between md:justify-end'>
                    {/* Pencarian */}
                    <div className="flex-1 md:flex-none relative">
                        <form className="flex items-center gap-2" onSubmit={handleSearchSubmit}>
                            <input 
                                className="w-full md:w-64 px-4 py-2 rounded-xl border border-mist-border bg-mist-surface/50 text-sm focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all" 
                                type="search" 
                                placeholder="Cari produk..." 
                                value={searchInput}
                                onChange={(e) => handleSearchInput(e.target.value)}
                                onFocus={() => searchInput && setShowSearchResults(true)}
                            />
                        </form>

                        {/* Hasil pencarian */}
                        {showSearchResults && (
                            <div className="fixed left-3 right-3 top-28 sm:top-full sm:left-0 sm:right-auto sm:absolute w-auto sm:w-80 bg-white shadow-xl rounded-2xl sm:rounded-lg mt-2 z-[60] max-h-80 overflow-y-auto border border-gray-100">
                                {searchResults.length > 0 ? (
                                    <ul className="divide-y divide-gray-100">
                                        {searchResults.map((product) => (
                                            <li 
                                                key={product.id} 
                                                className="p-3 hover:bg-forest-soft cursor-pointer flex items-center gap-3 transition"
                                                onClick={() => goToProductDetail(product.id)}
                                            >
                                                <img src={product.image} alt={product.name} className="w-10 h-10 object-contain rounded-lg" />
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                                                    <p className="text-xs text-forest font-bold">
                                                        Rp {product.price.toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-center text-gray-500 text-sm">Produk tidak ditemukan</div>
                                )}
                                <button 
                                    className="w-full py-2 bg-gray-50 text-xs text-gray-400 border-t hover:text-red-500"
                                    onClick={() => setShowSearchResults(false)}
                                >
                                    Tutup
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Tombol Notifikasi */}
                    <div className="relative" ref={notifRef}>
                        <button 
                            onClick={() => { setShowNotifications(!showNotifications); setShowCart(false); setShowUserMenu(false); }} 
                            className="p-2 hover:bg-gray-200 rounded-full transition relative"
                            title="Notifikasi"
                        >
                            <Bell className="h-6 w-6 text-gray-700" />
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 bg-honey text-gray-950 text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-xs animate-pulse">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>
                        
                        {/* Dropdown Notifikasi */}
                        {showNotifications && (
                            <div className="fixed left-3 right-3 top-28 sm:top-auto sm:left-auto sm:right-0 sm:absolute mt-2 sm:w-96 bg-white shadow-2xl rounded-2xl p-4 z-[70] border border-mist-border max-h-[80vh] flex flex-col">
                                <div className="flex justify-between items-center mb-3 border-b border-mist-border pb-2.5">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-bold text-gray-900">Notifikasi</h3>
                                        {unreadCount > 0 && (
                                             <span className="bg-forest-soft text-forest text-xs px-2 py-0.5 rounded-full font-bold">
                                                {unreadCount} Baru
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {notifications.length > 0 && (
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-xs text-forest hover:text-forest-dark font-medium cursor-pointer"
                                            >
                                                Tandai Dibaca
                                            </button>
                                        )}
                                        <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600 ml-1 text-lg leading-none cursor-pointer">&times;</button>
                                    </div>
                                </div>

                                {notifications.length > 0 ? (
                                    <ul className="space-y-2 max-h-80 overflow-y-auto">
                                        {notifications.map((item) => (
                                            <li 
                                                key={item.id}
                                                onClick={() => {
                                                    markAsRead(item.id);
                                                    if (item.actionUrl) {
                                                        navigate(item.actionUrl);
                                                        setShowNotifications(false);
                                                    }
                                                }}
                                                className={`text-sm p-3 rounded-xl cursor-pointer transition border ${
                                                    item.read ? 'bg-mist-surface/50 border-transparent text-gray-600' : 'bg-forest-soft/70 border-forest/30 text-gray-900 shadow-xs'
                                                } hover:bg-forest-soft`}
                                            >
                                                <div className="flex items-center justify-between gap-1">
                                                    <p className={`font-bold text-xs ${item.type === 'order' ? 'text-forest' : item.type === 'promo' ? 'text-honey-dark' : 'text-blue-600'}`}>
                                                        {item.title}
                                                    </p>
                                                    <span className="text-[10px] text-gray-400">{item.time}</span>
                                                </div>
                                                <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">{item.message}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="py-8 text-center text-gray-400 text-xs">Belum ada notifikasi</div>
                                )}

                                {notifications.length > 0 && (
                                    <button
                                        onClick={clearNotifications}
                                        className="w-full mt-3 py-1.5 text-center text-xs text-gray-400 hover:text-red-500 transition border-t pt-2"
                                    >
                                        Hapus Semua Notifikasi
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Tombol Akun Pengguna / User Profile */}
                    <div className="relative" ref={userMenuRef}>
                        <button 
                            onClick={() => {
                                setShowUserMenu(!showUserMenu);
                                setShowCart(false);
                                setShowNotifications(false);
                            }} 
                            className={`flex items-center gap-2 p-1 md:py-1 md:px-2 rounded-full md:rounded-xl transition cursor-pointer border ${
                                showUserMenu 
                                    ? 'bg-forest-soft border-forest/30 text-forest' 
                                    : 'hover:bg-mist-surface border-transparent text-gray-700'
                            }`}
                            title="Akun Saya"
                        >
                            <div className="w-8 h-8 rounded-full bg-forest text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                F
                            </div>
                            <div className="hidden lg:flex flex-col text-left">
                                <span className="text-xs font-bold text-gray-900 leading-tight">Ferdi</span>
                                <span className="text-[10px] text-gray-500 leading-tight">Member Gold</span>
                            </div>
                            <ChevronDown size={14} className={`text-gray-400 hidden md:block transition-transform duration-200 ${showUserMenu ? 'rotate-180 text-forest' : ''}`} />
                        </button>

                        {/* Dropdown Akun Pengguna */}
                        {showUserMenu && (
                            <div className="fixed left-3 right-3 top-28 sm:top-auto sm:left-auto sm:right-0 sm:absolute mt-2 sm:w-72 bg-white shadow-2xl rounded-2xl p-4 z-[70] border border-mist-border max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                                {/* Header User Card */}
                                <div className="flex items-center gap-3 pb-3 border-b border-mist-border mb-3">
                                    <div className="w-11 h-11 rounded-full bg-forest text-white font-black text-base flex items-center justify-center shadow-sm">
                                        F
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm text-gray-900 truncate">Ferdi Pratama</h4>
                                        <p className="text-xs text-gray-500 truncate">ferdi@example.com</p>
                                        <span className="inline-flex items-center gap-1 mt-1 bg-honey-soft text-honey-dark text-[10px] font-black px-2 py-0.5 rounded-full border border-honey/40">
                                            <Award size={12} className="fill-honey" />
                                            <span>Member Gold</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="space-y-1">
                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            goToOrderHistory();
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:text-forest hover:bg-forest-soft rounded-xl transition font-medium cursor-pointer"
                                    >
                                        <Package size={17} className="text-forest" />
                                        <span className="flex-1 text-left">Riwayat Pesanan</span>
                                        <span className="text-[11px] bg-forest-soft text-forest px-1.5 py-0.5 rounded-md font-bold">Aktif</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            navigate('/checkout');
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:text-forest hover:bg-forest-soft rounded-xl transition font-medium cursor-pointer"
                                    >
                                        <MapPin size={17} className="text-forest" />
                                        <span className="flex-1 text-left">Daftar Alamat</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            scrollToSection('promo');
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:text-forest hover:bg-forest-soft rounded-xl transition font-medium cursor-pointer"
                                    >
                                        <Ticket size={17} className="text-honey-dark" />
                                        <span className="flex-1 text-left">Kupon & Promo</span>
                                        <span className="text-[10px] bg-honey text-gray-950 font-black px-1.5 py-0.5 rounded-full">3</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            scrollToSection('footer-contact');
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:text-forest hover:bg-forest-soft rounded-xl transition font-medium cursor-pointer"
                                    >
                                        <HelpCircle size={17} className="text-gray-500" />
                                        <span className="flex-1 text-left">Pusat Bantuan</span>
                                    </button>
                                </div>

                                <div className="pt-2 border-t border-mist-border mt-2">
                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            alert("Berhasil keluar dari sesi akun demo.");
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-xs text-red-500 hover:bg-red-50 rounded-xl transition font-medium cursor-pointer"
                                    >
                                        <LogOut size={15} />
                                        <span>Keluar Akun</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tombol Keranjang */}
                    <div className="relative" ref={cartRef}>
                        <button 
                            id="cart-icon"
                            onClick={() => { setShowCart(!showCart); setShowNotifications(false); setShowUserMenu(false); }} 
                            className="p-2 hover:bg-gray-200 rounded-full transition relative"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13l-1.5-7M16 21a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 bg-honey text-gray-950 text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-xs">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Dropdown Keranjang */}
                        {showCart && (
                            <div className="fixed left-3 right-3 top-28 sm:top-auto sm:left-auto sm:right-0 sm:absolute mt-2 sm:w-80 bg-white shadow-2xl rounded-2xl p-4 z-[70] border border-mist-border max-h-[80vh] flex flex-col">
                                <div className="flex justify-between items-center mb-4 border-b border-mist-border pb-2">
                                    <h3 className="text-lg font-bold text-gray-900">Keranjang</h3>
                                    <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">&times;</button>
                                </div>
                                
                                {cartItems.length === 0 ? (
                                    <p className="text-gray-500 text-sm py-4 text-center">Kosong</p>
                                ) : (
                                    <>
                                        <div className="max-h-60 overflow-y-auto mb-4">
                                            <ul className="space-y-3">
                                                {cartItems.map((item) => (
                                                    <li key={item.product.id} className="flex justify-between items-center text-sm gap-2">
                                                        <span className="truncate flex-1 font-medium text-gray-800">
                                                            {item.product.name} (x{item.quantity})
                                                        </span>
                                                        <button 
                                                            onClick={() => removeFromCart(item.product.id)} 
                                                            className="text-red-500 text-xs hover:text-red-700 cursor-pointer"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        {/* Tombol Checkout */}
                                        <button
                                            onClick={goToCheckout}
                                            className="w-full bg-forest text-white py-2.5 rounded-xl font-bold hover:bg-forest-dark transition shadow-md hover:shadow-forest/20 active:scale-98 cursor-pointer"
                                        >
                                            Checkout
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </header>
            </div>

            {/* Navigasi Link - SEKARANG BISA DIPENCET */}
            <nav className="w-full bg-white border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-hide z-50 relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-start md:justify-center items-center h-12 md:h-14 space-x-6 sm:space-x-8 md:space-x-12 px-1 sm:px-0">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === '/' && activeSection === item.sectionId;
                            return (
                                <div key={item.name} className="relative group">
                                    <button
                                        onClick={() => scrollToSection(item.sectionId)}
                                        className={`text-sm font-semibold transition-all py-4 border-b-2 cursor-pointer flex items-center gap-1.5 ${
                                            isActive
                                                ? 'text-forest border-forest font-bold'
                                                : 'text-gray-700 hover:text-forest border-transparent hover:border-forest/40'
                                        }`}
                                    >
                                        {isActive && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
                                        )}
                                        {item.name}
                                        {item.name === 'Kategori' && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                                    </button>
                                
                                {/* Mega Menu untuk Kategori */}
                                {item.name === 'Kategori' && (
                                    <div className="hidden md:grid absolute top-full left-0 w-[500px] bg-white shadow-xl rounded-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[80] border border-mist-border grid-cols-3 gap-6 transform translate-y-2 group-hover:translate-y-0 text-left">
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-3 border-b border-mist-border pb-2 text-sm">Bahan Segar</h4>
                                            <ul className="space-y-2.5 text-sm text-gray-600">
                                                <li 
                                                    onClick={() => navigate('/category/Sayuran')} 
                                                    className="hover:text-forest cursor-pointer transition flex items-center gap-1.5"
                                                >
                                                    Sayuran Segar
                                                </li>
                                                <li 
                                                    onClick={() => navigate('/category/Frozen%20Food')} 
                                                    className="hover:text-forest cursor-pointer transition flex items-center gap-1.5"
                                                >
                                                    Frozen Food
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-3 border-b border-mist-border pb-2 text-sm">Siap Santap</h4>
                                            <ul className="space-y-2.5 text-sm text-gray-600">
                                                <li 
                                                    onClick={() => navigate('/category/Makanan%20Cepat%20Saji')} 
                                                    className="hover:text-forest cursor-pointer transition font-medium"
                                                >
                                                    Makanan Cepat Saji
                                                </li>
                                                <li 
                                                    onClick={() => navigate('/category/Minuman%20Instan')} 
                                                    className="hover:text-forest cursor-pointer transition"
                                                >
                                                    Minuman Instan
                                                </li>
                                                <li 
                                                    onClick={() => navigate('/category/Snacks')} 
                                                    className="hover:text-forest cursor-pointer transition"
                                                >
                                                    Snacks & Cemilan
                                                </li>
                                            </ul>
                                        </div>
                                        <div 
                                            onClick={() => navigate('/category/Makanan%20Cepat%20Saji')}
                                            className="bg-honey-soft hover:bg-honey-light/60 rounded-xl p-4 flex flex-col justify-center items-center text-center group/promo cursor-pointer transition border border-honey/20"
                                        >
                                            <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80" alt="Promo" className="w-16 h-16 object-cover rounded-full mb-2 group-hover/promo:scale-110 transition-transform shadow-sm" />
                                            <p className="font-bold text-honey-dark text-xs">Cepat Saji Spesial</p>
                                            <p className="text-[11px] text-gray-600">Lezat & Praktis</p>
                                        </div>
                                    </div>
                                )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;