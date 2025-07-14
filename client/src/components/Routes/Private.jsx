import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Spinner from "../Spinner";
import { serverUrl } from "../../main";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        console.log("Token being sent:", auth?.token); // Add this
        const res = await axios.get(`${serverUrl}/api/v1/auth/user-auth`, {
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


