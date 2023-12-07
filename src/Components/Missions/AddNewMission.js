import React, { Component } from "react";
import arrow from "../../Assets/images/Vector.svg";
import DatePicker from "react-multi-date-picker";
import MissionRangePopUp from "./MissionRangePopUp";
import MissionTypePopUp from "./MissionTypePopUp";
import AssignMissionToPopUp from "./AssignMissionToPopUp";
import DatePickerComponent from "../SubComponents/DatePickerComponent";
import { Formik } from "formik";
import moment from "moment";
import { toast } from "react-toastify";
import API from "../Api";

class AddNewMission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasException: false,
      showMissionRange: false,
      showMissionType: false,
      showAssignMission: false,
      missionTypeText: "اختر نوع المهمة",
      missionRangeText: "اختر محافظةمدينة او أكثر",
      assignToText: "اختر شخص  منطقة او اكثر",
      missionDetailsText: "",
      financialCompensation: "",
      missionAddress: null,
      financialincentive: null, // الحافز
      expiryDate: null,
      missionTypeObj: {},
      addMissionObject: {},
      selectedCities: [],
      assignMissionToArr: [],
      citiesIds: [],
      date: null,
    };
  }
  componentDidMount() {}

  showMissionRangePopUp = () => this.setState({ showMissionRange: true });
  showMissionTypePopUp = () => this.setState({ showMissionType: true });
  showAssignMissionPopUp = () => this.setState({ showAssignMission: true });

  receiveDataFromChild = (dataFromChild) => {
    this.setState({
      showMissionRange: dataFromChild,
      showMissionType: dataFromChild,
      showAssignMission: dataFromChild,
    });
    if (typeof dataFromChild === "object" && dataFromChild !== null) {
      if (dataFromChild.isType == true) {
        this.setState({ missionTypeObj: dataFromChild });
        this.handleChangeMissionTypeText(dataFromChild.name);
      } else {
        this.setState({ selectedCities: dataFromChild });
        if (dataFromChild.length > 0) {
          //Get First object from array
          let cityName = dataFromChild[0].name;
          let count = dataFromChild.length - 1;
          let text = `${cityName} و ${count} أخري`;
          this.setState({ missionRangeText: text });
        }
      }
    }
  };

  receiveAssignMissionTo = (data) => {
    let arr = [...this.state.assignMissionToArr];
    arr.push(data);
    let name = data[0].name;
    let count = data.length - 1;
    let text = `${name}و ${count} اخرون`;

    this.setState({ assignMissionToArr: arr, assignToText: text });
  };

  receiveDataFromDatePicker = (data) => {
    let fromatedDate = moment(data).format("YYYY-MM-DD");
    this.setState({ expiryDate: fromatedDate });
  };

  handleChangeMissionTypeText = (name) => {
    this.setState({ missionTypeText: name });
  };

  handleChangeMissionAddress = (e) => {
    this.setState({ missionAddress: e.target.value });
  };

  handleChangeDate = (selectedDate) => {
    let formattedDate = new Date();
    formattedDate = selectedDate;
    this.setState({ expiryDate: formattedDate });
  };

  handleChangeMissionDetails = (e) => {
    this.setState({ missionDetailsText: e.target.value });
  };

  handleChangeFinancialCompensation = (e) => {
    this.setState({ financialCompensation: e.target.value });
  };

  handleChangeException = () => {
    this.setState((prevState) => ({
      hasException: !prevState.hasException,
    }));
  };

  handleChangeCatalyst = (e) => {
    this.setState({ financialincentive: e.target.value });
  };

  sendDataToParent = () => {
    const data = false;
    // Call the callback function passed from the parent
    this.props.sendDataToParent(data);
  };

  handleAddMission = () => {
    const cities = [...this.state.selectedCities];
    const citiesIds = cities.map((item) => Number(item.id));

    let values = {};
    values.type_id = Number(this.state.missionTypeObj.id); //نوع المهمة
    values.work_area_ids = citiesIds; //نطاق المهمة
    values.name = this.state.missionAddress; //عنوان المهمة
    values.due_at = moment(this.state.expiryDate).format("YYYY-MM-DD"); //تاريخ الأنتهاء

    values.details = this.state.missionDetailsText; //تفاصيل المهمة
    values.reward = Number(this.state.financialCompensation); //المقابل المادي
    values.early_bonus = Number(this.state.financialincentive); //الحافز
    API.post("dashboard/missions", values)
      .then((response) => {
        if (response) {
          toast.success("Mission Created successfully");
          this.sendDataToParent(); //To Close The Page and return to the Mission Page
        }
      })
      .catch((error) => {
        toast.error("Something goes wrong please contact your administrators");
      });
  };

  render() {
    return (
      <div>
        <Formik
          onSubmit={() => this.handleAddMission()}
          initialValues={this.state.addMissionObject}
          validationSchema={null}
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
                {/* تفاصيل المهمة */}
                <div className="Add-M-Details">
                  <div>
                    {/* تفاصيل المهمة */}
                    <div class="row">
                      <div class="col-sm-2">
                        <div className="Add-M-Header">
                          <span>تفاصيل المهمة</span>
                        </div>
                      </div>
                    </div>

                    <div className="m-header-border"></div>

                    {/* نوع المهمة */}
                    <div class="row">
                      <div class="col-sm-2">
                        <p class=" m-0 px-3 py-2">
                          <span class="text-dark fs-6 fw-normal m-type">
                            نوع المهمة
                          </span>
                          <span class="text-danger fs-6 fw-normal font-family-MadaniArabic-Regular">
                            *
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* اختر نوع المهمة */}
                    <div class="row mb-3">
                      <div class="col-lg-12">
                        <div
                          className="d-flex justify-content-between  select-m-type"
                          onClick={this.showMissionTypePopUp}
                        >
                          <span>{this.state.missionTypeText}</span>
                          <img src={arrow} alt="arrow" className="arrow-m" />
                        </div>
                      </div>
                    </div>

                    {/* عنوان المهمة و تاريخ الأنتهاء */}
                    <div class="row ">
                      <div class="col-md-6">
                        <p class=" m-0 px-3 py-2">
                          <span class="text-dark fs-6 fw-normal m-type">
                            عنوان المهمة
                          </span>
                          <span class="text-danger fs-6 fw-normal font-family-MadaniArabic-Regular">
                            *
                          </span>
                        </p>
                        <input
                          type="text"
                          placeholder="اكتب عنوان هنا"
                          class="px-1 py-1 bg-white rounded-6  m-title-input"
                          onChange={(e) => this.handleChangeMissionAddress(e)}
                        />
                      </div>
                      <DatePickerComponent
                        sendDataToParent={this.receiveDataFromDatePicker}
                      />
                    </div>

                    {/* تفاصيل المهمة */}
                    <div class="row mb-3">
                      <div class="col-sm-2">
                        <p class=" m-0 px-3 py-2">
                          <span class="text-dark fs-6 fw-normal m-type">
                            تفاصيل المهمة
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Text Area :تفاصيل المهمة */}
                    <div class="row mb-3">
                      <div class="col-lg-12">
                        <textarea
                          placeholder="تفاصيل المهمة"
                          class="px-1 py-1 bg-white rounded-3 border border-1 m-details"
                          onChange={(e) => this.handleChangeMissionDetails(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* النطاق واسناد المهمة */}
                <div className="m-range-assign">
                  <div>
                    {/* النطاق واسناد المهمة */}
                    <div class="row">
                      <div class="col-sm-10">
                        <div className="assign-m-header">
                          <span>النطاق واسناد المهمة</span>
                        </div>
                      </div>
                    </div>

                    <div className="m-range-border"></div>

                    {/* نطاق المهمة */}
                    <div class="row mb-3">
                      <div class="col-sm-10">
                        <p class=" m-0 px-3 py-2">
                          <span class="text-dark fs-6 fw-normal m-range">
                            نطاق المهمة
                          </span>
                          <span class="text-danger fs-6 fw-normal font-family-MadaniArabic-Regular">
                            *
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* اختر  محافظة\مدينة او أكثر */}
                    <div class="row mb-3">
                      <div class="col-lg-12">
                        <div
                          className="d-flex justify-content-between  select-m-range"
                          onClick={this.showMissionRangePopUp}
                        >
                          <span>{this.state.missionRangeText}</span>
                          <img src={arrow} alt="arrow" className="arrow-m" />
                        </div>
                      </div>
                    </div>

                    {/* تعيين المهمة */}
                    {/* <div class="row mb-3">
                      <div class="col-sm-10">
                        <p class=" m-0 px-3 py-2">
                          <span class="text-dark fs-6 fw-normal m-assign">
                            تعيين المهمة ل
                          </span>
                          <span class="text-danger fs-6 fw-normal font-family-MadaniArabic-Regular">
                            *
                          </span>
                        </p>
                      </div>
                    </div> */}

                    {/* اختر شخص\منطقة او اكثر */}
                    {/* <div class="row mb-3">
                      <div class="col-lg-12">
                        <div
                          className="d-flex justify-content-between select-m-assign"
                          onClick={this.showAssignMissionPopUp}
                        >
                          <span>{this.state.assignToText}</span>
                          <img src={arrow} alt="arrow" className="arrow-m" />
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* Financial compensation */}
                <div className="m-financial-compensation">
                  <div>
                    {/* Header المقابل المادي */}
                    <div class="row">
                      <div class="col-sm-10">
                        <div className="financial-m-header">
                          <span>المقابل المادي</span>
                        </div>
                      </div>
                    </div>

                    <div className="m-range-border"></div>

                    {/* المقابل المادي */}
                    <div class="row mb-3">
                      <div class="col-sm-10">
                        <p class=" m-0 px-3 py-2">
                          <span class="text-dark fs-6 fw-normal m-financial">
                            المقابل المادي
                          </span>
                          <span class="text-danger fs-6 fw-normal font-family-MadaniArabic-Regular">
                            *
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* القيمة */}
                    <div class="row mb-3">
                      <div class="col-lg-12">
                        <input
                          placeholder="0.0"
                          className="d-flex justify-content-between financial-input"
                          onChange={(e) =>
                            this.handleChangeFinancialCompensation(e)
                          }
                        />
                      </div>
                    </div>

                    {/* حافز للأداء الإستثنائي ؟ */}
                    <div class="row mb-3">
                      <div class="col-sm-10">
                        <p class=" m-0 px-3 py-2">
                          <span class="text-dark fs-6 fw-normal exceptional-performance">
                            حافز للأداء الإستثنائي ؟
                          </span>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={this.state.hasException}
                              onChange={this.handleChangeException}
                            />
                            <span className="slider round"></span>
                          </label>
                        </p>
                      </div>
                    </div>

                    {/* الحافز */}
                    {this.state.hasException === true ? (
                      <>
                        {" "}
                        <div class="row mb-3">
                          <div class="col-sm-10">
                            <p class=" m-0 px-3 py-2">
                              <span class="text-dark fs-6 fw-normal m-motivation">
                                الحافز
                              </span>
                              <span class="text-danger fs-6 fw-normal font-family-MadaniArabic-Regular">
                                *
                              </span>
                            </p>
                          </div>
                        </div>
                        {/* قيمة الحافز */}
                        <div class="row mb-3">
                          <div class="col-lg-12">
                            <input
                              placeholder="0.0"
                              className="d-flex justify-content-between motivation-input"
                              onChange={(e) => this.handleChangeCatalyst(e)}
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="m-submit">
                  <div>
                    <div class="row">
                      <div class="col">
                        <button type="submit" class="d-inline m-submit-btn">
                          اضافة
                        </button>

                        <button
                          onClick={() => this.sendDataToParent()}
                          class="d-inline m-cancel-btn"
                        >
                          الغاء
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </Formik>
        {this.state.showMissionRange === true ? (
          <>
            <MissionRangePopUp
              sendDataToParent={this.receiveDataFromChild}
              selectedCities={this.receiveDataFromChild}
            />
          </>
        ) : null}
        {this.state.showMissionType === true ? (
          <>
            <MissionTypePopUp
              sendDataToParent={this.receiveDataFromChild}
              selectedMissionType={this.receiveDataFromChild}
            />
          </>
        ) : null}

        {this.state.showAssignMission === true ? (
          <>
            <AssignMissionToPopUp
              sendDataToParent={this.receiveDataFromChild}
              SalesSpecialties={this.receiveAssignMissionTo}
            />
          </>
        ) : null}
      </div>
    );
  }
}
export default AddNewMission;
