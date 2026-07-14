import React from 'react';
import { mockOrders, mockProducts, mockCustomers } from '../../data/mockDb';
import { ArrowUpRight, ArrowDownRight, Package, ShoppingBag, Users, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function AdminDashboard() {
  const totalSales = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const lowStockProducts = mockProducts.filter(p => p.stockQuantity <= p.lowStockThreshold);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-serif mb-2">Overview</h1>
          <p className="text-stone text-sm">Welcome back. Here's what's happening today.</p>
        </motion.div>
        <motion.select 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="border border-line rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-ink bg-white"
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </motion.select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Sales', value: `$${totalSales.toFixed(2)}`, trend: '12.5%', icon: ShoppingBag, color: 'text-stone', up: true },
          { label: 'Total Orders', value: mockOrders.length, trend: '5.2%', icon: Package, color: 'text-stone', up: true },
          { label: 'Customers', value: mockCustomers.length, trend: '2.1%', icon: Users, color: 'text-stone', up: true },
          { label: 'Low Stock', value: lowStockProducts.length, trend: 'Requires attention', icon: AlertCircle, color: 'text-rust', alert: true },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 border border-line bg-white"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xs tracking-widest uppercase text-stone">{stat.label}</h3>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className={`text-3xl font-serif mb-2 ${stat.alert ? 'text-rust' : ''}`}>{stat.value}</p>
            <div className={`flex items-center text-xs ${stat.alert ? 'text-rust' : stat.up ? 'text-green-600' : 'text-stone'}`}>
              {!stat.alert && <ArrowUpRight className="w-3 h-3 mr-1" />}
              <span>{stat.alert ? stat.trend : `${stat.trend} vs last period`}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 border border-line bg-white p-6"
        >
          <h2 className="font-serif text-xl mb-6">Sales Performance</h2>
          {/* Mock Chart Area */}
          <div className="h-64 border-b border-l border-line flex items-end p-4 gap-4 relative">
            <div className="w-full flex items-end justify-between h-full gap-2 opacity-80">
              {[40, 60, 45, 80, 50, 90, 70].map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + (i * 0.1), type: "spring", bounce: 0.3 }}
                  className="w-full bg-ink transition-colors hover:bg-wood" 
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between text-xs text-stone mt-4">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border border-line bg-white p-0 flex flex-col"
        >
          <div className="p-6 border-b border-line flex justify-between items-center">
            <h2 className="font-serif text-xl">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs tracking-widest uppercase hover:text-wood">View All</Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockOrders.map((order, i) => (
              <motion.div 
                key={order.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                className="p-4 border-b border-line hover:bg-black/5 flex justify-between items-center text-sm"
              >
                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-stone text-xs">{mockCustomers.find(c => c.id === order.customerId)?.name}</p>
                </div>
                <div className="text-right">
                  <p>${order.total.toFixed(2)}</p>
                  <span className={`text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm ${
                    order.status === 'delivered' ? 'bg-ink text-white' :
                    order.status === 'processing' ? 'bg-wood text-white' :
                    'bg-stone/20 text-stone'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
