import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { APP_NAME } from "../../config/constants";
import { apiGetAboutUsPage } from "../../store/page/actions";
import { logger } from "../../helpers/commonHelper";
import CMS from "../../Components/CMS";

const AboutUs = () => {

  const dispatch = useDispatch();
  const { aboutUs } = useSelector(s => s.page);

  useEffect(() => {
    if (!aboutUs) {
      dispatch(apiGetAboutUsPage());
    }
  }, [aboutUs]);

  return (
    <section className="about_us_page">
      <Helmet>
        <title>{APP_NAME} | About us</title>
      </Helmet>
      <CMS
        details={aboutUs}
      />
    </section>
  );
};

export default AboutUs;
