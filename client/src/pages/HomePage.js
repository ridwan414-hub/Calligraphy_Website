import React from "react";
import Banner from "../components/Banner";
import HomepageProductsFilteringSection from "../components/page-components/home-page/Homepage-ProductsFiltering -Section";
import Layout from "../components/Layouts/Layout";

const HomePage = () => {
    return (
        <Layout title={'ALl Products - Best offers '}>
            <Banner />
            <HomepageProductsFilteringSection />
            
        </Layout>
    )
};

export default HomePage;