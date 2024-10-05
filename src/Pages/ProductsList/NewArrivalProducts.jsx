import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import ProductsListing from "../../Components/Products/ProductsListing";
import { APP_NAME } from "../../config/constants";
import { handlePageClick } from "../../helpers/commonHelper";
import { apiGetNewArrivalProducts, apiGetProductDetail } from "../../store/products/actions";

const NewArrivalProducts = () => {
  let [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { detail } = useSelector((s) => s.products.productDetail);
  const { isLoading, items, totalPages } = useSelector((s) => s.products.newArrivalProducts);

  const [skip, setSkip] = useState(1);
  const limit = 16;

  useEffect(() => {
    if (skip && searchParams) {
      dispatch(
        apiGetNewArrivalProducts({
          limit: limit,
          skip: skip,
          category: searchParams.get("category"),
          search: searchParams.get("search"),
        })
      );
    }
  }, [skip, dispatch, searchParams]);

  useEffect(() => {
    const topIds = searchParams.get("topIds");
    if (topIds) {
      dispatch(apiGetProductDetail({ id: topIds }));
    }
  }, [dispatch, searchParams]);

  return (
    <div className="wrapList">
      <Helmet>
        <title>{APP_NAME} | Shop</title>
      </Helmet>
      <Container fluid>
        <Row>
          {/* <Col lg={3}>
            <Sidefilleter />
          </Col> */}

          <Col lg={12}>
            <h5 className="all_product_head text-start mb-4">
              New Arrival Products
            </h5>
            <ProductsListing
              {...{
                items:
                  skip === 1 && detail
                    ? [
                      ...[
                        detail,
                        ...items?.filter((i) => i._id !== detail._id),
                      ],
                    ]
                    : items,
                handlePageClick: handlePageClick({ setSkip }),
                limit,
                totalPages,
                isLoading,
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewArrivalProducts;
