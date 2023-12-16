import React, { Component } from "react";
import arrow from "../../Assets/images/Vector.svg";
import MissionRangePopUp from "./MissionRangePopUp";
import AssignMissionToPopUp from "./AssignMissionToPopUp";
import API from "../Api";
import moment from "moment";
import { toast } from "react-toastify";

class ReAssignMission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMissionRange: false,
      missionRangeText: "اختر محافظةمدينة او أكثر",
      selectedCities: [],
      showAssignMission: false,
      assignToText: "اختر شخص  منطقة او اكثر",
      assignMissionToArr: [],
      assignToType: null,
    };
  }

  componentDidMount() {}
  showMissionRangePopUp = () => this.setState({ showMissionRange: true });
  showAssignMissionPopUp = () => this.setState({ showAssignMission: true });

  receiveDataFromRangePopUp = (dataFromChild) => {
    this.setState({
      showMissionRange: dataFromChild,
    });
  };

  receiveDataFromAssignToPopUp = (dataFromChild) => {
    this.setState({
      showAssignMission: dataFromChild,
    });
  };

  receiveCitiesFromRangePopUp = (dataFromChild) => {
    this.setState({ selectedCities: dataFromChild });
    if (dataFromChild.length > 0) {
      //Get First object from array
      let cityName = dataFromChild[0].name;
      let count = dataFromChild.length - 1;
      let text = `${cityName} و ${count} أخري`;
      this.setState({ missionRangeText: text });
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
  handleReAssignMission = () => {
    const cities = [...this.state.selectedCities];
    const citiesIds = cities.map((item) => Number(item.id));
    const assignedTo = [...this.state.assignMissionToArr];
    const assignedToIds =
      assignedTo.length > 0 ? assignedTo[0].map((item) => Number(item.id)) : [];

    if (cities.length === 0) {
      toast.warn("من فضلك قم بأختيار نطاق المهمة");
    } else if (this.state.assignMissionToArr.length === 0) {
      toast.warn("من فضلك قم بتحديد لمن ستعين المهمة");
    } else {
      let values = {};

      values.assignment = {
        type: this.state.assignToType,
        ids: assignedToIds,
      };
      values.work_area_ids = citiesIds;
      API.patch(`dashboard/missions/${this.props.id}`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success("تم اعادة تعيين المهمة بنجاح");
            this.sendDataToParent();
          }
        })
        .catch((error) => {
          console.log("error:", error);
          let value = this.state.showReAssignModal;
          this.setState({ showReAssignModal: !value });

          toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
        });
    }
  };
  sendDataToParent = () => {
    const data = false;
    // Call the callback function passed from the parent
    this.props.sendDataToParent(data);
  };
  render() {
    return (
      <div>
        <div className="m-range-assign">
          <div class="row">
            {/* النطاق واسناد المهمة */}
            <div class="row">
              <div class="col-lg-3">
                <div
                  className="assign-m-header"
                  style={{ marginBottom: "10px" }}
                >
                  <span>اعادة تعيين المهمة</span>
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
                <input type="text" className="reAssign-mapUrl" />
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
                  onClick={this.showAssignMissionPopUp}
                >
                  <span>{this.state.assignToText}</span>
                  <img src={arrow} alt="arrow" className="arrow-m" />
                </div>
              </div>
            </div>
          </div>

          {this.state.showMissionRange === true ? (
            <>
              <MissionRangePopUp
                sendDataToParent={this.receiveDataFromRangePopUp}
                selectedCities={this.receiveCitiesFromRangePopUp}
              />
            </>
          ) : null}

          {this.state.showAssignMission === true ? (
            <>
              <AssignMissionToPopUp
                sendDataToParent={this.receiveDataFromAssignToPopUp}
                SalesSpecialties={this.receiveAssignMissionTo}
                assignedToType={this.assignedMissionToType}
              />
            </>
          ) : null}
        </div>
        <div className="m-submit">
          <div>
            <div class="row">
              <div class="col">
                <button
                  class="d-inline m-submit-btn"
                  onClick={() => this.handleReAssignMission()}
                >
                  اعادة التعيين
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
      </div>
    );
  }
}
export default ReAssignMission;
