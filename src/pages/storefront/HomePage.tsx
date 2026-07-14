import React from 'react';
import { Link } from 'react-router-dom';
import { mockCategories, mockProducts } from '../../data/mockDb';

import { motion } from 'motion/react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row min-h-[75vh]">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex-1 flex flex-col justify-center px-8 lg:px-24 py-16"
        >
          <p className="text-stone text-xs tracking-widest uppercase mb-6">New Season</p>
          <h1 className="text-5xl lg:text-7xl mb-8 leading-[1.1]">Silence is the Ultimate Statement</h1>
          <p className="text-stone max-w-md mb-12">Defining the future of luxury through the lens of minimalist heritage.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="bg-ink text-cream px-8 py-3 text-sm tracking-widest uppercase hover:bg-wood transition-colors text-center active:scale-95">
              Shop Now
            </Link>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="flex-1 relative min-h-[50vh] lg:min-h-full overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=1200&auto=format&fit=crop&q=80" 
            alt="Hero" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Marquee/tile-line divider */}
      <div className="h-1 w-full bg-[repeating-linear-gradient(45deg,var(--color-line),var(--color-line)_10px,transparent_10px,transparent_20px)] opacity-50" />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockCategories.slice(0, 4).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link to={`/category/${cat.slug}`} className="group relative aspect-[3/4] overflow-hidden block">
                <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/40 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-cream text-sm tracking-widest uppercase border-b border-cream/30 pb-1 inline-block transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">{cat.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12 border-b border-line pb-4"
          >
            <h2 className="text-3xl font-serif">New Arrivals</h2>
            <Link to="/shop" className="text-xs tracking-widest uppercase hover:text-wood transition-colors">View All</Link>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 lg:gap-x-8">
            {mockProducts.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to={`/product/${product.slug}`} className="group block">
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-cream">
                    <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    {product.salePrice && (
                      <div className="absolute top-4 left-4 bg-rust text-cream text-[10px] px-2 py-1 tracking-widest uppercase">Sale</div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-stone tracking-widest uppercase mb-1">{mockCategories.find(c => c.id === product.categoryId)?.name}</p>
                    <h3 className="font-serif mb-2">{product.name}</h3>
                    <div className="flex justify-center gap-2 text-sm">
                      {product.salePrice ? (
                        <>
                          <span className="line-through text-stone">${product.price.toFixed(2)}</span>
                          <span className="text-rust">${product.salePrice.toFixed(2)}</span>
                        </>
                      ) : (
                        <span>${product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Strip */}
      <section className="py-24 bg-ink text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { title: 'Natural Materials', desc: 'Sourced organically for a tactile experience that matures beautifully.' },
            { title: 'Complimentary Shipping', desc: 'White-glove delivery available on all international orders.' },
            { title: 'Made to Last', desc: 'Engineered with precision for effortless movement and sharp structure.' },
          ].map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <h4 className="font-serif text-xl mb-4">{val.title}</h4>
              <p className="text-stone text-sm">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center px-4"
        >
          <h2 className="font-serif text-3xl mb-4">Insider Access</h2>
          <p className="text-stone text-sm mb-8">Receive private collection access and invitations.</p>
          <form className="flex border-b border-ink pb-2 group">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="flex-1 bg-transparent focus:outline-none text-sm px-2"
            />
            <button type="submit" className="text-xs tracking-widest uppercase font-medium group-hover:text-wood transition-colors">
              Join
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
