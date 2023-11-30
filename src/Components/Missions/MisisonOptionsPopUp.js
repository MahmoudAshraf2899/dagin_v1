import React, { Component } from "react";

class MisisonOptionsPopUp extends Component {
  render() {
    return (
      <div class="container" id="options-container">
        <div class="row">
          <div class="col-12">
            <span class="text-end">عرض المهمة</span>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p class="text-end m-0 px-3 py-2">تعديل المهمة</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p class="text-end m-0 px-3 py-2">حذف المهمة</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MisisonOptionsPopUp;
