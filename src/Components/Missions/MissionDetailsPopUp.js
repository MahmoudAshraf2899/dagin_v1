import React, { Component } from "react";
import closeIcon from "../../Assets/images/Close Icon.svg";
import Ellipse from "../../Assets/images/Ellipse 3.svg";
import downloadImg from "../../Assets/images/Download.svg";
import API from "../Api";
import moment from "moment";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import "moment/locale/ar"; // Import the Arabic locale

class MissionDetailsPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closePopUp: false,
      showEvaluationModal: false,
      selectedEvaluation: 1,
      data: {},
      salesman: {},
    };
  }
  componentDidMount() {
    console.log("missionType:", this.props.missionType);
    API.get(`dashboard/missions/${this.props.id}`).then((res) => {
      if (res.status === 200) {
        this.setState({ data: res.data, salesman: res.data.salesman });
      } else {
      }
    });
  }
  closePopUp = () => this.setState({ closePopUp: true });

  sendAlert = () => {
    console.log("Alert Has Been Sent");
  };
  sendPropsToDeleteObject = () => {
    const data = this.props.id;
    // Call the callback function passed from the parent
    this.props.deletedElement(data);
  };
  showEvaluationPopUp = () => this.setState({ showEvaluationModal: true });

  handleDeleteMission = () => {
    API.delete(`dashboard/missions/${this.props.id}`).then((res) => {
      if (res.status === 200) {
        this.sendPropsToDeleteObject();
        this.closePopUp();
      }
    });
  };

  closeEvaluationPopUp = () => this.setState({ showEvaluationModal: false });

  handleEvaluation = (e) => this.setState({ selectedEvaluation: e });

  renderEvaluationPopUp = () => {
    return (
      <div>
        <div class="Evaluation-PopUp-Container">
          <div class="container">
            {/* تفاصيل المهمة */}
            <div class="row">
              <div
                class="col"
                style={{ marginTop: "25px", marginBottom: "8px" }}
              >
                <div className="mission-details">
                  <span className="mission-details-span">تفاصيل المهمة</span>
                </div>
              </div>
              <div class="col-md-auto" style={{ marginTop: "25px" }}>
                <img
                  onClick={() => this.closeEvaluationPopUp()}
                  src={closeIcon}
                  alt="close-icon"
                  style={{ marginLeft: "27.5px" }}
                />
              </div>
            </div>

            <div className="details-popup-border"></div>
            <div class="row">
              <div>
                <div>
                  <div>
                    <div className="container">
                      <div className="row">
                        <div class="col-sm-10">
                          <span className="mission-span-2">
                            ما هو تقييمك لهذه المهمة
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col">
                          <div className="mission-info">
                            <div
                              class={
                                this.state.selectedEvaluation === 1
                                  ? "d-inline isActiveEvaluation"
                                  : "d-inline normal-eval"
                              }
                              onClick={() => this.handleEvaluation(1)}
                            >
                              <span>غير مرضي</span>
                            </div>
                            <div
                              class={
                                this.state.selectedEvaluation === 2
                                  ? "d-inline isActiveEvaluation"
                                  : "d-inline normal-eval"
                              }
                              onClick={() => this.handleEvaluation(2)}
                            >
                              <span>جيد</span>
                            </div>
                            <div
                              class={
                                this.state.selectedEvaluation === 3
                                  ? "d-inline isActiveEvaluation"
                                  : "d-inline normal-eval"
                              }
                              onClick={() => this.handleEvaluation(3)}
                            >
                              <span>جيد جداً</span>
                            </div>
                            <div
                              class={
                                this.state.selectedEvaluation === 4
                                  ? "d-inline isActiveEvaluation"
                                  : "d-inline normal-eval"
                              }
                              onClick={() => this.handleEvaluation(4)}
                            >
                              <span>استثنائي</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="details-popup-border"></div>
                    <div class="row">
                      <div class="col">
                        <div>
                          <button className="send-Evaluation">
                            ارسال التقييم
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderPendingMissionType = () => {
    const createdAtDate = moment(this.state.data.created_at);
    const dueDate = moment(this.state.data.due_at);
    const assingedAt = moment(this.state.data.created_at);

    // Set the locale to Arabic
    moment.locale("ar");
    const createdAtDate_Arabic = createdAtDate.format("DD MMM YYYY");
    const dueDate_Arabic = dueDate.format("DD MMMM YYYY");

    const assignedHour = assingedAt.hours();
    let date_type = "مساءً";
    if (assignedHour < 12) date_type = "صباحا";

    const formattedDateArabic = assingedAt.format(
      `DD MMMM YYYY -   HH:mm  ${date_type}`
    );

    return (
      <div>
        <div class="Details-PopUp-Container">
          <div class="container">
            <div class="row">
              <div
                class="col"
                style={{ marginTop: "25px", marginBottom: "8px" }}
              >
                <div className="mission-details">
                  <span className="mission-details-span">تفاصيل المهمة</span>
                </div>
              </div>
              <div class="col-md-auto" style={{ marginTop: "25px" }}>
                {/*  Edit Icon */}
                <svg
                  style={{ marginLeft: "48px" }}
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
                {/* Delete  Icon */}
                <svg
                  style={{ marginLeft: "48px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  onClick={() => this.handleDeleteMission()}
                >
                  <path
                    d="M5 8V18C5 20.2091 6.79086 22 9 22H15C17.2091 22 19 20.2091 19 18V8M14 11V17M10 11L10 17M16 5L14.5937 2.8906C14.2228 2.3342 13.5983 2 12.9296 2H11.0704C10.4017 2 9.7772 2.3342 9.40627 2.8906L8 5M16 5H8M16 5H21M8 5H3"
                    stroke="#EB001B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {/* Close Icon */}
                <img
                  onClick={() => this.closePopUp()}
                  src={closeIcon}
                  alt="close-icon"
                  style={{ marginLeft: "27.5px" }}
                />
              </div>
            </div>
            <div className="details-popup-border"></div>
            <div class="row">
              <div>
                <div>
                  <div>
                    <div className="container">
                      <div className="row">
                        <div class="col-sm-10">
                          <span class="ml-2 mission-span-1">
                            {this.state.data.type != null
                              ? this.state.data.type.name
                              : ""}
                            <br />
                            <span className="mission-span-2">
                              {this.state.data.name}
                            </span>
                            <br />
                          </span>
                        </div>
                        <div
                          class="col-sm-2"
                          style={{ position: "absolute", left: "22px" }}
                        >
                          <div
                            class="col-md-auto mission-status"
                            style={{ marginTop: "10px" }}
                          >
                            <span className="mission-status-span">
                              قيد الانتظار
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col">
                          {/* السعر و انشئت فيه وتنتهي في */}
                          <div className="mission-info">
                            <div class="d-inline mission-price">
                              <span className="mission-price-span">
                                السعر {this.state.data.reward} جنيه
                              </span>
                            </div>

                            <div class="d-inline mission-info-child">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                              >
                                <path
                                  d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                />
                                <path
                                  d="M1.875 6.125H13.125"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M5 1.75L5 3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10 1.75V3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="7.5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="10"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                              </svg>
                              <span className="mission-info-child-span">
                                انشئت في :{createdAtDate_Arabic}
                              </span>
                            </div>
                            <div class="d-inline mission-info-child">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                              >
                                <path
                                  d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                />
                                <path
                                  d="M1.875 6.125H13.125"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M5 1.75L5 3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10 1.75V3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="7.5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="10"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                              </svg>
                              <span className="mission-info-child-span">
                                تنتهي في :{dueDate_Arabic}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row" id="mission-range">
              <div class="col-sm-10" id="mission-range-span">
                <span>النطاق</span>
              </div>
            </div>

            <div class="row" id="mission-details-range">
              <div class="col-sm-10">
                {this.state.data.workAreas != null ? (
                  <>
                    {this.state.data.workAreas.map((item) => {
                      return (
                        <div class="d-inline mission-info-child">
                          <svg
                            className="location-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="14"
                            viewBox="0 0 11 14"
                            fill="none"
                          >
                            <path
                              d="M2.14575 2.3796L2.14575 2.3796C3.9996 0.493217 7.00045 0.493221 8.85427 2.37959C10.7192 4.2773 10.7088 7.40685 8.86152 9.23578L8.8559 9.24135L8.8504 9.24703L5.49605 12.7111L2.14574 9.3021C0.284754 7.40848 0.28475 4.27324 2.14575 2.3796ZM3.58905 5.81128C3.58905 6.8629 4.43502 7.74263 5.50003 7.74263C6.56499 7.74263 7.41093 6.86287 7.41093 5.81128C7.41093 4.75973 6.56497 3.88 5.50003 3.88C4.43505 3.88 3.58905 4.7597 3.58905 5.81128Z"
                              stroke="#9BA0B1"
                              stroke-width="1.5"
                            />
                          </svg>
                          <span className="mission-info-child-span">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </>
                ) : null}
              </div>
            </div>

            <div class="row" id="assign-mission-to">
              <div className="assign-mission-to">
                <span>تعيين المهمة ل</span>
              </div>
            </div>
            <div class="row" id="assign-date">
              <div className="assign-date">
                <span>
                  تم الاسناد في
                  <span style={{ marginRight: "4px" }}>
                    {formattedDateArabic}
                  </span>
                </span>
              </div>
            </div>
            <div class="row" id="assign-people">
              <div>
                {this.state.data.assignedUsers != null ? (
                  <>
                    {this.state.data.assignedUsers.map((item) => {
                      return (
                        <div class="d-inline assigned-user">
                          <img
                            src={Ellipse}
                            alt="user"
                            className="assign-user-photo"
                          />
                          <span className="assign-user-name">{item.name}</span>
                        </div>
                      );
                    })}
                  </>
                ) : null}
              </div>
            </div>

            <div class="row" id="mission-description">
              <div>
                <span>الوصف</span>
              </div>
            </div>
            <div class="row" id="mission-description-content">
              <div class="col-9">
                <span className="mission-description-content">
                  {this.state.data.details}
                </span>
              </div>
            </div>

            <div class="row" id="mission-button-action">
              <div className="mission-button-action">
                <div class="d-inline agree-btn">
                  <span className="agree-decile-title">موافقة</span>
                </div>
                <div class="d-inline decline-btn">
                  <span className="agree-decile-title">رفض</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderInProgressMissionsType = () => {
    const createdAtDate = moment(this.state.data.created_at);
    const dueDate = moment(this.state.data.due_at);
    const assingedAt = moment(this.state.data.created_at);

    // Set the locale to Arabic
    moment.locale("ar");
    const createdAtDate_Arabic = createdAtDate.format("DD MMM YYYY");
    const dueDate_Arabic = dueDate.format("DD MMMM YYYY");

    const assignedHour = assingedAt.hours();
    let date_type = "مساءً";
    if (assignedHour < 12) date_type = "صباحا";

    const formatted_Assign_Date = assingedAt.format(
      `DD MMMM YYYY -   HH:mm  ${date_type}`
    );
    return (
      <div>
        <div class="Details-PopUp-Container">
          <div class="container">
            <div class="row">
              <div
                class="col"
                style={{ marginTop: "25px", marginBottom: "8px" }}
              >
                <div className="mission-details">
                  <span className="mission-details-span">تفاصيل المهمة</span>
                </div>
              </div>
              <div class="col-md-auto" style={{ marginTop: "25px" }}>
                <svg
                  style={{ marginLeft: "48px" }}
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
                  style={{ marginLeft: "48px" }}
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
                  style={{ marginLeft: "27.5px" }}
                />
              </div>
            </div>
            <div className="details-popup-border"></div>
            <div class="row">
              <div>
                <div>
                  <div>
                    <div className="container">
                      <div className="row">
                        <div class="col-sm-10">
                          <span class="ml-2 mission-span-1">
                            {this.state.data.type != null
                              ? this.state.data.type.name
                              : ""}
                            <br />
                            <span className="mission-span-2">
                              {this.state.data.name}
                            </span>
                            <br />
                          </span>
                        </div>
                        <div
                          class="col-sm-2"
                          style={{ position: "absolute", left: "22px" }}
                        >
                          <div
                            class="col-md-auto mission-status-in-progress"
                            style={{ marginTop: "10px", width: "110px" }}
                          >
                            <span className="mission-status-span-in-progress">
                              مهمة تحت التنفيذ
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col">
                          <div className="mission-info">
                            <div class="d-inline mission-price">
                              <span className="mission-price-span">
                                السعر {this.state.data.reward} جنيه
                              </span>
                            </div>

                            {/* انشئت فيه */}
                            <div class="d-inline mission-info-child">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                              >
                                <path
                                  d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                />
                                <path
                                  d="M1.875 6.125H13.125"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M5 1.75L5 3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10 1.75V3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="7.5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="10"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                              </svg>
                              <span className="mission-info-child-span">
                                انشئت في :{createdAtDate_Arabic}
                              </span>
                            </div>
                            {/* تنتهي في */}
                            <div class="d-inline mission-info-child">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                              >
                                <path
                                  d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                />
                                <path
                                  d="M1.875 6.125H13.125"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M5 1.75L5 3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10 1.75V3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="7.5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="10"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                              </svg>
                              <span className="mission-info-child-span">
                                تنتهي في :{dueDate_Arabic}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row" id="mission-range">
              <div class="col-sm-10" id="mission-range-span">
                <span>النطاق</span>
              </div>
            </div>

            <div class="row" id="mission-details-range">
              <div class="col-sm-10">
                {this.state.data.workAreas != null ? (
                  <>
                    {this.state.data.workAreas.map((item) => {
                      <div class="d-inline mission-info-child">
                        <svg
                          className="location-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="14"
                          viewBox="0 0 11 14"
                          fill="none"
                        >
                          <path
                            d="M2.14575 2.3796L2.14575 2.3796C3.9996 0.493217 7.00045 0.493221 8.85427 2.37959C10.7192 4.2773 10.7088 7.40685 8.86152 9.23578L8.8559 9.24135L8.8504 9.24703L5.49605 12.7111L2.14574 9.3021C0.284754 7.40848 0.28475 4.27324 2.14575 2.3796ZM3.58905 5.81128C3.58905 6.8629 4.43502 7.74263 5.50003 7.74263C6.56499 7.74263 7.41093 6.86287 7.41093 5.81128C7.41093 4.75973 6.56497 3.88 5.50003 3.88C4.43505 3.88 3.58905 4.7597 3.58905 5.81128Z"
                            stroke="#9BA0B1"
                            stroke-width="1.5"
                          />
                        </svg>
                        <span className="mission-info-child-span">
                          {item.name}
                        </span>
                      </div>;
                    })}
                  </>
                ) : null}
              </div>
            </div>

            <div class="row" id="assign-mission-to">
              <div className="assign-mission-to">
                <span>تعيين المهمة ل</span>
              </div>
            </div>
            <div class="row" id="assign-date">
              <div className="assign-date">
                <span>
                  تم الاسناد في
                  {formatted_Assign_Date}
                </span>
              </div>
            </div>
            <div class="row" id="assign-people">
              <div>
                {this.state.data.assignedUsers != null ? (
                  <>
                    {this.state.data.assignedUsers.map((item) => {
                      return (
                        <div class="d-inline assigned-user">
                          <img
                            src={Ellipse}
                            alt="user"
                            className="assign-user-photo"
                          />
                          <span className="assign-user-name">{item.name}</span>
                        </div>
                      );
                    })}
                  </>
                ) : null}
              </div>
            </div>

            <div class="row" id="mission-description">
              <div>
                <span>الوصف</span>
              </div>
            </div>
            <div class="row" id="mission-description-content">
              <div class="col-9">
                <span className="mission-description-content">
                  {this.state.data.details}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderLateMissionsType = () => {
    const createdAtDate = moment(this.state.data.created_at);
    const dueDate = moment(this.state.data.due_at);
    const assingedAt = moment(this.state.data.created_at);

    // Set the locale to Arabic
    moment.locale("ar");
    const createdAtDate_Arabic = createdAtDate.format("DD MMM YYYY");
    const dueDate_Arabic = dueDate.format("DD MMMM YYYY");

    const assignedHour = assingedAt.hours();
    let date_type = "مساءً";
    if (assignedHour < 12) date_type = "صباحا";

    const formatted_Assign_Date = assingedAt.format(
      `DD MMMM YYYY -   HH:mm  ${date_type}`
    );
    return (
      <div>
        <div class="Details-PopUp-Container">
          <div class="container">
            <div class="row">
              <div
                class="col"
                style={{ marginTop: "25px", marginBottom: "8px" }}
              >
                <div className="mission-details">
                  <span className="mission-details-span">تفاصيل المهمة</span>
                </div>
              </div>
              <div class="col-md-auto" style={{ marginTop: "25px" }}>
                <svg
                  style={{ marginLeft: "48px" }}
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
                  style={{ marginLeft: "48px" }}
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
                  style={{ marginLeft: "27.5px" }}
                />
              </div>
            </div>
            <div className="details-popup-border"></div>
            <div class="row">
              <div>
                <div>
                  <div>
                    <div className="container">
                      <div className="row">
                        <div class="col-sm-10">
                          <span class="ml-2 mission-span-1">
                            {this.state.data.type != null
                              ? this.state.data.type.name
                              : ""}
                            <br />
                            <span className="mission-span-2">
                              {this.state.data.name}
                            </span>
                            <br />
                          </span>
                        </div>
                        <div
                          class="col-sm-2"
                          style={{ position: "absolute", left: "22px" }}
                        >
                          <div
                            class="col-md-auto mission-status-late"
                            style={{ marginTop: "10px" }}
                          >
                            <span className="mission-status-span-late">
                              مهمة متأخرة
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col">
                          <div className="mission-info">
                            <div class="d-inline mission-price">
                              <span className="mission-price-span">
                                السعر {this.state.data.reward} جنيه
                              </span>
                            </div>

                            <div class="d-inline mission-info-child">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                              >
                                <path
                                  d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                />
                                <path
                                  d="M1.875 6.125H13.125"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M5 1.75L5 3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10 1.75V3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="7.5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="10"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                              </svg>
                              <span className="mission-info-child-span">
                                انشئت في :{createdAtDate_Arabic}
                              </span>
                            </div>
                            <div class="d-inline mission-info-child">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                              >
                                <path
                                  d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                />
                                <path
                                  d="M1.875 6.125H13.125"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M5 1.75L5 3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10 1.75V3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="7.5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="10"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                              </svg>
                              <span className="mission-info-child-span">
                                تنتهي في :{dueDate_Arabic}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row" id="mission-range">
              <div class="col-sm-10" id="mission-range-span">
                <span>النطاق</span>
              </div>
            </div>

            <div class="row" id="mission-details-range">
              <div class="col-sm-10">
                {this.state.data.workAreas != null ? (
                  <>
                    {this.state.data.workAreas.map((item) => {
                      return (
                        <div class="d-inline mission-info-child">
                          <svg
                            className="location-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="14"
                            viewBox="0 0 11 14"
                            fill="none"
                          >
                            <path
                              d="M2.14575 2.3796L2.14575 2.3796C3.9996 0.493217 7.00045 0.493221 8.85427 2.37959C10.7192 4.2773 10.7088 7.40685 8.86152 9.23578L8.8559 9.24135L8.8504 9.24703L5.49605 12.7111L2.14574 9.3021C0.284754 7.40848 0.28475 4.27324 2.14575 2.3796ZM3.58905 5.81128C3.58905 6.8629 4.43502 7.74263 5.50003 7.74263C6.56499 7.74263 7.41093 6.86287 7.41093 5.81128C7.41093 4.75973 6.56497 3.88 5.50003 3.88C4.43505 3.88 3.58905 4.7597 3.58905 5.81128Z"
                              stroke="#9BA0B1"
                              stroke-width="1.5"
                            />
                          </svg>
                          <span className="mission-info-child-span">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </>
                ) : null}
              </div>
            </div>
            {/* تعيين المهمة ل */}
            <div class="row" id="assign-mission-to">
              <div className="assign-mission-to">
                <span>تعيين المهمة ل</span>
              </div>
            </div>
            {/* تم الاسناد في*/}
            <div class="row" id="assign-date">
              <div className="assign-date">
                <span>
                  تم الاسناد في
                  {formatted_Assign_Date}
                </span>
              </div>
            </div>
            {/* Assigned Users */}
            <div class="row" id="assign-people">
              <div>
                {this.state.data.assignedUsers != null ? (
                  <>
                    {this.state.data.assignedUsers.map((item) => {
                      return (
                        <div class="d-inline assigned-user">
                          <img
                            src={Ellipse}
                            alt="user"
                            className="assign-user-photo"
                          />
                          <span className="assign-user-name">{item.name}</span>
                        </div>
                      );
                    })}
                  </>
                ) : null}
              </div>
            </div>

            <div class="row" id="mission-description">
              <div>
                <span>الوصف</span>
              </div>
            </div>

            <div class="row" id="mission-description-content">
              <div class="col-9">
                <span className="mission-description-content">
                  {this.state.data.details}
                </span>
              </div>
            </div>

            <div class="row" id="mission-attachment">
              <div>
                <span>المرفقات والتسليمات</span>
              </div>
            </div>

            <div class="row" id="mission-attch-container">
              <div class="col" id="mission-attch-section">
                <div class="d-inline attach-user">
                  <img src={Ellipse} alt="user" className="attach-userPhoto" />
                  <span className="attach-userName">
                    {this.state.data.salesman}
                  </span>
                  <br />
                  <span className="attach-status">لم يسلم بعد</span>
                </div>
                <div className="send-alert" onClick={() => this.sendAlert()}>
                  <span>ارسال تنبيه</span>
                </div>
              </div>
            </div>

            <div class="row" id="mission-button-action">
              <div class="col" onClick={() => this.sendAlert()}>
                {/* //Todo : We Will Make Click Function Here ^_^ */}
                <div className="mission-button-action">
                  <div className="mark-completed" style={{ cursor: "pointer" }}>
                    <span>تعيين كمهمة تامة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderCompletedMissionIsAwaitingEvaluation = () => {
    return (
      <div>
        <div class="Details-PopUp-Container">
          <div class="container">
            <div class="row">
              <div
                class="col"
                style={{ marginTop: "25px", marginBottom: "8px" }}
              >
                <div className="mission-details">
                  <span className="mission-details-span">تفاصيل المهمة</span>
                </div>
              </div>
              <div class="col-md-auto" style={{ marginTop: "25px" }}>
                <svg
                  style={{ marginLeft: "48px" }}
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
                  style={{ marginLeft: "48px" }}
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
                  style={{ marginLeft: "27.5px" }}
                />
              </div>
            </div>
            <div className="details-popup-border"></div>
            <div class="row">
              <div>
                <div>
                  <div>
                    <div className="container">
                      <div className="row">
                        <div class="col-sm-10">
                          <span class="ml-2 mission-span-1">
                            {this.state.data.goal}
                            <br />
                            <span className="mission-span-2">
                              {this.state.data.name}
                            </span>
                            <br />
                          </span>
                        </div>
                        <div
                          class="col-sm-2"
                          style={{
                            position: "absolute",
                            left: "22px",
                            width: "180px",
                          }}
                        >
                          <div
                            class="col-md-auto mission-status-Evaluation"
                            style={{ marginTop: "10px" }}
                          >
                            <span className="mission-status-Evaluation-span">
                              مهمة تامة تنتظر التقييم
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col">
                          <div className="mission-info">
                            <div class="d-inline mission-price">
                              <span className="mission-price-span">
                                السعر {this.state.data.reward} جنيه
                              </span>
                            </div>
                            <div class="d-inline mission-info-child">
                              <svg
                                className="location-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="14"
                                viewBox="0 0 11 14"
                                fill="none"
                              >
                                <path
                                  d="M2.14575 2.3796L2.14575 2.3796C3.9996 0.493217 7.00045 0.493221 8.85427 2.37959C10.7192 4.2773 10.7088 7.40685 8.86152 9.23578L8.8559 9.24135L8.8504 9.24703L5.49605 12.7111L2.14574 9.3021C0.284754 7.40848 0.28475 4.27324 2.14575 2.3796ZM3.58905 5.81128C3.58905 6.8629 4.43502 7.74263 5.50003 7.74263C6.56499 7.74263 7.41093 6.86287 7.41093 5.81128C7.41093 4.75973 6.56497 3.88 5.50003 3.88C4.43505 3.88 3.58905 4.7597 3.58905 5.81128Z"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                />
                              </svg>
                              <span className="mission-info-child-span">
                                {this.state.data.full_addresss == null
                                  ? "الجيزة"
                                  : this.state.data.full_addresss}
                              </span>
                            </div>
                            <div class="d-inline mission-info-child">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                              >
                                <path
                                  d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                />
                                <path
                                  d="M1.875 6.125H13.125"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M5 1.75L5 3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10 1.75V3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="7.5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="10"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                              </svg>
                              <span className="mission-info-child-span">
                                انشئت في :
                                {moment(this.state.data.created_at).format(
                                  "MM/DD/YYYY"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row" id="mission-range">
              <div class="col-sm-10" id="mission-range-span">
                <span>النطاق</span>
              </div>
            </div>

            <div class="row" id="mission-details-range">
              <div class="col-sm-10">
                <div class="d-inline mission-info-child">
                  <svg
                    className="location-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="14"
                    viewBox="0 0 11 14"
                    fill="none"
                  >
                    <path
                      d="M2.14575 2.3796L2.14575 2.3796C3.9996 0.493217 7.00045 0.493221 8.85427 2.37959C10.7192 4.2773 10.7088 7.40685 8.86152 9.23578L8.8559 9.24135L8.8504 9.24703L5.49605 12.7111L2.14574 9.3021C0.284754 7.40848 0.28475 4.27324 2.14575 2.3796ZM3.58905 5.81128C3.58905 6.8629 4.43502 7.74263 5.50003 7.74263C6.56499 7.74263 7.41093 6.86287 7.41093 5.81128C7.41093 4.75973 6.56497 3.88 5.50003 3.88C4.43505 3.88 3.58905 4.7597 3.58905 5.81128Z"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span className="mission-info-child-span">الجيزة</span>
                </div>

                <div class="d-inline mission-info-child">
                  <svg
                    className="location-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="14"
                    viewBox="0 0 11 14"
                    fill="none"
                  >
                    <path
                      d="M2.14575 2.3796L2.14575 2.3796C3.9996 0.493217 7.00045 0.493221 8.85427 2.37959C10.7192 4.2773 10.7088 7.40685 8.86152 9.23578L8.8559 9.24135L8.8504 9.24703L5.49605 12.7111L2.14574 9.3021C0.284754 7.40848 0.28475 4.27324 2.14575 2.3796ZM3.58905 5.81128C3.58905 6.8629 4.43502 7.74263 5.50003 7.74263C6.56499 7.74263 7.41093 6.86287 7.41093 5.81128C7.41093 4.75973 6.56497 3.88 5.50003 3.88C4.43505 3.88 3.58905 4.7597 3.58905 5.81128Z"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span className="mission-info-child-span">اسكندرية</span>
                </div>
              </div>
            </div>

            <div class="row" id="assign-mission-to">
              <div className="assign-mission-to">
                <span>تعيين المهمة ل</span>
              </div>
            </div>

            <div class="row" id="assign-date">
              <div className="assign-date">
                <span>
                  تم الاسناد في{" "}
                  {moment(this.state.data.created_at).format("MM/DD/YYYY")}
                </span>
              </div>
            </div>

            <div class="row" id="assign-people">
              <div>
                <div class="d-inline assigned-user">
                  <img src={Ellipse} alt="user" className="assign-user-photo" />
                  <span className="assign-user-name">
                    {this.state.data.salesman}
                  </span>
                </div>
                {/* <div class="d-inline assigned-user">
                  <img src={Ellipse} alt="user" className="assign-user-photo" />
                  <span className="assign-user-name">محمد حسين</span>
                </div>
                <div class="d-inline assigned-user">
                  <img src={Ellipse} alt="user" className="assign-user-photo" />
                  <span className="assign-user-name">محمد حسين</span>
                </div> */}
              </div>
            </div>

            <div class="row" id="mission-description">
              <div>
                <span>الوصف</span>
              </div>
            </div>

            <div class="row" id="mission-description-content">
              <div class="col-9">
                <span className="mission-description-content">
                  {this.state.data.details}
                </span>
              </div>
            </div>
            {/* المرفقات والتسليمات */}
            <div class="row" id="mission-attachment">
              <div>
                <span>المرفقات والتسليمات</span>
              </div>
            </div>

            <div class="row" id="mission-attch-container">
              <div class="col" id="mission-attch-section">
                <div class="d-inline attach-user">
                  <img src={Ellipse} alt="user" className="attach-userPhoto" />
                  <span className="attach-farm">بيانات المزرعة </span>
                  <br />
                  <p className="farm-owner">
                    احمد محسن
                    <span className="farm-owner-date">12 يوليو 2022</span>
                  </p>
                </div>
                <div
                  className="download-section"
                  onClick={() => this.sendAlert()}
                >
                  <img src={downloadImg} alt="download-icon" />
                </div>
              </div>
            </div>
            {/* المرفقات والتسليمات */}
            <div class="row" id="mission-button-action">
              <div class="col" onClick={() => this.sendAlert()}>
                {/* //Todo : We Will Make Click Function Here ^_^ */}
                <div className="mission-button-action">
                  <div className="mark-completed-evaluation">
                    <span>تعيين كمهمة تامة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderFinishedMissionsType = () => {
    return (
      <div>
        <div class="Details-PopUp-Container">
          <div class="container">
            <div class="row">
              <div
                class="col"
                style={{ marginTop: "25px", marginBottom: "8px" }}
              >
                <div className="mission-details">
                  <span className="mission-details-span">تفاصيل المهمة</span>
                </div>
              </div>
              <div class="col-md-auto" style={{ marginTop: "25px" }}>
                <svg
                  style={{ marginLeft: "48px" }}
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
                  style={{ marginLeft: "48px" }}
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
                  style={{ marginLeft: "27.5px" }}
                />
              </div>
            </div>
            <div className="details-popup-border"></div>
            <div class="row">
              <div>
                <div>
                  <div>
                    <div className="container">
                      <div className="row">
                        <div class="col-sm-10">
                          <span class="ml-2 mission-span-1">
                            مهمة تسكين مزرعة
                            <br />
                            <span className="mission-span-2">
                              مهمة اضافة مزرعة في الجيزة
                            </span>
                            <br />
                          </span>
                        </div>
                        <div
                          class="col-sm-2"
                          style={{
                            position: "absolute",
                            left: "22px",
                            width: "180px",
                          }}
                        >
                          <div
                            class="col-md-auto mission-status-finished"
                            style={{ marginTop: "10px" }}
                          >
                            <span className="mission-status-finished-span">
                              مهمة تامة
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col">
                          <div className="mission-info">
                            <div class="d-inline mission-price">
                              <span className="mission-price-span">
                                السعر ١٠٠ جنيه
                              </span>
                            </div>
                            <div class="d-inline mission-info-child">
                              <svg
                                className="location-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="14"
                                viewBox="0 0 11 14"
                                fill="none"
                              >
                                <path
                                  d="M2.14575 2.3796L2.14575 2.3796C3.9996 0.493217 7.00045 0.493221 8.85427 2.37959C10.7192 4.2773 10.7088 7.40685 8.86152 9.23578L8.8559 9.24135L8.8504 9.24703L5.49605 12.7111L2.14574 9.3021C0.284754 7.40848 0.28475 4.27324 2.14575 2.3796ZM3.58905 5.81128C3.58905 6.8629 4.43502 7.74263 5.50003 7.74263C6.56499 7.74263 7.41093 6.86287 7.41093 5.81128C7.41093 4.75973 6.56497 3.88 5.50003 3.88C4.43505 3.88 3.58905 4.7597 3.58905 5.81128Z"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                />
                              </svg>
                              <span className="mission-info-child-span">
                                الجيزة
                              </span>
                            </div>
                            <div class="d-inline mission-info-child">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                              >
                                <path
                                  d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                />
                                <path
                                  d="M1.875 6.125H13.125"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M5 1.75L5 3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10 1.75V3.625"
                                  stroke="#9BA0B1"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="7.5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="10"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                                <circle
                                  cx="5"
                                  cy="9.875"
                                  r="0.625"
                                  fill="#9BA0B1"
                                />
                              </svg>
                              <span className="mission-info-child-span">
                                انشئت في : ٢٠ يوليو ٢٠٢٣
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row" id="mission-range">
              <div class="col-sm-10" id="mission-range-span">
                <span>النطاق</span>
              </div>
            </div>

            <div class="row" id="mission-details-range">
              <div class="col-sm-10">
                <div class="d-inline mission-info-child">
                  <svg
                    className="location-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="14"
                    viewBox="0 0 11 14"
                    fill="none"
                  >
                    <path
                      d="M2.14575 2.3796L2.14575 2.3796C3.9996 0.493217 7.00045 0.493221 8.85427 2.37959C10.7192 4.2773 10.7088 7.40685 8.86152 9.23578L8.8559 9.24135L8.8504 9.24703L5.49605 12.7111L2.14574 9.3021C0.284754 7.40848 0.28475 4.27324 2.14575 2.3796ZM3.58905 5.81128C3.58905 6.8629 4.43502 7.74263 5.50003 7.74263C6.56499 7.74263 7.41093 6.86287 7.41093 5.81128C7.41093 4.75973 6.56497 3.88 5.50003 3.88C4.43505 3.88 3.58905 4.7597 3.58905 5.81128Z"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span className="mission-info-child-span">الجيزة</span>
                </div>

                <div class="d-inline mission-info-child">
                  <svg
                    className="location-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="14"
                    viewBox="0 0 11 14"
                    fill="none"
                  >
                    <path
                      d="M2.14575 2.3796L2.14575 2.3796C3.9996 0.493217 7.00045 0.493221 8.85427 2.37959C10.7192 4.2773 10.7088 7.40685 8.86152 9.23578L8.8559 9.24135L8.8504 9.24703L5.49605 12.7111L2.14574 9.3021C0.284754 7.40848 0.28475 4.27324 2.14575 2.3796ZM3.58905 5.81128C3.58905 6.8629 4.43502 7.74263 5.50003 7.74263C6.56499 7.74263 7.41093 6.86287 7.41093 5.81128C7.41093 4.75973 6.56497 3.88 5.50003 3.88C4.43505 3.88 3.58905 4.7597 3.58905 5.81128Z"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span className="mission-info-child-span">اسكندرية</span>
                </div>
              </div>
            </div>

            <div class="row" id="assign-mission-to">
              <div className="assign-mission-to">
                <span>تعيين المهمة ل</span>
              </div>
            </div>

            <div class="row" id="assign-date">
              <div className="assign-date">
                <span>تم الاسناد في ٢٠ يوليو ٢٠٢٣ - ١٠:٣٠ مساءً</span>
              </div>
            </div>

            <div class="row" id="assign-people">
              <div>
                <div class="d-inline assigned-user">
                  <img src={Ellipse} alt="user" className="assign-user-photo" />
                  <span className="assign-user-name">احمد محسن</span>
                </div>
                <div class="d-inline assigned-user">
                  <img src={Ellipse} alt="user" className="assign-user-photo" />
                  <span className="assign-user-name">محمد حسين</span>
                </div>
                <div class="d-inline assigned-user">
                  <img src={Ellipse} alt="user" className="assign-user-photo" />
                  <span className="assign-user-name">محمد حسين</span>
                </div>
              </div>
            </div>

            <div class="row" id="mission-description">
              <div>
                <span>الوصف</span>
              </div>
            </div>

            <div class="row" id="mission-description-content">
              <div class="col-9">
                <span className="mission-description-content">
                  تقدم Analytics مبادرات قابلة للتنفيذ وجاهزة للصناعة في كل مرة
                  يكمل فيها النشاط التجاري حسابه بالكامل. ,phasellus vitae amet
                  amet، mauris faucibus في الجلوس. ,Rhoncus Pellentesque
                  adipiscing a enim، quis tortor، not etiam. ,احصل على faucibus
                  mattis consequat dui impdiet scelerisque. ,Lorem placerat
                  blandit ut lobortis volutpat convallis libero. ,Sed impdiet
                  dignissim ipsum quam.
                </span>
              </div>
            </div>
            {/* المرفقات والتسليمات */}
            <div class="row" id="mission-attachment">
              <div>
                <span>المرفقات والتسليمات</span>
              </div>
            </div>

            <div class="row" id="mission-finish-attach-container">
              <div class="col" id="mission-finish-attach-section">
                <div class="d-inline attach-user">
                  <img src={Ellipse} alt="user" className="attach-userPhoto" />
                  <span className="attach-farm">بيانات المزرعة </span>
                  <br />
                  <p className="farm-owner">
                    احمد محسن
                    <span className="farm-owner-date">12 يوليو 2022</span>
                  </p>
                </div>
                <div
                  className="download-section"
                  onClick={() => this.sendAlert()}
                >
                  <img src={downloadImg} alt="download-icon" />
                </div>
              </div>
              <div class="col" id="mission-finish-attach-section">
                <div class="d-inline attach-user">
                  <img src={Ellipse} alt="user" className="attach-userPhoto" />
                  <span className="attach-farm">بيانات المزرعة </span>
                  <br />
                  <p className="farm-owner">
                    احمد محسن
                    <span className="farm-owner-date">12 يوليو 2022</span>
                  </p>
                </div>
                <div
                  className="download-section"
                  onClick={() => this.sendAlert()}
                >
                  <img src={downloadImg} alt="download-icon" />
                </div>
              </div>
            </div>
            {/* المرفقات والتسليمات */}
            <div class="row" id="mission-button-action">
              <div class="col" onClick={() => this.showEvaluationPopUp()}>
                {/* //Todo : Change Classes With New Type For Finished Mission ^_^ */}
                <div className="mission-button-action">
                  <div className="evaluation">
                    <span>تقييم</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div
        style={{ display: this.state.closePopUp === true ? "none" : "unset" }}
      >
        {this.props.missionType === 0
          ? this.renderPendingMissionType()
          : this.props.missionType === 1
          ? this.renderInProgressMissionsType()
          : this.props.missionType === 2
          ? this.renderLateMissionsType()
          : this.props.missionType === 3
          ? this.renderCompletedMissionIsAwaitingEvaluation()
          : this.props.missionType === 4
          ? this.renderFinishedMissionsType()
          : null}
        {this.state.showEvaluationModal === true
          ? this.renderEvaluationPopUp()
          : null}
      </div>
    );
  }
}
export default MissionDetailsPopUp;
