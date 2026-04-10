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

## 🧰 Tech Stack

### Frontend
- **Framework:** React.js (TypeScript)
- **Styling:** Tailwind CSS + Shadcn/UI
- **State Management:** Zustand (with Persistence)
- **Validation:** Zod
- **Icons:** Lucide-React

---

## 📁 Project Architecture

```text
DineFlow/
├── Client/              # Frontend (Vite + React + TS)
│   ├── src/
│   │   ├── store/       # Zustand store (Auth, Cart, Restaurant)
│   │   ├── schema/      # Zod validation schemas
│   │   └── pages/       # Page components
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/mahin527/dineflow.git
cd DineFlow
```

### 2. Frontend setup
```bash
cd Client
npm install
npm run dev
```

---

## 🌍 Live Demo
* **Frontend:** [https://dineflow-demo.netlify.app](https://dineflow-demo.netlify.app)
---

## 🤝 Contact
**Mahin Hasan** *Full-Stack Web Developer | Shopify Expert*

[📧 Email](mailto:hasan.mahin527@gmail.com) | 
[💬 Messenger](https://m.me/md.mahin.hassan.738742) | 
[🎮 Discord](https://discord.com/users/mahin527) (Username: `mahin527`)

----

