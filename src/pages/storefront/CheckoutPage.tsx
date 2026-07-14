import React, { useState } from 'react';
import { mockProducts } from '../../data/mockDb';

export default function CheckoutPage() {
  const [items] = useState([
    { id: '1', product: mockProducts[0], variant: { size: 'M', color: 'Camel' }, qty: 1 },
    { id: '2', product: mockProducts[1], variant: { size: 'S', color: 'Ivory' }, qty: 2 }
  ]);
  
  const subtotal = items.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.qty, 0);
  const delivery = 25;
  const total = subtotal + delivery;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif mb-12">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="flex-1 space-y-12">
          {/* Contact Info */}
          <section>
            <h2 className="text-sm tracking-widest uppercase mb-6 flex items-center gap-4">
              <span className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center text-xs">1</span>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="email" placeholder="Email Address" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
              <input type="tel" placeholder="Phone Number" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
            </div>
          </section>

          {/* Shipping Address */}
          <section>
            <h2 className="text-sm tracking-widest uppercase mb-6 flex items-center gap-4">
              <span className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center text-xs">2</span>
              Shipping Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="First Name" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
              <input type="text" placeholder="Last Name" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Street Address" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
              <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <input type="text" placeholder="City" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
              <input type="text" placeholder="State/Province" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
              <input type="text" placeholder="Postal Code" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
            </div>
          </section>
          
          {/* Payment Method */}
          <section>
            <h2 className="text-sm tracking-widest uppercase mb-6 flex items-center gap-4">
              <span className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center text-xs">3</span>
              Payment Method
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <label className="border border-ink p-4 flex items-center gap-3 cursor-pointer relative overflow-hidden">
                <input type="radio" name="payment" className="hidden" defaultChecked />
                <div className="w-4 h-4 rounded-full border border-ink flex items-center justify-center relative z-10">
                  <div className="w-2 h-2 rounded-full bg-ink"></div>
                </div>
                <span className="text-sm font-medium relative z-10">Credit Card</span>
                <div className="absolute inset-0 border border-ink pointer-events-none" />
              </label>
              <label className="border border-line p-4 flex items-center gap-3 cursor-pointer hover:border-ink transition-colors">
                <input type="radio" name="payment" className="hidden" />
                <div className="w-4 h-4 rounded-full border border-stone flex items-center justify-center"></div>
                <span className="text-sm">Mobile Banking</span>
              </label>
            </div>
            
            <div className="border border-line p-6 space-y-4">
              <input type="text" placeholder="Card Number" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Expiration Date (MM/YY)" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
                <input type="text" placeholder="Security Code" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
              </div>
              <input type="text" placeholder="Name on Card" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
            </div>
          </section>
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-24 h-fit bg-cream p-8">
          <h2 className="font-serif text-2xl mb-8">Order Summary</h2>
          
          <div className="space-y-6 mb-8 border-b border-line pb-8">
            {items.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-20 bg-white shrink-0 relative">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-ink text-white rounded-full text-[10px] flex items-center justify-center">{item.qty}</span>
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-serif leading-tight mb-1">{item.product.name}</p>
                  <p className="text-stone text-xs uppercase tracking-widest">{item.variant.color} / {item.variant.size}</p>
                </div>
                <div className="text-sm">
                  ${((item.product.salePrice || item.product.price) * item.qty).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-sm mb-6 border-b border-line pb-6">
            <div className="flex justify-between">
              <span className="text-stone">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone">Delivery (Standard)</span>
              <span>${delivery.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-between font-serif text-xl mb-8">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button className="w-full bg-ink text-cream py-4 text-sm tracking-widest uppercase hover:bg-wood transition-colors">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
