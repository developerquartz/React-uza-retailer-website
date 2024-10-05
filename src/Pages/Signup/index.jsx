import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

import PasswordField from "../../Components/Common/PasswordField";

import { APP_NAME } from "../../config/constants";
import ROUTES from "../../helpers/routesHelper";
import { apiRegister, apiVerifyEmail, apiVerifyMobile, apiVerifyOtp } from "../../store/auth/actions";

import Logo from "../../assets/images/logo.png";
import { ICON_EMAIL_OTP, ICON_MOBILE_OTP, ICON_RELOAD, ICON_USER } from "../../assets/svg";
import MobileNumberField, { MobileError } from "../../Components/Common/MobileNumberField";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    countryCode: "",
    mobileOtp: "",
    emailOtp: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .test(
        "len",
        "Password must be at least 6 characters",
        (val) => val && val.length >= 6
      )
      .test("number", "Password must contain at least 1 number", (val) =>
        /\d/.test(val)
      )
      .test("letter", "Password must contain at least 1 letter", (val) =>
        /[a-zA-Z]/.test(val)
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    mobileNumber: Yup.string()
      .matches(/^\d+$/, "Mobile number must contain only digits")
      .min(10, "Mobile number must be at least 10 digits long")
      .required("Mobile number is required"),
    countryCode: Yup.string()
      .matches(
        /^\+\d+$/,
        "Country code must start with a '+' and contain only digits"
      )
      .required("Country code is required"),
    mobileOtp: Yup.string().required(),
    emailOtp: Yup.string().required(),
  });

  const sendOtp = (data, api, callback) => {
    dispatch(
      api({
        data,
        callback: (res) => {
          callback(true);
          toast.success(res.message);
        },
      })
    );
  };

  const verifyOtp = (data, callback) => {
    dispatch(
      apiVerifyOtp({
        data,
        callback: (res) => {
          callback(true);
          toast.success(res.message);
        },
      })
    );
  };

  const onSubmit = (data, form) => {
    if (!emailVerified) {
      toast.error("Email is not verified");
      return;
    }

    if (!mobileVerified) {
      toast.error("Mobile is not verified");
      return;
    }

    dispatch(
      apiRegister({
        data,
        callback: () => {
          navigate(ROUTES.HOME);
        },
      })
    );
  };

  return (
    <section className="signin d-flex align-items-center">
      <Helmet>
        <title>{APP_NAME} | Sign up</title>
      </Helmet>
      <div className="welcome_side text-start position-relative">
        <div className="overlay_set"></div>
        <div className="inner_welcome">
          <Link to={ROUTES.HOME}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M10.589 12.5H15q.213 0 .356-.144t.144-.357t-.144-.356T15 11.5h-4.411l1.765-1.766q.14-.133.14-.34t-.14-.348t-.347-.14q-.208 0-.341.14l-2.389 2.389q-.242.242-.242.565t.242.566l2.389 2.388q.14.14.344.13q.204-.009.344-.15t.14-.347t-.14-.34zm1.414 8.5q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709"
              />
            </svg>
          </Link>
          <div
            className="logo_here cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="" className="img-fluid" />
          </div>
          <h2>
            Welcome <br /> <span>To the website</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            obcaecati sed laudantium numquam at soluta quia aliquam adipisci
            itaque ipsum.
          </p>
        </div>
      </div>

      <div className="auth_login_form position-relative">
        <div className="login_auth">
          <h4 className="mb-4">USER SIGNUP</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(form) => {
              return (
                <Form>
                  <FormGroup className="position-relative">
                    {emailOtpSent ? (
                      <div className="postion-relative verify_input mb-3">
                        <div className="auth_icon">{ICON_USER}</div>
                        <div
                          className="retry-credentials"
                          onClick={() => {
                            form.setFieldValue("email", "");
                            setEmailOtpSent(false);
                            setEmailVerified(false);
                          }}
                        >
                          {ICON_RELOAD}
                        </div>
                        <p
                          style={{
                            width: "calc(100% - 50px)",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          {form.values.email}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="d-flex align-items-center inputWithBtn">
                          <div className="position-relative inputWrp">
                            <Field
                              className="form-control send-otp-email"
                              name="email"
                              id="email"
                              placeholder="Email"
                            />
                            <div className="auth_icon">{ICON_USER}</div>
                          </div>
                          <Button
                            onClick={() =>
                              sendOtp(
                                {
                                  email: form.values.email,
                                },
                                apiVerifyEmail,
                                setEmailOtpSent
                              )
                            }
                            className="send-otp-btn"
                            disabled={
                              !!form.errors?.email || !form.values.email
                            }
                          >
                            Send OTP
                          </Button>
                        </div>
                        <ErrorMessage
                          name="email"
                          component="p"
                          className="text-danger"
                        />
                      </>
                    )}
                  </FormGroup>

                  <FormGroup className="position-relative">
                    {emailOtpSent && !emailVerified ? (
                      <>
                        <div className="d-flex align-items-center inputWithBtn">
                          <div className="position-relative inputWrp">
                            <Field
                              className="form-control send-otp-email"
                              name="emailOtp"
                              id="emailOtp"
                              placeholder="Enter Email OTP"
                            />
                            <div className="auth_icon">{ICON_EMAIL_OTP}</div>
                          </div>
                          <Button
                            className="send-otp-btn"
                            onClick={() =>
                              verifyOtp(
                                {
                                  otp: form.values.emailOtp,
                                  email: form.values.email,
                                  type: "email",
                                },
                                setEmailVerified
                              )
                            }
                            disabled={
                              !!form.errors?.emailOtp || !form.values.emailOtp
                            }
                          >
                            Verify OTP
                          </Button>
                        </div>
                      </>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="position-relative">
                    <div className="signupinput_phone mb-3">
                      {mobileOtpSent ? (
                        <>
                          <div className="postion-relative verify_input mb-3">
                            <div className="auth_icon">{ICON_USER}</div>
                            <div
                              className="retry-credentials"
                              onClick={() => {
                                form.setFieldValue("mobileNumber", "");
                                form.setFieldValue("countryCode", "");
                                setMobileOtpSent(false);
                                setMobileVerified(false);
                              }}
                            >
                              {ICON_RELOAD}
                            </div>
                            <p>
                              {form.values.countryCode}{" "}
                              {form.values.mobileNumber}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="d-flex align-items-center inputWithBtn iconWithText position-relative ps-5"
                            style={{
                              background: "var(--theme-color)",
                              height: "40px",
                              borderRadius: "15px 20px 20px 15px",
                            }}
                          >
                            <span
                              className="icn position-absolute"
                              style={{ left: 14 }}
                            >
                              {ICON_USER}
                            </span>
                            <MobileNumberField
                              className="send-otp-email"
                              callback={(code, number) => {
                                form.setFieldValue("countryCode", code);
                                form.setFieldValue("mobileNumber", number);
                              }}
                            />

                            <Button
                              className="send-otp-btn"
                              style={{ opacity: 1 }}
                              onClick={() =>
                                sendOtp(
                                  {
                                    mobileNumber: form.values.mobileNumber,
                                    countryCode: form.values.countryCode,
                                  },
                                  apiVerifyMobile,
                                  setMobileOtpSent
                                )
                              }
                              disabled={
                                (!!form.errors?.mobileNumber &&
                                  form.values.mobileNumber.length < 10) ||
                                !form.values.mobileNumber
                              }
                            >
                              Send OTP
                            </Button>
                          </div>
                          <MobileError
                            name="mobileNumber"
                            value={form.values?.mobileNumber}
                          />
                        </>
                      )}
                    </div>
                  </FormGroup>

                  <FormGroup className="position-relative">
                    {mobileOtpSent && !mobileVerified ? (
                      <>
                        <div className="d-flex align-items-center inputWithBtn">
                          <div className="position-relative inputWrp">
                            <Field
                              className="form-control send-otp-email"
                              name="mobileOtp"
                              id="mobileOtp"
                              placeholder="Enter Mobile OTP"
                            />
                            <div className="auth_icon">{ICON_MOBILE_OTP}</div>
                          </div>
                          <Button
                            className="send-otp-btn"
                            onClick={() =>
                              verifyOtp(
                                {
                                  otp: form.values.mobileOtp,
                                  mobileNumber: form.values.mobileNumber,
                                  countryCode: form.values.countryCode,
                                  type: "mobile",
                                },
                                setMobileVerified
                              )
                            }
                            disabled={
                              !!form.errors?.mobileOtp || !form.values.mobileOtp
                            }
                          >
                            Verify OTP
                          </Button>
                        </div>
                      </>
                    ) : null}
                  </FormGroup>

                  <PasswordField className="mb-3" />

                  <PasswordField
                    className="mb-3"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />

                  <div className="create_account text-center">
                    <p>
                      Have Already Account <Link to={ROUTES.LOGIN}>LOGIN</Link>
                    </p>
                  </div>

                  <div className="mt-5">
                    <Button
                      className="auth_btn"
                      type="submit"
                      disabled={!emailVerified || !mobileVerified}
                    >
                      Register
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Signup;
