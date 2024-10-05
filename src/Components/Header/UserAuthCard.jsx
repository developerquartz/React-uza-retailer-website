import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UncontrolledDropdown, DropdownToggle } from "reactstrap";

import ROUTES from "../../helpers/routesHelper";
import { apiGetCartCount } from "../../store/cart/actions";
import { ICON_CART, ICON_USER_SECONDARY } from "../../assets/svg";

export default function UserAuthCard() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((s) => s.auth);
  const cartItems = useSelector(s => s.cart.count);

  useEffect(() => {
    dispatch(apiGetCartCount());
  }, [dispatch]);
  return (
    <div className="user_card">

      <div className="cardone_wallet">
        <Link to="/cart" className="d-flex align-items-center">
          <span className="me-2">{ICON_CART}</span>
          <div className="card_content">
            <h5>Cart</h5>
            {/* <h5>$ 150,000</h5> */}
            {cartItems ? <small className="text-theme-secondary">{cartItems} Item{cartItems > 1 ? 's' : ''}</small> : null}
          </div>
        </Link>
      </div>

      <div className="dividerline_verticle"></div>

      {!isLogin ? (
        <>
          <div className="cardone_wallet">
            <Link to={ROUTES.LOGIN} className="d-flex align-items-center">
              <span className="me-2">{ICON_USER_SECONDARY}</span>
              <div className="card_content">
                <h5>Sign in</h5>
              </div>
            </Link>
          </div>

          <div className="dividerline_verticle"></div>

          <div className="card_user">
            <Link to={ROUTES.SIGNUP} className="d-flex align-items-center">
              <span className="me-2">{ICON_USER_SECONDARY}</span>
              <div className="card_content">
                <h5>Sign up</h5>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <div className="card_user">
          <UncontrolledDropdown>
            <DropdownToggle>
              <Link to="/my-orders">
                <div className="d-flex align-items-center">
                  <span className="me-2">{ICON_USER_SECONDARY}</span>
                  <div className="card_content">
                    <h5>My Account</h5>
                  </div>
                </div>
              </Link>
            </DropdownToggle>

            {/* <DropdownMenu>
          <Link to={ROUTES.PROFILE}>Profile</Link>
          <Link to={ROUTES.CHANGE_PASSWORD}>Change Password</Link>
          <Link to={ROUTES.MY_ORDERS}>My orders</Link>
          <Link to={ROUTES.ORDER_ADDRESS}>Address</Link>

          <Button
            className="logout-button"
            onClick={() => {
              dispatch(apiLogout());
            }}
          >
            Logout
          </Button>
        </DropdownMenu> */}
          </UncontrolledDropdown>
        </div>
      )
      }

    </div>
  );
}