import user from '../models/user.model.js';  // Correct import
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';

const updatePassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!password || !email) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Check if user exists
        const foundUser = await user.findOne({ email });
        if (!foundUser) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(password, 10);
        foundUser.password = hashedPassword;
        await foundUser.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully."
        });

    } catch (error) {
        next(error);
    }
};

const deleteAccount = async (req, res, next) => {
    const { email } = req.body;

    try {
        if (!email) {
            return next(errorHandler(400, "Email not provided"));
        }

        const userToDelete = await user.findOne({ email });
        if (!userToDelete) {
            return next(errorHandler(404, "User not found"));
        }

        // Delete the user
        await userToDelete.deleteOne();
        
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};

export { updatePassword, deleteAccount };
