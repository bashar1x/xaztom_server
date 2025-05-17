import mongoose, { connect } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
// Connect to MongoDB
export default function connectDB() {
    connect(process.env.MONGO_URL)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Could not connect to MongoDB:', err));
}

