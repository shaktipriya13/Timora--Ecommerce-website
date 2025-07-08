// // ! here we will hold the values in the states and send them to the server. to send these values to the server we are using axios, through axios we can get ,post, update all the data prsnt in our backend.

// import React, { useState } from "react";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import "../../styles/AuthStyles.css";
// import { useAuth } from "../../context/auth";


// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();
//     const [auth, setauth] = useAuth();
//     const location = useLocation();

//     // form function
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("https://timora-backend-un9e.onrender.com/api/v1/auth/login", {

//                 email,
//                 password,

//             });

//             if (res && res.data.success) {
//                 toast.success("Logged in Successfully");

//                 setauth({
//                     ...auth,
//                     user: res.data.user,
//                     token: res.data.token,
//                 });

//                 localStorage.setItem("auth", JSON.stringify(res.data));

//                 const role = res.data.user.role;
//                 const redirectPath =
//                     location.state?.from || (role === 1 ? "/dashboard/admin" : "/dashboard/user");

//                 setTimeout(() => {
//                     navigate(redirectPath);
//                 }, 1000);
//             }
//             // if (res && res.data.success) {
//             //     console.log("Login response:", res.data);
//             //     toast.success("Logged in Successfully");
//             //     setauth({
//             //         ...auth,
//             //         user: res.data.user,
//             //         token: res.data.token,
//             //     });
//             //     localStorage.setItem("auth", JSON.stringify(res.data));
//             //     const role = res.data.user.role;
//             //     const redirectPath =
//             //         location.state?.from || (role === 1 ? "/dashboard/admin" : "/dashboard/user");
//             //     navigate(redirectPath); // Remove setTimeout for testing
//             // }

//             else {
//                 toast.error(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error("Invalid credentials.");
//         }
//     };

//     return (
//         <Layout title="login - Ecommer App">
//             <div className="form-container" style={{ minHeight: "90vh" }}>
//                 {/* <div className="form-container" style={{ minHeight: "90vh", height: "100vh", overflow: "hidden" }}> */}

//                 <form className="form-container" style={{ minHeight: "90vh" }}>
//                     <h4 className="title">LOGIN FORM</h4>

//                     <div className="mb-3">
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="form-control"
//                             id="email"
//                             placeholder="Enter Your Email "
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <input
//                             type="password"
//                             value={password}
//                             // by mentioning value wo state se bind ho jayega
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="form-control"
//                             id="Password1"
//                             placeholder="Enter Your Password"
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <button type="submit" className="btn btn-primary" onClick={() => { navigate("/forgot-password") }}>
//                             Forgot Password
//                         </button>
//                     </div>

//                     <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
//                         Login
//                     </button>

//                 </form>
//             </div>
//         </Layout>
//     );
// };

// export default Login;



import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://timora-backend-un9e.onrender.com/api/v1/auth/login", {
                email,
                password,
            });

            if (res && res.data.success) {
                toast.success("Logged in Successfully");

                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });

                localStorage.setItem("auth", JSON.stringify(res.data));

                const role = res.data.user.role;
                const redirectPath =
                    location.state?.from || (role === 1 ? "/dashboard/admin" : "/dashboard/user");

                setTimeout(() => {
                    navigate(redirectPath);
                }, 1000);
            } else {
                toast.error(res.data.message || "Login failed");
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid credentials.");
        }
    };

    return (
        <Layout title="Login - Ecommerce App">
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN FORM</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
