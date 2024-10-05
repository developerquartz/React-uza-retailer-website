import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import TopRankingProducts from "../../Components/Home/TopRankingProducts";
import SavingSpotLight from "../../Components/Home/SavingSpotLight";
import NewArrivalProducts from "../../Components/Home/NewArrivalProducts";


const Discover = () => {

  return (
    <section className="discover_section py-3 text-start">
      <Container>
        <h3 className="common_head my-3 pb-2">
          Discover your next business opportunity
        </h3>

        <div className="discover_inner">
          <Row>
            <Col lg={4} md={6} sm={12}>
              <TopRankingProducts />
            </Col>

            <Col lg={4} md={6} sm={12}>
              <NewArrivalProducts />
            </Col>


            <Col lg={4} md={6} sm={12}>
              <SavingSpotLight />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Discover;
