import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Pagination from "../../Components/Common/Pagination";
import LoadingContent from "../../Components/Common/LoadingContent";
import NoRecordFound from "../../Components/Common/NoRecordFound";

import ROUTES from "../../helpers/routesHelper";
import { fromNow, smoothScrollToTop } from "../../helpers/commonHelper";

import placeholder from "../../assets/images/gurfive.jpg";
import { getPendingQuantity } from "../../helpers/cartHelper";

const ProductsListing = ({
    items,
    handlePageClick,
    limit,
    totalPages,
    isLoading,
    initialPage = 0,
}) => {
    const navigate = useNavigate();

    return (
        <section className="products_card">
            <Row>
                {items?.length ? (
                    items?.map((item, idx) => {
                        const pendingQty = getPendingQuantity(item);
                        return (
                            <Col lg={3} md={6} sm={12} key={idx}>
                                <div
                                    className="card_comnon-product cursor-pointer"
                                    onClick={() => {
                                        navigate(ROUTES.PRODUCT_DETAIL + "/" + item._id);
                                        smoothScrollToTop();
                                    }}
                                >
                                    <div className="card_item_Show position-relative">
                                        <img
                                            src={item?.featured_image?.link || placeholder}
                                            alt=""
                                            className="img-fluid"
                                        />
                                        {!pendingQty ? <p style={{
                                            top: "-12px",
                                            right: "-10px",
                                        }} className="out-of-stock position-absolute">Out of stock</p> : null}
                                    </div>
                                    <div className="card_content_list">
                                        <div className="upper_head text-start w-100">
                                            <div className="d-flex justify-content-between flex-wrap">
                                                {fromNow(item.date_created_utc) <= 90 ? (
                                                    <p className="text-danger">
                                                        Listed in last {fromNow(item.date_created_utc)} days
                                                    </p>
                                                ) : (
                                                    ""
                                                )}

                                                {pendingQty > 0 && pendingQty <= 10 ? <p className="text-secondary">{pendingQty <= 5 ? `${pendingQty} items left` : pendingQty <= 10 ? "Few left" : ""}</p> : null}
                                            </div>
                                            <h5>{item?.name}</h5>
                                            {/* <p>{item?.short_description?.length >= 250 ? item?.short_description.substring(0, 245) + '...' : item?.short_description}</p> */}
                                        </div>

                                        <div className="products_ist d-flex justify-content-between align-items-center mt-3">
                                            <p>
                                                ${item?.price}
                                            </p>
                                            {/* <Button className="buy_now_btn" onClick={() => navigate(`${ROUTES.PRODUCT_DETAIL}/${item._id}`)}>Buy Now</Button> */}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        );
                    })
                ) : isLoading ? (
                    <LoadingContent />
                ) : (
                    <NoRecordFound />
                )}
            </Row>

            <Row className="my-5">
                <Col className="justify-content-end">
                    <Pagination {...{ items, handlePageClick, limit, totalPages, initialPage }} />
                </Col>
            </Row>
        </section>
    );
};

export default ProductsListing;
