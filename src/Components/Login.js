import React, { Component } from "react";
import chickenImg from "../Assets/images/farm_chicken_and_eggs copy 2 (1).png";
import rectangleSlider from "../Assets/images/Rectangle 19.png";
import daginPlatform from "../Assets/images/WhatsApp Image 2023-05-20 at 12.57 1.png";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="big-section">
          <div
            class="d-lg-flex-column-reverse half"
            style={{ display: "-webkit-box", height: "auto" }}
          >
            <div
              class="container bg order-1 order-md-2 "
              style={{ backgroundColor: "#124734", marginRight: "-20px" }}
            >
              <div className="login-img">
                <svg
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
              </div>
              <div className="content-container">
                <h3 className="arabic-home-h3">أول سوق دواجن فى</h3>
                <span className="arabic-home-span">الوطن العربي</span>
                <br />
                <span className="arabic-home-span-1">
                  كل ما تحتاجه فى سوق الدواجن بداية من الاعلاف لدينا هنا
                </span>
              </div>

              <div className="content-slider">
                <span class="d-inline" style={{ marginLeft: "4px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                  >
                    <circle opacity="0.5" cx="3" cy="3" r="3" fill="#F3EFA1" />
                  </svg>
                </span>
                <span class="d-inline" style={{ marginLeft: "4px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                  >
                    <circle opacity="0.5" cx="3" cy="3" r="3" fill="#F3EFA1" />
                  </svg>
                </span>
                <span class="d-inline">
                  <img src={rectangleSlider} alt="rectangle-slider" />
                </span>
              </div>
              {/* <div className="chicken-section">
                <div>
                  <img src={chickenImg} alt="chicken" />
                </div>
              </div> */}
            </div>

            <div class="contents order-2 order-md-1">
              <div class="container">
                <div class="row align-items-center justify-content-center">
                  <div class="col-md-7">
                    <div class="mb-4">
                      <p class="text-center  m-0 px-3 py-2">
                        <span className="welcome-to">مرحباً بك في</span>
                        <span class="dagin-word">داچن</span>
                      </p>
                      <p className="register-hightlight">
                        تسجيل الدخول الى حسابك
                      </p>
                    </div>
                    <form action="#" method="post">
                      <div className="form-container text-center">
                        <div class="input-container">
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <rect
                                x="5"
                                y="2"
                                width="14"
                                height="20"
                                rx="3"
                                stroke="#28303F"
                                stroke-width="1.5"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11 19H13"
                                stroke="#28303F"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </i>
                          <input
                            type="text"
                            class="form-control custom-input"
                            placeholder="رقم الهاتف"
                          />
                        </div>

                        <div>
                          <input type="password" required />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
