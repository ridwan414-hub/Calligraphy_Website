import React, { useState } from "react";
import Banner from "../components/Banner";
import HomepageProductsFilteringSection from "../components/page-components/home-page/Homepage-ProductsFiltering -Section";
import Layout from "../components/Layouts/Layout";
import LandingPage from "./LandingPage";

const HomePage = () => {
    const [boolean, setBoolean] = useState(true)
    return (
        boolean ? (<LandingPage setBoolean={setBoolean} />) :
            (<Layout title={'ALl Products - Best offers '}>
                <Banner />
                <HomepageProductsFilteringSection />
            </Layout >)
    )
};

export default HomePage;