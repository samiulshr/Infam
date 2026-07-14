import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare, Search, Trash2, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const mockReviews = [
  { id: '1', customer: 'Eleanor W.', product: 'The Sculpted Overcoat', rating: 5, comment: 'The silhouette is architectural and perfect. Worth every penny.', date: '2024-11-02', status: 'Approved' },
  { id: '2', customer: 'Julian M.', product: 'Essential Silk Shirt', rating: 4, comment: 'Beautiful fabric, but the fit is a bit tighter than expected.', date: '2024-10-28', status: 'Pending' },
  { id: '3', customer: 'Sophia R.', product: 'Pleated Wool Trouser', rating: 5, comment: 'Absolute masterpiece of tailoring.', date: '2024-10-25', status: 'Approved' },
];

export default function AdminReviews() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif mb-2">Customer Reviews</h1>
        <p className="text-stone text-sm">Monitor and moderate product feedback.</p>
      </div>

      <div className="bg-white border border-line">
        <div className="p-4 border-b border-line flex flex-col sm:flex-row gap-4 justify-between bg-cream/30">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
            <input 
              type="text" 
              placeholder="Search reviews..." 
              className="w-full border border-line bg-white rounded-sm py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-ink"
            />
          </div>
          <div className="flex gap-4">
            <select className="border border-line bg-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-ink">
              <option>All Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Flagged</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-widest uppercase text-stone">
                <th className="p-6 font-normal">Customer</th>
                <th className="p-6 font-normal">Product</th>
                <th className="p-6 font-normal">Rating</th>
                <th className="p-6 font-normal">Comment</th>
                <th className="p-6 font-normal">Status</th>
                <th className="p-6 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockReviews.map((review, i) => (
                <motion.tr 
                  key={review.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-line hover:bg-black/5 transition-colors"
                >
                  <td className="p-6">
                    <p className="font-medium">{review.customer}</p>
                    <p className="text-xs text-stone">{review.date}</p>
                  </td>
                  <td className="p-6 text-stone">{review.product}</td>
                  <td className="p-6">
                    <div className="flex text-wood">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={cn("w-3 h-3 fill-current", idx >= review.rating && "text-stone/20 fill-none")} />
                      ))}
                    </div>
                  </td>
                  <td className="p-6 max-w-xs">
                    <p className="truncate text-stone italic">"{review.comment}"</p>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm",
                      review.status === 'Approved' ? "bg-ink text-white" : "bg-stone/20 text-stone"
                    )}>
                      {review.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-3 text-stone">
                      <button className="hover:text-ink transition-colors"><CheckCircle className="w-4 h-4" /></button>
                      <button className="hover:text-rust transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
