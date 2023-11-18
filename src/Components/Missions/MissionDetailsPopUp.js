import React, { Component } from "react";
import closeIcon from "../../Assets/images/Close Icon.svg";
class MissionDetailsPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closePopUp: false,
    };
  }
  componentDidMount() {}
  closePopUp = () => this.setState({ closePopUp: true });

  render() {
    return (
      <div
        style={{ display: this.state.closePopUp === true ? "none" : "unset" }}
      >
        <div class="Details-PopUp-Container">
          <div class="container">
            <div class="row">
              <div
                class="col"
                style={{ marginTop: "15px", marginBottom: "8px" }}
              >
                <div className="mission-details">
                  <span className="mission-details-span">تفاصيل المهمة</span>
                </div>
              </div>
              <div class="col-md-auto">
                <svg
                  style={{ marginLeft: "15px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22 12V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H12M15.6864 4.02275C15.6864 4.02275 15.6864 5.45305 17.1167 6.88334C18.547 8.31364 19.9773 8.31364 19.9773 8.31364M9.15467 15.9896L12.1583 15.5605C12.5916 15.4986 12.9931 15.2978 13.3025 14.9884L21.4076 6.88334C22.1975 6.09341 22.1975 4.81268 21.4076 4.02275L19.9773 2.59245C19.1873 1.80252 17.9066 1.80252 17.1167 2.59245L9.01164 10.6975C8.70217 11.0069 8.50142 11.4084 8.43952 11.8417L8.01044 14.8453C7.91508 15.5128 8.4872 16.0849 9.15467 15.9896Z"
                    stroke="#28303F"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <svg
                  style={{ marginLeft: "15px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 8V18C5 20.2091 6.79086 22 9 22H15C17.2091 22 19 20.2091 19 18V8M14 11V17M10 11L10 17M16 5L14.5937 2.8906C14.2228 2.3342 13.5983 2 12.9296 2H11.0704C10.4017 2 9.7772 2.3342 9.40627 2.8906L8 5M16 5H8M16 5H21M8 5H3"
                    stroke="#EB001B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <img
                  onClick={() => this.closePopUp()}
                  src={closeIcon}
                  alt="close-icon"
                />
              </div>
            </div>
            <div className="details-popup-border"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default MissionDetailsPopUp;
