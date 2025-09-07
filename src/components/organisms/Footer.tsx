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
        { label: "About Us", href: "#about" },
        { label: "Vision & Mission", href: "#vision-mission" },
        { label: "Team & Careers", href: "#careers" },
        { label: "Contact Us", href: "#contact" },
      ],
    },
    {
      title: "Rental Properties",
      links: [
        { label: "Latest Listings", href: "#listing" },
        { label: "Houses for Rent", href: "#house" },
        { label: "Apartments for Rent", href: "#apartment" },
        { label: "Commercial Spaces", href: "#commercial" },
        { label: "Boarding & Shared Homes", href: "#boarding" },
      ],
    },
    {
      title: "Our Services",
      links: [
        { label: "Property Rental", href: "#rental" },
        { label: "Property Management", href: "#management" },
        { label: "List Your Property", href: "#list" },
        { label: "Investment Consulting", href: "#consulting" },
        { label: "Tenant Guide & FAQ", href: "#faq" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Property Articles", href: "#articles" },
        { label: "Tips & Insights", href: "#tips" },
        { label: "News & Events", href: "#news" },
        { label: "Client Testimonials", href: "#testimonials" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Search Properties", href: "#search" },
        { label: "Promotions & Offers", href: "#promo" },
        { label: "Contact an Agent", href: "#agent" },
        { label: "Help Center", href: "#help" },
      ],
    },
    {
      title: "Follow Us",
      links: [
        { label: "Instagram", href: "https://instagram.com/cakratre" },
        { label: "Facebook", href: "https://facebook.com/cakratre" },
        { label: "Twitter", href: "https://twitter.com/cakratre" },
        { label: "YouTube", href: "https://youtube.com/cakratre" },
        { label: "LinkedIn", href: "https://linkedin.com/company/cakratre" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[var(--color-text)]/15 min-h-screen bg-[var(--color-background)] text-[var(--color-text)] pt-12 md:pt-20 pb-5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
          {footers.map((section, index) => (
            <div key={index} className="w-full">
              <h2 className="text-sm md:text-lg xl:text-xl font-medium tracking-wide text-[var(--color-text)] mb-2 md:mb-4 font-roboto">
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
                      className="text-xs md:text-sm text-[var(--color-text)]/60 group-hover:text-[var(--color-text)] transition font-roboto leading-tight"
                      target={link.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-[var(--color-text)]/30 group-hover:text-[var(--color-text)] transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-1" />
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
      <div className="mt-8 md:mt-10 border-t border-[var(--color-text)]/10 pt-3 md:pt-4 text-center text-xs md:text-sm text-[var(--color-text)]/50">
        <p className="font-roboto px-4">
          &copy; {new Date().getFullYear()} CakraTre. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
