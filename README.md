# 🍽️ DineFlow (Restaurant Management System)

A full-stack MERN-based restaurant management system built with best practices, clean architecture, and scalable design.

---

## 🚀 Features

### 👤 User

* User registration & login (JWT authentication)
* Browse menu by categories
* Add/remove items from cart
* Place orders
* View order history

### 🛠️ Admin

* Manage menu (CRUD operations)
* Manage orders (update status)
* Dashboard (orders, revenue, stats)

---

## 🧰 Tech Stack

### Frontend

* [React](https://react.dev/learn/installation)
* [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite)
* [shadcn/ui](https://ui.shadcn.com/docs/installation/vite)
* [lucide icon]()
* [react-router-dom]()  
* [Zod](https://zod.dev/)
* [Zustand](https://zustand-demo.pmnd.rs/)
* [axios]()


### Backend

* [Node.js](https://nodejs.org/docs/latest/api/)
* [Express.js](https://expressjs.com/en/starter/installing.html)
* [Mongoose]()
* [bcrypt]()
* [JSON Web Token]()
* [Mailtrap](https://mailtrap.io/)
* [Stripe]()
* [Multer]()
* [Dotenv]()
* [Cors]()
* [Cookie parser]()
* [Cloudinary]()
* [tsx]()
* [typescript]()
* [nodemon]()
* [crypto-js]()



### Database

* MongoDB

### Authentication

* JWT (JSON Web Token)
* bcrypt

### Tools

* Postman (API testing)
* Git & GitHub

---

## 📁 Project Structure

### Backend

```
server/
 ┣ controllers/
 ┣ models/
 ┣ routes/
 ┣ middlewares/
 ┣ utils/
 ┗ app.js
```

### Frontend

```
client/
 ┣ components/
 ┣ pages/
 ┣ services/
 ┗ App.jsx
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/dineflow.git
cd dineflow
```

### 2. Backend setup

```
cd server
npm install
npm run dev
```

### 3. Frontend setup

```
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the server directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 📡 API Endpoints (Sample)

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/signup | Register user |
| POST   | /api/auth/signin    | Login user    |
| GET    | /api/menu          | Get all menu  |
| POST   | /api/order         | Place order   |

---

## 📦 Packages Used

### Backend

* express
* mongoose
* jsonwebtoken
* bcrypt
* cors
* dotenv

### Frontend

* react
* axios
* tailwindcss
* shadcn/ui

---

## 📸 Screenshots

*Add screenshots here*

---

## 🌍 Live Demo

Frontend: *Coming Soon*
Backend API: *Coming Soon*

---

## 🧠 Learnings

* Built a scalable backend with Express & MongoDB
* Implemented authentication & authorization
* Designed RESTful APIs
* Managed state and API integration

---

## 📌 Future Improvements

* Payment integration
* Real-time order tracking (Socket.io)
* Admin analytics dashboard

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

This project is licensed under the MIT License.
