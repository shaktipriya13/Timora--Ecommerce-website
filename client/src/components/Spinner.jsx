// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// const Spinner = ({ path = "login" }) => {
//     // initial value login ki rkhi ha ,agar koi path is not mentioened to login par by default redirect kr dega
//     // agar path mention kiya to us par redirect kr dega
//     const [count, setCount] = useState(3);
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCount((prevValue) => --prevValue);
//         }, 1000);
//         count === 0 &&
//             navigate(`/${path}`, {
//                 state: location.pathname,
//             });
//         return () => clearInterval(interval);
//     }, [count, navigate, location, path]);
//     return (
//         <>
//             <div
//                 className="d-flex flex-column justify-content-center align-items-center"
//                 style={{ height: "100vh" }}
//             >
//                 <h1 className="Text-center">Hello User !    Redirecting to Login page in {count} second </h1>
//                 <div className="spinner-border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Spinner;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);

        if (count === 0) {
            navigate(`/${path}`, {
                state: location.pathname,
            });
        }

        return () => clearInterval(interval);
    }, [count, navigate, location, path]);

    return (
        <>
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <h1 className="Text-center">
                    Redirecting to {path} in {count} second
                </h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    );
};

export default Spinner;