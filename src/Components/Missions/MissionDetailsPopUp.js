import React, { Component } from "react";
import closeIcon from "../../Assets/images/Close Icon.svg";
import Ellipse from "../../Assets/images/Ellipse 3.svg";
import downloadImg from "../../Assets/images/Download.svg";
import API from "../Api";
import moment from "moment";
import { toast } from "react-toastify";
import { Modal, ModalBody } from "reactstrap";
import "moment/locale/ar"; // Import the Arabic locale
import { ar, enUS } from "date-fns/locale";
import { format } from "date-fns";

class MissionDetailsPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closePopUp: false,
      showMissionCompletedModal: false,
      showRefuseModal: false,
      showReAssignModal: false,
      selectedEvaluation: 1,
      data: {},
      salesman: {},
      assignTo: [],
      work_areas: [],
      selectedSales: [],
      salesToParent: [],
      selectedCities: [],
      selectedItem: 0,
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

  routeToEditPage = () => {
    this.closePopUp();
    const data = this.props.id;
    this.props.EditMissionProps(data);
  };

  showMarkMissionCompletedPopUp = () => {
    let value = this.state.showMissionCompletedModal;
    this.setState({ showMissionCompletedModal: !value });
  };

  showRefuseMissionPopUp = () => {
    let value = this.state.showRefuseModal;
    this.setState({ showRefuseModal: !value });
  };

  showReAssignModalPopUp = () => {
    this.props.showReAssignOptions(true);
    this.props.missionId(this.props.id);
    // let value = this.state.showReAssignModal;
    // if (value === false) {
    //   API.get("salesman").then((res) => {
    //     if (res) {
    //       const men = res.data.items.map((item) => ({
    //         id: item.id,
    //         name: item.name,
    //       }));
    //       this.setState({ assignTo: men });
    //     }
    //   });

    //   API.get("work-areas").then((res) => {
    //     if (res) {
    //       const cities = res.data.map((item) => ({
    //         id: item.id,
    //         name: item.name,
    //       }));
    //       this.setState({ work_areas: cities });
    //     }
    //   });
    // }
    // this.setState({ showReAssignModal: !value });
  };

  makeMissionCompleted = () => {
    API.post(`dashboard/missions/${this.props.id}/complete`).then((res) => {
      if (res.status === 201) {
        toast.success("تم تحديد المهمة كمهمة تامة بنجاح");
        this.sendPropsToDeleteObject();
        this.showMarkMissionCompletedPopUp();
        this.closePopUp();
      } else {
        toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
        this.showMarkMissionCompletedPopUp();
        this.closePopUp();
      }
    });
  };

  handleDeleteMission = () => {
    API.delete(`dashboard/missions/${this.props.id}`).then((res) => {
      if (res.status === 200) {
        toast.success("تم حذف المهمة بنجاح");
        this.sendPropsToDeleteObject();
        this.closePopUp();
      }
    });
  };

  handleSelectItem = (id, name) => {
    if (this.state.selectedItem === 0) {
      //اشخاص
      let men = [...this.state.selectedSales];
      const isSelectedBefore = men.includes(id);
      if (isSelectedBefore) {
        const indexToRemove = men.indexOf(id);
        // Remove the ID if it exists in the array
        if (indexToRemove !== -1) {
          men.splice(indexToRemove, 1);
          this.setState({ selectedSales: men });
        }
      } else {
        men.push(id);
        let arrayOfObj = [...this.state.salesToParent];
        arrayOfObj.push({ id: id, name: name });
        this.setState({ selectedSales: men, salesToParent: arrayOfObj });
      }
    } else {
      let specialties = [...this.state.selectedspecialties];
      const isSelectedBefore = specialties.includes(id);
      if (isSelectedBefore) {
        const indexToRemove = specialties.indexOf(id);
        // Remove the ID if it exists in the array
        if (indexToRemove !== -1) {
          specialties.splice(indexToRemove, 1);
          this.setState({ selectedspecialties: specialties });
        }
      } else {
        specialties.push(id);
        let arrayOfObj = [...this.state.specialtiesToParent];
        arrayOfObj.push({ id: id, name: name });
        this.setState({
          selectedspecialties: specialties,
          specialtiesToParent: arrayOfObj,
        });
      }
    }
  };

  handleSelectCity = (cityId, cityName) => {
    //Check if city added before
    let cities = [...this.state.selectedCities];
    const isSelectedBefore = cities.includes(cityId);
    if (isSelectedBefore) {
      const indexToRemove = cities.indexOf(cityId);
      // Remove the ID if it exists in the array
      if (indexToRemove !== -1) {
        cities.splice(indexToRemove, 1);
        this.setState({ selectedCities: cities });
      }
    } else {
      cities.push(cityId);
      this.setState({ selectedCities: cities });
    }
  };

  handleRefuseMission = () => {
    API.post(`dashboard/missions/${this.props.id}/reject`).then((res) => {
      if (res.status === 200) {
        toast.success("تم رفض المهمة بنجاح");
        this.sendPropsToDeleteObject();
        this.showRefuseMissionPopUp();
        this.closePopUp();
      } else {
        toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
        this.showRefuseMissionPopUp();
        this.closePopUp();
      }
    });
  };

  /* اعادة تعيين المهمة في حالة اذا كانت متاخرة */
  handleReAssignMission = () => {
    let values = {};
    if (this.state.selectedSales.length === 0) {
      toast.warn("من فضلك قم بأضافة اشخاص");
    } else if (this.state.selectedCities.length === 0) {
      toast.warn("من فضلك قم بأختيار نطاق المهمة");
    } else {
      values.assignment = {
        type: this.state.selectedItem === 0 ? "اشخاص" : "تخصصات",
        ids: this.state.selectedSales.map(Number),
      };
      values.work_area_ids = this.state.selectedCities.map(Number);
      API.patch(`dashboard/missions/${this.props.id}`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success("تم اعادة تعيين المهمة بنجاح");
            this.sendPropsToDeleteObject();
            let value = this.state.showReAssignModal;
            this.setState({ showReAssignModal: !value });
            this.closePopUp();
          }
        })
        .catch((error) => {
          console.log("error:", error);
          let value = this.state.showReAssignModal;
          this.setState({ showReAssignModal: !value });
          this.closePopUp();
          toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
        });
    }
  };

  handleActiveType = (e) => {
    this.setState({ selectedItem: e });
    if (e === 0) {
      //اشخاص
      API.get("salesman").then((res) => {
        if (res) {
          const men = res.data.items.map((item) => ({
            id: item.id,
            name: item.name,
          }));
          this.setState({ assignTo: men });
        }
      });
    } else {
      //تخصصات

      API.get("specialties").then((res) => {
        if (res.status === 200) {
          this.setState({ assignTo: res.data });
        }
      });
    }
  };

  handleEvaluation = (e) => this.setState({ selectedEvaluation: e });

  closeEvaluationPopUp = () =>
    this.setState({ showMissionCompletedModal: false });

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
          <div className="content">
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
                            <span className="assign-user-name">
                              {item.name}
                            </span>
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
          <div className="content">
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
                  {/* Edit Icon */}
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

                  {/* Delete Icon */}
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
              {/* نطاق المهمة */}
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

              {/* تم الأسناد في */}
              <div class="row" id="assign-date">
                <div className="assign-date">
                  <span>
                    تم الاسناد في
                    {formatted_Assign_Date}
                  </span>
                </div>
              </div>

              {/* من تم لهم الاسناد */}
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
                            <span className="assign-user-name">
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
              {/* وصف المهمة */}
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
        <div
          class="Details-PopUp-Container"
          style={{
            zIndex:
              this.state.showReAssignModal === true
                ? "9"
                : "99999999999999999999999",
          }}
        >
          <div className="content">
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
                  {/* Delete Icon */}
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
                            <span className="assign-user-name">
                              {item.name}
                            </span>
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
                <div class="col">
                  <button
                    className="re-assign"
                    onClick={() => this.showReAssignModalPopUp()}
                  >
                    اعادة تعيين المهمة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Re-Assigm Mission Pop Up */}
        <div className="content">
          <Modal
            isOpen={this.state.showReAssignModal}
            toggle={() => this.showReAssignModalPopUp()}
            style={{
              display: "flex",
              zIndex: "9999999999999999999999999999999999",
            }}
          >
            <div style={{ borderBottom: "1px solid #F1F5F9" }}>
              <div style={{ marginTop: "25px", marginBottom: "8px" }}>
                <div style={{ display: "flex", padding: "10px" }}>
                  <span className="mission-re-assign">اعادة تعيين المهمة</span>
                  <img
                    onClick={() => this.showReAssignModalPopUp()}
                    src={closeIcon}
                    alt="close-icon"
                    className="close-evaluation"
                  />
                </div>
              </div>
            </div>

            <ModalBody>
              <div class="container">
                <div class="row mt-3">
                  <div class="col-12">
                    <span className="select-area">نطاق المهمة</span>
                  </div>
                </div>
                {/* البحث الخاص بنطاق المهمة */}
                <div class="row mt-3">
                  <div class="col-12">
                    <input
                      type="text"
                      placeholder="ابحث"
                      className="cities-search"
                    />
                  </div>
                </div>
                {/* List of نطاق المهمة */}
                <div class="row" style={{ height: "150px" }}>
                  <div
                    class="col-12"
                    style={{ maxHeight: "100px", overflowY: "auto" }}
                  >
                    <ul class="list-unstyled scrollable-list-re-assign">
                      {this.state.work_areas.map((item) => {
                        return (
                          <li class="d-flex w-100 justify-content-between py-2">
                            <div class="custom-border">{item.name}</div>
                            <div class="checkbox checkbox-success">
                              <input
                                id={`checkbox ${item.id}`}
                                type="checkbox"
                                onChange={(e) =>
                                  this.handleSelectCity(item.id, item.name)
                                }
                              />
                              <label for={`checkbox ${item.id}`}></label>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <span className="select-area">رابط الموقع الجغرافي</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <input type="text" className="reAssign-mapUrl" />
                  </div>
                </div>
                <div class="row mt-3">
                  <div className="assign-people-type">
                    <div
                      className={
                        this.state.selectedItem === 0
                          ? "assign-type-active"
                          : "assign-type"
                      }
                      onClick={() => this.handleActiveType(0)}
                    >
                      لحسابات اشخاص
                    </div>
                    <div
                      className={
                        this.state.selectedItem === 1
                          ? "assign-type-active"
                          : "assign-type"
                      }
                      onClick={() => this.handleActiveType(1)}
                    >
                      لتخصص
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12 range-border"></div>
                  {/* اضف الاشخاص */}
                  <div class="row mt-3">
                    <div class="col-12">
                      <span className="select-area">
                        {this.state.selectedItem === 0
                          ? "اضف الاشخاص"
                          : "اختر التخصصات"}
                      </span>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12">
                      <input
                        type="text"
                        placeholder="ابحث"
                        className="cities-search"
                        //onChange={this.handleSearch}
                      />
                    </div>
                  </div>
                  <div class="row" style={{ height: "150px" }}>
                    <div
                      class="col-12"
                      style={{ maxHeight: "100px", overflowY: "auto" }}
                    >
                      <ul class="list-unstyled scrollable-list-re-assign">
                        {this.state.assignTo.map((item) => {
                          return (
                            <li class="d-flex w-100 justify-content-between py-2">
                              <div class="custom-border">{item.name}</div>
                              <div class="checkbox checkbox-success">
                                <input
                                  id={`checkbox ${item.id}`}
                                  type="checkbox"
                                  onChange={(e) =>
                                    this.handleSelectItem(item.id, item.name)
                                  }
                                />
                                <label for={`checkbox ${item.id}`}></label>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <div style={{ marginBottom: "40px", marginRight: "17px" }}>
              <div
                className="yes-reAssign"
                onClick={() => this.handleReAssignMission()}
              >
                نعم
              </div>
              <div
                className="no-reAssign"
                onClick={() => this.showReAssignModalPopUp()}
              >
                لا
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  };

  renderCompletedMissionIsAwaitingEvaluation = () => {
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
    moment.locale("ar");

    const formatted_Assign_Date = assingedAt.format(
      `DD MMMM YYYY -   HH:mm  ${date_type}`
    );
    return (
      <div>
        <div
          class="Details-PopUp-Container"
          style={{
            zIndex:
              this.state.showMissionCompletedModal === true ||
              this.state.showRefuseModal === true
                ? "9"
                : "99999999999999999999999",
          }}
        >
          <div className="content">
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
                  {/*  Close Icon */}
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
                              {/* انشئت في */}
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
              {/* نطاق المهمة */}
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
              {/* تم الاسناد في */}
              <div class="row" id="assign-date">
                <div className="assign-date">
                  <span>
                    تم الاسناد في
                    {formatted_Assign_Date}
                  </span>
                </div>
              </div>
              {/* من اسندت لهم المهمة */}
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
                            <span className="assign-user-name">
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
              {/* الوصف */}
              <div class="row" id="mission-description">
                <div>
                  <span>الوصف</span>
                </div>
              </div>
              {/* الوصف */}
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
              {/* المرفقات والتسليمات */}
              <div class="row" id="mission-attch-container">
                <div class="col" id="mission-attch-section">
                  <div class="d-inline attach-user">
                    <img
                      src={Ellipse}
                      alt="user"
                      className="attach-userPhoto"
                    />
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
              {/* Actions */}
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <div className="evaluation-actions">
                      {/* تحديد كمهمة تامة  */}
                      <div
                        class="d-inline button-eval"
                        onClick={() => this.showMarkMissionCompletedPopUp()}
                      >
                        <span className="button-eval-span">
                          تحديد كمهمة تامة{" "}
                        </span>
                      </div>
                      {/* تعديل المهمة */}
                      <div
                        class="d-inline edit-mission-btn"
                        onClick={() => this.routeToEditPage()}
                      >
                        <span className="edit-btn-span">تعديل المهمة</span>
                      </div>
                      {/* رفض المهمة */}
                      <div
                        class="d-inline refuse-m-btn"
                        onClick={() => this.showRefuseMissionPopUp()}
                      >
                        <span className="refuse-btn-span">رفض المهمة</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mission Evaluation Pop Up */}
        <div className="content">
          <Modal
            isOpen={this.state.showMissionCompletedModal}
            toggle={() => this.showMarkMissionCompletedPopUp()}
            style={{
              display: "flex",
              zIndex: "9999999999999999999999999999999999",
            }}
          >
            <div style={{ borderBottom: "1px solid #F1F5F9" }}>
              <div style={{ marginTop: "25px", marginBottom: "8px" }}>
                <div style={{ display: "flex", padding: "10px" }}>
                  <span className="mission-evaluation">تعيين كمهمة تامة</span>
                  <img
                    onClick={() => this.showMarkMissionCompletedPopUp()}
                    src={closeIcon}
                    alt="close-icon"
                    className="close-evaluation"
                  />
                </div>
              </div>
            </div>

            <ModalBody>
              <span className="eval-question">
                هل انت متأكد من انك تريد تحديد هذه المهمة كمهمة تامة ؟
              </span>
            </ModalBody>
            <div style={{ marginBottom: "40px", marginRight: "17px" }}>
              <div
                className="yes-refuse"
                onClick={() => this.makeMissionCompleted()}
              >
                نعم
              </div>
              <div
                className="no-refuse"
                onClick={() => this.showMarkMissionCompletedPopUp()}
              >
                لا
              </div>
            </div>
          </Modal>
        </div>
        {/* Mission Refuse Popup */}
        <div className="content">
          <Modal
            isOpen={this.state.showRefuseModal}
            toggle={() => this.showRefuseMissionPopUp()}
            style={{
              display: "flex",
              zIndex: "9999999999999999999999999999999999",
            }}
          >
            <div style={{ borderBottom: "1px solid #F1F5F9" }}>
              <div style={{ marginTop: "25px", marginBottom: "8px" }}>
                <div style={{ display: "flex", padding: "10px" }}>
                  <span className="mission-evaluation">رفض المهمة</span>
                  <img
                    onClick={() => this.showRefuseMissionPopUp()}
                    src={closeIcon}
                    alt="close-icon"
                    className="close-evaluation"
                  />
                </div>
              </div>
            </div>

            <ModalBody>
              <span className="eval-question">
                هل أنت متأكد أنك تريد رفض هذه المهمة؟
              </span>
            </ModalBody>
            <div style={{ marginBottom: "40px", marginRight: "17px" }}>
              <div
                className="yes-refuse"
                onClick={() => this.handleRefuseMission()}
              >
                نعم
              </div>
              <div
                className="no-refuse"
                onClick={() => this.showRefuseMissionPopUp()}
              >
                لا
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  };

  renderFinishedMissionsType = () => {
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
                {/* Edit Icon */}
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
                {/* Delete Icon */}
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

                {/*  Close Icon */}
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
                                السعر {this.state.data.reward} جنيه
                              </span>
                            </div>
                            {/* انشئت في */}
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

            {/* تم الاسناد في */}
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
      </div>
    );
  }
}
export default MissionDetailsPopUp;
