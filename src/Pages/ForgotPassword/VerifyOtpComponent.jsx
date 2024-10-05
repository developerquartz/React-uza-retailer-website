import React from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import ROUTES from "../../helpers/routesHelper";
import { apiVerifyOtp } from "../../store/auth/actions";
import { setForgotPasswordOtp } from "../../store/auth/slice";

import { ICON_MOBILE_OTP } from "../../assets/svg";

const VerifyOtpComponent = ({ setMobileVerified }) => {
  const dispatch = useDispatch();
  const { forgotPassword } = useSelector((s) => s.auth);

  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string().min(4, "OTP must be at least 4 characters").max(4, "OTP must be at most 4 characters").required(),
  });

  const onSubmit = (data, form) => {
    dispatch(
      apiVerifyOtp({
        data: {
          otp: data.otp,
          mobileNumber: forgotPassword.mobileNumber,
          countryCode: forgotPassword.countryCode,
          type: "mobile",
        },
        callback: (res) => {
          setMobileVerified(true);
          dispatch(setForgotPasswordOtp(data.otp));
        },
      })
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(form) => {
        return (
          <Form>
            <FormGroup>
              <div className="position-relative">
                <label htmlFor="otp">Verification Code</label>
                <Field
                  className="form-control send-otp-email"
                  name="otp"
                  id="otp"
                  placeholder="Enter verification code"
                />
                <div className="auth_icon">{ICON_MOBILE_OTP}</div>
              </div>
              <ErrorMessage
                className="text-danger"
                component={"p"}
                name="otp"
              />
            </FormGroup>

            <div className="create_account text-center">
              <p>
                <Link to={ROUTES.LOGIN}>BACK TO LOGIN</Link>
              </p>
            </div>

            <div className="mt-5">
              <Button className="auth_btn" type="submit">
                Verify OTP
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default VerifyOtpComponent;
