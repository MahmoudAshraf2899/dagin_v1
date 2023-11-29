import React, { Component } from "react";
import arrow from "../../Assets/images/Vector.svg";
import DatePicker from "react-multi-date-picker";
import MissionRangePopUp from "./MissionRangePopUp";
class AddNewMission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasException: false,
      showMissionRange: false,
    };
  }
  componentDidMount() {}
  handleChangeException = () => {
    this.setState((prevState) => ({
      hasException: !prevState.hasException,
    }));
  };
  showMissionRangePopUp = () => this.setState({ showMissionRange: true });

  receiveDataFromChild = (dataFromChild) => {
    this.setState({ showMissionRange: dataFromChild });
    // Do something with the data in the parent component
  };
  handleAddClick = () => {
    console.log("Added Sucessfuly");
  };
  render() {
    return (
      <div>
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
                    نوع المهمة{" "}
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
                <div className="d-flex justify-content-between  select-m-type">
                  <span>اختر نوع المهمة</span>
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
                />
              </div>
              <div class="col-md-6">
                <p class=" m-0 px-3 py-2">
                  <span class="text-dark fs-6 fw-normal font-family-MadaniArabic-Regular">
                    تاريخ الانتهاء
                  </span>
                  <span class="text-danger fs-6 fw-normal font-family-MadaniArabic-Regular">
                    *
                  </span>
                </p>
                <div>
                  {/*//Todo : Look at bookmark to show datepicker props */}
                  <DatePicker
                    inputClass="date-picker-input"
                    value={new Date()}
                  />
                </div>
              </div>
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
                  <span>اختر محافظة\مدينة او أكثر</span>
                  <img src={arrow} alt="arrow" className="arrow-m" />
                </div>
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
                <div className="d-flex justify-content-between select-m-assign">
                  <span>اختر شخص\منطقة او اكثر</span>
                  <img src={arrow} alt="arrow" className="arrow-m" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial compensation */}
        <div className="m-financial-compensation">
          <div>
            {/* المقابل المادي */}
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
            {/* قيمة الحافظ */}
            <div class="row mb-3">
              <div class="col-lg-12">
                <input
                  placeholder="0.0"
                  className="d-flex justify-content-between motivation-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="m-submit">
          <div>
            <div class="row">
              <div class="col">
                <button
                  type="submit"
                  class="d-inline m-submit-btn"
                  onClick={this.handleAddClick}
                >
                  اضافة
                </button>

                <button type="submit" class="d-inline m-cancel-btn">
                  الغاء
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.showMissionRange === true ? (
          <>
            <MissionRangePopUp sendDataToParent={this.receiveDataFromChild} />
          </>
        ) : null}
      </div>
    );
  }
}
export default AddNewMission;
