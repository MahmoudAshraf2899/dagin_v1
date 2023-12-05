import React, { Component } from "react";
import profileImg from "../../Assets/images/profileimg.svg";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserType: 0,
    };
  }
  componentDidMount() {}

  handleSelectUserType = (e) => {
    this.setState({ selectedUserType: e });
  };
  render() {
    return (
      <div class="container usersPage">
        <div class="row">
          <div
            class="col"
            style={{
              display: this.state.showAddComponent === true ? "none" : "unset",
            }}
          >
            <div
              onClick={() => this.handleSelectUserType(0)}
              className={
                this.state.selectedUserType === 0
                  ? "user-type-active"
                  : "user-type"
              }
            >
              <span
                class="d-inline"
                id={
                  this.state.selectedUserType === 0
                    ? "user-type-span-active"
                    : "user-type-span"
                }
              >
                حسابات مفعلة
              </span>
            </div>
            <div
              onClick={() => this.handleSelectUserType(1)}
              className={
                this.state.selectedUserType === 1
                  ? "user-type-active"
                  : "user-type"
              }
            >
              <span
                class="d-inline"
                id={
                  this.state.selectedUserType === 1
                    ? "user-type-span-active"
                    : "user-type-span"
                }
              >
                حسابات غير مفعلة
              </span>
            </div>
          </div>

          <div
            class="col col-lg-2"
            onClick={() => this.showAddNewMissionComponent()}
            style={{
              display: this.state.showAddComponent === true ? "none" : "unset",
            }}
          >
            <div className="Add-New-account">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M10.5049 1.02539C6.02189 1.02539 2.375 4.67228 2.375 9.15527C2.375 13.6383 6.02189 17.2852 10.5049 17.2852C14.9879 17.2852 18.6348 13.6383 18.6348 9.15527C18.6348 4.67228 14.9879 1.02539 10.5049 1.02539ZM14.0617 9.83272H11.1823V12.7121C11.1823 13.0861 10.8789 13.3895 10.5049 13.3895C10.1309 13.3895 9.82743 13.0861 9.82743 12.7121V9.83272H6.94806C6.57404 9.83272 6.27061 9.52929 6.27061 9.15527C6.27061 8.78126 6.57404 8.47782 6.94806 8.47782H9.82743V5.59845C9.82743 5.22443 10.1309 4.921 10.5049 4.921C10.8789 4.921 11.1823 5.22443 11.1823 5.59845V8.47782H14.0617C14.4357 8.47782 14.7392 8.78126 14.7392 9.15527C14.7392 9.52929 14.4357 9.83272 14.0617 9.83272Z"
                  fill="white"
                />
              </svg>
              <span className="Add-account-btn">اضافة حساب</span>
            </div>
          </div>
        </div>
        {/* Users List */}
        <div
          className="container"
          style={{
            backgroundColor: "#F1F5F9",
            height: "100vw",
            width: "100vw",
            marginTop: "15px",
          }}
        >
          <div class="row">
            <div class="col-6" style={{ marginTop: "50px" }}>
              <div className="user-card">
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <img
                    className="profile-photo"
                    src={profileImg}
                    alt="profile-img"
                  />
                  <div
                    style={{ display: "inline-grid", paddingRight: "0.5rem" }}
                  >
                    <span className="account-name">رحمة محمد</span>
                    <span className="filed-type-content">
                      <span className="filed-type">نوع التخصص</span>. حديث
                      التخرج . عضو منذ ١٢\١٠\٢٠٢٣
                    </span>
                  </div>
                  <div style={{ marginLeft: "auto" }}>icon</div>
                </div>

                <div className="user-info">
                  <h3 className="user-name">رحمة محمد</h3>
                  <span className="user-title">ادمن</span>
                </div>
              </div>
            </div>
            <div class="col-6" style={{ marginTop: "50px" }}>
              Left Section
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Users;
