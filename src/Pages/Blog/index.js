import React from "react";
import { Helmet } from "react-helmet";
import { APP_NAME } from "../../config/constants";

const Blog = () => {
  return (
    <section className="blog_page">
      <Helmet>
        <title>{APP_NAME} | Blog</title>
      </Helmet>
      <h1> Blog page </h1>
    </section>
  );
};

export default Blog;
