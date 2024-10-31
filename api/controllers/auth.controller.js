import user from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    // Validate the input fields
    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return res.status(400).json({ message: "Fields are required" });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt.hash here

        // Create a new user instance with the hashed password
        const newUser = new user({ username, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
