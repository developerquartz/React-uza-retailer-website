import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ROUTES from "../helpers/routesHelper";

// importing all the themes

import Pagenotfound from "../Pages/404page";
import Hometheme from "../Themes/hometheme";
import Loginpagetheme from "../Themes/loginpagetheme";
import Congratstheme from "../Themes/congratstheme";
import Productstheme from "../Themes/productstheme";
import Singleproductstheme from "../Themes/singleproductstheme";
// import Allcaegoriestheme from "../Themes/allcaegoriestheme";
import Blogtheme from "../Themes/blogtheme";
import Contacttheme from "../Themes/contacttheme";
import Productlisttheme from "../Themes/productlisttheme";
import Signuppagetheme from "../Themes/signuppagetheme";
import ProfileTheme from "../Themes/ProfileTheme";
import MyOrdersTheme from "../Themes/MyOrdersTheme";
import AddressTheme from "../Themes/AddressTheme";
import ChangePasswordTheme from "../Themes/ChangePasswordTheme";
import AddAddressTheme from "../Themes/AddAddressTheme";
import Myaccounttheme from "../Themes/myaccounttheme";
import ForgotPasswordTheme from "../Themes/ForgotPasswordTheme";
import ProductNewArrivalTheme from "../Themes/ProductNewArrivalTheme";
import ProductSavingSpotlightTheme from "../Themes/ProductSavingSpotlightTheme";
import ProductTopRankingTheme from "../Themes/ProductTopRankingTheme";
import ProductBestDealTheme from "../Themes/ProductBestDealTheme";
import Checkoutpagetheme from "../Themes/checkoutpagetheme";
import CartPageTheme from "../Themes/CartPageTheme";
import OrderDetailTheme from "../Themes/OrderDetailTheme";
import AboutUsTheme from "../Themes/AboutUsTheme";

export default function MyRouts() {
  const { isLogin } = useSelector((s) => s.auth);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {isLogin ? (
            <>
              {/* Private routes */}
              <Route path={ROUTES.CONGRATULATION} element={<Congratstheme />} />

              <Route element={<Myaccounttheme />}>
                <Route path={ROUTES.MY_ORDERS} element={<MyOrdersTheme />} />
                <Route path={ROUTES.ORDER_DETAIL + "/:id"} element={<OrderDetailTheme />} />
                <Route path={ROUTES.ORDER_ADDRESS} element={<AddressTheme />} />
                <Route path={ROUTES.CREATE_ADDRESS + "/:id"} element={<AddAddressTheme />} />
                <Route path={ROUTES.CREATE_ADDRESS + "/"} element={<AddAddressTheme />} />
                <Route path={ROUTES.PROFILE} element={<ProfileTheme />} />
                <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePasswordTheme />} />
              </Route>

            </>
          ) : (
            <>
              <Route path={ROUTES.LOGIN} element={<Loginpagetheme />} />
              <Route path={ROUTES.SIGNUP} element={<Signuppagetheme />} />
              <Route path={ROUTES.FORGOT} element={<ForgotPasswordTheme />} />
            </>
          )}

          <Route path={ROUTES.HOME} element={<Hometheme />} />
          <Route path={ROUTES.BLOG} element={<Blogtheme />} />
          <Route path={ROUTES.CONTACT_US} element={<Contacttheme />} />
          <Route path={ROUTES.ABOUT_US} element={<AboutUsTheme />} />

          <Route path={ROUTES.CATEGORIES} element={<Productstheme />} />
          
          <Route path={ROUTES.PRODUCT_LISTING} element={<Productlisttheme />} />
          <Route path={ROUTES.TOP_RANKING_PRODUCT_LISTING} element={<ProductTopRankingTheme />} />
          <Route path={ROUTES.NEW_ARRIVALS_PRODUCT_LISTING} element={<ProductNewArrivalTheme />} />
          <Route path={ROUTES.SAVING_SPOTLIGHT_PRODUCT_LISTING} element={<ProductSavingSpotlightTheme />} />
          <Route path={ROUTES.BEST_DEAL_PRODUCT_LISTING} element={<ProductBestDealTheme />} />

          <Route path={ROUTES.CART} element={<CartPageTheme />} />
          <Route path={ROUTES.CHECKOUT} element={<Checkoutpagetheme />} />

          <Route
            path={`${ROUTES.PRODUCT_DETAIL}/:id`}
            element={<Singleproductstheme />}
          />
          {/* <Route path="/all-categories" element={<Allcaegoriestheme/>} /> */}

          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
