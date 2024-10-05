import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, Label } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { getCredentials, removeCredentials, saveCredentials } from "../../helpers/authHelper";
import { apiLogin } from "../../store/auth/actions";

import { ICON_LOCK, ICON_USER } from "../../assets/svg";
import MobileNumberField, { MobileError } from "../Common/MobileNumberField";
import PasswordField from "../Common/PasswordField";

const Signin = ({ handleClose }) => {
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
          handleClose();
          toast.success("Login successful");
        },
      })
    );
  };

  useEffect(() => {
    const credentials = getCredentials();
    if (credentials) {
      setInitialValues((s) => ({ ...s, ...credentials }));
      setMobileNumber(`${credentials?.countryCode || ""}${credentials?.mobileNumber || ""}`)
    }
  }, []);
  return (
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
                      callback={(code, number) => {
                        form.setFieldValue("countryCode", code);
                        form.setFieldValue("mobileNumber", number);
                      }}
                    />
                  </div>
                  <MobileError
                    value={form.values?.mobileNumber}
                  />
                </FormGroup>

                <PasswordField />

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
                    <Link to="#">Forgot Password</Link>
                  </div>
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
  );
};

export default Signin;

// svg

const signinicon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="#f3b04c"
      d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18m2 0h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T12 15t-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2zm6-8q.825 0 1.413-.587T14 8t-.587-1.412T12 6t-1.412.588T10 8t.588 1.413T12 10m0 8"
    ></path>
  </svg>
);
