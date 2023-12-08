import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerComponent(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [changed, setChanged] = useState(false);
  const handleChangeDate = (dateParam) => {
    setStartDate(dateParam);
    setChanged(true);
    sendDataToParent(dateParam);
    sendDataStatusToParent(true);
  };
  const sendDataStatusToParent = (data) => {
    props.isChanged(data);
  };
  const sendDataToParent = (dateParam) => {
    props.sendDataToParent(dateParam);
  };
  return (
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
        {/* <DatePicker
        inputClass="date-picker-input"
        selected={this.state.expiryDate}
        onChange={(selectedDate) =>
          this.handleChangeDate(selectedDate)
        }
      /> */}
        <DatePicker
          selected={startDate}
          onChange={(date) => handleChangeDate(date)}
          className="date-picker-input"
        />
      </div>
    </div>
  );
}
