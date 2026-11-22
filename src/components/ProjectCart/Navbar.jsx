import React from 'react';

export default function Navbar({ setActiveTab, cartCount, cartTotal }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <button
            onClick={() => setActiveTab('products')}
            className="flex items-center gap-2 cursor-pointer group text-left"
          >
            <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
              ShopMini
            </span>
          </button>

          {/* Right actions: Wishlist, Cart Bag, User Profile, Checkout Button */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Wishlist Icon */}
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 p-1.5 transition-colors cursor-pointer"
              title="Wishlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Cart Bag Icon with dynamic badge and live total */}
            <button
              onClick={() => setActiveTab('cart')}
              className="relative text-gray-700 hover:text-indigo-600 p-1.5 transition-colors flex items-center gap-2 cursor-pointer group"
              title="View Cart"
            >
              <div className="relative">
                <svg className="w-5 h-5 text-gray-800 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold text-xs text-gray-800 group-hover:text-indigo-600">
                ${cartTotal.toFixed(2)}
              </span>
            </button>

            {/* User Profile Icon */}
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 p-1.5 transition-colors cursor-pointer"
              title="Account"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Quick Checkout CTA */}
            {cartCount > 0 && (
              <button
                onClick={() => setActiveTab('checkout')}
                className="hidden sm:inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <span>Checkout</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
