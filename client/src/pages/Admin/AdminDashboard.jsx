// import React from "react";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "./../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";
// // useAuth ko import krke we find user ki details like name, email, phone etc. from the context and display them in the admin dashboard
// const AdminDashboard = () => {
//     const [auth] = useAuth();//custom hook useAuth se auth ko destructure kr liya
//     return (
//         <Layout>
//             <div className="container-fluid m-3 p-3 dashboard">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <AdminMenu />
//                     </div>
//                     <div className="col-md-9">
//                         <div className="card w-75 p-3">
//                             <h3> Admin Name : {auth?.user?.name}</h3>
//                             {/* this is called optional chaining */}
//                             <h3> Admin Email : {auth?.user?.email}</h3>
//                             <h3> Admin Contact : {auth?.user?.phone}</h3>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default AdminDashboard;

import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
    const [auth] = useAuth();

    // Inline styles
    const containerStyle = {
        margin: "1.5rem",
        padding: "1.5rem",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
    };

    const rowStyle = {
        display: "flex",
        flexDirection: "column",
        margin: "0",
        padding: "0",
    };

    const sidebarStyle = {
        width: "100%",
        marginBottom: "1.5rem",
    };

    const contentStyle = {
        width: "100%",
    };

    const cardStyle = {
        width: "100%",
        maxWidth: "32rem",
        margin: "0 auto",
        padding: "1.5rem",
        backgroundColor: "#ffffff",
        borderRadius: "0.75rem",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        border: "1px solid #e5e7eb",
        transition: "box-shadow 0.3s ease-in-out",
    };

    const hoverCardStyle = {
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    };

    const headingStyle = {
        fontSize: "1.5rem",
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: "1rem",
    };

    const subHeadingStyle = {
        fontSize: "1.25rem",
        fontWeight: "500",
        color: "#374151",
        marginBottom: "1rem",
    };

    return (
        <Layout>
            <div style={containerStyle} className="dashboard">
                <div style={rowStyle} className="row">
                    <div style={sidebarStyle} className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div style={contentStyle} className="col-md-9">
                        <div
                            style={cardStyle}
                            onMouseEnter={(e) => Object.assign(e.target.style, hoverCardStyle)}
                            onMouseLeave={(e) => Object.assign(e.target.style, cardStyle)}
                        >
                            <h3 style={headingStyle}>
                                Admin Name: {auth?.user?.name}
                            </h3>
                            <h3 style={subHeadingStyle}>
                                Admin Email: {auth?.user?.email}
                            </h3>
                            <h3 style={subHeadingStyle}>
                                Admin Contact: {auth?.user?.phone}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;