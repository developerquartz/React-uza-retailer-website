import React from "react";
import { Container, Row } from "react-bootstrap";
import { Button } from "reactstrap";

export default function Footer() {
  return (
    <>
      <section className="footer-main position-relative">
        <Container>
          <Row>
            <div className="subscriber">

              <h4 className="text-center ">Subscribe to get our updates</h4>
              <form>
                <div className="input_subsciber d-flex align-items-center justify-content-center gap-3">
                  <input
                    type="email"
                    name="email"
                    id="emailid"
                    placeholder="Enter email address"
                  />
                  <Button className="subscribe_btn">Subscribe</Button>
                </div>
              </form>
            </div>


            <div className="footer_column text-start">
              <ul className="d-flex align-items-start justify-content-between flex-wrap">
                <li>
                  <h5>Contact Us</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, sed!</p>
                </li>

                <li>
                  <h5>Categories</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, sed!</p>
                </li>

                <li>
                  <h5>Supports</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, sed!</p>
                </li>

                <li>
                  <h5>Links</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, sed!</p>
                </li>

                <li>
                  <h5>Payments</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, sed!</p>
                </li>
              </ul>
            </div>

          </Row>
        </Container>
      </section>
    </>
  );
}
