import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

import PasswordField from "../../Components/Common/PasswordField";

import { APP_NAME } from "../../config/constants";
import ROUTES from "../../helpers/routesHelper";
import { getCredentials, removeCredentials, saveCredentials } from "../../helpers/authHelper";
import { apiLogin } from "../../store/auth/actions";

import Logo from "../../assets/images/logo.png";
import { ICON_USER } from "../../assets/svg";
import MobileNumberField, { MobileError } from "../../Components/Common/MobileNumberField";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState("");
  const [initialValues, setInitialValues] = useState({
    password: "",
    mobileNumber: "",
    countryCode: "",
    rememberMe: false,
  });

  const validationSchema = Yup.object().shape({
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
  });

  const onSubmit = (data, form) => {
    dispatch(
      apiLogin({
        data: {
          password: data.password,
          mobileNumber: data.mobileNumber,
          countryCode: data.countryCode,
        },
        callback: () => {
          if (data.rememberMe) {
            saveCredentials(data);
          } else {
            removeCredentials();
          }
          navigate(ROUTES.HOME);
        },
      })
    );
  };

  useEffect(() => {
    const credentials = getCredentials();
    if (credentials) {
      setInitialValues((s) => ({ ...s, ...credentials }));
      setMobileNumber(`${credentials?.countryCode + credentials.mobileNumber}`)
    }
  }, []);

  return (
    <section className="signin d-flex align-items-center">
      <Helmet>
        <title>{APP_NAME} | Sign in</title>
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
          <h4 className="mb-4">USER LOGIN</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {(form) => {
              return (
                <Form>
                  <FormGroup className="position-relative signupinput_phone mb-3">
                    <div
                      className="d-flex align-items-center inputWithBtn iconWithText position-relative ps-5 login-phone"
                      style={{
                        background: "var(--theme-color)",
                        borderRadius: "15px",
                      }}
                    >
                      <span
                        className="icn position-absolute"
                        style={{ left: 14 }}
                      >
                        {ICON_USER}
                      </span>
                      <MobileNumberField
                        defaultValue={mobileNumber}
                        callback={(countryCode, mobileNumber) => {
                          form.setFieldValue("countryCode", countryCode);
                          form.setFieldValue("mobileNumber", mobileNumber);
                        }} />
                    </div>
                    <MobileError
                      name="mobileNumber"
                      value={form.values?.mobileNumber} />
                  </FormGroup>

                  <PasswordField className="mb-3" />

                  <div className="remember_me d-flex align-items-center justify-content-between">
                    <FormGroup check>
                      <Label check>
                        <Field
                          type="checkbox"
                          name="rememberMe"
                          className="form-check-input"
                        />
                        Remember me
                      </Label>
                    </FormGroup>

                    <div className="forgot_pasword">
                      <Link to={ROUTES.FORGOT}>Forgot Password?</Link>
                    </div>
                  </div>

                  <div className="create_account text-center">
                    <p>
                      Don't have any account{" "}
                      <Link to={ROUTES.SIGNUP}>Create Account</Link>
                    </p>
                  </div>

                  <div className="mt-5">
                    <Button className="auth_btn" type="submit">
                      Login
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

export default Signin;
