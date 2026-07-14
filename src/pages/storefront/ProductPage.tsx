import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts, mockCategories } from '../../data/mockDb';
import { Heart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../contexts/CartContext';

export default function ProductPage() {
  const { slug } = useParams();
  const product = mockProducts.find(p => p.slug === slug);
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>('Camel');
  const [qty, setQty] = useState(1);
  const [showToast, setShowToast] = useState(false);
  
  const { addToCart } = useCart();

  if (!product) return <div className="p-24 text-center">Product not found</div>;

  const category = mockCategories.find(c => c.id === product.categoryId);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color");
      return;
    }
    addToCart(product, { size: selectedSize, color: selectedColor }, qty);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-ink text-cream px-6 py-4 shadow-lg text-sm tracking-widest uppercase"
          >
            Added to Cart
          </motion.div>
        )}
      </AnimatePresence>
      {/* Breadcrumb */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-stone tracking-widest uppercase mb-8"
      >
        <Link to="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/category/${category?.slug}`} className="hover:text-ink">{category?.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
            {product.images.map((img, idx) => (
              <motion.button 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.1 }}
                key={idx}
                onClick={() => setMainImgIdx(idx)}
                className={cn("w-20 h-24 shrink-0 border relative", mainImgIdx === idx ? "border-ink" : "border-line opacity-60 hover:opacity-100")}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
                {mainImgIdx === idx && (
                  <motion.div layoutId="activeImageIndicator" className="absolute inset-0 border-2 border-ink pointer-events-none" />
                )}
              </motion.button>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 bg-white aspect-[3/4] relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={mainImgIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={product.images[mainImgIdx]} 
                alt={product.name} 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Info */}
        <div className="w-full lg:w-[400px] shrink-0">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-serif mb-4"
          >
            {product.name}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 text-lg mb-8"
          >
            {product.salePrice ? (
              <>
                <span className="line-through text-stone">${product.price.toFixed(2)}</span>
                <span className="text-rust">${product.salePrice.toFixed(2)}</span>
              </>
            ) : (
              <span>${product.price.toFixed(2)}</span>
            )}
            {product.salePrice && <span className="text-rust text-xs tracking-widest border border-rust px-2 py-0.5 uppercase">Sale</span>}
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-stone text-sm mb-8 leading-relaxed"
          >
            {product.descriptionShort}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <span className="text-xs tracking-widest uppercase block mb-3">Color</span>
            <div className="flex gap-3">
              {/* Mock colors based on variants */}
              {Array.from(new Set(product.variants.map(v => v.color))).map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-8 h-8 rounded-full border border-line ring-offset-2 transition-all",
                    selectedColor === color ? "ring-1 ring-ink scale-110" : "hover:ring-1 hover:ring-stone hover:scale-105"
                  )}
                  style={{ backgroundColor: color.toLowerCase() === 'camel' ? '#C19A6B' : color.toLowerCase() === 'ivory' ? '#FFFFF0' : '#8B7355' }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs tracking-widest uppercase">Size</span>
              <button className="text-xs text-stone underline hover:text-ink transition-colors">Size Guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => {
                const variant = product.variants.find(v => v.size === size);
                const isOutOfStock = variant ? variant.stock === 0 : true;
                return (
                  <button 
                    key={size}
                    disabled={isOutOfStock}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-3 text-xs tracking-widest uppercase transition-all border relative overflow-hidden",
                      selectedSize === size 
                        ? "border-ink bg-ink text-cream" 
                        : isOutOfStock 
                          ? "border-line text-line cursor-not-allowed line-through" 
                          : "border-line hover:border-ink hover:bg-black/5"
                    )}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="flex items-center border border-line">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-black/5 transition-colors">-</button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-black/5 transition-colors">+</button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-ink text-cream py-3.5 tracking-widest uppercase text-sm hover:bg-wood transition-colors active:scale-[0.98]"
            >
              Add to Cart
            </button>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full border border-line py-3.5 tracking-widest uppercase text-sm flex items-center justify-center gap-2 hover:border-ink hover:bg-black/5 transition-colors mb-12 active:scale-[0.98]"
          >
            <Heart className="w-4 h-4" /> Add to Wishlist
          </motion.button>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="border-t border-line pt-8 space-y-6 text-sm"
          >
            <details className="group">
              <summary className="cursor-pointer font-serif text-lg flex justify-between items-center list-none hover:text-wood transition-colors">
                Description
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:block">-</span>
              </summary>
              <div className="pt-4 text-stone whitespace-pre-wrap">{product.descriptionLong}</div>
            </details>
            <details className="group border-t border-line pt-6">
              <summary className="cursor-pointer font-serif text-lg flex justify-between items-center list-none hover:text-wood transition-colors">
                Shipping & Returns
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:block">-</span>
              </summary>
              <div className="pt-4 text-stone text-sm">
                <p className="mb-2">Complimentary express shipping on orders over $2,000.</p>
                <p>Items can be returned within 7 days of delivery in their original condition.</p>
              </div>
            </details>
          </motion.div>
        </div>
      </div>
      
      {/* Related Products */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 border-t border-line pt-16"
      >
        <h2 className="text-2xl font-serif mb-8 text-center">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mockProducts.slice(0, 4).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/product/${product.slug}`} className="group block text-center">
                <div className="relative aspect-[3/4] mb-4 bg-white overflow-hidden">
                  <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-serif text-sm mb-1">{product.name}</h3>
                <span className="text-stone text-sm">${product.price.toFixed(2)}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
