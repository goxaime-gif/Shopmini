import React, { useState } from 'react';
import { SHIPPING_OPTIONS } from './data';

export default function CheckoutView({
  cartItems,
  customer,
  setCustomer,
  shippingMethod,
  setShippingMethod,
  discount,
  promoCode,
  onPlaceOrder,
  onBackToCart,
}) {
  const [errors, setErrors] = useState({});

  // Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Selected shipping cost
  const selectedShipping = SHIPPING_OPTIONS.find((s) => s.id === shippingMethod) || SHIPPING_OPTIONS[0];
  const shippingFee = selectedShipping.price;

  // Estimated tax (optional, set to 0 or minimal)
  const estimatedTax = 0;

  // Grand Total = Subtotal + Shipping - Discount + Tax
  const grandTotal = Math.max(0, subtotal + shippingFee - discount + estimatedTax);

  const handleInputChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    // Clear error for that field if valid
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  // Field validation (Task 6: Validate Required Fields)
  const validateForm = () => {
    const newErrors = {};

    if (!customer.firstName?.trim()) {
      newErrors.firstName = 'First name is required.';
    }
    if (!customer.lastName?.trim()) {
      newErrors.lastName = 'Last name is required.';
    }
    if (!customer.email?.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }
    if (!customer.phone?.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (customer.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number (at least 8 digits).';
    }
    if (!customer.address?.trim()) {
      newErrors.address = 'Street address is required.';
    }
    if (!customer.city?.trim()) {
      newErrors.city = 'City is required.';
    }
    if (!customer.state?.trim()) {
      newErrors.state = 'State / Province is required.';
    }
    if (!customer.zipCode?.trim()) {
      newErrors.zipCode = 'Zip / Postal code is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty! Please add products before checking out.');
      return;
    }

    if (validateForm()) {
      onPlaceOrder({
        customer,
        shippingMethod,
        shippingFee,
        subtotal,
        discount,
        promoCode,
        grandTotal,
        items: [...cartItems],
      });
    } else {
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.focus();
      }
    }
  };

  // Quick fill sample data button for convenience during testing
  const handlePrefillDemoData = () => {
    setCustomer({
      firstName: 'Divyansh',
      lastName: 'Agarwal',
      email: 'customer@shopmini.com',
      phone: '+855 12 345 678',
      address: 'No. 128, Russian Blvd, Sangkat Toek Laak 1',
      city: 'Phnom Penh',
      state: 'Phnom Penh',
      zipCode: '12150',
      description: 'Please leave the package at the front desk if I am not available.',
    });
    setErrors({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stepper Breadcrumb matching screenshot: Cart > Shipping > Payment */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-3">
          <button
            onClick={onBackToCart}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Cart
          </button>
          <span>&gt;</span>
          <span className="text-indigo-600 font-bold">Shipping &amp; Checkout</span>
          <span>&gt;</span>
          <span className="text-gray-400">Confirmation</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Shipping Address &amp; Order
            </h1>
          </div>

          <button
            type="button"
            onClick={handlePrefillDemoData}
            className="self-start sm:self-auto text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors cursor-pointer"
            title="Click to auto-fill sample customer details"
          >
            &uarr; Auto-fill Test Customer
          </button>
        </div>
      </div>

      {/* Main Grid: Form on Left, Order Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            
            {/* 1. Customer Information & Shipping Address */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Customer &amp; Shipping Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-xs font-semibold text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={customer.firstName || ''}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="e.g. Divyansh"
                    className={`w-full text-sm rounded-xl px-3.5 py-2.5 border transition-all ${
                      errors.firstName
                        ? 'border-red-500 bg-red-50/40 text-red-900 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.firstName}</p>
                  )}
                </div>

                {/* 2. Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-xs font-semibold text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={customer.lastName || ''}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="e.g. Agarwal"
                    className={`w-full text-sm rounded-xl px-3.5 py-2.5 border transition-all ${
                      errors.lastName
                        ? 'border-red-500 bg-red-50/40 text-red-900 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.lastName}</p>
                  )}
                </div>

                {/* 3. Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={customer.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="e.g. customer@shopmini.com"
                    className={`w-full text-sm rounded-xl px-3.5 py-2.5 border transition-all ${
                      errors.email
                        ? 'border-red-500 bg-red-50/40 text-red-900 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
                  )}
                </div>

                {/* 4. Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={customer.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="e.g. +855 12 345 678"
                    className={`w-full text-sm rounded-xl px-3.5 py-2.5 border transition-all ${
                      errors.phone
                        ? 'border-red-500 bg-red-50/40 text-red-900 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.phone}</p>
                  )}
                </div>

                {/* 5. Address (Street) */}
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-xs font-semibold text-gray-700 mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={customer.address || ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="e.g. House No. 25, St. 271"
                    className={`w-full text-sm rounded-xl px-3.5 py-2.5 border transition-all ${
                      errors.address
                        ? 'border-red-500 bg-red-50/40 text-red-900 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.address}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-xs font-semibold text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={customer.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="e.g. Phnom Penh / Bangalore"
                    className={`w-full text-sm rounded-xl px-3.5 py-2.5 border transition-all ${
                      errors.city
                        ? 'border-red-500 bg-red-50/40 text-red-900 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.city}</p>
                  )}
                </div>

                {/* State / Province */}
                <div>
                  <label htmlFor="state" className="block text-xs font-semibold text-gray-700 mb-1">
                    State / Province <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={customer.state || ''}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="e.g. Karnataka / Phnom Penh"
                    className={`w-full text-sm rounded-xl px-3.5 py-2.5 border transition-all ${
                      errors.state
                        ? 'border-red-500 bg-red-50/40 text-red-900 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                    }`}
                  />
                  {errors.state && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.state}</p>
                  )}
                </div>

                {/* Zip Code */}
                <div>
                  <label htmlFor="zipCode" className="block text-xs font-semibold text-gray-700 mb-1">
                    Zip / Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="zipCode"
                    type="text"
                    value={customer.zipCode || ''}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="e.g. 560021"
                    className={`w-full text-sm rounded-xl px-3.5 py-2.5 border transition-all ${
                      errors.zipCode
                        ? 'border-red-500 bg-red-50/40 text-red-900 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                    }`}
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.zipCode}</p>
                  )}
                </div>

                {/* Optional Note / Description */}
                <div>
                  <label htmlFor="description" className="block text-xs font-semibold text-gray-700 mb-1">
                    Delivery Note (Optional)
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={customer.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter instructions for delivery..."
                    className="w-full text-sm rounded-xl px-3.5 py-2.5 border border-gray-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* 7. Shipping Method (matching Page 3 screenshot) */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Shipping Method</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SHIPPING_OPTIONS.map((option) => {
                  const isSelected = shippingMethod === option.id;

                  return (
                    <label
                      key={option.id}
                      className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={option.id}
                          checked={isSelected}
                          onChange={() => setShippingMethod(option.id)}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{option.name}</p>
                          <p className="text-xs text-gray-500">{option.duration}</p>
                        </div>
                      </div>

                      <span className="font-extrabold text-sm text-gray-900">
                        {option.price === 0 ? '$0 (Free)' : `$${option.price}`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 10. Place Order Button for mobile */}
            <div className="lg:hidden">
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors cursor-pointer text-base"
              >
                Place Order &bull; ${grandTotal.toFixed(2)}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Display Order Summary & Grand Total (Tasks 8, 9, 10) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs sticky top-24">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
            <button
              onClick={onBackToCart}
              className="text-xs text-indigo-600 hover:underline font-medium cursor-pointer"
            >
              Edit Cart
            </button>
          </div>

          {/* Cart items list with images */}
          <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0 border border-gray-200"
                  />
                  <div className="truncate">
                    <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.qty} &times; ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-gray-900 text-sm shrink-0">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="mt-5 pt-4 border-t border-gray-200 space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping ({selectedShipping.name})</span>
              <span className="font-semibold text-gray-900">
                {shippingFee === 0 ? '$0' : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount ({promoCode})</span>
                <span className="font-semibold">-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
              <span className="text-base font-bold text-gray-900">Grand Total</span>
              <span className="text-2xl font-black text-gray-900">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* 10. Task 10: Create Place Order Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-6 bg-slate-900 hover:bg-indigo-600 active:scale-[0.98] text-white py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-indigo-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Place Order</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>

          <p className="mt-3 text-center text-xs text-gray-400">
            By placing your order, you agree to the store terms &amp; conditions.
          </p>
        </div>

      </div>
    </div>
  );
}

