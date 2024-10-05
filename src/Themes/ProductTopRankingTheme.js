import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import TopRankingProducts from "../Pages/ProductsList/TopRankingProducts";

const ProductTopRankingTheme = () => {
  return (
    <>
      <Header />
      <TopRankingProducts />
      <Footer />
    </>
  );
};

export default ProductTopRankingTheme;
