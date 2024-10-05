import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ROUTES from "../../helpers/routesHelper";
import { smoothScrollToTop, logger } from "../../helpers/commonHelper";
import { apiGetNewArrivalProducts } from "../../store/products/actions";

import placeholder from "../../assets/images/default_name.webp";

export default function NewArrivalProducts() {
  const dispatch = useDispatch();
  const { items, total } = useSelector(
    (s) => s.products.newArrivalProducts
  );
  logger("NEW ARRIVAL PRODUCT SLIDER", items);
  const limit = 6;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      apiGetNewArrivalProducts({
        limit: limit,
      })
    );
  }, [dispatch]);

  return (
    <>
      <div className="discover_card px-3">
        <div className="card_top_head d-flex align-items-center justify-content-between">
          <h4>New Arrivals</h4>
          <Link to={ROUTES.NEW_ARRIVALS_PRODUCT_LISTING}>View More</Link>
        </div>

        <div className="card_white mt-3">
          <div className="most_popular text-start">
            <h6>{total} Products added today</h6>
          </div>

          <div className="new_Arrivals d-flex align-items-center flex-wrap gap-2 mt-3">
            {items?.map((item, idx) => {
              if (idx <= 3)
                return (
                  <div
                    className="new_arrival_img cursor-pointer"
                    key={idx}
                    onClick={() => {
                      smoothScrollToTop();
                      navigate(`${ROUTES.NEW_ARRIVALS_PRODUCT_LISTING}?topIds=${item._id}`);
                    }}
                  >
                    <img
                      src={item?.featured_image?.link || placeholder}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
