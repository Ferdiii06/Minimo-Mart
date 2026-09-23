// Tailwind menyediakan semua styling yang diperlukan

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (!footerRef.current || !contentRef.current) return;

        // Curtain reveal effect: footer content moves up as you scroll to it
        gsap.fromTo(contentRef.current, 
            { y: 100, opacity: 0 },
            {
                y: 0, 
                opacity: 1,
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top bottom", 
                    end: "bottom bottom",
                    scrub: 1
                }
            }
        );
    }, []);

    return (
        <footer ref={footerRef} className="bg-[#052620] text-white py-14 px-6 md:px-12 overflow-hidden border-t border-[#006e59]/30">
            <div ref={contentRef}>
                {/* Grid Configuration: 
                - grid-cols-1 (HP)
                - sm:grid-cols-2 (Tablet)
                - lg:grid-cols-4 (Laptop) 
            */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
                
                {/* Section 1: About */}
                <div>
                    <h3 className="text-lg font-bold mb-5 opacity-90 border-b border-forest/60 pb-2 w-fit text-mist">
                        About Minimo Mart
                    </h3>
                    <ul className="space-y-3 text-sm text-mist/80">
                        <li>Marketplace Produk Lokal</li>
                        <li>UMKM Unggulan Indonesia</li>
                        <li>Layanan Seluruh Indonesia</li>
                    </ul>
                </div>

                {/* Section 2: Account */}
                <div>
                    <h3 className="text-lg font-bold mb-5 opacity-90 border-b border-forest/60 pb-2 w-fit text-mist">
                        Account
                    </h3>
                    <ul className="space-y-3 text-sm text-mist/80">
                        <li><a href="#" className="hover:text-honey transition-colors">Benefit</a></li>
                        <li><a href="#" className="hover:text-honey transition-colors">Daftar Member</a></li>
                        <li><a href="#" className="hover:text-honey transition-colors">Kriteria Umum</a></li>
                        <li><a href="#" className="hover:text-honey transition-colors">Nikmati bonus afiliasi</a></li>
                    </ul>
                </div>

                {/* Section 3: Links */}
                <div>
                    <h3 className="text-lg font-bold mb-5 opacity-90 border-b border-forest/60 pb-2 w-fit text-mist">
                        Links
                    </h3>
                    <ul className="space-y-3 text-sm text-mist/80">
                        <li><a href="#" className="hover:text-honey transition-colors">Minimo Mart Indonesia</a></li>
                        <li><a href="#" className="hover:text-honey transition-colors">Lapak Diskon</a></li>
                        <li><a href="#" className="hover:text-honey transition-colors">NDP</a></li>
                        <li><a href="#" className="hover:text-honey transition-colors">MC</a></li>
                    </ul>
                </div>

                {/* Section 4: Contact Address */}
                <div id="footer-contact">
                    <h3 className="text-lg font-bold mb-5 opacity-90 border-b border-forest/60 pb-2 w-fit text-mist">
                        Contact Address
                    </h3>
                    <div className="text-sm space-y-4 text-mist/80">
                        <p>
                            <span className="font-bold block text-white text-base">Minimo<span className="text-honey">Mart</span></span>
                            Indonesia <br /> ID : 123456
                        </p>
                        <p className="flex flex-col">
                            <span className="opacity-60 text-xs">Email:</span>
                            <a href="mailto:MinimoMart@gmail.com" className="hover:text-honey transition-colors">MinimoMart@gmail.com</a>
                        </p>
                        <p className="flex flex-col">
                            <span className="opacity-60 text-xs">Phone:</span>
                            <a href="tel:0811000000" className="hover:text-honey transition-colors">0811-XXXX-XXXX</a>
                        </p>
                    </div>
                </div>

            </div>

            {/* Bottom Copyright Area */}
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-xs text-mist/60">
                <p>&copy; {new Date().getFullYear()} Minimo Mart Indonesia. All rights reserved.</p>
            </div>
            </div>
        </footer>
    );
}

export default Footer;