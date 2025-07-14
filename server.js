import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from 'cors';


// routes imported
import authRoutes from './routes/auth.routes.js';
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://timora-shaktipriya.onrender.com"
    ],
    // Allow Vite React frontend
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