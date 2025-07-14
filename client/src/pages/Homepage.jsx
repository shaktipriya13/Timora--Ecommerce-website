// sare products are not shown at initial time kuki isse humare api par jayada load parega ,so we use pagination
// sare products ko load karne ke liye hum useEffect ka use karte hai
// pagination can be done both on client side and server side, here we are doing it on server side
// here we are going to call api for pagination and so it will give us faster response
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";
// import { useCart } from "../context/cart.jsx";
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import { useCart } from "../context/cart.jsx";
// import "../styles/Homepage.css";
import "../styles/Homepage2.css";
import { toast } from "react-toastify";
import { serverUrl } from "../main.jsx";

const HomePage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]); // selected categories
    const [radio, setRadio] = useState([]); // selected price range
    const [total, setTotal] = useState(0); // total product count
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${serverUrl}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Get total products count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${serverUrl}/api/v1/product/product-count`);
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    // Get all products for page 1
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${serverUrl}/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    // Load more products on scroll
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${serverUrl}/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Filter products by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    // Get filtered products
    const filterProduct = async () => {
        try {
            // following is an api call
            const { data } = await axios.post(`${serverUrl}/api/v1/product/product-filters`, {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    // Load categories and product count initially
    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);

    // Load products only if no filters are applied
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
        // }, [checked.length, radio.length]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked, radio]);

    // Load filtered products
    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked, radio]);

    // Load more products when page is incremented
    useEffect(() => {
        if (page === 1) return;
        loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (

        <Layout
            title={"Timora - Your Trusted Online Watch Store"}
            description={
                "Discover premium watches at Timora. Shop luxury, sport, and smartwatches with fast delivery, secure checkout, and 24/7 support."
            }
            keywords={"watches, luxury watches, Timora, smartwatches, online shopping"}
            author={"Shakti Priya"}
        >

            <div
                style={{
                    width: '100%',
                    height: 'auto',         // No fixed height
                    overflow: 'visible',    // Allow image to show fully
                }}
            >
                <img
                    src="/images/abc.png"
                    alt="Watch Store Banner"
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'contain'   // or remove this line
                    }}
                />
            </div>



            <div className="container-fluid row mt-3 home-page">
                {/* Filter Sidebar */}
                <div className="col-md-2 filters">
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>

                    <h4 className="text-center mt-4">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>

                    <div className="d-flex flex-column mt-3">
                        <button className="btn btn-danger" onClick={() => window.location.reload()}>
                            RESET FILTERS
                        </button>
                    </div>
                </div>


                {/* space */}
                <div className="col-md-1 filters"></div>


                {/* Product Grid */}
                <div className="col-md-9">
                    <h1 className="text-center mb-4">All Watches</h1>
                    <div className="d-flex flex-wrap justify-content-start gap-4">
                        {products?.map((p) => (
                            <div className="watch-card" key={p._id}>
                                <img
                                    src={`${serverUrl}/api/v1/product/product-photo/${p._id}`}
                                    alt={p.name}
                                    className="watch-img"
                                />
                                <div className="watch-card-body">
                                    <h5 className="watch-title">{p.name}</h5>
                                    <p className="watch-description">{p.description.substring(0, 60)}...</p>
                                    <div className="watch-bottom">
                                        <span className="watch-price">₹ {p.price.toLocaleString("en-IN")}</span>
                                        <div className="d-flex">
                                            {/* <button
                                                className="btn btn-outline-dark watch-more-btn"
                                                onClick={() => (window.location.href = `/product/${p.slug}`)}
                                            >
                                                More Details
                                            </button> */}
                                            <button
                                                className="btn btn-outline-dark watch-more-btn"
                                                onClick={() => navigate(`/product/${p.slug}`)}
                                            // navigate() is for client-side routing only — not backend API requests. so we don't need full url in navigate
                                            >
                                                More Details
                                            </button>
                                            <button
                                                className="btn btn-dark watch-more-btn"
                                                onClick={() => {
                                                    setCart([...cart, p]);
                                                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                                                    toast.success("Item Added to cart");
                                                }}
                                            >
                                                ADD TO CART
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="m-2 p-3 text-center">
                        {products && products.length < total && (
                            <button
                                className="btn loadmore"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : <> Load More <AiOutlineReload /> </>}
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </Layout>

    );
};

export default HomePage;
