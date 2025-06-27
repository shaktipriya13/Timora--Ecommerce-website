import { hashPassword } from "../helpers/auth.helper";

export const registerController = async () => {
    // after making all validations we register the user
    // while registering we will hash the password

    try {
        const { name, email, password, phone, address, answer } = req.body;
        //validations
        // these valiations could alos be removed and kept only in the client side
        if (!name) {
            return res.send({ error: "Name is Required" });
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
            message: "Errro in Registeration",
            error,
        });
    }
}
export const loginController = () => {

}
export const testController = () => {

}
export const forgotPasswordController = () => {

}
export const updateProfileController = () => {

}
export const getOrdersController = () => {

}
export const getAllOrdersController = () => {

}
export const orderStatusController = () => {

}