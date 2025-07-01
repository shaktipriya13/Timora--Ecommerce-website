// ! here we will hold the values in the states and send them to the server. to send these values to the server we are using axios, through axios we can get ,post, update all the data prsnt in our backend.

// import React, { useState } from "react";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../../styles/AuthStyles.css";
// import { toast } from 'react-toastify';


// const Register = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [phone, setPhone] = useState("");
//     const [address, setAddress] = useState("");
//     const [answer, setAnswer] = useState("");
//     const navigate = useNavigate();

//     // form function
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // prevent krne se page will not get refreshed and apni Single page application bni rhegi
//         try {
//             console.log("Request URL:", "/api/v1/auth/register");
//             const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
//                 name,
//                 email,
//                 password,
//                 phone,
//                 address,
//                 answer,
//             });
//             if (res && res.data.success) {
//                 toast.success("user register successfully");
//                 navigate("/login");
//             } else {
//                 toast.error(res.data.message);
//             }
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
//             console.log("Error:", errorMessage);
//             toast.error(errorMessage);
//         }
//     };

//     return (
//         <Layout title="Register - Ecommer App">
//             <div className="form-container" style={{ minHeight: "90vh" }}>
//                 <form >
//                     <h4 className="title">REGISTER FORM</h4>
//                     <div className="mb-3">
//                         <input
//                             type="text"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             className="form-control"
//                             id="name"
//                             placeholder="Enter Your Name"
//                             required
//                             autoFocus
//                         />
//                     </div>
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
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="form-control"
//                             id="Password1"
//                             placeholder="Enter Your Password"
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <input
//                             type="text"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                             className="form-control"
//                             id="phone"
//                             placeholder="Enter Your Phone"
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <input
//                             type="text"
//                             value={address}
//                             onChange={(e) => setAddress(e.target.value)}
//                             className="form-control"
//                             id="address"
//                             placeholder="Enter Your Address"
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <input
//                             type="text"
//                             value={answer}
//                             onChange={(e) => setAnswer(e.target.value)}
//                             className="form-control"
//                             id="fav"
//                             placeholder="What is Your Favorite sports"
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
//                         REGISTER
//                     </button>
//                 </form>
//             </div>
//         </Layout>
//     );
// };

// export default Register;

import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/AuthStyles.css";


const Register = () => {
    const [name, setName] = useState("");//first is getter fxn and second is setter fxn
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
                name,
                email,
                password,
                phone,
                address,
                answer,
            });
            if (res && res.data.success) {
                toast.success("Registered Successfully");
                setTimeout(() => {
                    navigate("/login");
                }, 1500); // delay navigation by 1.5 seconds
            }

            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title="Register - Ecommer App">
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form>
                    <h4 className="title">REGISTER FORM</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="name"
                            placeholder="Enter Your Name"
                            required
                            autoFocus
                        />
                    </div>
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
                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="phone"
                            placeholder="Enter Your Phone"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="address"
                            placeholder="Enter Your Address"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="ans"
                            placeholder="What is Your Favorite sports"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        REGISTER
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;