// making application layout
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <main style={{ minHeight: "75vh" }}>
                {children}
            </main>
            {/* jo bhi page is wrapped with Layout.jsx usme Header and Footer ke bich children yani ki the page's componnt is shown */}
            <Footer />
        </div>
    );
}

export default Layout;
