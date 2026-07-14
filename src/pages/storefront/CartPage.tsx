import React from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../data/mockDb';
import { X, Lock, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../contexts/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center"
      >
        <h1 className="text-4xl font-serif mb-8">Your Cart</h1>
        <p className="text-stone mb-8">Your cart is currently empty.</p>
        <Link to="/shop" className="inline-block bg-ink text-cream px-8 py-3 text-sm tracking-widest uppercase hover:bg-wood transition-colors">
          Continue Shopping
        </Link>
      </motion.div>
    );
  }

  const subtotal = cartTotal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-serif mb-12"
      >
        Your Cart ({cartCount} items)
      </motion.h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="border-t border-line">
            <AnimatePresence>
              {items.map((item, i) => {
                const price = item.product.salePrice || item.product.price;
                return (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 py-8 border-b border-line"
                  >
                    <Link to={`/product/${item.product.slug}`} className="w-24 h-32 shrink-0 bg-cream group overflow-hidden">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <Link to={`/product/${item.product.slug}`} className="font-serif text-lg hover:text-wood transition-colors">
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-stone mt-1 uppercase tracking-widest">
                            {item.variant.color} / {item.variant.size}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone hover:text-rust transition-colors p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-line">
                          <button 
                            onClick={() => updateQuantity(item.id, item.qty - 1)}
                            className="px-3 py-1.5 hover:bg-black/5 transition-colors"
                          >-</button>
                          <span className="w-8 text-center text-sm">{item.qty}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.qty + 1)}
                            className="px-3 py-1.5 hover:bg-black/5 transition-colors"
                          >+</button>
                        </div>
                        <span className="text-lg">${(price * item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-24 h-fit bg-white p-8 border border-line"
        >
          <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
          
          <div className="space-y-4 text-sm mb-6 pb-6 border-b border-line">
            <div className="flex justify-between">
              <span className="text-stone">Subtotal</span>
              <motion.span layout>${subtotal.toFixed(2)}</motion.span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone">Estimated Delivery</span>
              <span className="text-stone">Calculated at checkout</span>
            </div>
          </div>
          
          <div className="flex justify-between font-serif text-xl mb-8">
            <span>Total</span>
            <motion.span layout>${subtotal.toFixed(2)}</motion.span>
          </div>

          <Link to="/checkout" className="block text-center w-full bg-ink text-cream py-4 tracking-widest uppercase text-sm hover:bg-wood transition-colors mb-4 active:scale-[0.98]">
            Proceed to Checkout
          </Link>
          
          <div className="space-y-3 text-xs text-stone mt-6 pt-6 border-t border-line">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" /> Secure checkout
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" /> Complimentary shipping on orders over $2,000
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
