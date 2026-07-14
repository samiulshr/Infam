import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function AuthPage() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white p-8 border border-line shadow-sm overflow-hidden"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif mb-2">INFAM</h2>
          <p className="text-sm text-stone">{isLogin ? 'Sign in to your account' : 'Create an account'}</p>
        </div>
        
        <form className="space-y-6">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input id="name" type="text" placeholder="Full Name" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div layout>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input id="email" type="email" placeholder="Email Address" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
          </motion.div>
          <motion.div layout>
            <label htmlFor="password" className="sr-only">Password</label>
            <input id="password" type="password" placeholder="Password" className="w-full border-b border-line py-2 px-1 focus:outline-none focus:border-ink transition-colors text-sm" />
          </motion.div>
          
          <motion.button layout type="submit" className="w-full bg-ink text-cream py-3 text-sm tracking-widest uppercase hover:bg-wood transition-colors active:scale-[0.98]">
            {isLogin ? 'Sign In' : 'Create Account'}
          </motion.button>
        </form>
        
        <motion.div layout className="mt-8 text-center text-sm text-stone">
          {isLogin ? (
            <p>Don't have an account? <Link to="/register" className="text-ink hover:text-wood underline transition-colors">Register</Link></p>
          ) : (
            <p>Already have an account? <Link to="/login" className="text-ink hover:text-wood underline transition-colors">Sign in</Link></p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
