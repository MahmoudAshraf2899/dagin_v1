import React, { Component } from "react";
import arrow from "../../Assets/images/Vector.svg";
import DatePicker from "react-multi-date-picker";
import calender from "../../Assets/images/calendar-minus 1.svg";
class AddNewMission extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div>
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
      </div>
    );
  }
}
export default AddNewMission;
