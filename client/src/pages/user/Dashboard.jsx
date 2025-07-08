import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
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
        <Layout title={"Dashboard - Ecommerce App"}>
            <div style={containerStyle} className="dashboard">
                <div style={rowStyle} className="row">
                    <div style={sidebarStyle} className="col-md-3">
                        <UserMenu />
                    </div>
                    <div style={contentStyle} className="col-md-9">
                        <div
                            style={cardStyle}
                            onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverCardStyle)}
                            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
                        >
                            <h3 style={headingStyle}>User Name: {auth?.user?.name}</h3>
                            <h3 style={subHeadingStyle}>User Email: {auth?.user?.email}</h3>
                            <h3 style={subHeadingStyle}>User Address: {auth?.user?.address}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
