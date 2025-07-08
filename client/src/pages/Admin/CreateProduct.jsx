import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("https://timora-backend-un9e.onrender.com/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //create product function
    // const handleCreate = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const productData = new FormData();
    //         productData.append("name", name);
    //         productData.append("description", description);
    //         productData.append("price", price);
    //         productData.append("quantity", quantity);
    //         productData.append("photo", photo);
    //         productData.append("category", category);
    //         const { data } = axios.post(
    //             "https://timora-backend-un9e.onrender.com/api/v1/product/create-product",
    //             productData
    //         );
    //         if (data?.success) {
    //             toast.error(data?.message);
    //         } else {
    //             toast.success("Product Created Successfully");
    //             navigate("/dashboard/admin/products");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("something went wrong");
    //     }
    // };
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);

            // ✅ Await axios call
            const { data } = await axios.post(
                "https://timora-backend-un9e.onrender.com/api/v1/product/create-product",
                productData
            );

            // ✅ Show success toast if creation succeeded
            if (data?.success) {
                setTimeout(() => {
                    toast.success("Product Created Successfully");
                }, 500);
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data?.message || "Something went wrong");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    // this value we get as a prop from antd
                                    setCategory(value);
                                }}
                            // when we use antDesign Select component, we need to use the value prop else for normal form components we use e target.value
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        // /* means we can upload any type of image */
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {/* div to preview the image, for previewing the image we can also use any other package */}
                                {photo && (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    // sabki value ko bind krna ha state variable se
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>
                                    CREATE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;