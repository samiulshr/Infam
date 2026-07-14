import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../contexts/CartContext';

export function StorefrontLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-cream text-ink">
      {/* Top Utility Bar */}
      <div className="bg-ink text-cream text-xs text-center py-2 tracking-widest uppercase">
        Free shipping on orders over $2,000 — Easy 7-day returns
      </div>

      {/* Main Nav */}
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <button>
              <Search className="w-5 h-5" />
            </button>
          </div>

          <Link to="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <span className="font-serif text-2xl tracking-tight">INFAM</span>
          </Link>

          <div className="hidden lg:flex items-center flex-1 justify-center max-w-md mx-8">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-transparent border border-line rounded-none py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-ink transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="hidden lg:block hover:text-wood transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="relative hover:text-wood transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-2 bg-rust text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>

        {/* Category Bar */}
        <nav className="hidden lg:block bg-ink text-cream">
          <ul className="flex justify-center gap-8 py-3 text-xs tracking-widest uppercase">
            {['Outerwear', 'Shirts & Tops', 'Trousers', 'Dresses', 'Accessories'].map(cat => (
              <li key={cat}>
                <Link to={`/shop?category=${cat.toLowerCase()}`} className="hover:text-wood transition-colors">
                  {cat}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/shop?sale=true" className="text-rust hover:text-wood transition-colors">
                Sale
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-cream"
          >
            <div className="flex items-center justify-between p-4 border-b border-line">
              <span className="font-serif text-xl">INFAM</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4 flex flex-col gap-4 uppercase tracking-widest text-sm">
              {['Outerwear', 'Shirts & Tops', 'Trousers', 'Dresses', 'Accessories'].map((cat, i) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link to={`/shop?category=${cat.toLowerCase()}`} className="py-2 border-b border-line hover:text-wood block">
                    {cat}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5 * 0.05 + 0.1 }}
              >
                <Link to="/shop?sale=true" className="py-2 border-b border-line text-rust hover:text-wood block">
                  Sale
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 6 * 0.05 + 0.1 }}
              >
                <Link to="/login" className="py-2 hover:text-wood mt-4 block">Account</Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-ink text-cream pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-8">
          <div>
            <span className="font-serif text-2xl tracking-tight block mb-6">INFAM</span>
            <p className="text-stone text-sm max-w-xs">Crafting modern legacies through intentional design and quiet luxury.</p>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-stone">
              <li><Link to="/shop" className="hover:text-cream transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-cream transition-colors">Collections</Link></li>
              <li><Link to="/shop" className="hover:text-cream transition-colors">Archive</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-6">Assistance</h4>
            <ul className="space-y-4 text-sm text-stone">
              <li><Link to="/page/contact-us" className="hover:text-cream transition-colors">Support</Link></li>
              <li><Link to="/page/return-policy" className="hover:text-cream transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/track-order" className="hover:text-cream transition-colors">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-stone">
              <li><Link to="/page/about-us" className="hover:text-cream transition-colors">About Us</Link></li>
              <li><Link to="/page/privacy-policy" className="hover:text-cream transition-colors">Privacy Policy</Link></li>
              <li><Link to="/page/terms-condition" className="hover:text-cream transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} INFAM LUXURY. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <span>Global (EN)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
