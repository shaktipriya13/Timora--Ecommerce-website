import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout
      title={"Contact us - ShopMitra"}
      description={"Need help or have questions? Contact ShopMitra’s customer support for assistance, inquiries, or feedback."}
      keywords={"ShopMitra contact, customer support, help center, contact ecommerce, support email, call support"}
      author={"Shakti Priya"}
    >
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            For any inquiries or information regarding our products, feel free
            to reach out to us. Our support team is available 24/7 to assist you.
          </p>
          <p className="mt-3">
            <BiMailSend /> : support@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91-123-456-7890
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-000-0000 (Toll-Free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
