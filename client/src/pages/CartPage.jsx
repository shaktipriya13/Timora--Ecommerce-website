// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// import { AiFillWarning } from "react-icons/ai";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "../styles/CartStyles.css";

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
//             return total.toLocaleString("en-IN", {
//                 style: "currency",
//                 currency: "INR",
//             }).replace("₹", "₹ ");

//         } catch (error) {
//             console.log(error);
//         }
//     };
//     //detele item
//     // Function to remove an item from the cart by product ID (pid)
//     const removeCartItem = (pid) => {
//         try {
//             // Step 1: Create a copy of the current cart state
//             let myCart = [...cart]; // We use spread syntax to avoid directly mutating the original state

//             // Step 2: Find the index of the item in the cart whose _id matches the given pid
//             let index = myCart.findIndex((item) => item._id === pid);

//             // Step 3: Remove that item from the cart array using splice
//             // splice(startIndex, numberOfItemsToRemove)
//             myCart.splice(index, 1);

//             // Step 4: Update the cart state with the new cart (after removal)
//             setCart(myCart);

//             // Step 5: Also update the cart in localStorage so that the change persists across page reloads
//             localStorage.setItem("cart", JSON.stringify(myCart));
//             setTimeout(() => {
//                 toast.success("Item removed from Cart successfully.")
//             }, 100);
//         } catch (error) {
//             // Step 6: If any error occurs, log it in the console for debugging
//             console.log(error);
//         }
//     };


//     //get payment gateway token
//     const getToken = async () => {
//         try {
//             const { data } = await axios.get("https://timora-backend-un9e.onrender.com/api/v1/product/braintree/token");
//             setClientToken(data?.clientToken);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     useEffect(() => {
//         getToken();
//     }, [auth?.token]);

//     //handle payments
//     const handlePayment = async () => {
//         try {
//             setLoading(true);
//             const { nonce } = await instance.requestPaymentMethod();
//             const { data } = await axios.post("/api/v1/product/braintree/payment", {
//                 nonce,
//                 cart,
//             });
//             setLoading(false);
//             localStorage.removeItem("cart");
//             setCart([]);
//             navigate("/dashboard/user/orders");
//             toast.success("Payment Completed Successfully ");
//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//         }
//     };
//     return (

//         <Layout>
//             <div className="cart-page py-4">
//                 <div className="container">
//                     <div className="row mb-4">
//                         <div className="col-md-12 text-center">
//                             <h2 className="mb-2">
//                                 {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
//                             </h2>
//                             <p className="text-muted">
//                                 {cart?.length
//                                     ? `You have ${cart.length} item(s) in your cart ${auth?.token ? "" : " — Please login to checkout!"
//                                     }`
//                                     : "Your cart is empty."}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="row">
//                         {/* Left: Cart Items */}
//                         <div className="col-md-7">
//                             {cart?.map((p) => (
//                                 <div className="card mb-3 shadow-sm" key={p._id}>
//                                     <div className="row g-0 align-items-center">
//                                         <div className="col-md-4">
//                                             <img
//                                                 src={`https://timora-backend-un9e.onrender.com/api/v1/product/product-photo/${p._id}`}
//                                                 className="img-fluid rounded-start"
//                                                 alt={p.name}
//                                                 style={{ height: "130px", objectFit: "cover" }}
//                                             />
//                                         </div>
//                                         <div className="col-md-5">
//                                             <div className="card-body">
//                                                 <h6 className="card-title mb-1">{p.name}</h6>
//                                                 <p className="card-text text-muted small mb-1">
//                                                     {p.description.substring(0, 50)}...
//                                                 </p>
//                                                 <p className="card-text fw-bold">₹ {p.price}</p>
//                                             </div>
//                                         </div>
//                                         <div className="col-md-3 text-end pe-3">
//                                             <button
//                                                 className="btn btn-outline-danger btn-sm"
//                                                 onClick={() => removeCartItem(p._id)}
//                                             >
//                                                 Remove
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Right: Summary */}
//                         <div className="col-md-5 text-center">
//                             <div className="card shadow sticky-summary">
//                                 <div className="card-body">
//                                     <h4 className="card-title mb-3">Cart Summary</h4>
//                                     <p className="card-text mb-2 text-muted">Total | Checkout | Payment</p>
//                                     <hr />
//                                     <h5>Total: {totalPrice()}</h5>

//                                     {auth?.user?.address ? (
//                                         <div className="my-3 shipping-box">
//                                             <h6>Shipping Address</h6>
//                                             <p>{auth?.user?.address}</p>
//                                             {/* this auth is coming from the authContext */}
//                                             <button
//                                                 className="btn btn-sm btn-outline-primary"
//                                                 onClick={() => navigate("/dashboard/user/profile")}
//                                             >
//                                                 Update Address
//                                             </button>
//                                         </div>

//                                     ) : (
//                                         <div className="my-3">
//                                             {auth?.token ? (
//                                                 <button
//                                                     className="btn btn-outline-primary"
//                                                     onClick={() => navigate("/dashboard/user/profile")}
//                                                 >
//                                                     Add Shipping Address
//                                                 </button>
//                                             ) : (
//                                                 <button
//                                                     className="btn btn-warning"
//                                                     onClick={() => navigate("/login", { state: "/cart" })}
//                                                 >
//                                                     Please Login to Checkout
//                                                 </button>
//                                             )}
//                                         </div>
//                                     )}

//                                     <div className="mt-3">
//                                         {!clientToken || !auth?.token || !cart?.length ? (
//                                             ""
//                                         ) : (
//                                             <>
//                                                 <DropIn
//                                                     options={{
//                                                         authorization: clientToken,
//                                                         paypal: {
//                                                             flow: "vault",
//                                                         },
//                                                     }}
//                                                     onInstance={(instance) => setInstance(instance)}
//                                                 />

//                                                 <button
//                                                     className="btn btn-success w-100"
//                                                     onClick={handlePayment}
//                                                     disabled={loading || !instance || !auth?.user?.address}
//                                                 >
//                                                     {loading ? "Processing..." : "Make Payment"}
//                                                 </button>
//                                             </>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>

//     );
// };

// export default CartPage;


// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// import { AiFillWarning } from "react-icons/ai";
// import axios from "axios";
// import toast from "react-hot-toast";
// import "../styles/CartStyles.css";



import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/CartStyles.css";
const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
        }
    };
    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/braintree/token");
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getToken();
    }, [auth?.token]);

    //handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("/api/v1/product/braintree/payment", {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <Layout>
            <div className=" cart-page">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {!auth?.user
                                ? "Hello Guest"
                                : `Hello  ${auth?.token && auth?.user?.name}`}
                            <p className="text-center">
                                {cart?.length
                                    ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                                    }`
                                    : " Your Cart Is Empty"}
                            </p>
                        </h1>
                    </div>
                </div>
                <div className="container ">
                    <div className="row ">
                        <div className="col-md-7  p-0 m-0">
                            {cart?.map((p) => (
                                <div className="row card flex-row" key={p._id}>
                                    <div className="col-md-4">
                                        <img
                                            src={`/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            width="100%"
                                            height={"130px"}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price : {p.price}</p>
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
                        <div className="col-md-5 cart-summary ">
                            <h2>Cart Summary</h2>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                            <h4>Total : {totalPrice()} </h4>
                            {auth?.user?.address ? (
                                <>
                                    <div className="mb-3">
                                        <h4>Current Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Update Address
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3">
                                    {auth?.token ? (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Update Address
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() =>
                                                navigate("/login", {
                                                    state: "/cart",
                                                })
                                            }
                                        >
                                            Plase Login to checkout
                                        </button>
                                    )}
                                </div>
                            )}
                            <div className="mt-2">
                                {!clientToken || !auth?.token || !cart?.length ? (
                                    ""
                                ) : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault",
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />

                                        <button
                                            className="btn btn-primary"
                                            onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}
                                        >
                                            {loading ? "Processing ...." : "Make Payment"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;