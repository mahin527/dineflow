# 🍽️ DineFlow | Full-Stack Restaurant Management System

**DineFlow** is a modern, scalable, and high-performance restaurant management platform. It simplifies the ordering process for customers while providing restaurant owners with a robust dashboard to manage menus and track orders.

> **Status:** Fully functional portfolio project showcasing advanced authentication, payment integration, and clean architecture.

---

## 🚀 Key Features

### 👤 Customer Features
* **Secure Authentication:** JWT & Cookie-based secure login/signup system.
* **Email Verification:** Account verification and password recovery via Mailtrap.
* **Dynamic Menu:** Browse and filter dishes by categories or search terms.
* **Smart Cart:** Built-in logic to restrict orders to one restaurant at a time (Foodpanda style).
* **Seamless Payments:** Integrated **Stripe** payment gateway for secure transactions.
* **Order Status:** Real-time tracking of order progress (Pending, Confirmed, Delivered).

### 🛠️ Admin Features
* **Restaurant Profile:** Setup and customize restaurant details with image uploads (Cloudinary).
* **Menu Management:** Full CRUD operations (Create, Read, Update, Delete) for menu items.
* **Order Dashboard:** Manage incoming orders and update their status.
* **Image Hosting:** High-performance image management using Cloudinary.

---

### Backend
- **Runtime:** Node.js (TypeScript)
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Security:** JWT, Bcrypt, Cookie-Parser
- **Payment:** Stripe API
- **Mailing:** Mailtrap (Nodemailer)
- **File Upload:** Multer & Cloudinary

---

## 📁 Project Architecture

```text
DineFlow/
└── Server/              # Backend (Node.js + Express + TS)
    ├── src/
    │   ├── controllers/ # Business logic
    │   ├── models/      # Database schemas
    │   ├── routes/      # API Endpoints
    │   └── mail/        # Email templates & service
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/mahin527/dineflow.git
cd DineFlow
```

### 2. Backend setup
```bash
cd Server
npm install
# Create a .env file and add your credentials
npm run dev
```
---

## 🔐 Environment Variables (Server)

Create a `.env` file in the **Server** directory:

```env
PORT = 8000

FRONTEND_URL= ...

CORS_ORIGIN = ...

SECRET_TOKEN = ...
SECRET_TOKEN_EXPIRY = 1d

# DataBase info
MONGODB_USERNAME = ...
MONGODB_PASSWORD = ...
MONGODB_URI = ...

# Cloudinary info

CLOUDINARY_CLOUD_NAME = ...
CLOUDINARY_API_KEY = ...
CLOUDINARY_API_SECRET = ...

# mailtrap 
MAILTRAP_API_TOKEN = ...

# Stripe 
STRIPE_PUBLISHABLE_KEY =...
STRIPE_SECRET_KEY = ...
#webhook
WEBHOOK_ENDPOINT_SECRET =...

```

---

## 🌍 Live Demo
* **API Server:** [https://dineflow-server.onrender.com](https://dineflow-server.onrender.com)

---

## 🤝 Contact
**Mahin Hasan** *Full-Stack Web Developer | Shopify Expert*

[📧 Email](mailto:hasan.mahin527@gmail.com) | 
[💬 Messenger](https://m.me/md.mahin.hassan.738742) | 
[🎮 Discord](https://discord.com/users/mahin527) (Username: `mahin527`)

----

