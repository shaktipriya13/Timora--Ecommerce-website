import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        console.log("Token being sent:", auth?.token); // Add this
        const res = await axios.get("http://localhost:8080/api/v1/auth/user-auth", {
          headers: {
            Authorization: `${auth?.token}`,
          },
        });
        console.log("User auth check response:", res.data); // Add this
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (err) {
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="dashboard" />;
}


// import { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import { useAuth } from "../../context/auth";
// import axios from "axios";
// import Spinner from "../Spinner";

// export default function PrivateRoute() {
//   const [ok, setOk] = useState(false);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const [auth] = useAuth();

//   useEffect(() => {
//     const authCheck = async () => {
//       if (!auth?.token) {
//         setLoading(false);
//         setOk(false);
//         return;
//       }
//       try {
//         console.log("Token being sent:", auth?.token);
//         const res = await axios.get("http://localhost:8080/api/v1/auth/user-auth", {
//           headers: {
//             Authorization: `Bearer ${auth?.token}`, // Ensure "Bearer" prefix
//           },
//         });
//         console.log("User auth check response:", res.data);
//         if (res.data.ok) {
//           setOk(true);
//         } else {
//           setOk(false);
//         }
//       } catch (err) {
//         console.log("Auth check error:", err.response?.data || err.message);
//         setOk(false);
//       } finally {
//         setLoading(false); // Set loading to false after the request
//       }
//     };

//     authCheck();
//   }, [auth?.token]);

//   if (loading) return <Spinner path="dashboard" />; // Show spinner while loading
//   return ok ? <Outlet /> : <Spinner path="dashboard" />;
// }