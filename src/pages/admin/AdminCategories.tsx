import React from 'react';
import { motion } from 'motion/react';
import { Plus, Search, MoreHorizontal, FolderTree } from 'lucide-react';
import { mockCategories } from '../../data/mockDb';

export default function AdminCategories() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif mb-2">Categories</h1>
          <p className="text-stone text-sm">Organize your product collections and hierarchy.</p>
        </div>
        <button className="bg-ink text-white px-6 py-2 text-sm tracking-widest uppercase hover:bg-wood transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Category
        </button>
      </div>

      <div className="bg-white border border-line">
        <div className="p-4 border-b border-line bg-cream/30">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
            <input 
              type="text" 
              placeholder="Filter categories..." 
              className="w-full border border-line bg-white rounded-sm py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-widest uppercase text-stone">
                <th className="p-6 font-normal w-12"><input type="checkbox" /></th>
                <th className="p-6 font-normal">Category</th>
                <th className="p-6 font-normal">Parent</th>
                <th className="p-6 font-normal">Products</th>
                <th className="p-6 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCategories.map((category, i) => (
                <motion.tr 
                  key={category.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-line hover:bg-black/5 transition-colors"
                >
                  <td className="p-6"><input type="checkbox" /></td>
                  <td className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-cream shrink-0 border border-line">
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-serif text-lg">{category.name}</p>
                      <p className="text-xs text-stone tracking-wider uppercase">/{category.slug}</p>
                    </div>
                  </td>
                  <td className="p-6 text-stone">None</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <FolderTree className="w-4 h-4 text-stone" />
                      <span>12 Products</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-stone hover:text-ink"><MoreHorizontal className="w-5 h-5" /></button>
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
