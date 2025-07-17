// import React, { useState } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // const PaymentForm = ({ defaultAmount }) => {
// //     const [amount, setAmount] = useState(defaultAmount || "");

// //     const loadRazorpayScript = () => {
// //         return new Promise((resolve) => {
// //             const script = document.createElement("script");
// //             script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //             script.onload = () => resolve(true);
// //             script.onerror = () => resolve(false);
// //             document.body.appendChild(script);
// //         });
// //     };

// //     // const handlePayment = async () => {
// //     //     const res = await loadRazorpayScript();
// //     //     if (!res) {
// //     //         alert("Razorpay SDK Failed to load");
// //     //         return;
// //     //     }

// //     //     const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/payment/order`, {
// //     //         amount: Number(amount),
// //     //     });

// //     //     const options = {
// //     //         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// //     //         amount: data.order.amount,
// //     //         currency: "INR",
// //     //         name: "Test Payment",
// //     //         description: "Test Transaction",
// //     //         order_id: data.order.id,
// //     //         handler: async function (response) {
// //     //             const verify = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/payment/verify`, {
// //     //                 razorpay_order_id: response.razorpay_order_id,
// //     //                 razorpay_payment_id: response.razorpay_payment_id,
// //     //                 razorpay_signature: response.razorpay_signature,
// //     //             });

// //     //             if (verify.data.success) {
// //     //                 alert("✅ Payment Verified Successfully");
// //     //             } else {
// //     //                 alert("❌ Payment Verification Failed");
// //     //             }
// //     //         },
// //     //         theme: {
// //     //             color: "#3399cc",
// //     //         },
// //     //     };

// //     //     const rzp = new window.Razorpay(options);
// //     //     rzp.open();
// //     // };

// //     const handlePayment = async () => {
// //     if (!window.Razorpay) {
// //         alert("Razorpay SDK Failed to load");
// //         return;
// //     }
// //     if (!amount || isNaN(amount) || amount <= 0) {
// //         alert("Invalid amount");
// //         return;
// //     }

// //     try {
// //         const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/payment/order`, {
// //             amount: Number(amount),
// //         });

// //         const options = {
// //             key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// //             amount: data.order.amount,
// //             currency: "INR",
// //             name: "Test Payment",
// //             description: "Test Transaction",
// //             order_id: data.order.id,
// //             handler: async function (response) {
// //                 const verify = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/payment/verify`, {
// //                     razorpay_order_id: response.razorpay_order_id,
// //                     razorpay_payment_id: response.razorpay_payment_id,
// //                     razorpay_signature: response.razorpay_signature,
// //                 });

// //                 if (verify.data.success) {
// //                     alert("✅ Payment Verified Successfully");
// //                 } else {
// //                     alert("❌ Payment Verification Failed");
// //                 }
// //             },
// //             theme: {
// //                 color: "#3399cc",
// //             },
// //         };

// //         const rzp = new window.Razorpay(options);
// //         rzp.open();
// //     } catch (error) {
// //         console.error("Payment error:", error);
// //         alert("Failed to initiate payment");
// //     }
// // };
// //     return (
// //         <div>
// //             <input
// //                 type="number"
// //                 value={amount}
// //                 readOnly
// //                 style={{ padding: "8px", width: "200px" }}
// //             />
// //             <br />
// //             <button onClick={handlePayment} style={{ marginTop: "20px" }}>
// //                 Pay Now
// //             </button>
// //         </div>
// //     );
// // };

// const PaymentForm = ({ defaultAmount }) => {
//     const [amount, setAmount] = useState(defaultAmount || "");

//     const handlePayment = async () => {
//         if (!window.Razorpay) {
//             alert("Razorpay SDK Failed to load");
//             return;
//         }
//         if (!amount || isNaN(amount) || amount <= 0) {
//             alert("Invalid amount");
//             return;
//         }

//         try {
//             const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/payment/order`, {
//                 amount: Number(amount),
//             });

//             const options = {
//                 key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//                 amount: data.order.amount,
//                 currency: "INR",
//                 name: "Test Payment",
//                 description: "Test Transaction",
//                 order_id: data.order.id,
//                 handler: async function (response) {
//                     const verify = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/payment/verify`, {
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature,
//                     });

//                     if (verify.data.success) {
//                         alert("✅ Payment Verified Successfully");
//                     } else {
//                         alert("❌ Payment Verification Failed");
//                     }
//                 },
//                 theme: {
//                     color: "#3399cc",
//                 },
//             };

//             const rzp = new window.Razorpay(options);
//             rzp.open();
//         } catch (error) {
//             console.error("Payment error:", error);
//             alert("Failed to initiate payment");
//         }
//     };

// const PaymentPage = () => {
//     const location = useLocation();
//     const { total } = location.state || { total: 0 };

//     // Remove currency formatting ($, commas, etc.) for numeric value
//     const numericTotal = total?.replace(/[^0-9.]/g, "");

// //     return (
// //         // <Layout>
// //         //     <div className="container mt-4">
// //         //         <h2>Payment Page</h2>
// //         //         <p>Total Amount: <strong>{total}</strong></p>
// //         //         <PaymentForm defaultAmount={numericTotal} />
// //         //     </div>
    
// //     // </Layout>
       
// //         <Layout>
// //             <div className="container mt-4">
// //                 <h2>Payment Page</h2>
// //                 <p>Total Amount: <strong>{total?.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</strong></p>
// //                 <PaymentForm defaultAmount={total} />
// //             </div>
// //         </Layout>

// // );
//     return (
//         <div>
//             <input
//                 type="number"
//                 value={amount}
//                 readOnly
//                 style={{ padding: "8px", width: "200px", border: amount && !isNaN(amount) ? "1px solid #ccc" : "1px solid red" }}
//             />
//             <br />
//             <button onClick={handlePayment} style={{ marginTop: "20px" }}>
//                 Pay Now
//             </button>
//         </div>
//     );
// };
// };

// export default PaymentPage;


import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// PaymentForm Component
const PaymentForm = ({ defaultAmount }) => {
    const [amount, setAmount] = useState(defaultAmount || "");

    const handlePayment = async () => {
        if (!window.Razorpay) {
            alert("Razorpay SDK Failed to load");
            return;
        }
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Invalid amount");
            return;
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/payment/order`, {
                amount: Number(amount),
            });
            console.log("API Response:", data);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: "INR",
                name: "Test Payment",
                description: "Test Transaction",
                order_id: data.order.id,
                handler: async function (response) {
                    const verify = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/payment/verify`, {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    });

                    if (verify.data.success) {
                        alert("✅ Payment Verified Successfully");
                    } else {
                        alert("❌ Payment Verification Failed");
                    }
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Failed to initiate payment");
        }
    };

    return (
        <div>
            <input
                type="number"
                value={amount}
                readOnly
                style={{ padding: "8px", width: "200px", border: amount && !isNaN(amount) ? "1px solid #ccc" : "1px solid red" }}
            />
            <br />
            <button onClick={handlePayment} style={{ marginTop: "20px" }}>
                Pay Now
            </button>
        </div>
    );
};

// PaymentPage Component
const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { total } = location.state || { total: 0 };

    useEffect(() => {
        if (!total && total !== 0) {
            navigate("/cart");
        }
    }, [total, navigate]);

    if (!total && total !== 0) return null; // Prevent rendering until redirect

    return (
        <Layout>
            <div className="container mt-4">
                <h2>Payment Page</h2>
                <p>Total Amount: <strong>{total.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</strong></p>
                <PaymentForm defaultAmount={total} />
            </div>
        </Layout>
    );
};

export default PaymentPage;