import React, { useState } from 'react';

export default function CartView({
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
  shippingMethod,
  promoCode,
  setPromoCode,
  discount,
  setDiscount,
}) {
  const [promoInput, setPromoInput] = useState(promoCode || '');
  const [promoMessage, setPromoMessage] = useState(discount > 0 ? 'Coupon applied!' : '');
  const [promoError, setPromoError] = useState('');

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Delivery fee
  const deliveryFee = shippingMethod === 'express' ? 9 : 0;

  // Grand Total: Subtotal + Delivery - Discount
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoError('Please enter a coupon code.');
      setPromoMessage('');
      return;
    }

    if (code === 'DISCOUNT10' || code === 'SAVE10' || code === 'PROMO10') {
      const disc = Number((subtotal * 0.1).toFixed(2));
      setDiscount(disc);
      setPromoCode(code);
      setPromoMessage(`Coupon "${code}" applied (-$${disc.toFixed(2)})!`);
      setPromoError('');
    } else if (code === 'STUDENT' || code === 'FREE') {
      const disc = 15;
      setDiscount(disc);
      setPromoCode(code);
      setPromoMessage(`Coupon "${code}" applied (-$${disc.toFixed(2)})!`);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try "SAVE10" or "STUDENT".');
      setPromoMessage('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-gray-400">
          🛒
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6 text-sm">
          You have not added any products to your shopping cart yet.
        </p>
        <button
          onClick={onContinueShopping}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-2.5 rounded-xl transition-colors cursor-pointer text-sm"
        >
          <span>&larr; Browse Products</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb / Title */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Cart
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {cartItems.reduce((acc, item) => acc + item.qty, 0)} {cartItems.reduce((acc, item) => acc + item.qty, 0) === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <button
          onClick={onContinueShopping}
          className="text-sm font-medium text-gray-600 hover:text-indigo-600 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Layout matching Webyansh Screenshot on Page 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 p-4 sm:p-6 shadow-xs">
          {cartItems.map((item) => {
            const itemTotal = item.price * item.qty;

            return (
              <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                {/* Image & Title */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-gray-100 border border-gray-200 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">Category: {item.category}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Unit Price: ${item.price.toFixed(2)}</p>

                    {/* Action buttons under title on small screens: Wishlist + Remove */}
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                        title="Add to Wishlist"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>

                      {/* Remove QTY / Remove Item button */}
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1 flex items-center gap-1 text-xs cursor-pointer"
                        title="Remove Item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="text-xs">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price and Quantity Controls */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                  <div className="text-lg sm:text-xl font-black text-gray-900">
                    ${itemTotal.toFixed(2)}
                  </div>

                  {/* Update QTY buttons: keep - button visible, disabled when qty is 1 */}
                  <div className="flex items-center border border-gray-300 rounded-full bg-gray-50 px-2 py-1 gap-2">
                    {/* Decrease Button: visible, disabled if item.qty <= 1 */}
                    <button
                      type="button"
                      disabled={item.qty <= 1}
                      onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        item.qty <= 1
                          ? 'text-gray-300 opacity-40 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-200 cursor-pointer active:scale-95'
                      }`}
                      title={item.qty <= 1 ? "Minimum quantity is 1" : "Decrease quantity"}
                    >
                      &minus;
                    </button>

                    {/* QTY Display */}
                    <span className="w-6 text-center font-bold text-sm text-gray-800 select-none">
                      {item.qty}
                    </span>

                    {/* Increase Button */}
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer text-sm font-bold active:scale-95"
                      title="Increase quantity"
                    >
                      &#43;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Order Summary matching screenshot */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Order Summary</h2>

          {/* Pricing breakdown */}
          <div className="space-y-3.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span className="flex items-center gap-1">
                <span>Delivery</span>
                <span className="text-xs text-gray-400">({shippingMethod === 'express' ? 'Express' : 'Free'})</span>
              </span>
              <span className="font-semibold text-gray-900">
                {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount ({promoCode})</span>
                <span className="font-semibold">-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 flex justify-between items-baseline">
              <span className="text-base font-bold text-gray-900">Total (Grand Total)</span>
              <span className="text-2xl font-black text-gray-900">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Task 3: Create BTN Proceed to Checkout */}
          <button
            onClick={onProceedToCheckout}
            className="w-full mt-6 bg-slate-900 hover:bg-indigo-600 active:scale-[0.98] text-white py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-indigo-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* Promo code accordion / input matching screenshot "User a promo code" */}
          <div className="mt-5 pt-5 border-t border-gray-100">
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label htmlFor="promo" className="text-xs font-medium text-gray-600 block">
                Use a promo code (Try: <span className="font-bold text-indigo-600">SAVE10</span> or <span className="font-bold text-indigo-600">STUDENT</span>)
              </label>
              <div className="flex gap-2">
                <input
                  id="promo"
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 uppercase tracking-wider focus:outline-none focus:border-indigo-600"
                />
                <button
                  type="submit"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {promoMessage && (
                <p className="text-xs text-emerald-600 font-medium">{promoMessage}</p>
              )}
              {promoError && (
                <p className="text-xs text-red-500 font-medium">{promoError}</p>
              )}
            </form>
          </div>

          {/* Quick notice */}
          <div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs text-gray-500 flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Safe &amp; Secure Checkout Guaranteed</span>
          </div>
        </div>

      </div>
    </div>
  );
}
