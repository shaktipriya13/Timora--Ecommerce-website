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
            const { data } = await axios.get("https://timora-backend-un9e.onrender.com/api/v1/category/get-category");
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
            const { data } = await axios.get("https://timora-backend-un9e.onrender.com/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    // Get all products for page 1
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`https://timora-backend-un9e.onrender.com/api/v1/product/product-list/${page}`);
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
            const { data } = await axios.get(`https://timora-backend-un9e.onrender.com/api/v1/product/product-list/${page}`);
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
            const { data } = await axios.post("https://timora-backend-un9e.onrender.com/api/v1/product/product-filters", {
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
    }, [checked.length, radio.length]);

    // Load filtered products
    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    // Load more products when page is incremented
    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    return (
        // <Layout
        //     title={"Timora - Your Trusted Online Shopping Partner"}
        //     description={
        //         "Explore top-quality products at affordable prices on Timora. Enjoy secure payments, fast delivery, and 24/7 customer support."
        //     }
        //     keywords={"Timora, online shopping, ecommerce, best prices, secure checkout, fast delivery"}
        //     author={"Shakti Priya"}
        // >
        //     {/* Banner Image */}
        //     <img
        //         src="/images/banner.png"
        //         className="banner-img"
        //         alt="bannerimage"
        //         width={"100%"}
        //     />

        //     <div className="container-fluid row mt-3 home-page">
        //         {/* Left Filter Sidebar */}
        //         <div className="col-md-3 filters">
        //             <h4 className="text-center">Filter By Category</h4>
        //             <div className="d-flex flex-column">
        //                 {categories?.map((c) => (
        //                     <Checkbox
        //                         key={c._id}
        //                         onChange={(e) => handleFilter(e.target.checked, c._id)}
        //                     >
        //                         {c.name}
        //                     </Checkbox>
        //                 ))}
        //             </div>

        //             <h4 className="text-center mt-4">Filter By Price</h4>
        //             <div className="d-flex flex-column">
        //                 <Radio.Group onChange={(e) => setRadio(e.target.value)}>
        //                     {Prices?.map((p) => (
        //                         <div key={p._id}>
        //                             <Radio value={p.array}>{p.name}</Radio>
        //                         </div>
        //                     ))}
        //                 </Radio.Group>
        //             </div>

        //             <div className="d-flex flex-column mt-3">
        //                 <button
        //                     className="btn btn-danger"
        //                     onClick={() => window.location.reload()}
        //                 >
        //                     RESET FILTERS
        //                 </button>
        //             </div>
        //         </div>

        //         {/* Right Product Grid */}
        //         <div className="col-md-9">
        //             <h1 className="text-center">All Products</h1>
        //             <div className="d-flex flex-wrap">
        //                 {products?.map((p) => (
        //                     <div className="card m-2" key={p._id} style={{ width: "18rem" }}>
        //                         <img
        //                             src={`https://timora-backend-un9e.onrender.com/api/v1/product/product-photo/${p._id}`}
        //                             className="card-img-top"
        //                             alt={p.name}
        //                         />
        //                         <div className="card-body">
        //                             <div className="card-name-price">
        //                                 <h5 className="card-title">{p.name}</h5>
        //                                 <h6 className="card-title card-price">
        //                                     ₹ {p.price.toLocaleString("en-IN")}
        //                                 </h6>
        //                             </div>
        //                             <p className="card-text">
        //                                 {p.description.substring(0, 60)}...
        //                             </p>
        //                             <div className="card-name-price">
        //                                 <button
        //                                     className="btn btn-info ms-1"
        //                                     onClick={() => navigate(`/product/${p.slug}`)}
        //                                 >
        //                                     More Details
        //                                 </button>
        //                                 {/* <button
        //                                     className="btn btn-dark ms-1"
        //                                     onClick={() => {
        //                                         setCart([...cart, p]);
        //                                         localStorage.setItem("cart", JSON.stringify([...cart, p]));
        //                                         toast.success("Item Added to cart");
        //                                     }}
        //                                 >
        //                                     ADD TO CART
        //                                 </button> */}
        //                             </div>
        //                         </div>
        //                     </div>
        //                 ))}
        //             </div>

        //             {/* Load More Button */}
        //             <div className="m-2 p-3">
        //                 {products && products.length < total && (
        //                     <button
        //                         className="btn loadmore"
        //                         onClick={(e) => {
        //                             e.preventDefault();
        //                             setPage(page + 1);
        //                         }}
        //                     >
        //                         {loading ? "Loading ..." : <> Load More <AiOutlineReload /> </>}
        //                     </button>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </Layout>

        <Layout
            title={"Timora - Your Trusted Online Watch Store"}
            description={
                "Discover premium watches at Timora. Shop luxury, sport, and smartwatches with fast delivery, secure checkout, and 24/7 support."
            }
            keywords={"watches, luxury watches, Timora, smartwatches, online shopping"}
            author={"Shakti Priya"}
        >
            {/* Banner Image */}
            {/* <img
                src="/images/bn1.png"
                className="banner-img"
                alt="Watch Store Banner"
                width="100%"
                height="800px" // or any desired value
            /> */}
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
                                    src={`https://timora-backend-un9e.onrender.com/api/v1/product/product-photo/${p._id}`}
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
// import React, { useState } from "react";
// import { Checkbox, Radio } from "antd";
// import { Prices } from "../components/Prices";
// import { useCart } from "../context/cart";
// import { toast } from "react-toastify";
// import { AiOutlineReload } from "react-icons/ai";
// import Layout from "../components/Layout/Layout";

// const HomePage = ({
//     categories,
//     products,
//     total,
//     page,
//     setPage,
//     setRadio,
//     handleFilter,
//     loading,
// }) => {
//     const [cart, setCart] = useCart();

//     return (
//         <Layout
//             title={"Timora - Your Trusted Online Watch Store"}
//             description={
//                 "Discover premium watches at Timora. Shop luxury, sport, and smartwatches with fast delivery, secure checkout, and 24/7 support."
//             }
//             keywords={"watches, luxury watches, Timora, smartwatches, online shopping"}
//             author={"Shakti Priya"}
//         >
//             {/* Banner Image */}
//             <img
//                 src="/images/b2.png"
//                 className="banner-img"
//                 alt="Watch Store Banner"
//                 width="100%"
//                 height="800px"
//             />

//             <div className="container-fluid row mt-3 home-page">
//                 {/* Filter Sidebar */}
//                 <div className="col-md-3 filters">
//                     <h4 className="text-center">Filter By Category</h4>
//                     <div className="d-flex flex-column">
//                         {categories?.map((c) => (
//                             <Checkbox
//                                 key={c._id}
//                                 onChange={(e) => handleFilter(e.target.checked, c._id)}
//                             >
//                                 {c.name}
//                             </Checkbox>
//                         ))}
//                     </div>

//                     <h4 className="text-center mt-4">Filter By Price</h4>
//                     <div className="d-flex flex-column">
//                         <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//                             {Prices?.map((p) => (
//                                 <div key={p._id}>
//                                     <Radio value={p.array}>{p.name}</Radio>
//                                 </div>
//                             ))}
//                         </Radio.Group>
//                     </div>

//                     <div className="d-flex flex-column mt-3">
//                         <button
//                             className="btn btn-danger"
//                             onClick={() => window.location.reload()}
//                         >
//                             RESET FILTERS
//                         </button>
//                     </div>
//                 </div>

//                 {/* Product Grid */}
//                 <div className="col-md-9">
//                     <h1 className="text-center mb-4">All Watches</h1>
//                     <div className="d-flex flex-wrap justify-content-center">
//                         {products?.map((p) => (
//                             <div className="watch-card m-3" key={p._id}>
//                                 <img
//                                     src={`https://timora-backend-un9e.onrender.com/api/v1/product/product-photo/${p._id}`}
//                                     alt={p.name}
//                                     className="watch-img"
//                                 />
//                                 <div className="watch-card-body">
//                                     <h5 className="watch-title">{p.name}</h5>
//                                     <p className="watch-description">
//                                         {p.description.substring(0, 60)}...
//                                     </p>
//                                     <div className="watch-bottom d-flex justify-content-between align-items-center mt-2">
//                                         <span className="watch-price">
//                                             ₹ {p.price.toLocaleString("en-IN")}
//                                         </span>
//                                         <div className="d-flex gap-2">
//                                             <button
//                                                 className="watch-more-btn btn btn-outline-primary btn-sm"
//                                                 onClick={() =>
//                                                     (window.location.href = `/product/${p.slug}`)
//                                                 }
//                                             >
//                                                 More Details
//                                             </button>
//                                             <button
//                                                 className="watch-cart-btn btn btn-dark btn-sm"
//                                                 onClick={() => {
//                                                     setCart([...cart, p]);
//                                                     localStorage.setItem(
//                                                         "cart",
//                                                         JSON.stringify([...cart, p])
//                                                     );
//                                                     toast.success("Item added to cart");
//                                                 }}
//                                             >
//                                                 Add to Cart
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Load More */}
//                     <div className="m-2 p-3 text-center">
//                         {products && products.length < total && (
//                             <button
//                                 className="btn loadmore"
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     setPage(page + 1);
//                                 }}
//                             >
//                                 {loading ? "Loading ..." : <> Load More <AiOutlineReload /> </>}
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default HomePage;
