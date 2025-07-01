import React from 'react';
import Layout from '../../components/Layout/Layout';

// dashboared is  the private route which needs to be protected
function Dashboard() {
    return (
        <Layout title={'Dashboard - ShopMitra'}>
            <div>
                <h1>Dashboard page</h1>
            </div>
        </Layout>
    );
}

export default Dashboard;
