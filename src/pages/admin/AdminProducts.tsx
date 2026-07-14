import React, { useState } from 'react';
import { mockProducts, mockCategories, Product } from '../../data/mockDb';
import { Plus, Search, Edit2, Trash2, X, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminProducts() {
  const [products, setProducts] = useState(mockProducts);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    price: '',
    categoryId: mockCategories[0].id,
    stockQuantity: '',
    status: 'active'
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Math.random().toString(36).substring(7),
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
      sku: newProduct.sku,
      price: parseFloat(newProduct.price),
      categoryId: newProduct.categoryId,
      stockQuantity: parseInt(newProduct.stockQuantity) || 0,
      lowStockThreshold: 10,
      status: newProduct.status as 'active' | 'draft',
      images: ['https://images.unsplash.com/photo-1515347619362-7101859c22e4?w=800&q=80'],
      descriptionShort: 'New product description',
      descriptionLong: 'New product long description',
      variants: [{ id: '1', size: 'M', color: 'Camel', stock: parseInt(newProduct.stockQuantity) || 0 }],
      createdAt: new Date().toISOString()
    };
    
    setProducts([product, ...products]);
    setIsAdding(false);
    setNewProduct({
      name: '', sku: '', price: '', categoryId: mockCategories[0].id, stockQuantity: '', status: 'active'
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-serif">Products</h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-ink text-white px-4 py-2 text-sm tracking-widest uppercase hover:bg-wood transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-line sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-serif">Add New Product</h2>
                <button onClick={() => setIsAdding(false)} className="hover:text-rust transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddProduct} className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-stone">Product Name</label>
                    <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full border border-line p-3 focus:outline-none focus:border-ink" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-stone">SKU</label>
                    <input required type="text" value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} className="w-full border border-line p-3 focus:outline-none focus:border-ink" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-stone">Price ($)</label>
                    <input required type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border border-line p-3 focus:outline-none focus:border-ink" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-stone">Category</label>
                    <select value={newProduct.categoryId} onChange={e => setNewProduct({...newProduct, categoryId: e.target.value})} className="w-full border border-line p-3 focus:outline-none focus:border-ink">
                      {mockCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-stone">Stock Quantity</label>
                    <input required type="number" value={newProduct.stockQuantity} onChange={e => setNewProduct({...newProduct, stockQuantity: e.target.value})} className="w-full border border-line p-3 focus:outline-none focus:border-ink" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-stone">Status</label>
                    <select value={newProduct.status} onChange={e => setNewProduct({...newProduct, status: e.target.value})} className="w-full border border-line p-3 focus:outline-none focus:border-ink">
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>
                
                <div className="border border-dashed border-line p-12 text-center text-stone">
                  <Upload className="w-8 h-8 mx-auto mb-4 opacity-50" />
                  <p>Drag and drop image here, or click to browse</p>
                </div>
                
                <div className="flex justify-end gap-4 pt-6">
                  <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 border border-line hover:bg-black/5 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-3 bg-ink text-white tracking-widest uppercase text-sm hover:bg-wood transition-colors">
                    Save Product
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white border border-line">
        <div className="p-4 border-b border-line flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full border border-line rounded-sm py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-ink"
            />
          </div>
          <div className="flex gap-4">
            <select className="border border-line rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-ink">
              <option>All Categories</option>
              {mockCategories.map(c => <option key={c.id}>{c.name}</option>)}
            </select>
            <select className="border border-line rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-ink">
              <option>Status</option>
              <option>Active</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-cream border-b border-line text-xs tracking-widest uppercase text-stone">
                <th className="p-4 font-normal w-12"><input type="checkbox" /></th>
                <th className="p-4 font-normal">Product</th>
                <th className="p-4 font-normal">Category</th>
                <th className="p-4 font-normal">Price</th>
                <th className="p-4 font-normal">Stock</th>
                <th className="p-4 font-normal">Status</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => {
                const category = mockCategories.find(c => c.id === product.categoryId);
                const isLowStock = product.stockQuantity <= product.lowStockThreshold;
                
                return (
                  <motion.tr 
                    key={product.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-line hover:bg-black/5 transition-colors"
                  >
                    <td className="p-4"><input type="checkbox" /></td>
                    <td className="p-4 flex items-center gap-4">
                      <div className="w-12 h-16 bg-cream shrink-0">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-stone mt-1">SKU: {product.sku}</p>
                      </div>
                    </td>
                    <td className="p-4 text-stone">{category?.name}</td>
                    <td className="p-4">
                      {product.salePrice ? (
                        <div>
                          <span className="text-rust">${product.salePrice.toFixed(2)}</span>
                          <span className="text-stone line-through text-xs ml-2">${product.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span>${product.price.toFixed(2)}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={cn(isLowStock ? "text-rust font-medium" : "")}>
                        {product.stockQuantity}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm",
                        product.status === 'active' ? "bg-ink text-white" : "bg-stone/20 text-stone"
                      )}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-stone">
                        <button className="p-1 hover:text-ink"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-1 hover:text-rust"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-line flex items-center justify-between text-sm text-stone">
          <p>Showing 1 to {products.length} of {products.length} results</p>
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
