import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Tag, Copy, Trash2, Edit2, Calendar, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const mockDiscounts = [
  { id: '1', code: 'WELCOME20', type: 'Percentage', value: '20%', usage: '128 / ∞', status: 'Active', expiry: '2024-12-31' },
  { id: '2', code: 'WINTER_STORM', type: 'Fixed Amount', value: '$150.00', usage: '45 / 100', status: 'Active', expiry: '2024-02-15' },
  { id: '3', code: 'ARCHIVE_SALE', type: 'Percentage', value: '50%', usage: '892 / 1000', status: 'Expired', expiry: '2023-11-20' },
];

export default function AdminDiscounts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-serif mb-2">Discounts</h1>
          <p className="text-stone text-sm">Create and manage promotion codes and coupons.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-ink text-white px-6 py-2 text-sm tracking-widest uppercase hover:bg-wood transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Active Promotions', value: '12', icon: Tag, color: 'text-ink' },
          { label: 'Total Used', value: '1.4k', icon: Calendar, color: 'text-stone' },
          { label: 'Revenue Generated', value: '$24.2k', icon: Tag, color: 'text-wood' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 border border-line bg-white flex justify-between items-start"
          >
            <div>
              <p className="text-[10px] tracking-widest uppercase text-stone mb-2">{stat.label}</p>
              <p className="text-2xl font-serif">{stat.value}</p>
            </div>
            <stat.icon className={cn("w-5 h-5", stat.color)} />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-line"
      >
        <div className="p-4 border-b border-line flex flex-col sm:flex-row gap-4 justify-between items-center bg-cream/30">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
            <input 
              type="text" 
              placeholder="Filter coupons..." 
              className="w-full border border-line bg-white rounded-sm py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-ink"
            />
          </div>
          <div className="flex gap-4">
            <select className="border border-line bg-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-ink">
              <option>All Types</option>
              <option>Percentage</option>
              <option>Fixed Amount</option>
              <option>Free Shipping</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-widest uppercase text-stone">
                <th className="p-6 font-normal">Coupon Code</th>
                <th className="p-6 font-normal">Type</th>
                <th className="p-6 font-normal">Value</th>
                <th className="p-6 font-normal">Usage Limit</th>
                <th className="p-6 font-normal">Expiry</th>
                <th className="p-6 font-normal">Status</th>
                <th className="p-6 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockDiscounts.map((discount, i) => (
                <motion.tr 
                  key={discount.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.05) }}
                  className="border-b border-line hover:bg-black/5 transition-colors group"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium tracking-wider bg-cream px-2 py-1 border border-line">{discount.code}</span>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-stone hover:text-ink">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="p-6 text-stone">{discount.type}</td>
                  <td className="p-6 font-medium">{discount.value}</td>
                  <td className="p-6 text-stone">{discount.usage}</td>
                  <td className="p-6 text-stone">{discount.expiry}</td>
                  <td className="p-6">
                    <span className={cn(
                      "text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm",
                      discount.status === 'Active' ? "bg-ink text-white" : "bg-stone/20 text-stone"
                    )}>
                      {discount.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-3 text-stone">
                      <button className="hover:text-ink transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button className="hover:text-rust transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="bg-white p-8 w-full max-w-lg border border-line shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif">Create Discount Code</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-cream transition-colors rounded-sm"
                >
                  <X className="w-5 h-5 text-stone" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-2 text-stone uppercase tracking-widest text-[10px]">Discount Code</label>
                  <input type="text" placeholder="e.g. SUMMER24" className="w-full border border-line p-3 text-sm focus:outline-none focus:border-ink transition-colors uppercase" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-stone uppercase tracking-widest text-[10px]">Type</label>
                    <select className="w-full border border-line p-3 text-sm focus:outline-none focus:border-ink transition-colors bg-white">
                      <option>Percentage</option>
                      <option>Fixed Amount</option>
                      <option>Free Shipping</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-stone uppercase tracking-widest text-[10px]">Value</label>
                    <input type="number" placeholder="20" className="w-full border border-line p-3 text-sm focus:outline-none focus:border-ink transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-stone uppercase tracking-widest text-[10px]">Usage Limit</label>
                    <input type="number" placeholder="Optional" className="w-full border border-line p-3 text-sm focus:outline-none focus:border-ink transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-stone uppercase tracking-widest text-[10px]">Expiry Date</label>
                    <input type="date" className="w-full border border-line p-3 text-sm focus:outline-none focus:border-ink transition-colors" />
                  </div>
                </div>

                <div className="pt-6 border-t border-line flex justify-end gap-4">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 text-sm tracking-widest uppercase text-stone hover:text-ink transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="bg-ink text-white px-6 py-2 text-sm tracking-widest uppercase hover:bg-wood transition-colors"
                  >
                    Save Coupon
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
