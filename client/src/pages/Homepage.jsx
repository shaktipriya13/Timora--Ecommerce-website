import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
// import { useAuth } from '../context/auth.jsx';

const Homepage = () => {
    // const [auth, setauth] = useAuth();
    return (
        <Layout
            title={"ShopMitra - Your Trusted Online Shopping Partner"}
            description={"Explore top-quality products at affordable prices on ShopMitra. Enjoy secure payments, fast delivery, and 24/7 customer support."}
            keywords={"ShopMitra, online shopping, ecommerce, best prices, secure checkout, fast delivery"}
            author={"Shakti Priya"}
        >
            <h1>
                Home page
            </h1>
            {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
        </Layout>
    );
}

export default Homepage;
