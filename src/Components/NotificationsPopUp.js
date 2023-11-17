import React, { Component } from "react";

class NotificationsPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotificationPopUp: this.props.ShowPopUp,
    };
  }
  componentDidMount() {}

  render() {
    return (
      <div
        className="modal-body "
        style={{
          position: "fixed",
          top: "0px",
          left: "125px",
          marginTop: "111px",
          width: "382px",
          height: "327px",
          flexShrink: 0,
          borderRadius: "26px",
          background: "var(--white-general, #FFF)",
          boxShadow: "0px 4px 120px 0px rgba(169, 173, 180, 0.15)",
        }}
      >
        <div className="notification-header">
          <div>
            <h5 className="notification-title">إشعار</h5>
            <p className="notification-counter">لديك 6 تحديثات</p>
          </div>
          <div className="notification-settings">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                stroke="#2C3659"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.66675 10.7334V9.2667C1.66675 8.40003 2.37508 7.68336 3.25008 7.68336C4.75841 7.68336 5.37508 6.6167 4.61675 5.30836C4.18341 4.55836 4.44175 3.58336 5.20008 3.15003L6.64175 2.32503C7.30008 1.93336 8.15008 2.1667 8.54175 2.82503L8.63341 2.98336C9.38341 4.2917 10.6167 4.2917 11.3751 2.98336L11.4667 2.82503C11.8584 2.1667 12.7084 1.93336 13.3667 2.32503L14.8084 3.15003C15.5667 3.58336 15.8251 4.55836 15.3917 5.30836C14.6334 6.6167 15.2501 7.68336 16.7584 7.68336C17.6251 7.68336 18.3417 8.3917 18.3417 9.2667V10.7334C18.3417 11.6 17.6334 12.3167 16.7584 12.3167C15.2501 12.3167 14.6334 13.3834 15.3917 14.6917C15.8251 15.45 15.5667 16.4167 14.8084 16.85L13.3667 17.675C12.7084 18.0667 11.8584 17.8334 11.4667 17.175L11.3751 17.0167C10.6251 15.7084 9.39175 15.7084 8.63341 17.0167L8.54175 17.175C8.15008 17.8334 7.30008 18.0667 6.64175 17.675L5.20008 16.85C4.44175 16.4167 4.18341 15.4417 4.61675 14.6917C5.37508 13.3834 4.75841 12.3167 3.25008 12.3167C2.37508 12.3167 1.66675 11.6 1.66675 10.7334Z"
                stroke="#2C3659"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <div class="container mt-3">
          <div class="row">
            <div class="col-md-12 offset-md-3">
              <div class="center-content text-center margin-bottom">
                <svg
                  className="new-notification-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M6.79896 18.3333C8.2613 18.3333 9.48958 17.3362 9.83453 15.9879C9.94122 15.5709 10.2818 15.2167 10.7142 15.2167H16.1956M6.79896 18.3333C5.06909 18.3333 3.66675 16.938 3.66675 15.2167V5.0875C3.66675 3.79653 4.7185 2.75 6.01591 2.75H13.8464C15.1439 2.75 16.1956 3.79653 16.1956 5.0875V15.2167M6.79896 18.3333H16.1956C17.6579 18.3333 18.8862 17.3362 19.2312 15.9879C19.3379 15.5709 18.9772 15.2167 18.5448 15.2167H16.1956M13.0634 6.64583H6.79896M9.93118 10.5417H6.79896"
                    stroke="#70D44B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <span class="ml-2 new-notification">
                  هناك مهمة جديدة قيد التقييم
                  <br />
                  <span className="mission-title">عنوان المهمه هنا</span>
                  <br />
                  <span className="mission-date">
                    23 يونيو 2022 الساعة 21:22 مساءً
                  </span>
                </span>
              </div>
            </div>
            <div class="col-md-12 offset-md-3">
              <div class="center-content text-center margin-bottom">
                <svg
                  className="new-notification-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M6.79896 18.3333C8.2613 18.3333 9.48958 17.3362 9.83453 15.9879C9.94122 15.5709 10.2818 15.2167 10.7142 15.2167H16.1956M6.79896 18.3333C5.06909 18.3333 3.66675 16.938 3.66675 15.2167V5.0875C3.66675 3.79653 4.7185 2.75 6.01591 2.75H13.8464C15.1439 2.75 16.1956 3.79653 16.1956 5.0875V15.2167M6.79896 18.3333H16.1956C17.6579 18.3333 18.8862 17.3362 19.2312 15.9879C19.3379 15.5709 18.9772 15.2167 18.5448 15.2167H16.1956M13.0634 6.64583H6.79896M9.93118 10.5417H6.79896"
                    stroke="#70D44B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <span class="ml-2 new-notification">
                  هناك مهمة جديدة قيد التقييم
                  <br />
                  <span className="mission-title">عنوان المهمه هنا</span>
                  <br />
                  <span className="mission-date">
                    23 يونيو 2022 الساعة 21:22 مساءً
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NotificationsPopUp;
