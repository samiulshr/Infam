import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Download } from 'lucide-react';

export default function AdminReports() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif mb-2">Analytics & Reports</h1>
          <p className="text-stone text-sm">Deep insights into your store's performance.</p>
        </div>
        <button className="border border-line px-6 py-2 text-sm tracking-widest uppercase hover:bg-cream transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" /> Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Revenue', value: '$142,850', trend: '+14%', icon: DollarSign },
          { label: 'Avg Order Value', value: '$952', trend: '+8%', icon: TrendingUp },
          { label: 'Conversion Rate', value: '3.2%', trend: '-2%', icon: BarChart3 },
          { label: 'Units Sold', value: '450', trend: '+12%', icon: ShoppingBag },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 border border-line bg-white"
          >
            <div className="flex justify-between items-start mb-4">
              <stat.icon className="w-5 h-5 text-stone" />
              <span className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-rust'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] tracking-widest uppercase text-stone mb-1">{stat.label}</p>
            <p className="text-3xl font-serif">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-8 border border-line bg-white"
        >
          <h3 className="font-serif text-xl mb-8">Revenue Growth</h3>
          <div className="h-64 flex items-end gap-2 px-4 border-b border-line">
            {[30, 45, 35, 60, 80, 70, 95, 85, 100, 90, 110, 120].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 bg-ink opacity-20 hover:opacity-100 transition-opacity" 
                style={{ height: `${(h / 120) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-stone tracking-widest uppercase">
            <span>Jan</span>
            <span>Jun</span>
            <span>Dec</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-8 border border-line bg-white"
        >
          <h3 className="font-serif text-xl mb-8">Sales by Category</h3>
          <div className="space-y-6">
            {[
              { label: 'Outerwear', percentage: 45 },
              { label: 'Accessories', percentage: 25 },
              { label: 'Trousers', percentage: 20 },
              { label: 'Shirts', percentage: 10 },
            ].map((cat) => (
              <div key={cat.label}>
                <div className="flex justify-between text-xs tracking-widest uppercase mb-2">
                  <span>{cat.label}</span>
                  <span className="text-stone">{cat.percentage}%</span>
                </div>
                <div className="h-1 bg-cream w-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-wood"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
