import React, { useState } from 'react';

export default function ProductList({ products, cartItems, onAddToCart, onNavigateToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Computers', 'Accessories', 'Displays'];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const getCartQuantity = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    return item ? item.qty : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Store Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Featured Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Browse our latest electronics and accessories
            </p>
          </div>

          <button
            onClick={onNavigateToCart}
            className="self-start md:self-auto inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white font-medium px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>View Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
          </button>
        </div>
      </div>

      {/* Category Dropdown Filter */}
      <div className="flex items-center gap-3 mb-8">
        <label htmlFor="category-select" className="text-sm font-semibold text-gray-700">
          Category:
        </label>
        <div className="relative inline-block w-64">
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 hover:border-gray-400 text-gray-800 text-sm font-medium py-2.5 pl-3.5 pr-10 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 cursor-pointer transition-all"
          >
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? products.length
                  : products.filter((p) => p.category === cat).length;
              return (
                <option key={cat} value={cat}>
                  {cat === 'All' ? `All Categories (${count})` : `${cat} (${count})`}
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Product Cards Grid: Exactly 4 products as required by Exercise 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const inCartCount = getCartQuantity(product.id);

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Product Image */}
              <div className="relative bg-gray-100 h-52 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
                  {product.category}
                </span>

                {inCartCount > 0 && (
                  <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{inCartCount} in cart</span>
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h2>
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                      In Stock
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 mb-3">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 font-medium">({product.reviews})</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-4 pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-medium">Price</span>
                    <span className="text-2xl font-black text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Task 2: បង្កើតប៊ូតុង Add to Cart */}
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-slate-900 hover:bg-indigo-600 active:scale-[0.98] text-white py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

