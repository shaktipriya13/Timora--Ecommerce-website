// ! here we will hold the values in the states and send them to the server. to send these values to the server we are using axios, through axios we can get ,post, update all the data prsnt in our backend.

import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setauth] = useAuth();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/login", {

                email,
                password,

            });
            if (res && res.data.success) {
                toast.success("Logged in Successfully");
                setTimeout(() => {
                    navigate("/");
                }, 1000); // delay navigation by 1.5 seconds
                setauth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                // json data is not supported in local storage, so first we need to store it in the string
                localStorage.setItem('auth', JSON.stringify(res.data));//jitna bhi data ha wo local storage me add ho jayega , by storing in local storage the data will not get lost after refreshing
            }

            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid credentials.");
        }
    };

    return (
        <Layout title="login - Ecommer App">
            <div className="form-container" style={{ minHeight: "90vh" }}>
                {/* <div className="form-container" style={{ minHeight: "90vh", height: "100vh", overflow: "hidden" }}> */}

                <form className="form-container" style={{ minHeight: "90vh" }}>
                    <h4 className="title">LOGIN FORM</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="email"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            // by mentioning value wo state se bind ho jayega
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="Password1"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        Login
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;