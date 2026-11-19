# 🛒 Quick Mart Store — Full-Stack MERN E-Commerce Platform

A production-ready, feature-rich Full-Stack E-Commerce web application built with the **MERN Stack** (MongoDB, Express, React, Node.js), styled with **Tailwind CSS**, and utilizing the **React Context API** for global state.

Tailored specifically for an authentic **Indian Household Shopping Experience** with 125+ authentic branded FMCG goods and kitchen appliances (Aashirvaad, Amul, Tata Salt, Maggi, Parle-G, Dettol, Surf Excel, Hawkins, Preethi, Philips).

[![QA Verification](https://img.shields.io/badge/QA_Test_Report-100%25_Passed-brightgreen)](TEST_REPORT.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas_Cloud-green)](https://cloud.mongodb.com)

---

## 🚀 Key Features

### 🛍️ Customer Experience
- **Authentic Brand Catalog:** 125 products across 4 key Indian household categories with 100% verified, authentic brand packaging packshots:
  - **Fresh Groceries (32 items):** Aashirvaad Atta, India Gate Basmati, Fortune Oil, Amul Cow Ghee, Tata Sampann Dals, Tata Salt, Everest & MDH Spices.
  - **Snacks & Beverages (31 items):** Maggi 2-Minute Noodles, Parle-G, Britannia Good Day & Bourbon, Haldiram's Namkeens & Sweets, Bikano, Tata Tea Gold, Rooh Afza, Bournvita, Horlicks.
  - **Daily Essentials (31 items):** Surf Excel Matic, Ariel, Tide Plus, Dettol Antiseptic & Soaps, Vim Gel, Dove, Pears, Colgate Total, Sensodyne, Parachute Oil, Harpic, Lizol, Goodknight.
  - **Home & Kitchen Appliances (31 items):** Preethi Zodiac & Sujata Mixer Grinders, Hawkins Cookers, Prestige Induction & Cookware, Pigeon Kettles, Philips Steam Irons & Air Fryers.
- **Product Details & Reviews:** High-resolution packaging view, brand badges, stock counters, reviews list, and star ratings.
- **Localized Indian Currency & Delivery:**
  - All pricing in **Indian Rupees (₹)**.
  - **Free Delivery** on orders above **₹499** (otherwise flat ₹40 delivery fee).
  - Accurate **5% GST** calculation.
- **Cart Management:** Real-time quantity adjustments, live shipping thresholds, and persistent cart state.
- **Multi-Step Checkout:** Shipping Address ➔ Payment Method ➔ Order Review ➔ Instant Simulation.
- **User Authentication:** Secure JWT-based login & registration with salted password hashing (`bcryptjs`).

### 🛡️ Admin Capabilities
- **Product Management:** Add, edit, or delete inventory items with real-time stock monitoring.
- **Order Tracking:** Review all customer orders across the platform and update fulfillment status (Delivered / Pending).

---

## 🧪 Quality Assurance & Test Verification

Comprehensive testing was performed to verify catalog scalability, asset integrity, and build stability:
* **Test Report:** [Read the full TEST_REPORT.md](TEST_REPORT.md)
* **Automated Link Verification:** 125/125 image packshots verified with HTTP `200 OK` (0 broken links).
* **Vite Production Build:** Successfully compiled 2,141 modules with 0 errors.

---

## 📁 Project Architecture

```
quick-mart-store/
├── backend/
│   ├── config/          # MongoDB Atlas connection (Mongoose)
│   ├── controllers/     # Business logic (User, Product, Order)
│   ├── data/            # 125 verified Indian household products & seed users
│   ├── middleware/      # JWT auth guard, admin guard, error handlers
│   ├── models/          # User, Product, Order schemas
│   ├── routes/          # Express REST API routes
│   ├── utils/           # JWT token generation
│   ├── seeder.js        # Data importer / destroyer script
│   ├── server.js        # Express application entry point
│   └── package.json
│
├── frontend/
│   ├── public/          # Static assets & icons
│   ├── src/
│   │   ├── api/         # Axios API client with dynamic VITE_API_URL
│   │   ├── components/  # Navbar, Footer, ProductCard, Rating, CheckoutSteps
│   │   ├── context/     # AuthContext & CartContext (State Management)
│   │   ├── pages/       # Home, ProductDetails, Cart, Login, Register, Checkout, Admin
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json      # Production SPA rewrite rules
│   ├── vite.config.js
│   └── package.json
│
├── TEST_REPORT.md       # Comprehensive QA test verification document
└── README.md
```

---

## ⚡ Quick Start (Local Setup)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB Atlas](https://cloud.mongodb.com/) cluster (or local MongoDB)

### 2. Configure Backend Environment
Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/quickmart?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```

### 3. Seed Database
```bash
cd backend
npm install
npm run data:import
```

#### Demo Accounts:
- **Admin:** `admin@quickmart.com` / `password123`
- **Customer:** `john@example.com` / `password123`

### 4. Run Application

**Terminal 1 (Backend API):**
```bash
cd backend
npm run dev
# Running on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm run dev
# Running on http://localhost:3000
```

---

## 📡 API Endpoints Reference

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

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
