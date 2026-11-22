import React, { useState } from 'react';

export default function DatabaseERDView() {
  const [activeTab, setActiveTab] = useState('diagram');
  const [copied, setCopied] = useState(false);

  const tables = [
    {
      name: 'Customers',
      description: 'Stores customer profile information (First Name, Last Name, Email, Phone, Address)',
      primaryKey: 'customer_id',
      columns: [
        { name: 'customer_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key (Auto Increment)' },
        { name: 'first_name', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'Customer First Name' },
        { name: 'last_name', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'Customer Last Name' },
        { name: 'email', type: 'VARCHAR(150)', isPK: false, isFK: false, desc: 'Customer Email Address (Unique)' },
        { name: 'phone', type: 'VARCHAR(30)', isPK: false, isFK: false, desc: 'Phone Number' },
        { name: 'address', type: 'TEXT', isPK: false, isFK: false, desc: 'Street Address' },
        { name: 'city', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'City' },
        { name: 'state', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'State / Province' },
        { name: 'zip_code', type: 'VARCHAR(20)', isPK: false, isFK: false, desc: 'Postal Code' },
        { name: 'created_at', type: 'TIMESTAMP', isPK: false, isFK: false, desc: 'Record registration time' },
      ],
    },
    {
      name: 'Categories',
      description: 'Stores product categories (e.g. Computers, Displays, Accessories)',
      primaryKey: 'category_id',
      columns: [
        { name: 'category_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key (Auto Increment)' },
        { name: 'name', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'Category Name' },
        { name: 'description', type: 'TEXT', isPK: false, isFK: false, desc: 'Category details' },
        { name: 'created_at', type: 'TIMESTAMP', isPK: false, isFK: false, desc: 'Creation timestamp' },
      ],
    },
    {
      name: 'Products',
      description: 'Stores inventory items (Laptop $650, Mouse $15, Keyboard $25, Monitor $120)',
      primaryKey: 'product_id',
      columns: [
        { name: 'product_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key (Auto Increment)' },
        { name: 'category_id', type: 'INT', isPK: false, isFK: true, desc: 'Foreign Key -> Categories.category_id' },
        { name: 'name', type: 'VARCHAR(150)', isPK: false, isFK: false, desc: 'Product Name' },
        { name: 'price', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Product Unit Price' },
        { name: 'stock_quantity', type: 'INT', isPK: false, isFK: false, desc: 'Current Stock available' },
        { name: 'image_url', type: 'VARCHAR(255)', isPK: false, isFK: false, desc: 'Product image asset path' },
        { name: 'description', type: 'TEXT', isPK: false, isFK: false, desc: 'Product details' },
      ],
    },
    {
      name: 'Orders',
      description: 'Stores placed customer orders, total amounts, shipping and status',
      primaryKey: 'order_id',
      columns: [
        { name: 'order_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key (Auto Increment, e.g. ORD-0001)' },
        { name: 'customer_id', type: 'INT', isPK: false, isFK: true, desc: 'Foreign Key -> Customers.customer_id' },
        { name: 'order_code', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'Order code (e.g. ORD-0001)' },
        { name: 'order_date', type: 'TIMESTAMP', isPK: false, isFK: false, desc: 'Date and time of order' },
        { name: 'subtotal', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Total before shipping & discount' },
        { name: 'shipping_fee', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Shipping charge ($0 or $9)' },
        { name: 'discount', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Applied coupon discount' },
        { name: 'grand_total', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Final total payment amount' },
        { name: 'shipping_method', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'Free Shipping / Express' },
        { name: 'order_status', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'Status: Pending, Processing, Completed' },
      ],
    },
    {
      name: 'Order_Items',
      description: 'Stores item details for each order (associates Orders and Products)',
      primaryKey: 'order_item_id',
      columns: [
        { name: 'order_item_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key (Auto Increment)' },
        { name: 'order_id', type: 'INT', isPK: false, isFK: true, desc: 'Foreign Key -> Orders.order_id' },
        { name: 'product_id', type: 'INT', isPK: false, isFK: true, desc: 'Foreign Key -> Products.product_id' },
        { name: 'quantity', type: 'INT', isPK: false, isFK: false, desc: 'Purchased quantity' },
        { name: 'unit_price', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Unit price at purchase' },
        { name: 'subtotal', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'quantity * unit_price' },
      ],
    },
  ];

  const sqlSchema = `-- ==========================================
-- E-COMMERCE ORDER DATABASE DDL SCRIPT
-- Exercise 4: Design E-Commerce Order Database
-- ==========================================

-- 1. Create Customers Table
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(30) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Categories Table
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Products Table
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE
);

-- 4. Create Orders Table
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_code VARCHAR(50) NOT NULL UNIQUE, -- e.g. 'ORD-0001'
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping_fee DECIMAL(10, 2) DEFAULT 0.00,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    grand_total DECIMAL(10, 2) NOT NULL,
    shipping_method VARCHAR(50) DEFAULT 'Free Shipping',
    order_status VARCHAR(50) DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE
);

-- 5. Create Order_Items Table
CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- ==========================================
-- SAMPLE SEED DATA (EXERCISE PRODUCTS)
-- ==========================================
INSERT INTO Categories (category_id, name, description) VALUES
(1, 'Computers', 'Laptops and Workstations'),
(2, 'Accessories', 'Mice, Keyboards and Peripherals'),
(3, 'Displays', 'Monitors and screens');

INSERT INTO Products (product_id, category_id, name, price, stock_quantity) VALUES
(1, 1, 'Laptop', 650.00, 25),
(2, 2, 'Mouse', 15.00, 100),
(3, 2, 'Keyboard', 25.00, 75),
(4, 3, 'Monitor', 120.00, 40);
`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Exercise 4 Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 mb-2">
          <span>Page 4: Practical Exercise Database Design</span>
          <span>&bull;</span>
          <span>ការរចនា E-Commerce Order Database</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Entity-Relationship Diagram (ERD) &amp; Schema
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Task: ចូរគូរ ERD ដើម្បីបង្ហាញទំនាក់ទំនងរវាង Tables ទាំងនេះ: 1. Customers, 2. Categories, 3. Products, 4. Orders, 5. Order_Items
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('diagram')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'diagram'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Visual ERD &amp; Relationships
        </button>
        <button
          onClick={() => setActiveTab('tables')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'tables'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          All 5 Tables Schema
        </button>
        <button
          onClick={() => setActiveTab('sql')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'sql'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          SQL DDL Script
        </button>
      </div>

      {/* TAB 1: Visual ERD */}
      {activeTab === 'diagram' && (
        <div className="space-y-8">
          
          {/* Visual Architecture Flow Banner */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>Visual Entity-Relationship Overview</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-8">
              Visualizes how customers place orders, how products belong to categories, and how order items join products to orders.
            </p>

            {/* ER Diagram Representation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Left Column: Categories & Customers */}
              <div className="space-y-6">
                {/* Categories */}
                <div className="bg-slate-800 border-2 border-indigo-500/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-3">
                    <span className="font-bold text-indigo-400 text-base">Categories</span>
                    <span className="text-[10px] bg-indigo-900/60 text-indigo-300 px-2 py-0.5 rounded">1</span>
                  </div>
                  <ul className="text-xs space-y-1 text-slate-300">
                    <li className="font-semibold text-amber-400">&bull; category_id (PK)</li>
                    <li>&bull; name</li>
                    <li>&bull; description</li>
                  </ul>
                  <div className="mt-3 pt-2 border-t border-slate-700 text-[11px] text-indigo-300 font-medium">
                    1 Category &rarr; Many (N) Products
                  </div>
                </div>

                {/* Customers */}
                <div className="bg-slate-800 border-2 border-emerald-500/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-3">
                    <span className="font-bold text-emerald-400 text-base">Customers</span>
                    <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded">1</span>
                  </div>
                  <ul className="text-xs space-y-1 text-slate-300">
                    <li className="font-semibold text-amber-400">&bull; customer_id (PK)</li>
                    <li>&bull; first_name, last_name</li>
                    <li>&bull; email, phone</li>
                    <li>&bull; address, city, state, zip</li>
                  </ul>
                  <div className="mt-3 pt-2 border-t border-slate-700 text-[11px] text-emerald-300 font-medium">
                    1 Customer &rarr; Many (N) Orders
                  </div>
                </div>
              </div>

              {/* Middle Connectors & Products / Orders */}
              <div className="space-y-6">
                {/* Products */}
                <div className="bg-slate-800 border-2 border-blue-500/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-3">
                    <span className="font-bold text-blue-400 text-base">Products</span>
                    <span className="text-[10px] bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded">N</span>
                  </div>
                  <ul className="text-xs space-y-1 text-slate-300">
                    <li className="font-semibold text-amber-400">&bull; product_id (PK)</li>
                    <li className="text-indigo-300">&bull; category_id (FK)</li>
                    <li>&bull; name, price</li>
                    <li>&bull; stock_quantity, image_url</li>
                  </ul>
                  <div className="mt-3 pt-2 border-t border-slate-700 text-[11px] text-blue-300 font-medium">
                    1 Product &rarr; Many (N) Order_Items
                  </div>
                </div>

                {/* Orders */}
                <div className="bg-slate-800 border-2 border-amber-500/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-3">
                    <span className="font-bold text-amber-400 text-base">Orders</span>
                    <span className="text-[10px] bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded">N</span>
                  </div>
                  <ul className="text-xs space-y-1 text-slate-300">
                    <li className="font-semibold text-amber-400">&bull; order_id (PK)</li>
                    <li className="text-emerald-300">&bull; customer_id (FK)</li>
                    <li>&bull; order_code (ORD-0001)</li>
                    <li>&bull; order_date, subtotal</li>
                    <li>&bull; shipping_fee, grand_total</li>
                    <li>&bull; order_status (Pending)</li>
                  </ul>
                  <div className="mt-3 pt-2 border-t border-slate-700 text-[11px] text-amber-300 font-medium">
                    1 Order &rarr; Many (N) Order_Items
                  </div>
                </div>
              </div>

              {/* Right Column: Order_Items (Bridge / Junction Table) */}
              <div>
                <div className="bg-slate-800 border-2 border-purple-500 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-3">
                    <span className="font-bold text-purple-400 text-base">Order_Items</span>
                    <span className="text-[10px] bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded">Junction (N)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">
                    Links Orders &amp; Products (Many-to-Many resolved into two 1:N relations)
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-300">
                    <li className="font-semibold text-amber-400">&bull; order_item_id (PK)</li>
                    <li className="text-amber-300 font-medium">&bull; order_id (FK &rarr; Orders)</li>
                    <li className="text-blue-300 font-medium">&bull; product_id (FK &rarr; Products)</li>
                    <li>&bull; quantity (INT)</li>
                    <li>&bull; unit_price (DECIMAL)</li>
                    <li>&bull; subtotal (DECIMAL)</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* Relationship Cardinalities Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-bold text-gray-900 text-sm">
                Table Relationships &amp; Cardinalities (ទំនាក់ទំនងរវាង Tables)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-left">
                <thead className="bg-gray-100 text-gray-700 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Primary Table</th>
                    <th className="py-3 px-4">Relationship</th>
                    <th className="py-3 px-4">Foreign Table</th>
                    <th className="py-3 px-4">Foreign Key</th>
                    <th className="py-3 px-4">Explanation (អត្ថន័យ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  <tr>
                    <td className="py-3 px-4 font-bold text-indigo-600">Categories (1)</td>
                    <td className="py-3 px-4 font-semibold text-purple-600">One-to-Many (1:N)</td>
                    <td className="py-3 px-4 font-bold text-blue-600">Products (N)</td>
                    <td className="py-3 px-4 font-mono text-gray-600">category_id</td>
                    <td className="py-3 px-4">One category contains many products.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-emerald-600">Customers (1)</td>
                    <td className="py-3 px-4 font-semibold text-purple-600">One-to-Many (1:N)</td>
                    <td className="py-3 px-4 font-bold text-amber-600">Orders (N)</td>
                    <td className="py-3 px-4 font-mono text-gray-600">customer_id</td>
                    <td className="py-3 px-4">One customer can place multiple orders.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-amber-600">Orders (1)</td>
                    <td className="py-3 px-4 font-semibold text-purple-600">One-to-Many (1:N)</td>
                    <td className="py-3 px-4 font-bold text-purple-600">Order_Items (N)</td>
                    <td className="py-3 px-4 font-mono text-gray-600">order_id</td>
                    <td className="py-3 px-4">One order contains multiple purchased line items.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-blue-600">Products (1)</td>
                    <td className="py-3 px-4 font-semibold text-purple-600">One-to-Many (1:N)</td>
                    <td className="py-3 px-4 font-bold text-purple-600">Order_Items (N)</td>
                    <td className="py-3 px-4 font-mono text-gray-600">product_id</td>
                    <td className="py-3 px-4">One product can appear in many order line items.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Table Schemas */}
      {activeTab === 'tables' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table) => (
            <div key={table.name} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs flex flex-col">
              <div className="bg-slate-900 text-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base">{table.name}</h3>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                    PK: {table.primaryKey}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{table.description}</p>
              </div>

              <div className="p-4 flex-1">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 text-left">
                      <th className="pb-1.5 font-semibold">Column</th>
                      <th className="pb-1.5 font-semibold">Type</th>
                      <th className="pb-1.5 font-semibold">Key</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {table.columns.map((col) => (
                      <tr key={col.name} className="hover:bg-gray-50">
                        <td className="py-1.5 font-mono font-medium text-gray-800">
                          {col.name}
                        </td>
                        <td className="py-1.5 text-gray-500 font-mono text-[11px]">
                          {col.type}
                        </td>
                        <td className="py-1.5">
                          {col.isPK && (
                            <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                              PK
                            </span>
                          )}
                          {col.isFK && (
                            <span className="bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                              FK
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: SQL DDL */}
      {activeTab === 'sql' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">PostgreSQL / MySQL Schema DDL</h3>
              <p className="text-xs text-gray-500">Includes table creation with primary keys, foreign keys, and sample seed data.</p>
            </div>
            <button
              onClick={copySql}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL'}</span>
            </button>
          </div>

          <pre className="p-6 bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
            {sqlSchema}
          </pre>
        </div>
      )}
    </div>
  );
}

