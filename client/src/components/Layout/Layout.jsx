// making application layout
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "75vh" }}>
                <ToastContainer position="top-center" autoClose={3000} />{children}
            </main>
            {/* jo bhi page is wrapped with Layout.jsx usme Header and Footer ke bich children yani ki the page's componnt is shown */}
            <Footer />
        </div>
    );
}

Layout.defaultProps = {
    title: "ShopMitra app - shop now",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Shakti Priya",
};
export default Layout;
