// // import { useState, useEffect } from "react";
// // import { useAuth } from "../../context/auth";
// // import { Outlet } from "react-router-dom";
// // import axios from "axios";
// // import Spinner from "../Spinner";

// // export default function PrivateRoute() {
// //   const [ok, setOk] = useState(false);
// //   const [auth, setAuth] = useAuth();

// //   useEffect(() => {
// //     const authCheck = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:8080/api/v1/auth/user-auth");
// //         if (res.data.ok) {
// //           setOk(true);
// //         } else {
// //           setOk(false);
// //         }
// //       } catch (error) {
// //         console.error("Auth check failed:", error);
// //         setOk(false);
// //       }
// //     };
// //     if (auth?.token) authCheck();
// //   }, [auth?.token]);


// //   return ok ? <Outlet /> : <Spinner />;
// // }

// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/auth";
// import { Outlet } from "react-router-dom";
// import axios from "axios";
// import Spinner from "../Spinner";

// export default function PrivateRoute() {
//   const [ok, setOk] = useState(false);
//   const [auth] = useAuth();

//   useEffect(() => {
//     const authCheck = async () => {
//       try {
//         const res = await axios.get("http://localhost:8080/api/v1/auth/user-auth");
//         if (res.data.ok) {
//           setOk(true);
//         } else {
//           setOk(false);
//         }
//       } catch (error) {
//         console.error("Auth check failed:", error);
//         setOk(false);
//       }
//     };

//     if (auth?.token) {
//       authCheck();
//     }
//   }, [auth?.token]);

//   return auth?.token ? (ok ? <Outlet /> : <Spinner />) : <Spinner path="login" />;
// }


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
