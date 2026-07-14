import React from 'react';
import { motion } from 'motion/react';

export default function AccountPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full md:w-64 shrink-0 bg-white p-6 border border-line h-fit"
      >
        <ul className="space-y-4 text-sm">
          <li className="font-medium text-ink flex items-center gap-2">
            <motion.div layoutId="accountNavIndicator" className="w-1.5 h-1.5 rounded-full bg-ink" />
            Order History
          </li>
          <li className="text-stone hover:text-ink cursor-pointer pl-3.5 transition-colors">Saved Addresses</li>
          <li className="text-stone hover:text-ink cursor-pointer pl-3.5 transition-colors">Profile Details</li>
          <li className="text-stone hover:text-ink cursor-pointer pl-3.5 transition-colors">Wishlist</li>
          <li className="text-stone hover:text-rust cursor-pointer mt-8 pt-4 border-t border-line transition-colors">Logout</li>
        </ul>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1"
      >
        <h2 className="text-3xl font-serif mb-8">Order History</h2>
        <div className="p-12 border border-line border-dashed text-center">
          <p className="text-stone">You have no previous orders.</p>
        </div>
      </motion.div>
    </div>
  );
}
