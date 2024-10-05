import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BestSalerProduct from "./BestSalerProduct";

import ROUTES from "../../helpers/routesHelper";
import { smoothScrollToTop, logger } from "../../helpers/commonHelper";
import { apiGetSavingSpotlightProducts } from "../../store/products/actions";

import placeholder from "../../assets/images/Decor.webp";

export default function SavingSpotLight() {
  const dispatch = useDispatch();
  const { items } = useSelector(
    (s) => s.products.savingSpotlightProducts
  );
  logger("Saving spotlight products ::: ", items);
  const limit = 6;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      apiGetSavingSpotlightProducts({
        limit: limit,
      })
    );
  }, [dispatch]);

  return (
    <>
      <div className="discover_card px-3">
        <div className="card_top_head d-flex align-items-center justify-content-between">
          <h4>Saving Spotlight</h4>
          <Link to={ROUTES.SAVING_SPOTLIGHT_PRODUCT_LISTING}>
            View More
          </Link>
        </div>
        {items?.length && (
          <>
            <div
              className="card_white mt-3 cursor-pointer"
              onClick={() => {
                navigate(`${ROUTES.SAVING_SPOTLIGHT_PRODUCT_LISTING}?topIds=${items[0]._id}`);
                smoothScrollToTop();
              }}
            >
              <div className="lowest_price d-flex align-items-center">
                <div className="lowest_img me-2">
                  <img
                    src={items[0]?.featured_image?.link || placeholder}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <p>Lowest price in 180 days</p>
              </div>
            </div>
          </>
        )}

        <BestSalerProduct />
      </div>
    </>
  );
}
