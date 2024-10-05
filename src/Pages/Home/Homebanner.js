import React from "react";
import { Container } from "react-bootstrap";
import { Button, Form, FormGroup, Input } from "reactstrap";
import ROUTES from "../../helpers/routesHelper";

const Homebanner = () => {
  return (
    <section className="home_banner position-relative">
      <div className="banner_overlay"></div>
      <Container>
        <div className="inner_bnaner_content text-start">
          <h1>Learn uzabulk.com</h1>
          <p>The leading B2B ecommerce platform for global trade</p>

          <Form action={ROUTES.PRODUCT_LISTING}>
            <FormGroup className="position-relative">
              <Input type="search" name="search" id="searchid" placeholder="" />
              <Button className="banner_search">Search</Button>
            </FormGroup>
          </Form>

          <div className="frequently_search align-items-center gap-3 mt-3 mt-lg-5">
            <h6>Frequently Searched: </h6>

            <ul>
              <li>iphone 15 pro max</li>
              <li>iphone</li>
              <li>drone</li>
              <li>smart watch</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Homebanner;
