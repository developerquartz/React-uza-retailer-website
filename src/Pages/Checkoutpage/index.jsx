import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Accordion } from "react-bootstrap";

import { ApplyCoupon } from "./ApplyCoupon";
import LoginPopup from "../../Components/LoginPopup";
import AddToCart from "../../Components/Common/AddToCart";
import RenderAddress from "../../Components/Common/RenderAddress";
import AddAddressModal from "../../Components/Modals/AddAddressModal";
import TempErrorMessage from "../../Components/Common/TempErrorMessage";

import ROUTES from "../../helpers/routesHelper";
import { fixedNumber, logger } from "../../helpers/commonHelper";
import { getCheckoutErrorMessage, getCouponDiscount, isReadyToPlaceOrder, manageCartQuantity } from "../../helpers/cartHelper";

import { removeOrderDetails } from "../../store/order/slice";
import { apiGetAddresses } from "../../store/address/actions";
import { apiCheckout, apiPlaceOrder } from "../../store/order/actions";
import { setCouponCode, updateCartList } from "../../store/cart/slice";
import { apiGetCartCount, apiGetCartList, apiUpdateCart } from "../../store/cart/actions";
import { setBillingAddress, setDefaultAddress, setShippingAddress } from "../../store/address/slice";

import ICON_TRASH from "../../assets/images/icon-trash.svg";
import placeholder from "../../assets/images/sousix.jpg";

const Checkoutpage = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(s => s.auth);
  const { cartCoupon, cartList, isLoading } = useSelector((s) => s.cart);
  const { orderDetails } = useSelector((s) => s.order);
  const isLoadingOrder = useSelector((s) => s.order.isLoading);
  const shippingAddress = useSelector((s) => s.address.shippingAddress.detail);
  const billingAddress = useSelector((s) => s.address.billingAddress.detail);
  const addressList = useSelector((s) => s.address.addresses.items);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [addressEditId, setAddressEditId] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [activeKey, setActiveKey] = useState("0");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const navigate = useNavigate();

  const selectedCartList = () => {
    return cartList.map((c) => c._id);
  }

  const handleCheckout = (coupon = "", callback = (res) => {
    if (res.status === "success" && !res.data?.couponError) {
      dispatch(setCouponCode(res.data?.coupon));
    }
    else {
      dispatch(setCouponCode());
    }
  }) => {
    let data = {
      cart_ids: selectedCartList(),
      shipping_address: shippingAddress?._id,
    };

    if (!!coupon) data.coupon = coupon;

    dispatch(
      apiCheckout({
        data,
        callback,
      })
    );
  };

  const handlePlaceOrder = () => {
    if (!shippingAddress?._id) {
      toast.error("Please add shipping address.");
      return;
    }
    if (!billingAddress?._id) {
      toast.error("Please add shipping address.");
      return;
    }
    const data = {
      cart_ids: selectedCartList(),
      shipping_address: shippingAddress._id,
      billing_address: billingAddress._id,
    };
    if (orderDetails?.coupon) {
      data.coupon = orderDetails.coupon;
    }
    dispatch(
      apiPlaceOrder({
        data,
        callback: () => {
          navigate(ROUTES.CONGRATULATION);
          dispatch(updateCartList([]));
          dispatch(apiGetCartCount());
          dispatch(setCouponCode());
        },
      })
    );
  }

  const handleEmptyCart = (res) => !res?.data?.length ? navigate(ROUTES.CART) : '';

  useEffect(() => {
    dispatch(apiGetCartList({ callback: (res) => !res?.data?.length ? navigate(ROUTES.CART) : '' }));
    dispatch(apiGetCartCount());

    if (isLogin)
      dispatch(
        apiGetAddresses({
          limit: 100,
          skip: 0,
        })
      );

    return () => {
      dispatch(setShippingAddress(null));
      dispatch(setBillingAddress(null));
      dispatch(apiGetCartCount());
    };
  }, [dispatch, isLogin]);

  useEffect(() => {
    if (!isLoading && cartList.length) {
      handleCheckout(cartCoupon || "");
    } else {
      dispatch(removeOrderDetails());
    }
  }, [cartList, isLoading, dispatch]);

  useEffect(() => {
    if (addressList.length && (!shippingAddress || !billingAddress))
      dispatch(setDefaultAddress());
  }, [addressList]);

  return (
    <section className="checkout_view py-5">
      <Container>
        <AddAddressModal
          setAddressEditId={setAddressEditId}
          activeKey={activeKey}
          id={addressEditId}
          show={showAddressModal}
          onhide={() => {
            setAddressEditId(null);
            setShowAddressModal(false);
          }}
        />

        <Row>
          <Col lg="12" className="text-start">
            <h2 className="fw-bold mt-0 mb-4">Checkout</h2>
          </Col>

          <Col lg={8} md={6} sm={12}>
            <div className="checkout_accordion">
              <LoginPopup
                show={showLoginPopup}
                handleClose={() => setShowLoginPopup(false)}
              />
              <Accordion activeKey={isLogin ? activeKey : "join-platform"} onSelect={(k) => setActiveKey(k)}>

                {!isLogin ? (
                  <Accordion.Item eventKey="join-platform">
                    <Accordion.Header className="disabled">Join platform to place order</Accordion.Header>
                    <Accordion.Body>
                      <div className="checkout_acccinner border rounded-3">
                        <div className="your_address p-3">
                          <h5 className="fw-bold text-start border-bottom w-100">
                            Sign or Signup to continue
                          </h5>

                          <div className="radio_set my-3 text-start">
                            <Button
                              className="use_thisadd mt-3"
                              onClick={() => setShowLoginPopup(true)}
                            >Join Platform</Button>
                          </div>
                        </div>

                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ) : null}

                <Accordion.Item eventKey="0">
                  <Accordion.Header className={parseInt(activeKey) <= 0 || !isLogin ? "disabled" : ""}>
                    <div className="text-start">
                      Select a billing address
                      {parseInt(activeKey) >= 0 ? <RenderAddress address={billingAddress} className="w-100 fs-xs mb-0" /> : null}
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="checkout_acccinner border rounded-3">
                      <div className="your_address p-3">
                        <h5 className="fw-bold text-start border-bottom w-100">
                          Your Address
                        </h5>

                        <div className="radio_set my-3">
                          {addressList?.length ? (
                            addressList.map((address, key) => (
                              <div className="radio-item d-flex align-items-center" key={key}>
                                <input
                                  type="radio"
                                  id={"bill-address-" + key}
                                  name="address"
                                  checked={
                                    !!billingAddress?._id
                                      ? billingAddress?._id === address._id
                                      : address.default
                                  }
                                  onChange={() => {
                                    dispatch(setBillingAddress(address));
                                  }}
                                />
                                <label htmlFor={"bill-address-" + key} className="d-flex justify-content-between">
                                  <span>
                                    <strong>{address?.name} | {address?.countryCode} {address?.mobileNumber}</strong>{" "}
                                    {address?.area}, {address?.houseNo}, {address?.landmark}, {address?.address}
                                  </span>
                                  <Button
                                    className="use_thisadd"
                                    onClick={() => {
                                      setAddressEditId(address._id);
                                      setShowAddressModal(true);
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </label>
                              </div>
                            ))
                          ) : null}

                          <Button className="add_new_address" onClick={() => setShowAddressModal(true)}>
                            + Add a new address
                          </Button>
                        </div>
                      </div>

                      <div className="use_thisadwrap p-3">
                        <Button
                          className="use_thisadd"
                          disabled={!billingAddress?._id || !isLogin}
                          onClick={() => setActiveKey("1")}
                        >
                          Use this Address
                        </Button>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="1">
                  <Accordion.Header className={parseInt(activeKey) <= 1 || !isLogin ? "disabled" : ""}>
                    <div className="text-start">
                      Select a shipping address
                      {parseInt(activeKey) >= 1 ? <RenderAddress address={shippingAddress} className="w-100 fs-xs mb-0" /> : null}
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="checkout_acccinner border rounded-3">
                      <div className="your_address p-3">
                        <h5 className="fw-bold text-start border-bottom w-100">
                          Your Address
                        </h5>

                        <div className="radio_set my-3">
                          {addressList?.length ? (
                            addressList.map((address, key) => (
                              <div className="radio-item d-flex align-items-center" key={key}>
                                <input
                                  type="radio"
                                  id={"address-" + key}
                                  name="shipaddress"
                                  checked={
                                    !!shippingAddress?._id
                                      ? shippingAddress?._id === address._id
                                      : address.default
                                  }
                                  onChange={() => {
                                    dispatch(setShippingAddress(address));
                                  }}
                                />
                                <label htmlFor={"address-" + key} className="d-flex justify-content-between">
                                  <span>
                                    <strong>{address?.name} | {address?.countryCode} {address?.mobileNumber}</strong>{" "}
                                    {address?.area}, {address?.houseNo}, {address?.landmark}, {address?.address}
                                  </span>
                                  <Button
                                    className="use_thisadd"
                                    onClick={() => {
                                      setAddressEditId(address._id);
                                      setShowAddressModal(true);
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </label>
                              </div>
                            ))
                          ) : null}

                          <Button className="add_new_address" onClick={() => setShowAddressModal(true)}>
                            + Add a new address
                          </Button>
                        </div>
                      </div>

                      <div className="use_thisadwrap p-3">
                        <Button
                          className="use_thisadd"
                          disabled={!shippingAddress?._id || !isLogin}
                          onClick={() => setActiveKey("2")}
                        >
                          Use this Address
                        </Button>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header className={parseInt(activeKey) <= 2 || !isLogin ? "disabled" : ""}>Payment method</Accordion.Header>
                  <Accordion.Body>
                    <div className="checkout_acccinner border rounded-3">
                      <div className="your_address p-3">
                        <div className="radio_set my-3">
                          <div className="radio-item d-flex align-items-center">
                            <input
                              type="radio"
                              id={"payment-method-1"}
                              name="paymentMethod"
                              checked={true}
                            />
                            <label htmlFor={"payment-method-1"}>
                              <span>
                                <strong>Cash on Delivery/Pay on Delivery</strong>{" "}
                                Cash, UPI and Cards accepted.
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="use_thisadwrap p-3">
                        <Button
                          className="use_thisadd"
                          onClick={() => setActiveKey("3")}
                        >
                          Use this payment method
                        </Button>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header className="disabled" > Review items and delivery</Accordion.Header>
                  <Accordion.Body>
                    <div className="checkout_acccinner border rounded-3">
                      <div className="your_address p-3">
                        {cartList?.length ? (
                          <Row>
                            {cartList.map((cart, index) => {
                              const checkoutMessage = getCheckoutErrorMessage({ cart, orderDetails, index });
                              return (
                                <Col key={index} lg={12} className="my-2">
                                  <div className="catpage_preview text-start pe-4 lg-pe-0 position-relative">
                                    {cart?.items?.map((item, idx) => {
                                      return (

                                        <div className="productd_wrap mb-2" key={idx}>
                                          <div className="productimmg_side w-25">
                                            <div className="product_img me-lg-4 me-3" style={{ width: "100px", height: "100px" }}>
                                              <img
                                                src={
                                                  cart?.product?.featured_image?.link ||
                                                  placeholder
                                                }
                                                alt=""
                                                className="img-fluid cursor-pointer"
                                                onClick={() => {
                                                  navigate(
                                                    ROUTES.PRODUCT_DETAIL +
                                                    "/" +
                                                    cart?.product?._id
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>

                                          <div className="d-flex justify-content-between gap-4 w-75">
                                            <div>
                                              <div>
                                                <h2 className="fs-6 mb-0">
                                                  {cart.product.name}
                                                  <p className="text-success fs-xs mb-1">
                                                    {getCouponDiscount({
                                                      orderDetails,
                                                      cart,
                                                      cartItem: item,
                                                    })}
                                                  </p>
                                                  <p className="text-theme-secondary fw-bold my-0">Price: ${fixedNumber(item.unitPrice)}</p>
                                                </h2>

                                                <div className="counter_div d-flex align-items-center gap-3">
                                                  <p className="fw-light mb-0 fs-xs"><span className="fw-medium">Quantity:</span> {item.quantity}</p>
                                                  {/* <AddToCart
                                                    className="fs-base"
                                                    value={item.quantity}
                                                    min={0}
                                                    onChange={(value) => {
                                                      manageCartQuantity({
                                                        cartList,
                                                        cartListIndex: index,
                                                        cart,
                                                        cartIndex: idx,
                                                        dispatch,
                                                        increase: true,
                                                        setValue: Math.max(
                                                          parseInt(value),
                                                          0
                                                        ),
                                                        callback: handleEmptyCart
                                                      });
                                                    }}
                                                    onDecrement={() =>
                                                      manageCartQuantity({
                                                        cartList,
                                                        cartListIndex: index,
                                                        cart,
                                                        cartIndex: idx,
                                                        dispatch,
                                                        increase: false,
                                                        callback: handleEmptyCart
                                                      })
                                                    }
                                                    onIncrement={() => {
                                                      manageCartQuantity({
                                                        cartList,
                                                        cartListIndex: index,
                                                        cart,
                                                        cartIndex: idx,
                                                        dispatch,
                                                        increase: true,
                                                        callback: handleEmptyCart
                                                      });
                                                    }}
                                                  /> */}
                                                </div>

                                                {item?.attributes?.length ? (
                                                  <>
                                                    <hr className="my-1" />

                                                    <p className="d-flex flex-wrap fs-xs fst-italic fw-light gap-2 mb-0">
                                                      {item?.attributes?.map((attribute, ind) => <span><span className="fw-medium">{attribute.attrName}. </span> {attribute.attrValue} {item.attributes.length - 1 !== ind ? " | " : ""}</span>)}
                                                    </p>
                                                  </>
                                                ) : null}
                                              </div>
                                            </div>

                                            {/* <div className="d-flex flex-column align-items-end">

                                              <Button className="trash-button border-0 mb-3"
                                                onClick={() =>
                                                  dispatch(
                                                    apiUpdateCart({
                                                      id: cart._id,
                                                      data: {
                                                        operateType: "MANUAL_DELETED",
                                                        items: [
                                                          {
                                                            _id: item._id,
                                                          },
                                                        ],
                                                      },
                                                      callback: handleEmptyCart
                                                    })
                                                  )
                                                }>
                                                <img width={15} height={15} src={ICON_TRASH} />
                                              </Button>
                                            </div> */}
                                          </div>
                                        </div>
                                      );
                                    })}

                                    {(!!checkoutMessage) ? (
                                      <div className="d-flex align-items-center justify-content-between gap-10 flex-wrap">
                                        <p className="text-danger text-start mb-0 fs-xs fst-italic">{checkoutMessage}</p>
                                      </div>
                                    ) : null}

                                  </div>
                                </Col>

                              )
                            })}
                          </Row>
                        ) : null}
                      </div>

                      <div className="use_thisadwrap p-3">
                        <Button
                          className="use_thisadd"
                          disabled={!isReadyToPlaceOrder(orderDetails || isLoadingOrder)}
                          onClick={handlePlaceOrder}
                          style={{
                            minWidth: "fit-content"
                          }}
                        >
                          Place your order
                        </Button>

                        <div className="d-flex flex-column text-start ms-4">
                          <p className="my-0 fs-5 fw-bold text-theme-secondary">Order Total: ${fixedNumber(orderDetails?.orderTotal || 0, 2, true)}</p>
                          <p className="fs-xs my-0">By placing your order, you agree to UZA's <Link to={ROUTES.PRIVACY_POLICY} target="_blank">privacy notice</Link> and <Link to={ROUTES.T_AND_C} target="_blank">conditions of use</Link>.</p>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <div className="checkout_acccinner border rounded-3">

              <div className="use_thisaddress px-3 pt-3">
                {activeKey === "0" ? (
                  <>
                    <Button className="use_thisadd w-100 mb-2" onClick={() => billingAddress?._id ? setActiveKey("1") : setShowAddressModal(true)}>
                      {billingAddress?._id ? "Use this Address" : "Add address"}
                    </Button>
                  </>
                ) : activeKey === "1" ? (
                  <>
                    <Button className="use_thisadd w-100 mb-2" onClick={() => shippingAddress?._id ? setActiveKey("2") : setShowAddressModal(true)}>
                      {shippingAddress?._id ? "Use this Address" : "Add address"}
                    </Button>
                  </>
                ) : activeKey === "2" ? (
                  <Button
                    className="use_thisadd"
                    onClick={() => setActiveKey("3")}
                  >
                    Use this payment method
                  </Button>
                ) : <>
                  <Button
                    className="use_thisadd"
                    disabled={!isReadyToPlaceOrder(orderDetails || isLoadingOrder)}
                    onClick={handlePlaceOrder}
                  >
                    Place your order
                  </Button>
                  <p className="fs-xs">By placing your order, you agree to UZA's <Link to={ROUTES.PRIVACY_POLICY} target="_blank">privacy notice</Link> and <Link to={ROUTES.T_AND_C} target="_blank">conditions of use</Link>.</p>
                </>}
              </div>
              <hr />

              <div className="summary_list p-3 pt-0">
                <h5 className="fw-bold text-start border-bottom w-100">Order Summary</h5>

                <ul>
                  <li>
                    <p>Items:</p>
                    <p>{orderDetails?.totalItems || 0}</p>
                  </li>
                  {orderDetails ? (
                    <>
                      <li>
                        <p>Sub Total</p>
                        <p>${fixedNumber(orderDetails?.subTotal || 0, 2, true)}</p>
                      </li>
                      <li>
                        <p>Tax Amount ({orderDetails.taxAmount}%)</p>
                        <p>${fixedNumber(orderDetails?.tax || 0, 2, true)}</p>
                      </li>
                      {orderDetails?.coupon ? (
                        <li>
                          <p>Coupon discount</p>
                          <p className="text-success">-${fixedNumber(orderDetails.couponAmount, 2, true)}</p>
                        </li>
                      ) : null}

                      <li>
                        <p>Delivery Fee</p>
                        <p className={shippingAddress && !(orderDetails?.deliveryFee || 0) ? "text-success" : ""}>
                          {shippingAddress && !orderDetails?.deliveryFee ? "Free" : shippingAddress ? "$" + fixedNumber(orderDetails?.deliveryFee || 0, 2, true) : "--"}
                        </p>
                      </li>
                    </>
                  ) : null}
                  <hr />
                  <li>
                    <h4>Order Total:</h4>
                    <h4>${fixedNumber(orderDetails?.orderTotal || 0, 2, true)}</h4>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Checkoutpage;
