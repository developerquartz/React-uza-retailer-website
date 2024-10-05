import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import placeholder from "../../assets/images/default_name4.webp";
import { apiGetBestSalerProducts } from "../../store/products/actions";
import ROUTES from "../../helpers/routesHelper";
import { smoothScrollToTop, logger } from "../../helpers/commonHelper";

export default function BestSalerProduct() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.products.bestSalerProducts);
  logger("Best saler product ::: ", items);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      apiGetBestSalerProducts({
        limit: 1,
        fieldName: "bestSeller",
        fieldValue: true,
      })
    );
  }, [dispatch]);

  if (items?.length)
    return (
      <div className="card_white mt-3">
        <div className="most_popular text-start">
          <h6>Deals on best sellers</h6>
        </div>

        <div
          className="deals_img position-relative mt-3 cursor-pointer"
          onClick={() => {
            navigate(ROUTES.BEST_DEAL_PRODUCT_LISTING);
            smoothScrollToTop();
          }}
        >
          <span className="Popular_bagde">10% OFF</span>
          <div className="deals_img_wrap">
            <img
              src={items[0]?.featured_image?.link || placeholder}
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    );

  return null;
}
