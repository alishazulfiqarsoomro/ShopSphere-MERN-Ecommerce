# 🛍️ ShopSphere — MERN Stack E-Commerce Website

ShopSphere is a full-stack e-commerce web application built using the MERN stack. It provides an online shopping experience with user authentication, product browsing, shopping cart functionality, order management, and an admin interface for managing products and orders.

## 🌐 Live Demo

**Live Website:** https://shop-sphere-mern-ecommerce-pnho.vercel.app/

## 📂 GitHub Repository

https://github.com/alishazulfiqarsoomro/ShopSphere-MERN-Ecommerce

## ✨ Key Features

- 🔐 User Registration and Login
- 🛡️ Authentication and Role-Based Authorization
- 📊 Admin Dashboard
- 📦 Product Management (Add, Edit, and Delete)
- 🛍️ Product Details and Categories
- 🛒 Shopping Cart and Stock Management
- 💳 Checkout and Order Placement
- 📋 My Orders and Order Details
- 🔄 Order Cancellation and Status Management
- 📱 Responsive User Interface

## 🧰 Tech Stack

**Frontend**
- React.js
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- REST APIs
- JWT Authentication

**Database**
- MongoDB
- Mongoose

**Tools & Platforms**
- Git and GitHub
- Vercel
- Render (backend deployment, if configured)

## 📁 Project Structure

```text
ShopSphere-MERN-Ecommerce/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/alishazulfiqarsoomro/ShopSphere-MERN-Ecommerce.git
cd ShopSphere-MERN-Ecommerce
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and configure your environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=development
```

Use your own MongoDB connection string and a secure JWT secret. Never upload real secrets to GitHub.

Start the backend:

```bash
npm start
```

### 3. Set Up the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in your terminal, usually:

http://localhost:5173

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used for JWT authentication |
| `NODE_ENV` | Application environment |

Configure any additional variables required by your project.

## 🔒 Security

- Keep environment variables and credentials private.
- Do not commit `.env` files.
- Configure CORS for the frontend domain.
- Protect admin routes with server-side authorization.

## 🚀 Deployment

- **Frontend:** Vercel
- **Backend:** Render, if deployed
- **Database:** MongoDB Atlas, if configured

For production, configure the frontend API URL and backend CORS settings to use the deployed domains.

## 👩‍💻 Developer

**Alisha Zulfiqar Soomro**

MERN Stack Developer | BS Software Engineering Student

GitHub: https://github.com/alishazulfiqarsoomro

## 💡 What I Learned

- Building full-stack applications with the MERN stack
- Integrating frontend and backend using REST APIs
- Implementing authentication and authorization
- Managing products and orders with MongoDB
- Developing responsive user interfaces
- Using Git and GitHub for version control

## 📄 License

This project is intended for learning and portfolio purposes. Add a specific open-source license if you decide to distribute it under one.

