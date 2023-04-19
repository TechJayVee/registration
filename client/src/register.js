import "./App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Footer from "./components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faFacebookF,
  faGoogle,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as Yup from "yup";
import { useState } from "react";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Register = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (data.error) {
          setErrorMessage(data.error);
        }
        if (response.ok) {
          navigate("/login");
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="container">
          <h4 className="signup-header">Create an account</h4>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          <Field className="field" name="firstName" placeholder="First Name" />
          <span className="error-msg">
            {" "}
            <ErrorMessage name="firstName" />
          </span>
          <Field className="field" name="lastName" placeholder="Last Name" />
          <span className="error-msg">
            {" "}
            <ErrorMessage name="lastName" />
          </span>
          <Field
            className="field"
            name="email"
            placeholder="Email"
            type="email"
          />
          <span className="error-msg">
            {" "}
            <ErrorMessage name="email" />
          </span>
          <Field
            className="field"
            name="password"
            type="password"
            placeholder="Password"
          />
          <span className="error-msg">
            <ErrorMessage name="password" />
          </span>
          <Field
            className="field"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <span className="error-msg">
            <ErrorMessage name="confirmPassword" />
          </span>
          <button type="submit" className="button">
            Create an account
          </button>
          or
          <button type="submit" className="button-google">
            <FontAwesomeIcon icon={faGoogle} />
            <span className="icon-text">Create an account with Google </span>
          </button>
          <button type="submit" className="button-social">
            <FontAwesomeIcon icon={faFacebookF} />
            <span className="icon-text">Create an account with Facebook</span>
          </button>
          <button type="submit" className="button-social">
            <FontAwesomeIcon icon={faLinkedinIn} />
            <span className="icon-text">Create an account with LinkedIn </span>
          </button>
          <Footer
            signing={"By registering, you understand and agree to NEUST's "}
            new={"Already have an account? "}
            create={"Log in "}
            url={"/login"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Register;
