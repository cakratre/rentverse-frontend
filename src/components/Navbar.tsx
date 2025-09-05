import { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Properties', href: '/properties' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-background)] border-b border-black/15">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img className='w-32' src="/navbar.png" alt="RENTVERSE" />
                        </div>

                        {/* Hamburger Button */}
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-6 flex flex-col justify-center items-center">
                                <span 
                                    className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${
                                        isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                                    }`}
                                />
                                <span 
                                    className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${
                                        isMenuOpen ? 'opacity-0' : 'opacity-100'
                                    }`}
                                />
                                <span 
                                    className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${
                                        isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                                    }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Fullscreen Menu Overlay */}
            <div 
                className={`fixed inset-0 z-40 bg-[var(--color-background)] transition-opacity duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full">
                    <nav className="text-center">
                        {navItems.map((item, index) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block text-3xl font-medium text-gray-900 hover:text-blue-600 py-4 transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    animationDelay: isMenuOpen ? `${index * 100}ms` : '0ms'
                                }}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;