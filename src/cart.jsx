import React, { useState, useEffect } from 'react';
import Navbar from './components/ProjectCart/Navbar';
import ProductList from './components/ProjectCart/ProductList';
import CartView from './components/ProjectCart/CartView';
import CheckoutView from './components/ProjectCart/CheckoutView';
import OrderConfirmationView from './components/ProjectCart/OrderConfirmationView';
import DatabaseERDView from './components/ProjectCart/DatabaseERDView';
import { INITIAL_PRODUCTS } from './components/ProjectCart/data';

export default function Cart() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState('products');

  
  // Initial cart with Laptop & Mouse so it matches the exercise screenshot immediately
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Laptop',
      category: 'Computers',
      price: 650,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      name: 'Mouse',
      category: 'Accessories',
      price: 15,
      qty: 2,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    },
  ]);

  // Customer form state (Exercise 2)
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
  });

  // Shipping method ('free' or 'express')
  const [shippingMethod, setShippingMethod] = useState('free');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Orders state (Exercise 3)
  const [orderCount, setOrderCount] = useState(1);
  const [lastOrder, setLastOrder] = useState(null);

  // Toast feedback
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Add to cart handler (Task 2)
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          qty: 1,
          image: product.image,
        },
      ];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  // Update QTY handler: save 1 only, cannot decrease below 1
  const handleUpdateQty = (productId, newQty) => {
    if (newQty < 1) return; // Keep minimum of 1
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  // Remove QTY handler (Task 3: remove QTY)
  const handleRemoveItem = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== productId));
    if (item) {
      showToast(`Removed "${item.name}" from cart.`);
    }
  };

  // Calculate totals
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Place order handler (Exercise 2 Task 10 & Exercise 3)
  const handlePlaceOrder = (orderData) => {
    const formattedId = `ORD-${String(orderCount).padStart(4, '0')}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder = {
      ...orderData,
      orderId: formattedId,
      orderDate: formattedDate,
      status: 'Pending',
    };

    setLastOrder(newOrder);
    setOrderCount((prev) => prev + 1);
    setCartItems([]); // Clear cart
    setActiveTab('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 font-sans antialiased">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalItemsCount}
        cartTotal={subtotal}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {activeTab === 'products' && (
          <ProductList
            products={products}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onNavigateToCart={() => {
              setActiveTab('cart');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'cart' && (
          <CartView
            cartItems={cartItems}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onProceedToCheckout={() => {
              setActiveTab('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContinueShopping={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            discount={discount}
            setDiscount={setDiscount}
          />
        )}

        {activeTab === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            customer={customer}
            setCustomer={setCustomer}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
            discount={discount}
            promoCode={promoCode}
            onPlaceOrder={handlePlaceOrder}
            onBackToCart={() => {
              setActiveTab('cart');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'confirmation' && (
          <OrderConfirmationView
            order={lastOrder}
            onContinueShopping={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'erd' && <DatabaseERDView />}
      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>&copy; {new Date().getFullYear()} ShopMini. All rights reserved.</p>
          <div className="flex items-center gap-5 text-gray-500">
            <button onClick={() => setActiveTab('products')} className="hover:text-indigo-600 cursor-pointer">
              Store
            </button>
            <button onClick={() => setActiveTab('cart')} className="hover:text-indigo-600 cursor-pointer">
              Cart
            </button>
            <button onClick={() => setActiveTab('checkout')} className="hover:text-indigo-600 cursor-pointer">
              Checkout
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
