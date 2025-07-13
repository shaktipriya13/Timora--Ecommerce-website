// import productModel from "../models/product.model.js";
// import categoryModel from "../models/categroy.model.js";
// import orderModel from "../models/order.model.js";

// import fs from "fs";//we have imported fs module to read the file from the path
// // The fs module in Node.js stands for File System.
// // It allows you to work with files and directories on your computer.

// import slugify from "slugify";
// // import braintree from "braintree";
// // import dotenv from "dotenv";

// // dotenv.config();

// //payment gateway
// // var gateway = new braintree.BraintreeGateway({
// //     environment: braintree.Environment.Sandbox,
// //     merchantId: process.env.BRAINTREE_MERCHANT_ID,
// //     publicKey: process.env.BRAINTREE_PUBLIC_KEY,
// //     privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// // });

// // express - formidable middleware gives:
// // req.fields: all the text fields from the form(like name, description, etc.)
// // req.files: all file uploads(here, photo)

// export const createProductController = async (req, res) => {
//     try {
//         const { name, description, price, category, quantity, shipping } =
//             req.fields;
//         const { photo } = req.files;
//         //validation
//         switch (true) {
//             case !name:
//                 return res.status(500).send({ error: "Name is Required" });
//             case !description:
//                 return res.status(500).send({ error: "Description is Required" });
//             case !price:
//                 return res.status(500).send({ error: "Price is Required" });
//             case !category:
//                 return res.status(500).send({ error: "Category is Required" });
//             case !quantity:
//                 return res.status(500).send({ error: "Quantity is Required" });
//             case photo && photo.size > 1000000://here size is written in bytes, 1mb = 1000000 bytes
//                 return res
//                     .status(500)
//                     .send({ error: "photo is Required and should be less then 1mb" });
//         }

//         const products = new productModel({ ...req.fields, slug: slugify(name) });
//         // This line reads the uploaded photo file from your computer (or server's temp storage) and saves its raw data into your product.
//         // The photo is read as a binary file, which is suitable for storing images in a database.

//         if (photo) {
//             products.photo.data = fs.readFileSync(photo.path);
//             products.photo.contentType = photo.type;
//         }
//         await products.save();
//         res.status(201).send({
//             success: true,
//             message: "Product Created Successfully",
//             products,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             error,
//             message: "Error in creating product",
//         });
//     }
// };

// //get all products
// export const getProductController = async (req, res) => {
//     try {
//         const products = await productModel
//             .find({})
//             .populate("category")
//             .select("-photo")
//             .limit(12)
//             .sort({ createdAt: -1 });
//         // these are filters we have applied to get the products, we don't photo at the initial time, we can get it later as we don't want to send large data to the client at the initial time becasause it will take time to load the page
//         // we will make another api to get the photo and will merge it with the product api
//         res.status(200).send({
//             success: true,
//             counTotal: products.length,
//             message: "ALlProducts ",
//             products,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Erorr in getting products",
//             error: error.message,
//         });
//     }
// };
// // get single product
// export const getSingleProductController = async (req, res) => {
//     try {
//         const product = await productModel
//             .findOne({ slug: req.params.slug })
//             .select("-photo")
//             // here we are selecting all the fields except photo, as we will get it later
//             .populate("category");
//         // populate is used to get the category name from the category model, as we have stored only the id of the category in the product model, pura data show hoga populate se 
//         res.status(200).send({
//             success: true,
//             message: "Single Product Fetched",
//             product,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Eror while getitng single product",
//             error,
//         });
//     }
// };

// // get photo
// export const productPhotoController = async (req, res) => {
//     try {
//         const product = await productModel.findById(req.params.pid).select("photo");
//         if (product.photo.data) {
//             res.set("Content-type", product.photo.contentType);
//             return res.status(200).send(product.photo.data);
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Erorr while getting photo",
//             error,
//         });
//     }
// };

// //delete controller
// export const deleteProductController = async (req, res) => {
//     try {
//         await productModel.findByIdAndDelete(req.params.pid).select("-photo");
//         res.status(200).send({
//             success: true,
//             message: "Product Deleted successfully",
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error while deleting product",
//             error,
//         });
//     }
// };

// //upate producta
// export const updateProductController = async (req, res) => {
//     try {
//         const { name, description, price, category, quantity, shipping } =
//             req.fields;
//         const { photo } = req.files;
//         //alidation
//         switch (true) {
//             case !name:
//                 return res.status(500).send({ error: "Name is Required" });
//             case !description:
//                 return res.status(500).send({ error: "Description is Required" });
//             case !price:
//                 return res.status(500).send({ error: "Price is Required" });
//             case !category:
//                 return res.status(500).send({ error: "Category is Required" });
//             case !quantity:
//                 return res.status(500).send({ error: "Quantity is Required" });
//             case photo && photo.size > 1000000:
//                 return res
//                     .status(500)
//                     .send({ error: "photo is Required and should be less then 1mb" });
//         }

//         const products = await productModel.findByIdAndUpdate(
//             req.params.pid,
//             { ...req.fields, slug: slugify(name) },
//             { new: true }
//         );
//         if (photo) {
//             products.photo.data = fs.readFileSync(photo.path);
//             products.photo.contentType = photo.type;
//         }
//         await products.save();
//         res.status(201).send({
//             success: true,
//             message: "Product Updated Successfully",
//             products,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             error,
//             message: "Error in updating product details",
//         });
//     }
// };

// // filters
// export const productFiltersController = async (req, res) => {
//     try {
//         const { checked, radio } = req.body;
//         let args = {};
//         if (checked.length > 0) args.category = checked;
//         if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
//         // gte means greater than or equal to
//         // lte means less than or equal to
//         const products = await productModel.find(args);
//         res.status(200).send({
//             success: true,
//             products,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             message: "Error WHile Filtering Products",
//             error,
//         });
//     }
// };

// // product count
// export const productCountController = async (req, res) => {
//     try {
//         const total = await productModel.find({}).estimatedDocumentCount();
//         res.status(200).send({
//             success: true,
//             total,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             message: "Error in product count",
//             error,
//             success: false,
//         });
//     }
// };

// // product list base on page
// export const productListController = async (req, res) => {
//     try {
//         const perPage = 9; // number of products per page
//         const page = req.params.page ? req.params.page : 1;
//         const products = await productModel
//             // the below operations passed are called as queries
//             .find({})
//             .select("-photo") // exclude the photo field
//             .skip((page - 1) * perPage) // for pagination
//             .limit(perPage) // only get 12 items
//             .sort({
//                 createdAt: -1
//                 // The value - 1 means descending order(newest first).So latest products will come first.
//             }); // newest first
//         res.status(200).send({
//             success: true,
//             products,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             message: "error in per page ctrl",
//             error,
//         });
//     }
// };

// // search product
// export const searchProductController = async (req, res) => {
//     try {
//         const { keyword } = req.params;
//         const resutls = await productModel
//             .find({
//                 // MongoDB .find() query 
//                 // we are searching for products that match the keyword in either name or description
//                 // $or is used to specify multiple conditions, if any of the conditions match, the document will be included in the results
//                 $or: [
//                     // $options: "i" makes the search case-insensitive (i stands for "ignore case").
//                     { name: { $regex: keyword, $options: "i" } },
//                     { description: { $regex: keyword, $options: "i" } },
//                 ],
//             })
//             .select("-photo");
//         res.json(resutls);
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             message: "Error In Search Product API",
//             error,
//         });
//     }
// };

// // similar products
// export const realtedProductController = async (req, res) => {
//     try {
//         const { pid, cid } = req.params;
//         const products = await productModel
//             .find({
//                 category: cid,
//                 _id: { $ne: pid },
//                 // In MongoDB queries, $ne means: not equal to
//             })
//             .select("-photo")
//             .limit(3)
//             .populate("category");//we will be showing only 3 related products 
//         // populate is used to get the category name from the category model, as we have stored only the id of the category in the product model, pura data show hoga populate se
//         res.status(200).send({
//             success: true,
//             products,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             message: "error while geting related product",
//             error,
//         });
//     }
// };

// // get prdocyst by catgory
// export const productCategoryController = async (req, res) => {
//     try {
//         const category = await categoryModel.findOne({ slug: req.params.slug });
//         const products = await productModel.find({ category }).populate("category");
//         res.status(200).send({
//             success: true,
//             category,
//             products,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             error,
//             message: "Error While Getting products",
//         });
//     }
// };

// //payment gateway api
// //token
// // export const braintreeTokenController = async (req, res) => {
// //     try {
// //         gateway.clientToken.generate({}, function (err, response) {
// //             if (err) {
// //                 res.status(500).send(err);
// //             } else {
// //                 res.send(response);
// //             }
// //         });
// //     } catch (error) {
// //         console.log(error);
// //     }
// // };

// //payment
// // export const brainTreePaymentController = async (req, res) => {
// //     try {
// //         const { nonce, cart } = req.body;
// //         let total = 0;
// //         cart.map((i) => {
// //             total += i.price;
// //         });
// //         let newTransaction = gateway.transaction.sale(
// //             {
// //                 amount: total,
// //                 paymentMethodNonce: nonce,
// //                 options: {
// //                     submitForSettlement: true,
// //                 },
// //             },
// //             function (error, result) {
// //                 if (result) {
// //                     const order = new orderModel({
// //                         products: cart,
// //                         payment: result,
// //                         buyer: req.user._id,
// //                     }).save();
// //                     res.json({ ok: true });
// //                 } else {
// //                     res.status(500).send(error);
// //                 }
// //             }
// //         );
// //     } catch (error) {
// //         console.log(error);
// //     }
// // };

import productModel from "../models/product.model.js";
import categoryModel from "../models/categroy.model.js";
import orderModel from "../models/order.model.js";
import fs from "fs";
import slugify from "slugify";
// import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();
const slug = slugify(name, { lower: true, strict: true }); /
//payment gateway
// var gateway = new braintree.BraintreeGateway({
//     environment: braintree.Environment.Sandbox,
//     merchantId: process.env.BRAINTREE_MERCHANT_ID,
//     publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//     privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// });

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in crearing product",
        });
    }
};

//get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            counTotal: products.length,
            message: "ALlProducts ",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting products",
            error: error.message,
        });
    }
};
// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel

            .findOne({ slug: { $regex: `^${req.params.slug}$`, $options: 'i' } })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror while getitng single product",
            error,
        });
    }
};

// get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};

//delete controller
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};

//upate producta
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updte product",
        });
    }
};

// filters
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Filtering Products",
            error,
        });
    }
};

// product count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false,
        });
    }
};

// product list base on page
export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};

// search product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
};

// similar products
export const realtedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(3)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while geting related product",
            error,
        });
    }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error While Getting products",
        });
    }
};

//payment gateway api
//token
// export const braintreeTokenController = async (req, res) => {
//     try {
//         gateway.clientToken.generate({}, function (err, response) {
//             if (err) {
//                 res.status(500).send(err);
//             } else {
//                 res.send(response);
//             }
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };

//payment
// export const brainTreePaymentController = async (req, res) => {
//     try {
//         const { nonce, cart } = req.body;
//         let total = 0;
//         cart.map((i) => {
//             total += i.price;
//         });
//         let newTransaction = gateway.transaction.sale(
//             {
//                 amount: total,
//                 paymentMethodNonce: nonce,
//                 options: {
//                     submitForSettlement: true,
//                 },
//             },
//             function (error, result) {
//                 if (result) {
//                     const order = new orderModel({
//                         products: cart,
//                         payment: result,
//                         buyer: req.user._id,
//                     }).save();
//                     res.json({ ok: true });
//                 } else {
//                     res.status(500).send(error);
//                 }
//             }
//         );
//     } catch (error) {
//         console.log(error);
//     }
// };