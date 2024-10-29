import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Ensure that you are using process.env.MONGODB_URI
mongoose.connect(process.env.MONGODB_URI, )
    .then(() => {
        console.log("Connected to MongoDB!");

        // Start the server only after a successful connection
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.error("Connection error:", error);
    });
