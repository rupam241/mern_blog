import user from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Validate the input fields
    if (!username || !email || !password || username === "" || email === "" || password === "") {
    next(errorHandler(400,"All fields"))
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with the hashed password
        const newUser = new user({ username, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};
