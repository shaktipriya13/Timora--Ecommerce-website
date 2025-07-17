// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// // PaymentForm Component
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
//             const { data } = await axios.post(`${import.meta.env.VITE_API}/api/v1/payment/order`, {
//                 amount: Number(amount),
//             });
//             console.log("API Response:", data);

//             const options = {
//                 key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//                 amount: data.order.amount,
//                 currency: "INR",
//                 name: "Test Payment",
//                 description: "Test Transaction",
//                 order_id: data.order.id,
//                 handler: async function (response) {
//                     const verify = await axios.post(`${import.meta.env.VITE_API}/api/v1/payment/verify`, {
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

// // PaymentPage Component
// const PaymentPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { total } = location.state || { total: 0 };

//     useEffect(() => {
//         if (!total && total !== 0) {
//             navigate("/cart");
//         }
//     }, [total, navigate]);

//     if (!total && total !== 0) return null; // Prevent rendering until redirect

//     return (
//         <Layout>
//             <div className="container mt-4">
//                 <h2>Payment Page</h2>
//                 <p>Total Amount: <strong>{total.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</strong></p>
//                 <PaymentForm defaultAmount={total} />
//             </div>
//         </Layout>
//     );
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
            const { data } = await axios.post(`${import.meta.env.VITE_API}/api/v1/payment/order`, {
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
                    const verify = await axios.post(`${import.meta.env.VITE_API}/api/v1/payment/verify`, {
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
        <div style={{ marginTop: "20px", textAlign: "center" }}>
            <input
                type="number"
                value={amount}
                readOnly
                style={{
                    padding: "10px 15px",
                    width: "250px",
                    fontSize: "16px",
                    borderRadius: "6px",
                    border: amount && !isNaN(amount) ? "1px solid #ccc" : "1px solid red",
                }}
            />
            <br />
            <button
                onClick={handlePayment}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                }}
            >
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

    if (!total && total !== 0) return null;

    return (
        <Layout>
            <div
                className="payment-container"
                style={{
                    minHeight: "70vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        background: "#f9f9f9",
                        padding: "40px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        maxWidth: "500px",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    <h2 style={{ marginBottom: "10px", color: "#333" }}>Payment Page</h2>
                    <p style={{ fontSize: "18px", color: "#555" }}>
                        Total Amount:{" "}
                        <strong style={{ color: "#000" }}>
                            {total.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                            })}
                        </strong>
                    </p>
                    <PaymentForm defaultAmount={total} />
                </div>
            </div>
        </Layout>
    );
};

export default PaymentPage;
