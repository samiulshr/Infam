import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, BarChart3, Settings, LogOut, Bell } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Tag },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Discounts', path: '/admin/discounts', icon: Tag },
    { name: 'Reviews', path: '/admin/reviews', icon: Users },
    { name: 'Analytics', path: '/admin/reports', icon: BarChart3 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex font-sans bg-white text-ink">
      {/* Sidebar */}
      <aside className="w-64 bg-ink text-white flex flex-col fixed inset-y-0 left-0 z-10">
        <div className="p-6">
          <h1 className="font-serif text-xl tracking-tight">INFAM Admin</h1>
          <p className="text-stone text-xs tracking-widest uppercase mt-1">Management Portal</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors relative",
                  isActive 
                    ? "text-white" 
                    : "text-stone hover:bg-white/5 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarActive"
                    className="absolute inset-0 bg-wood/20 rounded-sm"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className={cn("w-4 h-4 relative z-10", isActive && "text-wood")} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 text-sm text-stone mb-4">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">SA</div>
            <div>
              <p className="text-white">Admin User</p>
              <p className="text-xs uppercase tracking-widest">Super Admin</p>
            </div>
          </div>
          <Link to="/" className="flex items-center justify-center gap-2 w-full py-2 border border-white/20 text-sm hover:bg-white/5 transition-colors">
            View Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-16 border-b border-line bg-white/95 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-end px-8">
          <button className="p-2 hover:bg-cream rounded-sm transition-colors">
            <Bell className="w-5 h-5 text-stone" />
          </button>
        </header>
        <div className="p-8 flex-1 bg-white overflow-x-hidden">
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
        </div>
      </main>
    </div>
  );
}
