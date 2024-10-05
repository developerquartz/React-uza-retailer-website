import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Categories } from "./Items/Categories";
import ROUTES from "../../helpers/routesHelper";
import { logger } from "../../helpers/commonHelper";

const Homemenustrip = () => {

  const [display, setDisplay] = useState("none");
  const navigate = useNavigate();
  const [top, setTop] = useState(0);
  const productRef = useRef();

  const handleScroll = () => {
    setTop(productRef.current.getBoundingClientRect().top);
  }

  useEffect(() => {
    handleScroll();
    document?.body?.addEventListener("scroll", handleScroll);
    return () => {
      document?.body?.removeEventListener("scroll", handleScroll);
    }
  }, [productRef]);

  useEffect(() => {
    logger("TOP ", top);
  }, [top]);

  return (
    <div className="home_strip">
      <Container>
        <ul className="homeMenu_list m-0 p-0 d-flex align-items-center">
          <li>
            <NavLink to={ROUTES.HOME}>Home</NavLink>
          </li>

          <li className="productmenu" onMouseEnter={() => {
            setDisplay('block')
          }} onMouseLeave={() => {
            setDisplay('none')
          }}>
            <Link to={ROUTES.CATEGORIES}>
              {" "}
              <span>{threebar}</span> All Categories
            </Link>
            <Categories display={display} setDisplay={setDisplay} style={{ top: `${top + 34}px` }} />
          </li>

          <li className="productmenu" ref={productRef}>
            <Link to="#">Products {arrowdown} </Link>
            <div className="mega_menu" style={{ top: `${top + 34}px` }}>
              <Row>
                <Col lg={3} md={6} sm={12} onClick={() => navigate(ROUTES.TOP_RANKING_PRODUCT_LISTING)} className="cursor-pointer">
                  <div className="menu_box text-center">
                    <span>{toprank}</span>
                    <p>Top ranking</p>
                  </div>
                </Col>

                <Col lg={3} md={6} sm={12} onClick={() => navigate(ROUTES.NEW_ARRIVALS_PRODUCT_LISTING)} className="cursor-pointer">
                  <div className="menu_box text-center">
                    <span>{toprank}</span>

                    <p>New arrivals</p>
                  </div>
                </Col>

                <Col lg={3} md={6} sm={12} onClick={() => navigate(ROUTES.SAVING_SPOTLIGHT_PRODUCT_LISTING)} className="cursor-pointer">
                  <div className="menu_box text-center">
                    <span>{toprank}</span>

                    <p>Saving Spotlight</p>
                  </div>
                </Col>

                <Col lg={3} md={6} sm={12}>
                  <div className="menu_box_links text-start">
                    <ul>
                      <li>
                        <Link to="#">Sample center</Link>
                      </li>

                      <li>
                        <Link to="#">Online Trade Show</Link>
                      </li>

                      <li>
                        <Link to="#">Tips</Link>
                      </li>

                      <li>
                        <Link to="#">LIVE</Link>
                      </li>

                      <li>
                        <Link to="#">Global suppliers</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </li>

          <li>
            <Link to={ROUTES.BLOG}>Blog</Link>
          </li>

          <li>
            <Link to={ROUTES.CONTACT_US}>Contact</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Homemenustrip;

// svg icon
const threebar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="#000"
      stroke-linecap="round"
      stroke-width="2"
      d="M5 6h14M5 12h14M5 18h14"
    />
  </svg>
);

const toprank = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M255 471L91.7 387V41h328.6v346zm-147.3-93.74L255 453l149.3-75.76V57H107.7zm187.61-168.34l-14.5-46l38.8-28.73l-48.27-.43L256 87.94l-15.33 45.78l-48.27.43l38.8 28.73l-14.5 46l39.31-28zM254.13 311.5l98.27-49.89v-49.9l-98.14 49.82l-94.66-48.69v50zm.13 32.66l-94.66-48.69v50l94.54 48.62l98.27-49.89v-49.9z"
    />
  </svg>
);

const arrowdown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0"
    />
  </svg>
);