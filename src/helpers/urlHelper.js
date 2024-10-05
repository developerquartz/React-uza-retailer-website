export const AUTH = {
  VERIFY_EMAIL: "users/verifyEmail",
  VERIFY_MOBILE: "users/verifyMobileNumber",
  VERIFY_OTP: "users/verifyOtp",
  REGISTER: "users/register",
  LOGIN: "users/login",
  LOGOUT: "users/logout",
};

export const FORGOT_PASSWORD = {
  SEND_OTP: "users/forgotPassword",
  RESET: "users/resetPassword",
};

export const PROFILE = {
  GET: "users/profile",
  UPDATE: "users/update",
  CHANGE_PASSWORD: "users/changePassword",
};

export const CATEGORIES = {
  LIST: "categories/list",
  TOP_CATEGORIES: "categories/top-cat",
  SOURCE_APPLICATION: "categories/source-application",
};

export const PRODUCTS = {
  LIST: "products/list", // search
  TOP_RANKING: "products/top-ranking",
  NEW_ARRIVAL: "products/new-arrivals", // search
  SAVING_SPOTLIGHT: "products/savings-spotlight",
  GUARANTED: "products/guaranteed-products",
  DETAIL: "products/view",
};

export const CART = {
  COUNT: "carts/count", // get
  ADD: "carts/add", // post
  LIST: "carts/list", // get
  UPDATE: "carts/update", // put
  DELETE: "carts/remove", // delete
};

export const ORDER = {
  CHECKOUT: "orders/checkout", // post
  PLACE: "orders/add", // post
  LIST: "orders/list", // get
  DETAIL: "orders/view", // get
};

export const ADDRESS = {
  LIST: "addresses/list",
  ADD: "addresses/add",
  VIEW: "addresses/view",
  DELETE: "addresses/delete",
  UPDATE: "addresses/update",
  MAKE_DEFAULT: "addresses/makeDefaultAddress",
};

export const PAGE = {
  ABOUT_US: "pages/aboutUs",
  CONTACT_US: "pages/contactUs",
  PRIVACY_POLICY: "pages/privacyPolicy",
  T_AND_C: "pages/termAndConditions",
};
