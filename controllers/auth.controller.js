// ye ek api hai jo user ko register karne ke liye use hoti hai
import { hashPassword, comparePassword } from "../helpers/auth.helper.js";
import userModel from '../models/user.model.js'
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    // after making all validations we register the user
    // while registering we will hash the password

    try {
        const { name, email, password, phone, address, answer } = req.body;
        //validations
        // these valiations could alos be removed and kept only in the client side
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
        }
        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer,
        }).save();


        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
        });
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        // comparePassword() uses bcrypt.compare(plainText, hashedPassword) under the hood.
        // it hashes the input password again and compares it with the stored hash.
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token generation is done after user is verified
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

export const testController = (req, res) => {
    res.send('Protected route');
}


export const forgotPasswordController = async (req, res) => {
    // ye ek api ha jo hum frontend se call karte hain
    // jab user apna password bhool jata hai
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Email is required" });
        }
        if (!answer) {
            res.status(400).send({ message: "Answer is required" });
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" });
        }
        //check
        const user = await userModel.findOne({ email, answer });
        // if user is not found with the given email and answer, we will not update the password
        // if user is found, we will update the password
        // if user is found, we will hash the new password and update it in the database
        // if user is not found, we will return an error message    
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer",
            });
        }
        const hashed = await hashPassword(newPassword);//using middleware to hash the password
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};



export const updateProfileController = () => {

}
export const getOrdersController = () => {

}
export const getAllOrdersController = () => {

}
export const orderStatusController = () => {

}