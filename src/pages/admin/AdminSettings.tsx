import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Upload, Truck, Globe, Shield, CreditCard, Palette } from 'lucide-react';
import { cn } from '../../lib/utils';

type TabType = 'general' | 'shipping' | 'branding' | 'payments';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'shipping', name: 'Shipping', icon: Truck },
    { id: 'branding', name: 'Branding', icon: Palette },
    { id: 'payments', name: 'Payments', icon: CreditCard },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif mb-2">Settings</h1>
          <p className="text-stone text-sm">Manage your store configuration and preferences.</p>
        </div>
        <button className="bg-ink text-white px-6 py-2 text-sm tracking-widest uppercase hover:bg-wood transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="flex gap-8 mb-12 border-b border-line">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={cn(
              "flex items-center gap-2 pb-4 text-sm tracking-widest uppercase transition-all relative",
              activeTab === tab.id ? "text-ink" : "text-stone hover:text-ink"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-12"
        >
          {activeTab === 'general' && (
            <div className="space-y-8">
              <section>
                <h3 className="text-xs tracking-widest uppercase text-stone mb-6">Store Information</h3>
                <div className="grid grid-cols-1 gap-6 max-w-xl">
                  <div>
                    <label className="block text-sm mb-2">Store Name</label>
                    <input type="text" defaultValue="INFAM LUXURY" className="w-full border border-line p-3 text-sm focus:outline-none focus:border-ink transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Support Email</label>
                    <input type="email" defaultValue="concierge@infam.com" className="w-full border border-line p-3 text-sm focus:outline-none focus:border-ink transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Store Currency</label>
                    <select className="w-full border border-line p-3 text-sm focus:outline-none focus:border-ink transition-colors bg-white">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-8">
              <section>
                <h3 className="text-xs tracking-widest uppercase text-stone mb-6">Shipping Rules</h3>
                <div className="space-y-6">
                  <div className="p-6 border border-line bg-cream/30 flex justify-between items-center">
                    <div>
                      <p className="font-serif">Standard International</p>
                      <p className="text-xs text-stone mt-1">Delivery in 5-10 business days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$25.00</p>
                      <button className="text-xs text-rust uppercase tracking-widest mt-2 underline">Edit</button>
                    </div>
                  </div>
                  <div className="p-6 border border-line bg-cream/30 flex justify-between items-center">
                    <div>
                      <p className="font-serif">Express Courier</p>
                      <p className="text-xs text-stone mt-1">Delivery in 1-3 business days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$45.00</p>
                      <button className="text-xs text-rust uppercase tracking-widest mt-2 underline">Edit</button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-line">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-ink" />
                      <span className="text-sm">Enable Free Shipping threshold</span>
                    </label>
                    <div className="mt-4 ml-7 max-w-xs">
                      <label className="block text-xs text-stone mb-2">Threshold Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone">$</span>
                        <input type="number" defaultValue="2000" className="w-full border border-line p-2 pl-7 text-sm focus:outline-none focus:border-ink transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="space-y-8">
              <section>
                <h3 className="text-xs tracking-widest uppercase text-stone mb-6">Visual Identity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <label className="block text-sm mb-4">Store Logo</label>
                    <div className="aspect-video bg-cream border border-dashed border-stone flex flex-col items-center justify-center p-8 group cursor-pointer hover:bg-stone/5 transition-colors">
                      <Upload className="w-6 h-6 text-stone mb-4 group-hover:text-ink transition-colors" />
                      <p className="text-xs text-stone text-center tracking-widest uppercase">Drop file or click to upload</p>
                      <p className="text-[10px] text-stone/60 mt-2 uppercase">SVG, PNG or WEBP (Max 2MB)</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-4">Brand Colors</label>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-cream border border-line" />
                        <div className="flex-1">
                          <p className="text-xs text-stone uppercase tracking-widest">Primary Cream</p>
                          <p className="text-sm">#F4EFE6</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-ink border border-line" />
                        <div className="flex-1">
                          <p className="text-xs text-stone uppercase tracking-widest">Accent Ink</p>
                          <p className="text-sm">#161310</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-8">
              <section>
                <h3 className="text-xs tracking-widest uppercase text-stone mb-6">Payment Gateways</h3>
                <div className="space-y-4">
                  <div className="p-6 border border-line flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-[10px]">STRIPE</div>
                      <div>
                        <p className="font-serif">Stripe Payments</p>
                        <p className="text-xs text-green-600 uppercase tracking-widest font-medium">Connected</p>
                      </div>
                    </div>
                    <button className="text-xs text-stone uppercase tracking-widest hover:text-ink transition-colors">Manage</button>
                  </div>
                  <div className="p-6 border border-line flex justify-between items-center opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-yellow-400 rounded flex items-center justify-center text-blue-800 font-bold text-[10px]">PAYPAL</div>
                      <div>
                        <p className="font-serif">PayPal Express</p>
                        <p className="text-xs text-stone uppercase tracking-widest">Not Connected</p>
                      </div>
                    </div>
                    <button className="text-xs text-ink uppercase tracking-widest font-medium hover:text-wood transition-colors">Connect</button>
                  </div>
                </div>
              </section>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
