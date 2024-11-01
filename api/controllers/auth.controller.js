import user from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { errorHandler } from "../utils/error.js";
import jwt from'jsonwebtoken';

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




export const signin = async(req, res, next) => {
   const{ email, password}=req.body;
   if (!email || !password || email === "" || password === "") {
    next(errorHandler(400,"All fields"))
    }

    try {
        const validUser=await user.findOne({email})
        if(!validUser) {
           return next(errorHandler(401,"user not found"))
        }
        const validPassword=bcrypt.compareSync(password,validUser.password)
        if(!validPassword) {
           return next(errorHandler(401,"Invalid password"))
        }

        const token=jwt.sign(
            {
                id:validUser._id,
               
            },process.env.JWT_SECRET,
        )

        const {password:pass,...rest}=validUser._doc;

        res.status(200).cookie('access_token',token,{
            httpOnly:true}).json(rest)
        
        
    } 
    
    catch (error) {
        next(error)
        
    }
};
