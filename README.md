# 🛒 Quick Mart Store — Full-Stack MERN E-Commerce Platform

A production-ready, feature-rich Full-Stack E-Commerce web application built with the **MERN Stack** (MongoDB, Express, React, Node.js), styled with **Tailwind CSS**, and utilizing the **React Context API** for global state.

---

## 🚀 Features

### 🛍️ Customer Experience
- **Catalog & Discovery:** Browse products with real-time keyword search, category filters (Electronics, Footwear, Accessories, Furniture, Home & Kitchen), stock indicators, and rating summaries.
- **Product Details:** High-res image display, brand badges, stock availability status, reviews list, and review submission with star ratings.
- **Cart Management:** Add to cart, adjust quantities, remove items, live tax and free shipping calculations over \$100.
- **Checkout Process:** Multi-step wizard (Shipping Address $\rightarrow$ Payment Method $\rightarrow$ Order Review $\rightarrow$ Order Placement).
- **Payment Simulation:** Instant payment simulation for credit cards and Cash on Delivery (COD) tracking.
- **Order Management:** View order summary, delivery status tracking, and complete order history.
- **User Authentication:** JWT-based login and registration with hashed passwords (`bcryptjs`) and profile updates.

### 🛡️ Admin Capabilities
- **Product Management:** Add new products with image URLs, categories, prices, and stock counts. Delete products from inventory.
- **Order Management:** View all customer orders across the platform and update delivery statuses.

---

## 📁 Project Architecture

```
Prem's Projects/
├── backend/
│   ├── config/          # MongoDB connection (Mongoose)
│   ├── controllers/     # Business logic (User, Product, Order)
│   ├── data/            # Sample products and mock users
│   ├── middleware/      # JWT auth guard, admin guard, error handlers
│   ├── models/          # User, Product, Order schemas
│   ├── routes/          # Express REST API routes
│   ├── utils/           # JWT token generation
│   ├── seeder.js        # Data importer / destroyer script
│   ├── server.js        # Express application entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/         # Axios instance with auth interceptor
│   │   ├── components/  # Navbar, Footer, ProductCard, Rating, Loader, Message
│   │   ├── context/     # AuthContext and CartContext
│   │   ├── pages/       # Home, ProductDetails, Cart, Checkout, Profile, Admin
│   │   ├── App.jsx      # React router setup
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js   # Vite server with /api proxy to backend:5000
│   └── package.json
└── README.md
```

---

## ⚙️ Quick Start Guide

### 1. Configure MongoDB Atlas (Backend)

Open [`backend/.env`](file:///c:/Users/PREM/OneDrive/Desktop/Prem's%20Projects/backend/.env) and update your MongoDB Atlas URI:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=emart_jwt_secret_key_987654321_secure
```

> **Tip:** If using local MongoDB, set `MONGO_URI=mongodb://127.0.0.1:27017/emart`.

---

### 2. Seed Sample Products & Users

Run the database seeder to populate sample products and demo accounts:

```bash
cd backend
npm run data:import
```

#### Demo Accounts Created:
- **Admin:** `admin@quickmart.com` (or `admin@emart.com`) / `password123`
- **Customer:** `john@example.com` / `password123`

---

### 3. Start the Backend Server

```bash
cd backend
npm run dev
```
> The API server will run at: **`http://localhost:5000`**

---

### 4. Start the Frontend Development Server

Open a new terminal window:

```bash
cd frontend
npm run dev
```
> The React application will run at: **`http://localhost:3000`**

---

## 🧪 API Endpoints Reference

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/products` | Fetch all products (supports `?keyword=` & `?category=`) | Public |
| `GET` | `/api/products/:id` | Get single product by ID | Public |
| `POST` | `/api/products/:id/reviews` | Create product review | Private (User) |
| `POST` | `/api/products` | Create a new product | Private (Admin) |
| `DELETE` | `/api/products/:id` | Delete a product | Private (Admin) |
| `POST` | `/api/users/login` | Authenticate user & return JWT | Public |
| `POST` | `/api/users` | Register new user | Public |
| `GET` | `/api/users/profile` | Get current user profile | Private (User) |
| `PUT` | `/api/users/profile` | Update profile / password | Private (User) |
| `POST` | `/api/orders` | Create new customer order | Private (User) |
| `GET` | `/api/orders/myorders` | Get logged-in user's orders | Private (User) |
| `GET` | `/api/orders/:id` | Get order details | Private (User/Admin) |
| `PUT` | `/api/orders/:id/pay` | Mark order as paid | Private (User) |
| `PUT` | `/api/orders/:id/deliver` | Mark order as delivered | Private (Admin) |

