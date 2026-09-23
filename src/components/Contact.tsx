import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', address: '', message: '' });
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (infoRef.current) {
        gsap.fromTo(infoRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        );
      }
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { name, email, address, message } = form;
    const subject = encodeURIComponent(`Permintaan Pengiriman dari ${name}`);
    let bodyText = `Nama: ${name}\nAlamat: ${address}\nEmail: ${email}\n\n`;
    bodyText += message;
    const body = encodeURIComponent(bodyText);
    // send to support and CC the customer email so they get a copy
    window.location.href = `mailto:support@minimo-mart.id?cc=${encodeURIComponent(email)}&subject=${subject}&body=${body}`;
  }

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div ref={infoRef}>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Pengiriman</h2>
          <p className="text-gray-600 mb-8">
            Kami siap membantu Anda! Silakan hubungi kami untuk pertanyaan atau informasi
            pengiriman.
          </p>
          <div className="grid grid-cols-1 gap-8">
            <div className='flex flex-col items-center text-center'>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Info Pengiriman</h3>
              <p className="text-gray-600">Kami melayani pengiriman di seluruh Indonesia.</p>
              <ul className="text-gray-600 list-disc list-inside mt-2">
                <li>Waktu pengiriman: 3-5 hari kerja</li>
                <li>Biaya tergantung jarak dan berat</li>
                <li>Tracking tersedia melalui email/telepon</li>
              </ul>
            </div>
          </div>
        </div>

        {/* contact form with delivery address */}
        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 max-w-lg mx-auto text-left">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Pengiriman & Kontak</h3>
          <div className="flex flex-col gap-4">
            <input
              required
              type="text"
              placeholder="Nama"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest"
            />
            <input
              required
              type="email"
              placeholder="Email Anda"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest"
            />
            <input
              required
              type="text"
              placeholder="Alamat Pengiriman"
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest"
            />
            <textarea
              placeholder="Pesan / Instruksi Tambahan"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="border border-gray-300 p-3 rounded-xl h-32 focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest"
            />
            <button
              type="submit"
              className="bg-forest text-white px-6 py-3 rounded-full hover:bg-forest-dark transition font-semibold shadow-sm"
            >
              Kirim Permintaan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

