# Timora - E-commerce Website for Watches

![1752006411950](image/README/1752006411950.png)

**Timora** is a full-stack e-commerce web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). This platform offers a seamless shopping experience for watch enthusiasts, featuring a dynamic and responsive user interface, secure user authentication, product filtering, and a robust payment system. The application is designed to provide both users and administrators with intuitive dashboards to manage products, categories, and orders efficiently.

This project was developed as part of a comprehensive MERN stack tutorial, guiding developers through the process of building a scalable e-commerce platform from scratch. The application is deployed on **Render** and integrates **Razorpay** for secure payment processing.

---

## 🌟 Features

- **User Features** :
- Browse and filter watches by category, price, and search queries.
- View detailed single product pages.
- Add products to the cart and manage cart items.
- Secure user registration and login with password hashing.
- Forgot password functionality for account recovery.
- User profile management and order history tracking.
- Seamless checkout with **Razorpay** payment gateway integration.
- **Admin Features** :
- Admin dashboard to manage categories, products, and orders.
- CRUD operations for product and category management.
- View and update user orders.
- **Technical Features** :
- Responsive and SEO-optimized front-end built with **React** and **Context API** for state management.
- RESTful API built with **Express.js** and **Node.js** for robust back-end functionality.
- **MongoDB** for scalable NoSQL database management.
- Public and private routes for secure access control.
- Middleware for authentication and authorization.
- Deployed on **Render** for reliable hosting and scalability.

---

## 🛠️ Tech Stack

- **Frontend** : React, Context API, Bootstrap/Tailwind CSS (for styling)
- **Backend** : Node.js, Express.js
- **Database** : MongoDB
- **Payment Gateway** : Razorpay
- **Deployment** : Render
- **Other Tools** : JWT for authentication, bcrypt for password hashing

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- Razorpay account for payment gateway integration
- Render account for deployment

### Installation

1. **Clone the repository** :

```bash
   git clone https://github.com/shaktipriya/timora-ecommerce.git
   cd timora-ecommerce
```

1. **Install dependencies** :

- For the server:
  ```bash
  cd server
  npm install
  ```
- For the client:
  ```bash
  cd client
  npm install
  ```

1. **Set up environment variables** :

- Create a `.env` file in the `server` directory with the following:
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  RAZORPAY_KEY_ID=your_razorpay_key_id
  RAZORPAY_KEY_SECRET=your_razorpay_key_secret
  ```

1. **Run the application** :

- Start the server:
  ```bash
  cd server
  npm start
  ```
- Start the client:
  ```bash
  cd client
  npm start
  ```

1. **Access the application** :

- Open your browser and navigate to `http://localhost:3000` for the React frontend.
- The backend API will be available at `http://localhost:5000`.

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

## 📚 Tutorial Breakdown

This project was built following a comprehensive MERN stack tutorial. Below is a summary of the development process:

1. **Project Setup** (`00:09:31`): Initialized the project with React and Express, setting up folder structures and dependencies.
2. **Server Setup** (`00:17:55`): Configured Node.js and Express.js for the backend API.
3. **MongoDB Setup** (`00:30:51`): Connected the application to MongoDB for data storage.
4. **Models & Password Hashing** (`00:43:55`): Defined schemas for users, products, and categories, with secure password hashing using bcrypt.
5. **Register API** (`01:05:31`): Implemented user registration with JWT authentication.
6. **Middlewares** (`01:15:43`): Added middleware for authentication and authorization.
7. **React Setup** (`01:28:06`): Built the React frontend with a responsive navigation menu.
8. **SEO Optimization** (`02:05:04`): Improved SEO with meta tags and structured data.
9. **Login & Register UI** (`02:14:54`): Created user-friendly login and registration pages.
10. **Context API Setup** (`02:54:07`): Managed global state using React Context API.
11. **Public & Private Routes** (`03:12:54`): Secured routes for authenticated users.
12. **Forgot Password** (`03:34:58`): Implemented password recovery functionality.
13. **Admin & User Dashboards** (`03:55:31`): Built dashboards for users and admins.
14. **Category API** (`04:20:47`): Created APIs for managing product categories.
15. **Product API** (`04:51:42`): Developed APIs for product CRUD operations.
16. **React Category CRUD** (`05:31:11`): Integrated category management in the React frontend.
17. **Create Product** (`05:59:48`): Enabled product creation in the admin panel.
18. **Update & Delete Product** (`06:26:10`): Added functionality to update and delete products.
19. **Filter by Category & Price** (`06:54:29`): Implemented product filtering by category and price.
20. **Search & Single Product Page** (`07:43:45`): Built search functionality and detailed product pages.
21. **Additional Filters** (`08:18:29`): Added more filtering options for enhanced user experience.
22. **Cart Page** (`08:43:15`): Developed a cart system for managing selected products.
23. **User Profile** (`09:13:17`): Created a user profile page for account management.
24. **Payment Gateway** (`09:36:21`): Integrated Razorpay for secure payments.
25. **User Orders** (`10:20:10`): Enabled users to view their order history.
26. **Admin Orders** (`10:32:27`): Built an admin panel for managing all orders.
27. **Deployment** (`10:50:25`): Deployed the application on Render.

---

## 🌐 Deployment

The application is live on **Render** . Visit the deployed site here: [Timora E-commerce](https://timora.onrender.com/).

To deploy your own version:

1. Push your code to a GitHub repository.
2. Create a new web service on Render and connect it to your repository.
3. Configure environment variables in the Render dashboard.
4. Deploy the application and verify it is running.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a pull request.

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](https://grok.com/chat/LICENSE) file for details.

---

## 👩‍💻 Author

**Shaktipriya**

- GitHub: [shaktipriya](https://github.com/shaktipriya)
- Email: [shaktipriya@example.com](mailto:shaktipriya@example.com)

---

## 🙏 Acknowledgments

- Thanks to the MERN stack community for their amazing resources and documentation.
- Special thanks to **Razorpay** for providing a seamless payment gateway solution.
- Gratitude to **Render** for reliable deployment services.

---

**Timora** - Your one-stop shop for premium watches, built with love and powered by the MERN stack! 🕒
