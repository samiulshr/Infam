import React from 'react';
import { mockCustomers, mockOrders } from '../../data/mockDb';
import { Search, Download, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminCustomers() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-serif">Customers</h1>
        <div className="flex items-center gap-4">
          <button className="border border-line px-4 py-2 text-sm tracking-widest uppercase hover:bg-cream transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="bg-white border border-line">
        <div className="p-4 border-b border-line">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full border border-line rounded-sm py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-cream border-b border-line text-xs tracking-widest uppercase text-stone">
                <th className="p-4 font-normal w-12"><input type="checkbox" /></th>
                <th className="p-4 font-normal">Customer</th>
                <th className="p-4 font-normal">Contact</th>
                <th className="p-4 font-normal">Orders</th>
                <th className="p-4 font-normal">Total Spent</th>
                <th className="p-4 font-normal">Join Date</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer, i) => {
                const customerOrders = mockOrders.filter(o => o.customerId === customer.id);
                const totalSpent = customerOrders.reduce((sum, order) => sum + order.total, 0);
                
                return (
                  <motion.tr 
                    key={customer.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-line hover:bg-black/5 transition-colors"
                  >
                    <td className="p-4"><input type="checkbox" /></td>
                    <td className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-cream flex items-center justify-center text-xs tracking-widest">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium">{customer.name}</span>
                    </td>
                    <td className="p-4">
                      <p>{customer.email}</p>
                      <p className="text-xs text-stone mt-1">{customer.phone}</p>
                    </td>
                    <td className="p-4">{customerOrders.length}</td>
                    <td className="p-4">${totalSpent.toFixed(2)}</td>
                    <td className="p-4 text-stone">{new Date(customer.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="p-4 text-right">
                      <button className="p-1 text-stone hover:text-ink"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-line flex items-center justify-between text-sm text-stone">
          <p>Showing 1 to {mockCustomers.length} of {mockCustomers.length} results</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-line hover:bg-cream">Previous</button>
            <button className="px-3 py-1 border border-line bg-ink text-cream">1</button>
            <button className="px-3 py-1 border border-line hover:bg-cream">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
