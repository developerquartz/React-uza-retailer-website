import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fixedNumber, logger } from "../../helpers/commonHelper";
import ROUTES from "../../helpers/routesHelper";
import { removeOrderDetails } from "../../store/order/slice";

// images
import Congratsimg from "../../assets/images/congrats.png";

const Congrats = () => {
  const dispatch = useDispatch();
  const { placedOrderDetails } = useSelector((s) => s.order);

  const calculateTotalAmount = (placedOrderDetails) => {
    if (!!placedOrderDetails) {
      logger(placedOrderDetails);
      return placedOrderDetails?.reduce((total, order) => total + order.orderTotal, 0);
    } else {
      window.location.href = ROUTES.PRODUCT_LISTING;
    }
  };

  useEffect(() => {
    return () => {
      dispatch(removeOrderDetails());
    };
  }, []);

  return (
    <section className="congrats_page">
      <Helmet>
        <title>Congratulation!</title>
      </Helmet>
      <Container>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div className="congrats_img">
              <img src={Congratsimg} alt="" className="img-fluid" />
            </div>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <center>
              <div className="consgratulation_Content">
                <h4>Congratulations! Your transaction was successful.</h4>

                <p>Payment successfully verified. Thank you for shopping.</p>

                <hr />

                <h3>Payment Method</h3>
                <h3>
                  <strong>COD(Cash on Delivery)</strong>
                </h3>
                <h3>
                  Total amount : ${fixedNumber(calculateTotalAmount(placedOrderDetails))}
                </h3>
                {placedOrderDetails?.map((order, key) => {
                  return <p key={key} className="fs-6 m-0 p-0">
                    Order ID : {order.customOrderId}
                  </p>
                })}

                <Link to={ROUTES.HOME}>Go to Home</Link>
              </div>
            </center>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Congrats;
