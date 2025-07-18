// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// // import DropIn from "braintree-web-drop-in-react";
// // import { AiFillWarning } from "react-icons/ai";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "../styles/CartStyles.css";
// import { serverUrl } from "../main";
// const CartPage = () => {
//     const [auth, setAuth] = useAuth();
//     const [cart, setCart] = useCart();
//     const [clientToken, setClientToken] = useState("");
//     const [instance, setInstance] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     //total price
//     const totalPrice = () => {
//         try {
//             let total = 0;
//             cart?.map((item) => {
//                 total = total + item.price;
//             });
//             return total.toLocaleString("en-US", {
//                 style: "currency",
//                 currency: "USD",
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     //detele item
//     const removeCartItem = (pid) => {
//         try {
//             let myCart = [...cart];
//             let index = myCart.findIndex((item) => item._id === pid);
//             myCart.splice(index, 1);
//             setCart(myCart);
//             localStorage.setItem("cart", JSON.stringify(myCart));
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     //get payment gateway token
//     const getToken = async () => {
//         try {
//             const { data } = await axios.get(`${serverUrl}/api/v1/product/braintree/token`);
//             setClientToken(data?.clientToken);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     useEffect(() => {
//         getToken();
//     }, [auth?.token]);

//     //handle payments
//     // const handlePayment = async () => {
//     //     try {
//     //         setLoading(true);
//     //         const { nonce } = await instance.requestPaymentMethod();
//     //         const { data } = await axios.post(`${serverUrl}/api/v1/product/braintree/payment`, {
//     //             nonce,
//     //             cart,
//     //         });
//     //         setLoading(false);
//     //         localStorage.removeItem("cart");
//     //         setCart([]);
//     //         navigate("/dashboard/user/orders");
//     //         toast.success("Payment Completed Successfully ");
//     //     } catch (error) {
//     //         console.log(error);
//     //         setLoading(false);
//     //     }
//     // };

//     const handleRazorpayPayment = async () => {
//     try {
//         const { data: order } = await axios.post(`${serverUrl}/api/v1/payment/create-order`, {
//             amount: totalPriceNumber, // total amount as number (not formatted string)
//         });

//         const options = {
//             key: "YOUR_RAZORPAY_KEY_ID", // from Razorpay dashboard
//             amount: order.amount,
//             currency: order.currency,
//             name: "Timora",
//             description: "Order Payment",
//             order_id: order.id,
//             handler: function (response) {
//                 // success callback
//                 console.log(response);
//                 toast.success("Payment Successful!");
//                 // Clear cart logic here
//             },
//             prefill: {
//                 name: auth?.user?.name,
//                 email: auth?.user?.email,
//                 contact: "9999999999",
//             },
//             notes: {
//                 address: auth?.user?.address || "No address",
//             },
//             theme: {
//                 color: "#3399cc",
//             },
//         };

//         const razor = new window.Razorpay(options);
//         razor.open();
//     } catch (err) {
//         console.log(err);
//         toast.error("Something went wrong");
//     }
// };

//     return (
//         <Layout>
//             <div className=" cart-page">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <h1 className="text-center bg-light p-2 mb-1">
//                             {!auth?.user
//                                 ? "Hello Guest"
//                                 : `Hello  ${auth?.token && auth?.user?.name}`}
//                             <p className="text-center">
//                                 {cart?.length
//                                     ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
//                                     }`
//                                     : " Your Cart Is Empty"}
//                             </p>
//                         </h1>
//                     </div>
//                 </div>
//                 <div className="container ">
//                     <div className="row ">
//                         <div className="col-md-7  p-0 m-0">
//                             {cart?.map((p) => (
//                                 <div className="row card flex-row" key={p._id}>
//                                     <div className="col-md-4">
//                                         <img
//                                             // src={`/api/v1/product/product-photo/${p._id}`}
//                                             src={`${serverUrl}/api/v1/product/product-photo/${p._id}`}
//                                             className="card-img-top"
//                                             alt={p.name}
//                                             width="100%"
//                                             height={"130px"}
//                                         />
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p>{p.name}</p>
//                                         <p>{p.description.substring(0, 30)}</p>
//                                         <p>Price : {p.price}</p>
//                                     </div>
//                                     <div className="col-md-4 cart-remove-btn">
//                                         <button
//                                             className="btn btn-danger"
//                                             onClick={() => removeCartItem(p._id)}
//                                         >
//                                             Remove
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="col-md-5 cart-summary ">
//                             <h2>Cart Summary</h2>
//                             <p>Total | Checkout | Payment</p>
//                             <hr />
//                             <h4>Total : {totalPrice()} </h4>
//                             {auth?.user?.address ? (
//                                 <>
//                                     <div className="mb-3">
//                                         <h4>Current Address</h4>
//                                         <h5>{auth?.user?.address}</h5>
//                                         <button
//                                             className="btn btn-outline-warning"
//                                             onClick={() => navigate("/dashboard/user/profile")}
//                                         >
//                                             Update Address
//                                         </button>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <div className="mb-3">
//                                     {auth?.token ? (
//                                         <button
//                                             className="btn btn-outline-warning"
//                                             onClick={() => navigate("/dashboard/user/profile")}
//                                         >
//                                             Update Address
//                                         </button>
//                                     ) : (
//                                         <button
//                                             className="btn btn-outline-warning"
//                                             onClick={() =>
//                                                 navigate("/login", {
//                                                     state: "/cart",
//                                                 })
//                                             }
//                                         >
//                                             Plase Login to checkout
//                                         </button>
//                                     )}
//                                 </div>
//                             )}
//                             <div className="mt-2">
//                                 {!clientToken || !auth?.token || !cart?.length ? (
//                                     ""
//                                 ) : (
//                                     <>
//                                         <DropIn
//                                             options={{
//                                                 authorization: clientToken,
//                                                 paypal: {
//                                                     flow: "vault",
//                                                 },
//                                             }}
//                                             onInstance={(instance) => setInstance(instance)}
//                                         />

//                                         {/* <button
//                                             className="btn btn-primary"
//                                             // onClick={handlePayment}
//                                             disabled={loading || !instance || !auth?.user?.address}
//                                         >
//                                             {loading ? "Processing ...." : "Make Payment"}
//                                         </button> */}
//                                         {/* <button
//                                             className="btn btn-primary"
//                                             onClick={() =>
//                                                 navigate("/payment", {
//                                                 state: { total: totalPrice() },
//                                                 })
//                                             }
//                                             disabled={loading || !auth?.user?.address}
//                                             >
//                                             Make Payment
//                                         </button> */}

//                                         {auth?.token && cart?.length > 0 && (
//                                                 <button
//                                                     className="btn btn-primary"
//                                                     onClick={() =>
//                                                         navigate("/payment", {
//                                                             state: { total: totalPrice() },
//                                                         })
//                                                     }
//                                                     disabled={loading || !auth?.user?.address}
//                                                 >
//                                                     Make Payment
//                                                 </button>
//                                             )}


//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default CartPage;


import React from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import "../styles/CartStyles.css";

const CartPage = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // Total price (formatted)
    const totalPrice = () => {
        let total = cart.reduce((sum, item) => sum + item.price, 0);
        return total.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
        });
    };

    // Total price (number, unformatted)
    const totalPriceNumber = () => {
        return cart.reduce((sum, item) => sum + item.price, 0);
    };

    // Remove item from cart
    const removeCartItem = (pid) => {
        const updatedCart = cart.filter(item => item._id !== pid);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <Layout>
            <div className="cart-page">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {auth?.user ? `Hello ${auth.user.name}` : "Hello Guest"}
                        </h1>
                        <p className="text-center">
                            {cart.length > 0
                                ? `You have ${cart.length} items in your cart`
                                : "Your cart is empty"}
                        </p>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            {cart.map(p => (
                                <div className="row card flex-row mb-2" key={p._id}>
                                    <div className="col-md-4">
                                        <img
                                            src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            height="130px"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price: ${p.price}</p>
                                    </div>
                                    <div className="col-md-4 cart-remove-btn">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeCartItem(p._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-md-5 cart-summary">
                            <h2>Cart Summary</h2>
                            <hr />
                            <h4>Total: {totalPrice()}</h4>
                            <div className="mb-3">
                                {auth?.user?.address ? (
                                    <>
                                        <h4>Address</h4>
                                        <h5>{auth.user.address}</h5>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Update Address
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                            navigate("/login", { state: "/cart" })
                                        }
                                    >
                                        Please login to checkout
                                    </button>
                                )}
                            </div>

                            {auth?.token && cart.length > 0 && auth?.user?.address && (
                                // <button
                                //     className="btn btn-primary"
                                //     onClick={() =>
                                //         navigate("/payment", {
                                //             // state: { total: totalPrice() },
                                //             state: { total: totalPriceNumber() }, // Use numeric value
                                //         })
                                //     }
                                // >
                                <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            navigate("/payment", {
                                                state: { total: totalPriceNumber() }, // Use numeric value
                                            })
                                        }
                                    >
                                    Make Payment
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
