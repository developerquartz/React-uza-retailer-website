import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

import { ProductVariations } from "./ProductVariations";
import LoadingContent from "../../Components/Common/LoadingContent";
import NoRecordFound from "../../Components/Common/NoRecordFound";

import { APP_NAME } from "../../config/constants";
import { addToCart, getProductInfo } from "../../helpers/cartHelper";
import { fixedNumber, logger } from "../../helpers/commonHelper";
import { apiGetProductDetail } from "../../store/products/actions";
import { manageProductForCart } from "../../store/products/slice";

import placeholder from "../../assets/images/sousix.jpg";
import ROUTES from "../../helpers/routesHelper";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
      >
        <path
          fill="#233448"
          d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"
        />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
      >
        <path
          fill="#233448"
          d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"
        />
      </svg>
    </div>
  );
}

const Singleview = () => {
  const dispatch = useDispatch();
  const { isLoading, detail } = useSelector((s) => s.products.productDetail);
  const { isLogin } = useSelector(s => s.auth);
  logger("isLogin ::: ", isLogin);
  const { productId, variationId, cartData, price, stock, addedInCart } = getProductInfo(detail);

  const [show, setShow] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          backgroundColor: "#ddd",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="thumbnail_img">
        {detail?.images?.length ? (
          <img src={detail?.images[i]?.link} alt="" className="img-fluid" />
        ) : (
          <img
            src={detail?.featured_image?.link || placeholder}
            alt=""
            className="img-fluid"
          />
        )}

        <div className="elllispe_shape">
          <div className="ellispse_inner"></div>
        </div>
      </div>
    ),
  };

  const handlerAddToCart = () =>
    addedInCart ? navigate(ROUTES.CART) : addToCart({ cartData, dispatch, isLogin });

  useEffect(() => {
    dispatch(apiGetProductDetail({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(manageProductForCart(null));
    };
  }, []);
  return (
    <section className="single_view my-5" style={{ backgroundColor: "white" }}>
      <Helmet>
        <title>{APP_NAME} | Product details</title>
      </Helmet>
      <Container>
        {isLoading ? (
          <LoadingContent />
        ) : detail ? (
          <>
            <Row>
              <Helmet>
                <title>{APP_NAME} | {`${detail?.name}`}</title>
              </Helmet>
              <Col lg={8} md={7} sm={12}>
                <div className="product_preview text-start pe-4 lg-pe-0">
                  <h4>{detail?.name || ""}</h4>

                  <p>
                    {!detail?.average_rating
                      ? "No reviews yet"
                      : "Need to add rating star"}{" "}
                    {detail?.sold_count ? (
                      <>
                        <span className="dot"></span> {detail?.sold_count} sold
                      </>
                    ) : (
                      ""
                    )}{" "}
                    {/* <span className="dot"></span> #1
                <Link to="#">{detail?.vendor?.name || ''}</Link> */}
                  </p>
                </div>

                <div className="sinlge_product_slider position-relative">
                  {/* {like ? (
                    <Button className="heart_btn" onClick={liked}>
                      {heartfill}
                    </Button>
                  ) : (
                    <Button className="heart_btn" onClick={liked}>
                      {heartline}
                    </Button>
                  )} */}

                  <Slider {...settings}>
                    {detail?.images?.length ? (
                      detail?.images?.map((value, index) => {
                        return (
                          <div key={index}>
                            <div
                              className="character-img"
                              style={{
                                backgroundColor: "#f5f5f5",
                                borderRadius: "15px",
                              }}
                            >
                              <img
                                src={value.link}
                                alt=""
                                className="img-fluid"
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "contain",
                                  maxHeight: "370px",
                                }}
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : detail?.featured_image?.link ? (
                      <div>
                        <div className="character-img">
                          <img
                            src={detail?.featured_image?.link}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    ) : null}
                  </Slider>
                </div>
              </Col>

              <Col lg={4} md={5} sm={12}>
                <div className="product_right_vcariant text-start py-4 px-3">
                  <ul className="p-0 d-flex align-items-center gap-5 flex-wrap">
                    <li>
                      <div className="same_content_single">
                        <h3>US${fixedNumber(price)}</h3>
                      </div>
                    </li>
                  </ul>

                  <hr />

                  {detail?.variations?.length ? (
                    <ProductVariations
                      detail={detail}
                      show={show}
                      setShow={setShow}
                      handlerAddToCart={handlerAddToCart}
                    />
                  ) : (
                    ""
                  )}

                  {/* <hr />

                  <div className="shipping">
                    <p>
                      <strong>Electronic Express (Premium)</strong>
                      <Link to="">Change</Link>
                    </p>

                    <p>Shipping total : $230.52 for 20 pieces</p>
                    <p>
                      Estimated Delivery by <strong>Jul 15</strong>
                    </p>
                  </div> */}

                  <div className="button_three d-flex align-items-center justify-content-between gap-2 mt-3">
                    {stock.instock ?
                      <>
                        <Button className="addcart" onClick={handlerAddToCart}>
                          {addedInCart ? "Go to cart" : "Add to cart"}
                        </Button>
                        {/* <Button
                          className="Startbutton"
                          onClick={handlerAddToCart}
                        >
                          Start Order
                        </Button> */}
                      </> : <p className="out-of-stock">Out of stock</p>}
                    <Button className="chatbtn">{chaticon}</Button>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="text-start mt-5">
              <Col
                dangerouslySetInnerHTML={{ __html: detail?.description || "" }}
              ></Col>
            </Row>
          </>
        ) : (
          <NoRecordFound />
        )}
      </Container>
    </section >
  );
};

export default Singleview;

// svg
const chaticon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 256 256"
  >
    <path
      fill="#000"
      d="M216 52H40a12 12 0 0 0-12 12v160a11.89 11.89 0 0 0 6.93 10.88A12.2 12.2 0 0 0 40 236a11.9 11.9 0 0 0 7.69-2.83L81.49 204H216a12 12 0 0 0 12-12V64a12 12 0 0 0-12-12m4 140a4 4 0 0 1-4 4H80a4 4 0 0 0-2.62 1l-34.82 30.06A4 4 0 0 1 36 224V64a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Zm-56-80a4 4 0 0 1-4 4H96a4 4 0 0 1 0-8h64a4 4 0 0 1 4 4m0 32a4 4 0 0 1-4 4H96a4 4 0 0 1 0-8h64a4 4 0 0 1 4 4"
    />
  </svg>
);

const heartline = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="#ccc"
      d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825"
    />
  </svg>
);

const heartfill = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="#f00"
      d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z"
    />
  </svg>
);
