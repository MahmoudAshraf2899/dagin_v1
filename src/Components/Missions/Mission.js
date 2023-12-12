import React, { Component } from "react";
import MissionDetailsPopUp from "./MissionDetailsPopUp";
import AddNewMission from "./AddNewMission";
import Ellipse from "../../Assets/images/Ellipse 3.svg";
import Ellipse2 from "../../Assets/images/Ellipse 4.svg";
import MisisonOptionsPopUp from "./MisisonOptionsPopUp";
import API from "../Api";
import { Button, UncontrolledPopover, PopoverBody, Util } from "reactstrap";
import moment from "moment";
import { toast } from "react-toastify";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import EditMission from "./EditMission";

Util.setGlobalCssModule({
  btn: "hyperspeed-btn",
  PopoverBody: "pob-body",
});
class Mission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMission: 0,
      showAddComponent: false,
      showDetailsPopUp: false,
      showMissionOptionList: false,
      currentElementTitle: "pending",
      missionId: 0,
      data: [],
      pageNumber: 1,
      pageSize: 10,
      lastIndex: 0,
      firstIndex: 0,
      pagedData: [],
      noPages: 0,
      totalRows: 0,
      showEditMission: false,
      editMissionId: null,
    };
  }
  componentDidMount() {
    API.get(
      `dashboard/missions?status=pending&sort_by=id&sort_order=DESC&page=1&limit=${this.state.pageSize}`
    )
      .then((res) => {
        if (res) {
          if (res.status === 403) {
            toast.error("You don't have permission to access this page");
          } else {
            const pageNumber = this.state.pageNumber;
            const pageSize = this.state.pageSize;
            const lastIndexValue = pageNumber * pageSize;
            const firstIndexValue = lastIndexValue - pageSize;
            let dataArr = res.data.items;
            let pagedDataValue = dataArr.slice(firstIndexValue, lastIndexValue);
            this.setState({
              data: pagedDataValue,
              totalRows: res.data.totalCount,
            });
          }
        } else {
          toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
        }
      })
      .catch((error) => {
        toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
      });
  }

  handleOnClick = (e) => {
    console.log("data:", this.state.data);
    let statusType = "";
    this.setState({ data: [] }); //for popover
    switch (e) {
      case 1:
        this.setState({ currentElementTitle: "in_progress" });
        statusType = "in_progress";
        break;

      case 2:
        this.setState({ currentElementTitle: "late" });
        statusType = "late";
        break;

      case 3:
        this.setState({ currentElementTitle: "revision" });
        statusType = "revision";
        break;

      case 4:
        this.setState({ currentElementTitle: "completed" });
        statusType = "completed";

        break;

      default:
        this.setState({ currentElementTitle: "pending" });
        statusType = "pending";
    }
    this.setState({ selectedMission: e, currentElementTitle: statusType });

    API.get(
      `dashboard/missions?status=${statusType}&sort_by=id&sort_order=DESC&page=1&limit=${this.state.pageSize}`
    ).then((res) => {
      if (res) {
        const lastIndexValue = this.state.pageNumber * this.state.pageSize;
        const firstIndexValue = lastIndexValue - this.state.pageSize;
        let dataArr = res.data.items;
        let rowsLength = res.data.totalCount;
        let pagedDataValue = dataArr.slice(firstIndexValue, lastIndexValue);
        this.setState({ data: pagedDataValue, totalRows: rowsLength });
        // this.setState({ data: res.data.items });
      } else {
        toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
      }
    });
  };

  deleteMission = (id) => {
    API.delete(`dashboard/missions/${id}`).then((res) => {
      if (res.status === 200) {
        this.extractObjectForDelete(id);
      }
    });
  };

  showAddNewMissionComponent = () => {
    this.setState({ showAddComponent: true });
  };

  showDetailsPopUp = (id) => {
    let option = this.state.showDetailsPopUp;

    this.setState({ showDetailsPopUp: !option, missionId: id });
  };

  showMissionOptions = () => {
    let option = this.state.showMissionOptionList;
    this.setState({ showMissionOptionList: !option });
  };

  receiveDataFromChild = (dataFromChild) => {
    this.setState({ showAddComponent: dataFromChild });
    // Do something with the data in the parent component
  };

  deleteObjectFromDetails = (item) => {
    this.extractObjectForDelete(item);
  };

  EditMissionFromDetails = (item) => {
    this.setState({ showEditMission: true, editMissionId: item });
  };

  handleNextPage = () => {
    const pageNumberValue = this.state.pageNumber;
    const lastIndex = this.state.lastIndex;
    if (pageNumberValue !== lastIndex) {
      API.get(
        `dashboard/missions?status=${
          this.state.currentElementTitle
        }&sort_by=id&sort_order=DESC&page=${pageNumberValue + 1}&limit=${
          this.state.pageSize
        }`
      ).then((res) => {
        let dataArr = res.data.items;
        this.setState({
          data: dataArr,
          pageNumber: pageNumberValue + 1,
        });
      });
    }
  };

  hanldeChangePage = (n) => {
    API.get(
      `dashboard/missions?status=${this.state.currentElementTitle}&sort_by=id&sort_order=DESC&page=${n}&limit=${this.state.pageSize}`
    ).then((res) => {
      let dataArr = res.data.items;
      this.setState({ data: dataArr, pageNumber: n });
    });
  };

  handlePrevPage = () => {
    const pageNumberValue = this.state.pageNumber;
    const firstIndex = this.state.firstIndex;
    if (pageNumberValue !== firstIndex) {
      API.get(
        `dashboard/missions?status=${
          this.state.currentElementTitle
        }&sort_by=id&sort_order=DESC&page=${pageNumberValue - 1}&limit=${
          this.state.pageSize
        }`
      ).then((res) => {
        let dataArr = res.data.items;
        this.setState({
          data: dataArr,
          pageNumber: pageNumberValue - 1,
        });
      });
    }
  };

  renderPagination = () => {
    const pageSize = this.state.pageSize;
    let dataArr = this.state.data;
    const nPages = Math.ceil(this.state.totalRows / pageSize);
    const numbers = [...Array(nPages + 1).keys()].slice(1);

    let data = numbers.map((n) => (
      <PaginationItem
        className={this.state.pageNumber === n ? "active" : ""}
        style={{ marginRight: "10px", marginLeft: "10px" }}
        onClick={() => this.hanldeChangePage(n)}
        key={n}
      >
        <PaginationLink
          href="#"
          style={{
            width: "70px",
            height: "50px",
            fontSize: "15px",
            textAlign: "center",
            paddingTop: "12px",
            backgroundColor: this.state.pageNumber === n ? "#70D44B" : "",
            color: this.state.pageNumber !== n ? "black" : "",
          }}
        >
          {n}
        </PaginationLink>
      </PaginationItem>
    ));
    return data;
  };

  extractObjectForDelete(id) {
    let dataObj = [...this.state.data];
    let removedObject = dataObj.find((item) => item.id === id);
    dataObj = dataObj.filter((item) => item.id !== id);
    this.setState({ data: dataObj });
  }
  showInProgressMissions = () => {
    return (
      <div>
        {this.state.data.map((item) => {
          const createdAtDate = moment(item.created_at);
          const dueDate = moment(
            item.due_at == null ? new Date() : item.due_at
          );

          // Set the locale to Arabic
          moment.locale("ar");
          const createdAtDate_Arabic = createdAtDate.format("DD MMM YYYY");
          const dueDate_Arabic = dueDate.format("DD MMMM YYYY");

          return (
            <div class="row">
              <div className="missions-section">
                <div className="mission-container">
                  <div className="mission-child">
                    <div className="container">
                      <div className="row">
                        <div class="col-sm-11">
                          <span class="ml-2 mission-span-1">
                            {item.type != null ? item.type.name : ""}
                            <br />
                            <span className="mission-span-2">{item.name}</span>
                            <br />
                          </span>
                        </div>
                        <div
                          class="col-sm-1 more-icon"
                          style={{ marginLeft: "60px" }}
                        >
                          <Button
                            id={`UncontrolledPopover${item.id}`}
                            type="button"
                            cssModule={{ btn: "hyperspeed-btn" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                                fill="#A7AEC1"
                              />
                              <path
                                d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                                fill="#A7AEC1"
                              />
                              <path
                                d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                                fill="#A7AEC1"
                              />
                            </svg>
                          </Button>
                          <UncontrolledPopover
                            placement="bottom"
                            target={`UncontrolledPopover${item.id}`}
                            trigger="legacy"
                          >
                            <PopoverBody
                              style={{ borderRadius: "8px", width: "155px" }}
                            >
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => this.showDetailsPopUp(item.id)}
                                className="mission-options-el"
                              >
                                <p
                                  class="text-end option-txt"
                                  style={{ marginBottom: "-5px" }}
                                >
                                  عرض المهمة
                                </p>
                              </div>
                              <br />
                              <div className="mission-options-el">
                                <p
                                  class="text-end option-txt"
                                  style={{ marginBottom: "-5px" }}
                                >
                                  تعديل المهمة
                                </p>
                              </div>
                              <br />

                              <div
                                className="mission-options-el"
                                onClick={() => this.deleteMission(item.id)}
                              >
                                <p
                                  class="text-end option-txt-danger"
                                  style={{
                                    marginBottom: "-5px",
                                    cursor: "pointer",
                                  }}
                                >
                                  حذف المهمة
                                </p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col">
                          <div className="mission-info">
                            {/* سعر|reward */}
                            <div class="d-inline mission-price">
                              <span className="mission-price-span">
                                السعر {item.reward} جنيه
                              </span>
                            </div>
                            {/* نطاق المهمة */}
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
                                {item.full_addresss == null
                                  ? ""
                                  : item.full_addresss}
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
                        {/*حالة المهمة */}
                        <div
                          class="col-md-auto mission-status-in-progress"
                          style={{ marginTop: "10px" }}
                        >
                          <span className="mission-status-span-in-progress">
                            مهمة تحت التنفيذ
                          </span>
                        </div>
                        {item.salesman == null || item.salesman == undefined ? (
                          <div
                            class="col-md-auto mission-assigned"
                            style={{ marginTop: "10px" }}
                          >
                            <span className="mission-assigned-span">
                              لم تستند بعد
                            </span>
                          </div>
                        ) : (
                          //Todo : if sales man is more than three so get code from [
                          //Build Mission Details Pop up for CompletedMissionIsAwaitingEvaluation] Commit
                          <div
                            class="col-md-auto mission-assigned"
                            style={{ marginTop: "10px" }}
                          >
                            <img
                              className="assigned-to-img"
                              src={Ellipse}
                              alt="assigned-to"
                            />
                            <span className="mission-assigned-span">
                              <span className="mission-assigned-span-child-1">
                                اسند لي:
                              </span>
                              <span className="mission-assigned-span-child-2">
                                {item.salesman.name}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  showPendingMissions = () => {
    return (
      <div>
        {this.state.data.map((item) => {
          const createdAtDate = moment(item.created_at);
          const dueDate = moment(
            item.due_at == null ? new Date() : item.due_at
          );

          // Set the locale to Arabic
          moment.locale("ar");
          const createdAtDate_Arabic = createdAtDate.format("DD MMM YYYY");
          const dueDate_Arabic = dueDate.format("DD MMMM YYYY");
          return (
            <div class="row">
              <div className="missions-section">
                <div className="mission-container">
                  <div className="mission-child">
                    <div className="container">
                      <div className="row">
                        <div class="col-sm-11">
                          <span class="ml-2 mission-span-1">
                            {item.type != null ? item.type.name : ""}

                            <br />
                            <span className="mission-span-2">{item.name}</span>
                            <br />
                          </span>
                        </div>
                        <div
                          class="col-sm-1  more-icon"
                          style={{ marginLeft: "60px" }}
                        >
                          <Button
                            id={`UncontrolledPopover${item.id}`}
                            type="button"
                            cssModule={{ btn: "hyperspeed-btn" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                                fill="#A7AEC1"
                              />
                              <path
                                d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                                fill="#A7AEC1"
                              />
                              <path
                                d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                                fill="#A7AEC1"
                              />
                            </svg>
                          </Button>
                          <UncontrolledPopover
                            placement="bottom"
                            target={`UncontrolledPopover${item.id}`}
                            trigger="legacy"
                          >
                            <PopoverBody
                              style={{ borderRadius: "8px", width: "155px" }}
                            >
                              <div
                                onClick={() => this.showDetailsPopUp(item.id)}
                                className="mission-options-el"
                              >
                                <p
                                  class="text-end option-txt"
                                  style={{ marginBottom: "-5px" }}
                                >
                                  عرض المهمة
                                </p>
                              </div>
                              <br />
                              <div className="mission-options-el">
                                <p
                                  class="text-end option-txt"
                                  style={{ marginBottom: "-5px" }}
                                >
                                  تعديل المهمة
                                </p>
                              </div>
                              <br />

                              <div
                                className="mission-options-el"
                                onClick={() => this.deleteMission(item.id)}
                              >
                                <p
                                  class="text-end option-txt-danger"
                                  style={{ marginBottom: "-5px" }}
                                >
                                  حذف المهمة
                                </p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col">
                          <div className="mission-info">
                            <div class="d-inline mission-price">
                              <span className="mission-price-span">
                                السعر {item.reward} جنيه
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
                                {item.full_addresss == null
                                  ? "الجيزة"
                                  : item.full_addresss}
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
                        <div
                          class="col-md-auto mission-status"
                          style={{ marginTop: "10px" }}
                        >
                          <span className="mission-status-span">
                            قيد الانتظار
                          </span>
                        </div>
                        {item.salesman == null || item.salesman == undefined ? (
                          <div
                            class="col-md-auto mission-assigned"
                            style={{ marginTop: "10px" }}
                          >
                            <span className="mission-assigned-span">
                              لم تستند بعد
                            </span>
                          </div>
                        ) : (
                          <div
                            class="col-md-auto mission-assigned"
                            style={{ marginTop: "10px" }}
                          >
                            <img
                              className="assigned-to-img"
                              src={Ellipse}
                              alt="assigned-to"
                            />
                            <span className="mission-assigned-span">
                              <span className="mission-assigned-span-child-1">
                                اسند لي:
                              </span>
                              <span className="mission-assigned-span-child-2">
                                {item.salesman.name}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  showLateMissions = () => {
    return (
      <div>
        {this.state.data.map((item) => {
          const createdAtDate = moment(item.created_at);
          const dueDate = moment(
            item.due_at == null ? new Date() : item.due_at
          );

          // Set the locale to Arabic
          moment.locale("ar");
          const createdAtDate_Arabic = createdAtDate.format("DD MMM YYYY");
          const dueDate_Arabic = dueDate.format("DD MMMM YYYY");

          return (
            <div class="row">
              <div className="missions-section">
                <div className="mission-container">
                  <div className="mission-child">
                    <div className="container">
                      <div className="row">
                        <div class="col-sm-11">
                          <span class="ml-2 mission-span-1">
                            {item.type != null ? item.type.name : ""}
                            <br />
                            <span className="mission-span-2">{item.name}</span>
                            <br />
                          </span>
                        </div>
                        <div
                          class="col-sm-1 more-icon"
                          style={{ marginLeft: "60px" }}
                        >
                          <Button
                            id={`UncontrolledPopover${item.id}`}
                            type="button"
                            cssModule={{ btn: "hyperspeed-btn" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                                fill="#A7AEC1"
                              />
                              <path
                                d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                                fill="#A7AEC1"
                              />
                              <path
                                d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                                fill="#A7AEC1"
                              />
                            </svg>
                          </Button>
                          <UncontrolledPopover
                            placement="bottom"
                            target={`UncontrolledPopover${item.id}`}
                            trigger="legacy"
                          >
                            <PopoverBody
                              style={{ borderRadius: "8px", width: "155px" }}
                            >
                              <div
                                onClick={() => this.showDetailsPopUp(item.id)}
                                className="mission-options-el"
                              >
                                <p
                                  class="text-end option-txt"
                                  style={{ marginBottom: "-5px" }}
                                >
                                  عرض المهمة
                                </p>
                              </div>
                              <br />
                              <div className="mission-options-el">
                                <p
                                  class="text-end option-txt"
                                  style={{ marginBottom: "-5px" }}
                                >
                                  تعديل المهمة
                                </p>
                              </div>
                              <br />

                              <div
                                className="mission-options-el"
                                onClick={() => this.deleteMission(item.id)}
                              >
                                <p
                                  class="text-end option-txt-danger"
                                  style={{ marginBottom: "-5px" }}
                                >
                                  حذف المهمة
                                </p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col">
                          <div className="mission-info">
                            <div class="d-inline mission-price">
                              <span className="mission-price-span">
                                السعر {item.reward} جنيه
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
                                {item.full_address}
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
                        <div
                          class="col-md-auto mission-status-late"
                          style={{ marginTop: "10px" }}
                        >
                          <span className="mission-status-span-late">
                            مهمة متأخرة
                          </span>
                        </div>
                        {item.salesman == null || item.salesman == undefined ? (
                          <div
                            class="col-md-auto mission-assigned"
                            style={{ marginTop: "10px" }}
                          >
                            <span className="mission-assigned-span">
                              لم تستند بعد
                            </span>
                          </div>
                        ) : (
                          <div
                            class="col-md-auto mission-assigned"
                            style={{ marginTop: "10px" }}
                          >
                            <img
                              className="assigned-to-img"
                              src={Ellipse}
                              alt="assigned-to"
                            />
                            <span className="mission-assigned-span">
                              <span className="mission-assigned-span-child-1">
                                اسند لي:
                              </span>
                              <span className="mission-assigned-span-child-2">
                                {item.salesman.name}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  showRevisionMissions = () => {
    return (
      <div>
        {this.state.data.map((item) => {
          const createdAtDate = moment(item.created_at);
          const dueDate = moment(
            item.due_at == null ? new Date() : item.due_at
          );

          // Set the locale to Arabic
          moment.locale("ar");
          const createdAtDate_Arabic = createdAtDate.format("DD MMM YYYY");
          const dueDate_Arabic = dueDate.format("DD MMMM YYYY");
          return (
            <div class="row">
              <div className="missions-section">
                <div className="mission-container">
                  <div className="mission-child">
                    <div className="container">
                      <div className="row">
                        <div class="col-sm-11">
                          <span class="ml-2 mission-span-1">
                            {item.type != null ? item.type.name : ""}
                            <br />
                            <span className="mission-span-2">{item.name}</span>
                            <br />
                          </span>
                        </div>
                        <div
                          class="col-sm-1 more-icon"
                          style={{ marginLeft: "60px" }}
                        >
                          <Button
                            id={`UncontrolledPopover${item.id}`}
                            type="button"
                            cssModule={{ btn: "hyperspeed-btn" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                                fill="#A7AEC1"
                              />
                              <path
                                d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                                fill="#A7AEC1"
                              />
                              <path
                                d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                                fill="#A7AEC1"
                              />
                            </svg>
                          </Button>
                          <UncontrolledPopover
                            placement="bottom"
                            target={`UncontrolledPopover${item.id}`}
                            trigger="legacy"
                          >
                            <PopoverBody
                              style={{ borderRadius: "8px", width: "155px" }}
                            >
                              <div
                                onClick={() => this.showDetailsPopUp(item.id)}
                                className="mission-options-el"
                              >
                                <p
                                  class="text-end option-txt"
                                  style={{ marginBottom: "-5px" }}
                                >
                                  عرض المهمة
                                </p>
                              </div>
                              <br />
                              <div className="mission-options-el">
                                <p
                                  class="text-end option-txt"
                                  style={{ marginBottom: "-5px" }}
                                >
                                  تعديل المهمة
                                </p>
                              </div>
                              <br />

                              <div
                                className="mission-options-el"
                                onClick={() => this.deleteMission(item.id)}
                              >
                                <p
                                  class="text-end option-txt-danger"
                                  style={{ marginBottom: "-5px" }}
                                >
                                  حذف المهمة
                                </p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col">
                          <div className="mission-info">
                            <div class="d-inline mission-price">
                              <span className="mission-price-span">
                                السعر {item.reward} جنيه
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
                                {item.full_address}
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
                        <div
                          class="col-md-auto mission-status"
                          style={{ marginTop: "10px" }}
                        >
                          <span
                            className="mission-status-span"
                            style={{ color: "var(--orange-01, #FF6D00);" }}
                          >
                            مهمة تامة تنتظر التقييم
                          </span>
                        </div>
                        <div
                          class="col-md-auto mission-assigned"
                          style={{ marginTop: "10px" }}
                        >
                          <img
                            className="assigned-to-img"
                            src={Ellipse}
                            alt="assigned-to"
                          />
                          <span className="mission-assigned-span">
                            <span className="mission-assigned-span-child-1">
                              اسند لي:
                            </span>
                            <span className="mission-assigned-span-child-2">
                              {item.salesman.name}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  showFinishedMissions = () => {
    return (
      <div>
        {this.state.data.map((item) => {
          const createdAtDate = moment(item.created_at);
          const dueDate = moment(
            item.due_at == null ? new Date() : item.due_at
          );

          // Set the locale to Arabic
          moment.locale("ar");
          const createdAtDate_Arabic = createdAtDate.format("DD MMM YYYY");
          const dueDate_Arabic = dueDate.format("DD MMMM YYYY");
          return (
            <div class="row">
              <div className="missions-section">
                <div className="mission-container">
                  <div className="mission-child">
                    <div className="container">
                      <div className="row">
                        <div class="col-sm-11">
                          <span class="ml-2 mission-span-1">
                            {item.type != null ? item.type.name : ""}
                            <br />
                            <span className="mission-span-2">{item.name}</span>
                            <br />
                          </span>
                        </div>
                        <div
                          class="col-sm-1 more-icon"
                          style={{ marginLeft: "60px" }}
                        >
                          <Button
                            id={`UncontrolledPopover${item.id}`}
                            type="button"
                            cssModule={{ btn: "hyperspeed-btn" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                                fill="#A7AEC1"
                              />
                              <path
                                d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                                fill="#A7AEC1"
                              />
                              <path
                                d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                                fill="#A7AEC1"
                              />
                            </svg>
                          </Button>
                          <UncontrolledPopover
                            placement="bottom"
                            target={`UncontrolledPopover${item.id}`}
                            trigger="legacy"
                          >
                            <PopoverBody
                              style={{ borderRadius: "8px", width: "155px" }}
                            >
                              <div
                                onClick={() => this.showDetailsPopUp(item.id)}
                                className="mission-options-el"
                              >
                                <p
                                  class="text-end option-txt"
                                  style={{ marginBottom: "-5px" }}
                                >
                                  عرض المهمة
                                </p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col">
                          <div className="mission-info">
                            <div class="d-inline mission-price">
                              <span className="mission-price-span">
                                السعر {item.reward} جنيه
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
                                {item.full_address}
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
                        <div
                          class="col-md-auto mission-status-in-progress"
                          style={{ marginTop: "10px" }}
                        >
                          <span className="mission-status-span-in-progress">
                            مهمة تامة
                          </span>
                        </div>
                        <div
                          class="col-md-auto mission-assigned"
                          style={{ marginTop: "10px" }}
                        >
                          <img
                            className="assigned-to-img"
                            src={Ellipse}
                            alt="assigned-to"
                          />
                          <span className="mission-assigned-span">
                            <span className="mission-assigned-span-child-1">
                              اسند لي:
                            </span>
                            <span className="mission-assigned-span-child-2">
                              {item.salesman.name}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div class="container missionPage">
        <div class="row">
          {/* Mission Type : مهمة قيد الأنتظار */}
          <div
            class="col"
            style={{
              display:
                this.state.showAddComponent === true ||
                this.state.showEditMission === true
                  ? "none"
                  : "unset",
            }}
          >
            <div
              onClick={() => this.handleOnClick(0)}
              className={
                this.state.selectedMission === 0
                  ? "mission-active"
                  : "mission-type"
              }
            >
              <span
                class="d-inline"
                id={
                  this.state.selectedMission === 0
                    ? "mission-span-active"
                    : "mission-type-span"
                }
              >
                مهمة قيد الإنتظار
              </span>
            </div>
            <div
              onClick={() => this.handleOnClick(1)}
              className={
                this.state.selectedMission === 1
                  ? "mission-active"
                  : "mission-type"
              }
            >
              <span
                class="d-inline"
                id={
                  this.state.selectedMission === 1
                    ? "mission-span-active"
                    : "mission-type-span"
                }
              >
                مهمة تحت التنفيذ
              </span>
            </div>
            <div
              onClick={() => this.handleOnClick(2)}
              className={
                this.state.selectedMission === 2
                  ? "mission-active"
                  : "mission-type"
              }
            >
              <span
                class="d-inline"
                id={
                  this.state.selectedMission === 2
                    ? "mission-span-active"
                    : "mission-type-span"
                }
              >
                مهمة متأخرة
              </span>
            </div>
            <div
              onClick={() => this.handleOnClick(3)}
              className={
                this.state.selectedMission === 3
                  ? "mission-active"
                  : "mission-type"
              }
            >
              <span
                class="d-inline"
                id={
                  this.state.selectedMission === 3
                    ? "mission-span-active"
                    : "mission-type-span"
                }
              >
                مهمة تامة تنتظر التقييم
              </span>
            </div>
            <div
              onClick={() => this.handleOnClick(4)}
              className={
                this.state.selectedMission === 4
                  ? "mission-active"
                  : "mission-type"
              }
            >
              <span
                class="d-inline"
                id={
                  this.state.selectedMission === 4
                    ? "mission-span-active"
                    : "mission-type-span"
                }
              >
                مهمة تامة
              </span>
            </div>
          </div>
          {/* Mission Filter */}
          <div
            class="col-md-auto"
            style={{
              display:
                this.state.showAddComponent === true ||
                this.state.showEditMission === true
                  ? "none"
                  : "unset",
            }}
          >
            <div className="filter-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.58342 4.16666H15.4168C15.5368 4.20875 15.6456 4.27775 15.7348 4.36838C15.824 4.459 15.8913 4.56885 15.9315 4.68951C15.9718 4.81016 15.9838 4.93842 15.9668 5.06446C15.9498 5.1905 15.9042 5.31098 15.8334 5.41666L11.6668 9.99999V15.8333L8.33342 13.3333V9.99999L4.16676 5.41666C4.096 5.31098 4.05037 5.1905 4.03336 5.06446C4.01636 4.93842 4.02842 4.81016 4.06864 4.68951C4.10886 4.56885 4.17616 4.459 4.26539 4.36838C4.35462 4.27775 4.46341 4.20875 4.58342 4.16666Z"
                  stroke="#64748B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="filter-container-span">الفلتر </span>
            </div>
          </div>
          {/* Add New Mission Button */}
          <div
            class="col col-lg-2"
            onClick={() => this.showAddNewMissionComponent()}
            style={{
              display:
                this.state.showAddComponent === true ||
                this.state.showEditMission === true
                  ? "none"
                  : "unset",
            }}
          >
            <div className="Add-New-Mission">
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
              <span className="Add-New-Mission-btn">اضافة مهمة</span>
            </div>
          </div>
        </div>
        {/* Missions List */}
        <div
          className="container"
          style={{
            backgroundColor: "#F1F5F9",
            height: "100vw",
            width: "100vw",
            marginTop: "15px",
          }}
        >
          <div
            style={{
              display:
                this.state.showAddComponent === true ||
                this.state.showEditMission === true
                  ? "none"
                  : "unset",
            }}
          >
            {this.state.selectedMission === 1
              ? this.showInProgressMissions()
              : this.state.selectedMission === 2
              ? this.showLateMissions()
              : this.state.selectedMission === 3
              ? this.showRevisionMissions()
              : this.state.selectedMission === 4
              ? this.showFinishedMissions()
              : this.showPendingMissions()}
          </div>
          {/* Pagination */}

          {this.state.data.length === 0 ||
          this.state.showAddComponent === true ||
          this.state.showEditMission === true ? null : (
            <>
              <div class="row">
                <Pagination
                  aria-label="Page navigation example"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  {/* Previous */}
                  <PaginationItem
                    disabled
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                    onClick={() => this.handlePrevPage()}
                  >
                    <PaginationLink
                      href="#"
                      style={{
                        width: "70px",
                        height: "50px",
                        fontSize: "15px",
                        textAlign: "center",
                        paddingTop: "12px",
                        color: "#70D44B",
                      }}
                      previous
                    />
                  </PaginationItem>
                  {this.renderPagination(this.state.noPages)}
                  {/* Next  */}
                  <PaginationItem
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                    onClick={() => this.handleNextPage()}
                  >
                    <PaginationLink
                      href="#"
                      style={{
                        width: "70px",
                        height: "50px",
                        fontSize: "15px",
                        textAlign: "center",
                        paddingTop: "12px",
                        color: "#70D44B",
                      }}
                      next
                    />
                  </PaginationItem>
                </Pagination>
              </div>
            </>
          )}
          {/* Render Add New Mission Component */}
          <div class="row">
            {this.state.showAddComponent === true ? (
              <AddNewMission sendDataToParent={this.receiveDataFromChild} />
            ) : null}
          </div>

          {/* Render Edit Mission Component */}
          <div class="row">
            {this.state.showEditMission === true ? (
              <EditMission id={this.state.editMissionId} />
            ) : null}
          </div>
          {/* Details Pop Up */}
          {this.state.showDetailsPopUp === true ? (
            <>
              <MissionDetailsPopUp
                missionType={this.state.selectedMission}
                id={this.state.missionId}
                deletedElement={this.deleteObjectFromDetails}
                EditMissionProps={this.EditMissionFromDetails}
              />
            </>
          ) : null}
          {this.state.showMissionOptionList === true ? (
            <>
              <MisisonOptionsPopUp />
            </>
          ) : null}
        </div>
      </div>
    );
  }
}
export default Mission;
