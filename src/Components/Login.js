import React, { Component } from "react";
import goldFrame from "../Assets/images/Vector-cropped.png";

import eye from "../Assets/images/eye.svg";
import * as Yup from "yup";
import { Formik } from "formik";
import API from "./Api";
import { toast } from "react-toastify";

const LoginSchema = Yup.object().shape({
  // phone: Yup.number.required("required"),
  // password: Yup.string().required("required"),
});
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false,
      loginObject: {
        phone: "",
        password: "",
      },
    };
  }
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      passwordVisible: !prevState.passwordVisible,
    }));
  };

  handleChangeInput = (e, field) => {
    if (field === "phone") {
      let copy = { ...this.state.loginObject };
      copy.phone = e.target.value;
      this.setState({ loginObject: copy });
    } else {
      let copy = { ...this.state.loginObject };
      copy.password = e.target.value;
      this.setState({ loginObject: copy });
    }
  };

  handleLoginSubmit = () => {
    let values = {};
    values.phone = this.state.loginObject.phone;
    values.password = this.state.loginObject.password;
    API.post("auth/login", values)
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response.data.access_token);
          window.location.reload();
          window.location.reload();
          //useNavigate("/");
        }
      })
      .catch((error) => {
        toast.error("برجاء ادخال رقم هاتف و كلمة مرور صحيحة");
      });
  };
  render() {
    return (
      <div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6 right-login d-flex flex-column align-items-center justify-content-center">
              <div className="welcome-login">
                <svg
                  className="login-frame"
                  xmlns="http://www.w3.org/2000/svg"
                  width="453"
                  height="181"
                  viewBox="0 0 453 181"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M314.793 39.7361V2.3028H135.9C101.697 2.3028 70.4422 15.112 46.8433 36.2824C43.1723 39.5917 39.6165 43.057 36.3403 46.7718L36.3346 46.7783L36.3288 46.7847C15.219 70.3625 2.30652 101.587 2.30652 135.75V178.697H450.693V2.3028H407.7C373.497 2.3028 342.241 15.1126 318.642 36.2839L314.793 39.7361ZM453 0V181H0V135.75C0 100.998 13.137 69.2325 34.6092 45.25C37.9614 41.449 41.5854 37.9195 45.3 34.571C69.309 13.032 101.11 0 135.9 0H317.1V34.571C317.861 33.8882 318.63 33.214 319.407 32.5485C343.128 12.2189 374.012 0 407.7 0H453ZM274.107 138.053H42.9935V135.75C42.9935 84.6138 84.7044 42.9472 135.9 42.9472H274.107V138.053ZM410.007 138.053H314.793V135.75C314.793 84.6138 356.504 42.9472 407.7 42.9472H410.007V138.053ZM45.329 133.447C46.5582 84.6395 86.7501 45.25 135.9 45.25H271.8V135.75H45.3C45.3 134.98 45.3097 134.213 45.329 133.447ZM317.129 133.447C318.339 85.4052 357.299 46.4882 405.393 45.279C406.16 45.2597 406.929 45.25 407.7 45.25V135.75H317.1C317.1 134.98 317.11 134.213 317.129 133.447Z"
                    fill="#F3EFA1"
                    fill-opacity="0.1"
                  />
                </svg>
                <h3>أول سوق دواجن فى</h3>
                <span className="arabic-home">الوطن العربي</span>
                <br />
                <span className="welcome-info">
                  كل ما تحتاجه فى سوق الدواجن بداية من الاعلاف لدينا هنا
                </span>

                <div className="welcome-slider">
                  <div className="last-frame">
                    <img
                      className="gold-frame"
                      src={goldFrame}
                      alt="gold-frame"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 d-flex flex-column">
              <div className="dagin-plaform"></div>
              <div className="login-form">
                <h1 class="d-inline">مرحباً بك فى داچن</h1>
                <br />
                <span class="d-inline">تسجيل الدخول الى حسابك</span>
                <br />
                <Formik
                  onSubmit={() => this.handleLoginSubmit()}
                  initialValues={this.state.loginObject}
                  validationSchema={LoginSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <>
                      <form onSubmit={handleSubmit}>
                        <div style={{ position: "relative" }}>
                          <input
                            type="text"
                            placeholder="رقم الهاتف"
                            className="login-phone"
                            name="phone"
                            onBlur={handleBlur}
                            onChange={(e) => this.handleChangeInput(e, "phone")}
                            value={this.state.loginObject.phone}
                            id="phone"
                            required
                          />
                          <br />
                          <input
                            type={
                              this.state.passwordVisible ? "text" : "password"
                            }
                            placeholder="كلمة المرور "
                            className="login-password"
                            name="password"
                            onChange={(e) =>
                              this.handleChangeInput(e, "password")
                            }
                            value={this.state.loginObject.password}
                            id="password"
                            required
                          />
                          <span
                            className="toggle-password"
                            onClick={this.togglePasswordVisibility}
                          >
                            <img src={eye} alt="eye" className="eye-pw" />
                          </span>
                          <div className="login-password-append"></div>
                          <div>
                            <a href="#" className="forget-pw">
                              نسيت كلمة المرور؟
                            </a>
                            <p className="remember-me">
                              تذكرني
                              <input type="radio" className="remember-input" />
                            </p>
                          </div>
                          <div>
                            <button className="sign-in-btn">
                              تسجيل الدخول
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
