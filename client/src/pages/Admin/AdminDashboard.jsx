import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
// useAuth ko import krke we find user ki details like name, email, phone etc. from the context and display them in the admin dashboard
const AdminDashboard = () => {
    const [auth] = useAuth();//custom hook useAuth se auth ko destructure kr liya
    return (
        <Layout>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h3> Admin Name : {auth?.user?.name}</h3>
                            {/* this is called optional chaining */}
                            <h3> Admin Email : {auth?.user?.email}</h3>
                            <h3> Admin Contact : {auth?.user?.phone}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;