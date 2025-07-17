# Timora ⌚- E-commerce Website for Watches

![1752006411950](image/README/1752006411950.png)

**Timora** is a full-stack e-commerce web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). This platform offers a seamless shopping experience for watch enthusiasts, featuring a dynamic and responsive user interface, secure user authentication, product filtering, and a robust payment system. The application is designed to provide both users and administrators with intuitive dashboards to manage products, categories, and orders efficiently.

This project was developed as part of a comprehensive MERN stack tutorial, guiding developers through the process of building a scalable e-commerce platform from scratch. The application is deployed on **Render** and integrates **Razorpay** for secure payment processing.

---

## 🌟 Features

* **User Features** :
* Browse and filter watches by category, price, and search queries.
* View detailed single product pages.
* Add products to the cart and manage cart items.
* Secure user registration and login with password hashing.
* Forgot password functionality for account recovery.
* User profile management and order history tracking.
* Seamless checkout with **Razorpay** payment gateway integration.
* **Admin Features** :
* Admin dashboard to manage categories, products, and orders.
* CRUD operations for product and category management.
* View and update user orders.
* **Technical Features** :
* Responsive and SEO-optimized front-end built with **React** and **Context API** for state management.
* RESTful API built with **Express.js** and **Node.js** for robust back-end functionality.
* **MongoDB** for scalable NoSQL database management.
* Public and private routes for secure access control.
* Middleware for authentication and authorization.
* Deployed on **Render** for reliable hosting and scalability.

---

## 🛠️ Tech Stack

* **Frontend** : React, Context API, Bootstrap/Tailwind CSS (for styling)
* **Backend** : Node.js, Express.js
* **Database** : MongoDB
* **Payment Gateway** : Razorpay
* **Deployment** : Render
* **Other Tools** : JWT for authentication, bcrypt for password hashing

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16 or higher)
* MongoDB Atlas account or local MongoDB instance
* Razorpay account for payment gateway integration
* Render account for deployment

### Installation

1. **Clone the repository** :

```bash
   git clone https://github.com/shaktipriya/timora-ecommerce.git
   cd timora-ecommerce
```

1. **Install dependencies** :

* For the server:
  ```bash
  cd server
  npm install
  ```
* For the client:
  ```bash
  cd client
  npm install
  ```

1. **Set up environment variables** :

* Create a `.env` file in the `server` directory with the following:
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  RAZORPAY_KEY_ID=your_razorpay_key_id
  RAZORPAY_KEY_SECRET=your_razorpay_key_secret
  ```

1. **Run the application** :

* Start the server:
  ```bash
  cd server
  npm start
  ```
* Start the client:
  ```bash
  cd client
  npm start
  ```

1. **Access the application** :

* Open your browser and navigate to `http://localhost:3000` for the React frontend.
* The backend API will be available at `http://localhost:5000`.

---

## 📑 Project Structure

```
timora-ecommerce/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components (Home, Product, Cart, etc.)
│   │   ├── context/       # Context API for state management
│   │   └── App.js         # Main React app component
├── server/                # Express.js and Node.js backend
│   ├── models/            # MongoDB schemas (User, Product, Category)
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication and authorization middleware
│   └── server.js          # Main server file
└── README.md              # Project documentation
```

---

## 🏆 Badges

[![Made with MERN](https://img.shields.io/badge/Made%20with-MERN-61DAFB?logo=react&logoColor=ffffff)](https://www.mongodb.com/mern-stack)
[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render)](https://render.com/)
[![Razorpay Integration](https://img.shields.io/badge/Payment-Razorpay-0066FF?logo=razorpay)](https://razorpay.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌐 Deployment

The application is live on  **Render** . Visit the deployed site here: [Timora E-commerce](https://timora-shaktipriya.onrender.com/).

To deploy your own version:

1. Push your code to a GitHub repository.
2. Create a new web service on Render and connect it to your repository.
3. Configure environment variables in the Render dashboard.
4. Deploy the application and verify it is running.

---

## 📷 Screenshots:

### Filter funcionality

<img width="1876" height="785" alt="image" src="https://github.com/user-attachments/assets/76d4d7dd-56fb-4860-9459-2d23558a831b" />

### Cart Page

<img width="1765" height="731" alt="image" src="https://github.com/user-attachments/assets/d07d9552-4b15-47b0-b58f-7552eafa854b" />

### Razorpay Payment Gateway Integrated 

<img width="1378" height="797" alt="image" src="https://github.com/user-attachments/assets/7327f53c-f2c5-4e64-a72d-ce746d4e09d2" />




## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a pull request.

---

## 👩‍💻 Author

**Shaktipriya**

* GitHub: [shaktipriya](https://github.com/shaktipriya_13)
* Email: [shaktipriya34@gmail.com](mailto:shaktipriya34@gmail.com)

---

## 🙏 Acknowledgments

* Thanks to the MERN stack community for their amazing resources and documentation.
* Special thanks to **Razorpay** for providing a seamless payment gateway solution.
* Gratitude to **Render** for reliable deployment services.

---

**Timora** - Your one-stop shop for premium watches, built with love and powered by the MERN stack! 🕒
