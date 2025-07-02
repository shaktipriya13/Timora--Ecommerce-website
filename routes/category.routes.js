import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/auth.middleware.js";
import {
    categoryControlller, createCategoryController, deleteCategoryCOntroller, singleCategoryController, updateCategoryController,
} from "../controllers/category.controller.js";

const router = express.Router();

//routes
// create category
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

//update category
router.put(
    "/update-category/:id",
    // while writing the url don't write : colon before id, only write id number
    // for example, if you want to update category with id 123, then write /update-category/123
    requireSignIn,
    isAdmin,
    updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);//agar user nhi login hua hai then bhi he can access this route

//single category
router.get("/single-category/:slug", singleCategoryController);//on base of slug we will get the category

//delete category
router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryCOntroller
);

export default router;