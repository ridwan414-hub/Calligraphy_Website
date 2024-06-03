import React from "react";
import Layout from "../components/Layouts/Layout";

const Policy = () => {
    return (
        <Layout title={'Privacy Policy'}>
            <div className="flex flex-row contactus ">
                <div className="w-1/2">
                    <img
                        src="/images/contactus.jpeg"
                        alt="contactus"
                        className="w-full"
                    />
                </div>
                <div className="w-1/3">
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                </div>
            </div>
        </Layout>
    );
};

export default Policy;
