import React, { Component } from "react";
import MissionRangePopUp from "./MissionRangePopUp";
import MissionTypePopUp from "./MissionTypePopUp";
import AssignMissionToPopUp from "./AssignMissionToPopUp";
import DatePickerComponent from "../SubComponents/DatePickerComponent";
import arrow from "../../Assets/images/Vector.svg";

import { Formik } from "formik";
import moment from "moment";
import { toast } from "react-toastify";
import API from "../Api";

class EditMission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMissionRange: false,
      showMissionType: false,
      showAssignMission: false,
      hasException: false,
      document: {},
      types: {},
      workAreas: [],
      assignMissionToArr: [],
      expiryDate: null,
      dateChanged: false,
      missionRangeText: "اختر محافظةمدينة او أكثر",
      assignToText: "اختر شخص  منطقة او اكثر",
      assignToType: null,
    };
  }
  componentDidMount() {
    console.log("Props Id:", this.props.id);
    console.log("Props Come From Where :", this.props.isCompleted);
    moment.locale("en");
    API.get(`dashboard/missions/${this.props.id}`).then((res) => {
      if (res.status === 200) {
        this.setState({
          document: res.data,
          types: res.data.type,
          workAreas: res.data.workAreas,
        });
        if (res.data.workAreas.length > 0) {
          let cityName = res.data.workAreas[0].name;
          let count = res.data.workAreas.length - 1;
          let text = `${cityName} و ${count} أخري`;
          this.setState({ missionRangeText: text });
        }
        if (res.data.assignedUsers.length > 0) {
          let name = res.data.assignedUsers[0].name;
          let count = res.data.assignedUsers.length - 1;
          let text = `${name} و ${count} أخري`;
          this.setState({
            assignToText: text,
            assignMissionToArr: res.data.assignedUsers,
          });
        }
        if (res.data.assignedSpecialties.length > 0) {
          let name = res.data.assignedSpecialties[0].name;
          let count = res.data.assignedSpecialties.length - 1;
          let text = `${name} و ${count} أخري`;
          this.setState({ assignToText: text });
        }
        if (res.data.early_bonus != null) {
          this.setState({ hasException: true });
        }
      }
    });
  }

  sendDataToParent = () => {
    const data = false;
    // Call the callback function passed from the parent
    this.props.sendDataToParent(data);
  };

  showMissionRangePopUp = () => this.setState({ showMissionRange: true });
  showMissionTypePopUp = () => this.setState({ showMissionType: true });
  showAssignMissionPopUp = () => this.setState({ showAssignMission: true });

  receiveTypeFromMissionType = (data) => {
    let typesCopy = { ...this.state.types };
    typesCopy.id = data.id;
    typesCopy.name = data.name;
    this.setState({ types: typesCopy });
  };

  receiveCitiesFromRangePopUp = (data) => {
    let arr = [...this.state.workAreas];

    if (data.length > 0) {
      arr.push(data);
      let name = data[0].name;
      let count = data.length - 1;
      let text = `${name}  و  ${count} اخرون`;

      this.setState({ workAreas: arr, missionRangeText: text });
    }
  };

  receiveAssignMissionTo = (data) => {
    let arr = [...this.state.assignMissionToArr];
    if (data.length > 0) {
      arr.push(data);
      let name = data[0].name;
      let count = data.length - 1;
      let text = `${name}  و  ${count} اخرون`;

      this.setState({ assignMissionToArr: arr, assignToText: text });
    }
  };

  assignedMissionToType = (data) => {
    this.setState({ assignToType: data });
  };

  receiveDataFromMissionType = (data) => {
    this.setState({
      showMissionType: data,
    });
  };
  receiveDataFromRangePopUp = (data) => {
    this.setState({
      showMissionRange: data,
    });
  };

  receiveDataFromAssignPopUp = (data) => {
    this.setState({
      showAssignMission: data,
    });
  };

  receiveDataFromDatePicker = (data) => {
    let fromatedDate = moment(data).format("YYYY-MM-DD");
    this.setState({ expiryDate: fromatedDate });
  };

  isDatePickerChanged = (data) => {
    if (data === true) {
      this.setState({ dateChanged: true });
    }
  };

  handleChangeDocument = (e, type) => {
    let originalDoc = { ...this.state.document };
    if (type === "name") {
      originalDoc.name = e.target.value;
      this.setState({ document: originalDoc });
    } else if (type === "details") {
      originalDoc.details = e.target.value;
      this.setState({ document: originalDoc });
    } else if (type === "reward") {
      originalDoc.reward = e.target.value;
      this.setState({ document: originalDoc });
    } else if (type === "early_bonus") {
      originalDoc.early_bonus = e.target.value;
      this.setState({ document: originalDoc });
    } else if (type === "maps_url") {
      originalDoc.maps_url = e.target.value;
      this.setState({ document: originalDoc });
    }
  };

  handleChangeException = () => {
    this.setState((prevState) => ({
      hasException: !prevState.hasException,
    }));
  };
  handleEditThenCompleted = () => {
    let document = { ...this.state.document };
    let values = {};

    values.name = document.name;
    moment.locale("en");
    values.details = document.details; //تفاصيل المهمة

    API.post(`dashboard/missions/${document.id}/complete`, values)
      .then((response) => {
        if (response) {
          toast.success("تمت تعديل المهمة وتعيينها كتامة بنجاح");
          this.sendDataToParent(); //To Close The Page and return to the Mission Page
        }
      })
      .catch((error) => {
        console.log("error:", error);
        toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
      });
  };
  handleEditMission = () => {
    const cities = [...this.state.workAreas];
    if (cities.length === 0) {
      toast.warn("من فضلك قم بأختيار نطاق المهمة");
    } else {
      const citiesIds = cities[0].map((item) => Number(item.id));
      const assignedTo = [...this.state.assignMissionToArr];
      const assignedToIds =
        assignedTo.length > 0
          ? assignedTo[0].map((item) => Number(item.id))
          : [];
      let document = { ...this.state.document };
      let missionType = { ...this.state.types };

      if (missionType.id === undefined || missionType.name === undefined) {
        toast.warn("من فضلك قم بأختيار نوع المهمة");
      } else if (document.name == null || document.name.trim().length === 0) {
        toast.warn("من فضلك قم بأدخال عنوان المهمة");
      } else if (this.state.dateChanged === false) {
        toast.warn("من فضلك قم بأختيار تاريخ الأنتهاء");
      } else if (cities.length === 0) {
        toast.warn("من فضلك قم بأختيار نطاق المهمة");
      } else if (this.state.assignMissionToArr.length === 0) {
        toast.warn("من فضلك قم بتحديد لمن ستعين المهمة");
      } else if (document.reward == null || document.reward === "") {
        toast.warn("من فضلك قم بأدخال قيمة المقابل المادي");
      } else if (this.state.hasException === true) {
        if (document.early_bonus == null) {
          toast.warn("من فضلك قم بأختيار قيمة الحافز");
        } else {
          this.submitEditMission(document, citiesIds, assignedToIds);
        }
      } else {
        this.submitEditMission(document, citiesIds, assignedToIds);
      }
    }
  };

  submitEditMission(document, citiesIds, assignedToIds) {
    let values = {};
    values.type_id = Number(this.state.types.id); //نوع المهمة
    values.work_area_ids = citiesIds; //نطاق المهمة
    values.assignment = {
      type: this.state.assignToType,
      ids: assignedToIds,
    };
    values.name = document.name;
    moment.locale("en");

    values.due_at = moment(this.state.expiryDate).format("YYYY-MM-DD"); //تاريخ الأنتهاء

    values.details = document.details; //تفاصيل المهمة
    values.reward = Number(document.reward); //المقابل المادي
    values.early_bonus = Number(document.early_bonus); //الحافز
    API.patch(`dashboard/missions/${document.id}`, values)
      .then((response) => {
        if (response) {
          toast.success("تمت تعديل المهمة بنجاح");
          this.sendDataToParent(); //To Close The Page and return to the Mission Page
        }
      })
      .catch((error) => {
        console.log("error:", error);
        toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
      });
  }
  render() {
    return (
      <div>
        <Formik
          onSubmit={() =>
            this.props.isCompleted === true
              ? this.handleEditThenCompleted()
              : this.handleEditMission()
          }
          initialValues={{ ...this.state.document }}
          validationSchema={null}
          enableReinitialize={true}
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
                <div className="edit-M-Details">
                  <div>
                    {/* تفاصيل المهمة */}
                    <div class="row">
                      <div class="col-sm-2">
                        <div className="edit-M-Header">
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
                          className="d-flex justify-content-between select-m-type"
                          onClick={
                            this.props.isCompleted === true
                              ? null
                              : this.showMissionTypePopUp
                          }
                        >
                          <span>{this.state.types.name}</span>
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
                          value={values.name}
                          onChange={(e) => this.handleChangeDocument(e, "name")}
                        />
                      </div>
                      <DatePickerComponent
                        sendDataToParent={this.receiveDataFromDatePicker}
                        isChanged={this.isDatePickerChanged}
                        isEdit={true}
                        activation={
                          this.props.isCompleted === true ? true : false
                        }
                        data={
                          values.due_at == null ? new Date() : values.due_at
                        }
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
                          value={values.details}
                          onChange={(e) =>
                            this.handleChangeDocument(e, "details")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* النطاق واسناد المهمة */}
                <div className="m-range-assign">
                  <div class="row">
                    {/* النطاق واسناد المهمة */}
                    <div class="row">
                      <div class="col-lg-3">
                        <div
                          className="assign-m-header"
                          style={{ marginBottom: "10px" }}
                        >
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
                          onClick={
                            this.props.isCompleted === true
                              ? null
                              : this.showMissionRangePopUp
                          }
                        >
                          <span>{this.state.missionRangeText}</span>
                          <img src={arrow} alt="arrow" className="arrow-m" />
                        </div>
                      </div>
                    </div>
                    {/* Map URl */}
                    <div class="row mb-3">
                      <div class="col-sm-10">
                        <p class=" m-0 px-3 py-2">
                          <span class="text-dark fs-6 fw-normal m-range">
                            رابط الموقع الجغرافي
                          </span>
                          <span class="text-danger fs-6 fw-normal font-family-MadaniArabic-Regular">
                            *
                          </span>
                        </p>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-lg-12">
                        <input
                          type="text"
                          onChange={(e) =>
                            this.handleChangeMapUrl(e.target.value)
                          }
                          className="reAssign-mapUrl"
                        />
                      </div>
                    </div>
                    {/* تعيين المهمة */}
                    <div class="row mb-3">
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
                    </div>

                    {/* اختر شخص\منطقة او اكثر */}
                    <div class="row mb-3">
                      <div class="col-lg-12">
                        <div
                          className="d-flex justify-content-between select-m-assign"
                          onClick={
                            this.props.isCompleted === true
                              ? null
                              : this.showAssignMissionPopUp
                          }
                        >
                          <span>{this.state.assignToText}</span>
                          <img src={arrow} alt="arrow" className="arrow-m" />
                        </div>
                      </div>
                    </div>
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
                          value={values.reward}
                          onChange={(e) =>
                            this.handleChangeDocument(e, "reward")
                          }
                          disabled={
                            this.props.isCompleted === true ? true : false
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
                              disabled={
                                this.props.isCompleted === true ? true : false
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </p>
                      </div>
                    </div>

                    {/* الحافز */}
                    {this.state.hasException === true ? (
                      <>
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
                              onChange={(e) =>
                                this.handleChangeDocument(e, "early_bonus")
                              }
                              disabled={
                                this.props.isCompleted === true ? true : false
                              }
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
                          {this.props.isCompleted === true
                            ? "تعديل وتعيين كتامة"
                            : "تعديل المهمة"}
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

        {/* نوع المهمة */}
        {this.state.showMissionType === true ? (
          <>
            <MissionTypePopUp
              sendDataToParent={this.receiveDataFromMissionType}
              selectedMissionType={this.receiveTypeFromMissionType}
              isEdit={true}
              typeId={this.state.types.id}
              typeName={this.state.types.name}
            />
          </>
        ) : null}
        {/* نطاق المهمة */}
        {this.state.showMissionRange === true ? (
          <>
            <MissionRangePopUp
              sendDataToParent={this.receiveDataFromRangePopUp}
              selectedCities={this.receiveCitiesFromRangePopUp}
              isEdit={true}
              data={this.state.workAreas}
            />
          </>
        ) : null}
        {/* اسناد المهمة */}
        {this.state.showAssignMission === true ? (
          <>
            <AssignMissionToPopUp
              sendDataToParent={this.receiveDataFromAssignPopUp}
              SalesSpecialties={this.receiveAssignMissionTo}
              assignedToType={this.assignedMissionToType}
              isEdit={true}
              data={this.state.assignMissionToArr}
            />
          </>
        ) : null}
      </div>
    );
  }
}

export default EditMission;
