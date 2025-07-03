import express from "express";
import { loginController, registerController, testController } from '../controllers/auth.controller.js';
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";

//router object
//separte file me if router is created then we need a router
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);


router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
    // here we wrote the controller directly as it was of just 1 line
    // agar response ok:true rha then only we will be able to access the private route
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
    // here we wrote the controller directly as it was of just 1 line
    // agar response ok:true rha then only we will be able to access the private route
});

export default router;