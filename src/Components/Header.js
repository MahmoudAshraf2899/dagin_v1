import React, { Component } from "react";
import notificationIcon from "../Assets/icons/Group.svg";
import profileImg from "../Assets/images/profileimg.svg";
import NotificationsPopUp from "./NotificationsPopUp";
import Mission from "./Missions/Mission";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotificationPopUp: false,
    };
  }
  componentDidMount() {}
  handleNotificationClick = () => {
    let openOrClose = this.state.showNotificationPopUp;
    this.setState({ showNotificationPopUp: !openOrClose });
    console.log("Start Shown Notification Pop Up");
  };
  render() {
    return (
      <div class="container mainPage">
        <div class="row">
          <div class="col">
            <h1 className="mainPageTitle">{this.props.title}</h1>
          </div>
          <div class="col-md-auto">
            <div class="input-box">
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                    stroke="#64748B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.5001 17.5L14.1667 14.1667"
                    stroke="#64748B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              <input type="text" className="inputSearch" placeholder="ابحث" />
            </div>
          </div>
          <div
            class="col col-lg-2"
            style={{ display: "flex", marginLeft: "-14px" }}
          >
            {/* Notification Icon */}
            <div
              className="notificationIcon"
              onClick={(e) => this.handleNotificationClick(e)}
            >
              <img src={notificationIcon} alt="notification icon" />
              <div className="notificationDot">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                >
                  <circle
                    cx="4"
                    cy="4"
                    r="3.5"
                    fill="url(#paint0_linear_1692_2585)"
                    stroke="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1692_2585"
                      x1="4"
                      y1="0"
                      x2="4"
                      y2="8"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#257659" />
                      <stop offset="1" stop-color="#124734" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            {/* Notification Icon */}
            {/* Profile Section */}
            <div className="profile-section">
              <div>
                <img
                  className="profile-photo"
                  src={profileImg}
                  alt="profile-img"
                />
              </div>

              <div className="user-info">
                <h3 className="user-name">رحمة محمد</h3>
                <span className="user-title">ادمن</span>
              </div>
            </div>
          </div>
          <div class="col col-lg-2" style={{ marginLeft: "-120px" }}>
            <div className="arrow-down">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M4 6.5L8 10.5L12 6.5"
                  stroke="#94A3B8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          {/* Profile Section */}
        </div>
        {this.props.selectedItem === 1 ? (
          <>
            <Mission />
          </>
        ) : null}

        {/* Notification Pop Up */}
        {this.state.showNotificationPopUp === true ? (
          <>
            <NotificationsPopUp />
          </>
        ) : null}
      </div>
    );
  }
}
export default Header;
