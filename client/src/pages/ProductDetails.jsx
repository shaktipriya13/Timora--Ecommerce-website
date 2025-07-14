import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import "../styles/WatchStyle.css"
import { serverUrl } from './../main';
// In React Router, anything after a colon (:) in a route path is a parameter.
// A URL parameter (or "route param") is a variable part of the route path that is defined in the Route.

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
        // if we get slug in params, then only we call getProduct function
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `${serverUrl}/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `${serverUrl}/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout>

            <div className="watch-product-details container">
                <div className="watch-details-card">
                    <div className="watch-image">
                        <img
                            src={`${serverUrl}/api/v1/product/product-photo/${product._id}`}
                            alt={product.name}
                        />
                    </div>
                    <div className="watch-info">
                        <h1>Product Details</h1>
                        <hr />
                        <h2>{product.name}</h2>
                        <p className="description">{product.description}</p>
                        <p className="price">
                            {product?.price?.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",//this tells the browser to set up rupee symbol
                            })}
                        </p>
                        <p className="category">Category: {product?.category?.name}</p>
                        <button className="add-to-cart">ADD TO CART</button>
                    </div>

                </div>
            </div>

            <hr />
            <div className="similar-products-section container">
                <h2 className="similar-heading">Similar Products ✨ </h2>
                {relatedProducts.length < 1 ? (
                    <p className="text-center no-products">No Similar Products found</p>
                ) : (
                    <div className="similar-products-grid">
                        {relatedProducts?.map((p) => (
                            <div className="watch-card" key={p._id}>
                                <div className="watch-card-img">
                                    <img
                                        src={`${serverUrl}/api/v1/product/product-photo/${p._id}`}
                                        alt={p.name}
                                    />
                                </div>
                                <div className="watch-card-body">
                                    <h3 className="watch-name">{p.name}</h3>
                                    <p className="watch-price">
                                        {p.price.toLocaleString("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                        })}
                                    </p>
                                    <p className="watch-desc">{p.description.substring(0, 60)}...</p>
                                    {/* <button
                                        className="watch-more-btn"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button> */}
                                    {/* added page reload fxnaltiy in below */}
                                    <button
                                        className="watch-more-btn"
                                        onClick={() => (
                                            () => navigate(`/product/${p.slug}`))}
                                    >
                                        More Details
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </Layout>
    );
};

export default ProductDetails;