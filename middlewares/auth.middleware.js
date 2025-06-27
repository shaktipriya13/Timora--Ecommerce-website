// this middleware will first chk whether the token matches or not before going to a particular protected route in which it is used

import JWT from "jsonwebtoken";
import userModel from "../models/user.model.js";

//Protected Routes token base
// Middleware must either call next() or send a response.
// If it does neither, the request hangs.
export const requireSignIn = async (req, res, next) => {
    try {
        // JWT.verify(token, secret) compares the signature part of the token with a newly generated one using the same secret.
        const decode = JWT.verify(
            // verify is inbuilt fxn in jwt, token is prsnt in headers
            // Headers are key-value pairs sent with every HTTP response (and request). They carry extra info about the request/response — like format, cookies, authorization, etc.
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        // decode stores _id and role
        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Your are Unauthorized user. Invalid token.",
        });
    }

};

//admin acceess
// this middleware is to protect the admin routes
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access to Admin panel",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};