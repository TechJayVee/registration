import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Footer from "./components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGoogle,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values) => {
        try {
          const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          const data = await response.json();
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          if (data.error) {
            setErrorMessage(data.error);
          }
          if (data.token) {
            navigate("/dashboard");
          }
        } catch (error) {
          setErrorMessage(error);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="container">
          <h4 className="signup-header">Log in to your account</h4>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          <Field
            className="field"
            name="email"
            placeholder="Email"
            type="email"
            autoComplete="email"
          />
          {errors.email && touched.email ? (
            <div className="error-msg">{errors.email}</div>
          ) : null}
          <Field
            className="field"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
          />
          {errors.password && touched.password ? (
            <div className="error-msg">{errors.password}</div>
          ) : null}
          <button type="submit" className="button">
            Log in
          </button>
          or
          <button type="submit" className="button-google">
            <FontAwesomeIcon icon={faGoogle} />
            <span className="icon-text">Log in with Google </span>
          </button>
          <button type="submit" className="button-social">
            <FontAwesomeIcon icon={faFacebookF} />
            <span className="icon-text">Log in with Facebook</span>
          </button>
          <button type="submit" className="button-social">
            <FontAwesomeIcon icon={faLinkedinIn} />
            <span className="icon-text">Log in with LinkedIn </span>
          </button>
          <Footer
            signing={" By signing in, you understand and agree to NEUST's "}
            new={"New to NEUST? "}
            create={"Create an account for FREE now "}
            url={"/"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Login;
