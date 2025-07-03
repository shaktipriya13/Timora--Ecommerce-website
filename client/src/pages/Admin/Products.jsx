import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// link tag ke through hum single product ke detail page par ja sakte hain
const Products = () => {
    const [products, setProducts] = useState([]);
    // You use this to store the list of all products, which comes from your API. Initially it's empty ([]), and then updated using setProducts(...) once data is fetched.

    //getall products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
            // backend me api alraeady we have defined which we are calling at here
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    // It runs code when the component mounts, updates, or unmounts.
    // Most commonly used to fetch data from the backend when the page loads.
    //lifecycle method: we need to call the getAllProducts function when the component mounts(ie. during the initial render).
    useEffect(() => {
        getAllProducts();//upar jo function banaya hai usko call karne ke liye
    }, []);
    return (
        <Layout>
            <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                    {/* adminMenu is a part of layout */}
                </div>
                <div className="col-md-9 ">
                    <h1 className="text-center">All Products List</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <Link
                                key={p._id}
                                to={`/dashboard/admin/product/${p.slug}`}
                                // slug ke according url is made of the product's page
                                className="product-link"
                            >
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        // The <img> tag automatically makes a GET request to the src URL. So no need to use axios here.
                                        // The src is the URL of the product image, which is fetched from the backend.
                                        // The URL is constructed using the product's ID (p._id) to fetch the specific product's image.
                                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;