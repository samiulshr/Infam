import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { mockProducts, mockCategories } from '../../data/mockDb';
import { motion } from 'motion/react';

export default function ShopPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const isSale = searchParams.get('sale') === 'true';

  let displayProducts = mockProducts;
  let categoryName = 'All Products';

  if (slug) {
    const cat = mockCategories.find(c => c.slug === slug);
    if (cat) {
      categoryName = cat.name;
      displayProducts = displayProducts.filter(p => p.categoryId === cat.id);
    }
  } else if (isSale) {
    categoryName = 'Sale';
    displayProducts = displayProducts.filter(p => p.salePrice !== null && p.salePrice !== undefined);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
      {/* Sidebar Filters */}
      <motion.aside 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-56 shrink-0 lg:sticky lg:top-24 h-fit"
      >
        <h2 className="text-xs tracking-widest uppercase mb-8 pb-4 border-b border-line">Category</h2>
        <ul className="space-y-3 text-sm text-stone mb-12">
          <li><Link to="/shop" className="hover:text-ink transition-colors">All Products</Link></li>
          {mockCategories.map(cat => (
            <li key={cat.id}><Link to={`/category/${cat.slug}`} className="hover:text-ink transition-colors">{cat.name}</Link></li>
          ))}
        </ul>

        <h2 className="text-xs tracking-widest uppercase mb-6 pb-4 border-b border-line">Size</h2>
        <div className="grid grid-cols-3 gap-2 mb-12">
          {['XS', 'S', 'M', 'L', 'XL'].map(size => (
            <button key={size} className="border border-line py-2 text-xs text-center hover:border-ink hover:bg-black/5 transition-colors">
              {size}
            </button>
          ))}
        </div>

        <h2 className="text-xs tracking-widest uppercase mb-6 pb-4 border-b border-line">Color</h2>
        <div className="flex flex-wrap gap-3 mb-12">
          {['#D2B48C', '#000000', '#F5F5DC', '#1C2841', '#800000'].map(color => (
            <button key={color} className="w-6 h-6 rounded-full border border-line ring-offset-2 hover:ring-1 ring-ink hover:scale-110 transition-all" style={{ backgroundColor: color }} />
          ))}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end mb-8 border-b border-line pb-4"
        >
          <h1 className="text-4xl font-serif">{categoryName}</h1>
          <div className="flex items-center gap-2 text-xs text-stone tracking-widest uppercase">
            <span>Sort by:</span>
            <select className="bg-transparent border-none focus:outline-none cursor-pointer hover:text-ink transition-colors">
              <option>Newest First</option>
              <option>Price Low-High</option>
              <option>Price High-Low</option>
            </select>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {displayProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/product/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-white">
                  <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  {product.salePrice && (
                    <div className="absolute top-4 left-4 bg-rust text-cream text-[10px] px-2 py-1 tracking-widest uppercase">Sale</div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-6 py-2 text-xs tracking-widest uppercase border border-line cursor-pointer hover:bg-ink hover:text-cream transition-colors">
                      Quick Add
                    </div>
                  </div>
                </div>
                <div className="text-center">
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
        
        {displayProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center text-stone"
          >
            <p>No products found matching your selection.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
