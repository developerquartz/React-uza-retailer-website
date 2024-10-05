import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { APP_NAME } from "../../config/constants";
import { apiGetContactUsPage } from "../../store/page/actions";
import { logger } from "../../helpers/commonHelper";
import NoRecordFound from "../../Components/Common/NoRecordFound";

const Contact = () => {

  const dispatch = useDispatch();
  const { isLoading, message, contactUs } = useSelector(s => s.page);

  logger("CONTACT US PAGE ::: ", contactUs);

  useEffect(() => {
    if (!contactUs) {
      dispatch(apiGetContactUsPage());
    }
  }, [contactUs]);

  return (
    <section className="Contact_page">
      <Helmet>
        <title>{APP_NAME} | Contact us</title>
      </Helmet>
      <h1> Contact page </h1>

      {!!contactUs ? (
        <div dangerouslySetInnerHTML={{ __html: contactUs?.content }}></div>
      ) : isLoading ? null : <NoRecordFound />}
    </section>
  );
};

export default Contact;
