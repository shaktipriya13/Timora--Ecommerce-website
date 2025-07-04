import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const Pagenotfound = () => {
    return (
        <Layout
            title={"404 - Page Not Found | Timora"}
            description={"Oops! The page you're looking for doesn’t exist. Go back to Timora’s homepage and continue shopping."}
            keywords={"404 error, page not found, broken link, Timora error, missing page"}
            author={"Shakti Priya"}
        >
            <div className="pnf">
                <h1 className="pnf-title">404</h1>
                <h2 className="pnf-heading">Oops ! Page Not Found</h2>
                <Link to="/" className="pnf-btn">
                    Go Back
                </Link>
            </div>
        </Layout>
    );
};

export default Pagenotfound;