import React from "react";
import { ArrowRight } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const footers: FooterSection[] = [
    {
      title: "CakraTre",
      links: [
        { label: "Tentang Kami", href: "#tentang" },
        { label: "Visi & Misi", href: "#visi-misi" },
        { label: "Karir", href: "#karir" },
        { label: "Kontak", href: "#kontak" }
      ]
    },
    {
      title: "Properti",
      links: [
        { label: "Listing Terbaru", href: "#listing" },
        { label: "Rumah", href: "#rumah" },
        { label: "Apartemen", href: "#apartemen" },
        { label: "Ruko & Komersial", href: "#ruko" },
        { label: "Tanah & Lahan", href: "#tanah" }
      ]
    },
    {
      title: "Layanan",
      links: [
        { label: "Jual Properti", href: "#jual" },
        { label: "Beli Properti", href: "#beli" },
        { label: "Sewa Properti", href: "#sewa" },
        { label: "Konsultasi Investasi", href: "#konsultasi" },
        { label: "Panduan & FAQ", href: "#faq" }
      ]
    },
    {
      title: "Informasi",
      links: [
        { label: "Artikel Properti", href: "#artikel" },
        { label: "Tips & Inspirasi", href: "#tips" },
        { label: "Berita & Event", href: "#berita" },
        { label: "Testimoni", href: "#testimoni" }
      ]
    },
    {
      title: "Tautan Cepat",
      links: [
        { label: "Cari Properti", href: "#cari" },
        { label: "Daftarkan Properti", href: "#daftar" },
        { label: "Promo & Penawaran", href: "#promo" },
        { label: "Hubungi Agen", href: "#agen" }
      ]
    },
    {
      title: "Media Sosial",
      links: [
        { label: "Instagram", href: "https://instagram.com/cakratre" },
        { label: "Facebook", href: "https://facebook.com/cakratre" },
        { label: "Twitter", href: "https://twitter.com/cakratre" },
        { label: "YouTube", href: "https://youtube.com/cakratre" }
      ]
    }
  ];

  return (
    <footer className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] pt-12 md:pt-20 pb-5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
          {footers.map((section, index) => (
            <div key={index} className="w-full">
              <h2 className="text-sm md:text-lg xl:text-xl font-medium tracking-wide text-black mb-2 md:mb-4 font-roboto">
                {section.title}
              </h2>
              <ul className="space-y-1 md:space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li
                    key={linkIndex}
                    className="group flex items-center justify-between border-b border-black/10 pb-1 md:pb-2 hover:text-black transition-colors duration-200"
                  >
                    <a
                      href={link.href}
                      className="text-xs md:text-sm text-black/60 group-hover:text-black transition font-roboto leading-tight"
                      target={link.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                    <ArrowRight
                      className="w-3 h-3 md:w-4 md:h-4 text-black/30 group-hover:text-black transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-1"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Image */}
      <div className="py-12 md:py-20">
        <img className="w-full" src="/footer.svg" alt="" />
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 md:mt-10 border-t border-black/10 pt-3 md:pt-4 text-center text-xs md:text-sm text-black/50">
        <p className="font-roboto px-4">&copy; {new Date().getFullYear()} CakraTre. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;