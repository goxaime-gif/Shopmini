import React from 'react';

export default function OrderConfirmationView({
  order,
  onContinueShopping,
}) {
  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Order Found</h2>
        <p className="text-gray-500 mb-6 text-sm">You haven't placed an order yet.</p>
        <button
          onClick={onContinueShopping}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm cursor-pointer"
        >
          Go to Store
        </button>
      </div>
    );
  }

  const {
    orderId,
    customer,
    orderDate,
    items,
    shippingFee,
    subtotal,
    discount,
    grandTotal,
    status,
  } = order;

  const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Valued Customer';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Main Confirmation Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Success Header Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-xs rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {/* Requirement: Message: Order Placed Successfully! */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-emerald-100 text-sm mt-1">
            ការកុម្ម៉ង់ត្រូវបានទទួលជោគជ័យ! Thank you for your purchase.
          </p>
        </div>

        {/* Order Meta Bar: Order ID, Date, Status */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          
          {/* Requirement: Order ID: ORD-0001 */}
          <div>
            <span className="block text-xs text-gray-500 font-medium">Order ID</span>
            <span className="font-extrabold text-indigo-600 text-base">{orderId}</span>
          </div>

          {/* Requirement: Customer Name */}
          <div>
            <span className="block text-xs text-gray-500 font-medium">Customer Name</span>
            <span className="font-bold text-gray-900 text-sm truncate block">{fullName}</span>
          </div>

          {/* Requirement: Order Date */}
          <div>
            <span className="block text-xs text-gray-500 font-medium">Order Date</span>
            <span className="font-semibold text-gray-800 text-xs sm:text-sm">{orderDate}</span>
          </div>

          {/* Requirement: Order Status: Pending */}
          <div>
            <span className="block text-xs text-gray-500 font-medium">Order Status</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span>{status || 'Pending'}</span>
            </span>
          </div>
        </div>

        {/* Ordered Products Section (Requirement: Ordered Products) */}
        <div className="p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>Ordered Products</span>
            <span className="text-xs font-normal text-gray-500">
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          </h2>

          <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100 mb-6">
            {items.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4 bg-white hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-gray-100 border border-gray-200"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">{item.name}</h3>
                    <p className="text-xs text-gray-500">
                      Unit: ${item.price.toFixed(2)} &bull; Quantity: {item.qty}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-gray-900 text-sm sm:text-base">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Details & Shipping Address Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-5 rounded-2xl border border-gray-200">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Shipping Destination
              </h3>
              <p className="font-semibold text-gray-900 text-sm">{fullName}</p>
              <p className="text-xs text-gray-600 mt-1">{customer.address}</p>
              <p className="text-xs text-gray-600">
                {customer.city}, {customer.state} {customer.zipCode}
              </p>
              {customer.description && (
                <p className="text-xs text-gray-500 italic mt-2">
                  Note: "{customer.description}"
                </p>
              )}
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Contact &amp; Delivery Method
              </h3>
              <p className="text-xs text-gray-700">
                <span className="font-semibold">Email:</span> {customer.email}
              </p>
              <p className="text-xs text-gray-700 mt-1">
                <span className="font-semibold">Phone:</span> {customer.phone}
              </p>
              <p className="text-xs text-gray-700 mt-1">
                <span className="font-semibold">Shipping:</span> {shippingFee === 0 ? 'Free Shipping (7-20 Days)' : 'Express Shipping ($9)'}
              </p>
            </div>
          </div>

          {/* Pricing & Grand Total (Requirement: Total Amount) */}
          <div className="bg-slate-900 text-white rounded-2xl p-6">
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-medium text-white">
                  {shippingFee === 0 ? 'Free ($0.00)' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span className="font-medium">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                {/* Requirement: Total Amount */}
                <span className="text-base font-bold text-white">Total Amount</span>
                <span className="text-2xl font-black text-emerald-400">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Print / Save Receipt</span>
            </button>

            <button
              onClick={onContinueShopping}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md transition-colors cursor-pointer"
            >
              Continue Shopping (New Order) &rarr;
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

