import React, { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";

// Define a functional component
function Wallets(props) {
  const [values, setValues] = useState([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);
  return (
    <div class="container mt-4">
      <div class="row">
        <div class="col-9">
          <div className="wallet-types">
            <ul>
              <li className="active">كل الحركات</li>
              <li>الحركات المدينة فقط</li>
              <li>الحركات الدائنة فقط</li>
              <li>الأرصدة المستحقة فقط</li>
            </ul>
          </div>
        </div>
        <div class="col-3">
          {/* <DatePicker inputClass="filter-movements" value={new Date()} /> */}
          <DatePicker
            inputClass="filterWallet"
            value={values}
            dateSeparator="الي"
            onChange={setValues}
            range
            rangeHover
            animations={[opacity(), transition({ from: 35, duration: 800 })]}
          />
          {/* التاريخ من ١٠\١٠\٢٠٢٢ الي ١٠\١٠\٢٠٢٣ */}
        </div>
      </div>
    </div>
  );
}

export default Wallets;
