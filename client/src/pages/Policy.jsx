import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
    return (
        <Layout
            title={"Privacy Policy - ShopMitra"}
            description={"Understand how ShopMitra protects your personal data. Read our privacy policy to learn more about your rights and data safety."}
            keywords={"ShopMitra privacy policy, data protection, ecommerce privacy, user rights, GDPR, cookies policy"}
            author={"Shakti Priya"}
        >
            <div className="row contactus">
                <div className="col-md-2">
                    <img
                        src="/images/privacy.png"
                        alt="Privacy Policy"
                        style={{ width: "80%" }}
                    />
                </div>
                <div className="col-md-8">
                    <h2 className="text-center mb-4">Privacy Policy</h2>
                    <p>
                        We are committed to safeguarding the privacy of our users. This
                        policy outlines how we collect, use, and protect your personal
                        information.
                    </p>
                    <p>
                        <strong>1. Information Collection:</strong> We collect necessary
                        information such as your name, email address, phone number, and
                        shipping details to provide a seamless shopping experience.
                    </p>
                    <p>
                        <strong>2. Use of Information:</strong> The collected data is used
                        solely for order processing, account management, and providing
                        customer support. We may also use your email to send promotional
                        updates.
                    </p>
                    <p>
                        <strong>3. Data Protection:</strong> We implement industry-standard
                        security measures, including encryption and secure servers, to
                        ensure the safety of your data.
                    </p>
                    <p>
                        <strong>4. Third-Party Sharing:</strong> We do not share or sell
                        your personal information to third parties. Data may be shared only
                        with trusted service providers strictly for business operations.
                    </p>
                    <p>
                        <strong>5. Cookie Policy:</strong> Our website uses cookies to
                        enhance user experience, monitor traffic, and personalize content.
                        You may choose to disable cookies via your browser settings.
                    </p>
                    <p>
                        <strong>6. User Rights:</strong> You have the right to access, edit,
                        or delete your personal data. To make a request, contact our
                        support team.
                    </p>
                    {/* <p>
                        <strong>7. Policy Updates:</strong> We reserve the right to modify
                        this privacy policy at any time. All updates will be reflected on
                        this page with an updated revision date.
                    </p> */}
                </div>
            </div>
        </Layout>
    );
};

export default Policy;
