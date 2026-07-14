import React from 'react';
import { motion } from 'motion/react';

export default function TrackOrderPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center overflow-hidden">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-serif mb-4"
      >
        Track Order
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-stone mb-12"
      >
        Enter your order ID and email to check the status of your shipment.
      </motion.p>
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-md mx-auto space-y-4"
      >
        <input type="text" placeholder="Order ID (e.g. #INF-123)" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
        <input type="email" placeholder="Email Address" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
        <button type="button" className="w-full bg-ink text-cream py-3 mt-4 text-sm tracking-widest uppercase hover:bg-wood transition-colors active:scale-95">
          Track
        </button>
      </motion.form>
    </div>
  );
}
