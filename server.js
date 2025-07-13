// import express from "express";
// import colors from "colors";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
// import authRoutes from './routes/auth.routes.js'
// import cors from 'cors'

// // configure env
// dotenv.config();

// // configure db
// connectDB();

// // creating a rest object
// const app = express();

// //middlewares
// // app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:5173', // Replace with your frontend URL (e.g., React port)
//     methods: ['GET', 'POST', 'OPTIONS'],
//     credentials: true
// }));
// app.use(express.json());//means req and res me we can also send json data
// // , whenever you get a request with JSON data in the body, automatically parse it and make it available in req.body if someonse sends a post request
// app.use(morgan('dev'));

// // routes
// app.use('/api/v1/auth', authRoutes);// means For every request starting with /api/v1/auth, use whatever routes are defined in authRoutes file


// // creating rest apis
// app.get('/', (req, res) => {
//     res.send(
//         "<h1> Welcome to ecommer app</h1>"
//     )
// })




// const PORT = process.env.PORT || 8080;//process comes by default wiht node
// // process ek built-in object hai Node.js me, jo aapko system ke sath interact karne deta hai.


// // to run app we listen it
// app.listen(PORT, () => {
//     console.log(`Server running on Port ${PORT} on ${process.env.DEV_MODE} mode`.bgMagenta.white);
// })


import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', "https://timora-shaktipriya.onrender.com"], // Allow Vite React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));


// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes); // Category routes
app.use('/api/v1/product', productRoutes); // Category routes

app.get('/', (req, res) => {
    res.send("<h1>Welcome to ecommer app</h1>");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT} on ${process.env.DEV_MODE} mode`.bgMagenta.white);
});