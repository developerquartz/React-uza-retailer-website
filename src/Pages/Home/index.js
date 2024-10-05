import React from "react";

import { APP_NAME } from "../../config/constants";

import Homebanner from "./Homebanner";
import Yelowcard from "./Yelowcard";
import Discover from "./Discover";
import Streamline from "./Streamline";
import { Helmet } from "react-helmet";

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>{APP_NAME} | Home</title>
      </Helmet>
      <Homebanner />
      <Yelowcard />
      <Discover />
      <Streamline />
    </>
  );
};

export default Homepage;
