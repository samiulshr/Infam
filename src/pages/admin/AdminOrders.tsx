import React from 'react';
import { mockOrders, mockCustomers } from '../../data/mockDb';
import { Search, Filter, Download } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export default function AdminOrders() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-serif">Orders</h1>
        <div className="flex items-center gap-4">
          <button className="border border-line px-4 py-2 text-sm tracking-widest uppercase hover:bg-cream transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button className="border border-line px-4 py-2 text-sm tracking-widest uppercase hover:bg-cream transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="bg-white border border-line">
        <div className="p-4 border-b border-line flex flex-col sm:flex-row gap-4 justify-between items-center bg-cream/50">
          <div className="flex gap-6 text-sm tracking-widest uppercase">
            <button className="text-ink border-b-2 border-ink pb-1 font-medium">All Orders</button>
            <button className="text-stone hover:text-ink pb-1">Pending</button>
            <button className="text-stone hover:text-ink pb-1">Processing</button>
            <button className="text-stone hover:text-ink pb-1">Shipped</button>
            <button className="text-stone hover:text-ink pb-1">Delivered</button>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full border border-line rounded-sm py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-ink bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-widest uppercase text-stone">
                <th className="p-4 font-normal w-12"><input type="checkbox" /></th>
                <th className="p-4 font-normal">Order ID</th>
                <th className="p-4 font-normal">Customer</th>
                <th className="p-4 font-normal">Date</th>
                <th className="p-4 font-normal">Total</th>
                <th className="p-4 font-normal">Status</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, i) => {
                const customer = mockCustomers.find(c => c.id === order.customerId);
                return (
                  <motion.tr 
                    key={order.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-line hover:bg-black/5 transition-colors"
                  >
                    <td className="p-4"><input type="checkbox" /></td>
                    <td className="p-4 font-medium">{order.orderNumber}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cream flex items-center justify-center text-xs tracking-widest">
                          {customer?.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {customer?.name}
                      </div>
                    </td>
                    <td className="p-4 text-stone">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="p-4">${order.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={cn(
                        "text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm",
                        order.status === 'delivered' ? "bg-ink text-white" :
                        order.status === 'processing' ? "bg-wood text-white" :
                        order.status === 'pending' ? "border border-stone text-stone" :
                        "bg-rust text-white"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-xs tracking-widest uppercase underline hover:text-wood">View</button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-line flex items-center justify-between text-sm text-stone">
          <p>Showing 1 to {mockOrders.length} of {mockOrders.length} results</p>
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
