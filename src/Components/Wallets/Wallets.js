import React, { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";

// Define a functional component
function Wallets(props) {
  const [selectedElement, setSelectedElement] = useState(0);
  const [values, setValues] = useState([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);
  const handleChangeElements = (e) => {
    switch (e) {
      case 0:
        setSelectedElement(e);
        break;

      case 1:
        setSelectedElement(e);

        break;

      case 2:
        setSelectedElement(e);

        break;

      case 3:
        setSelectedElement(e);

        break;

      default:
        setSelectedElement(e);
    }
    setSelectedElement(e);
  };
  return (
    <div class="container mt-4">
      {/* Wallet Header */}
      <div class="row">
        <div class="col-9">
          <div className="wallet-types">
            <ul>
              <li
                onClick={() => handleChangeElements(0)}
                className={selectedElement === 0 ? "active" : ""}
              >
                كل الحركات
              </li>
              <li
                onClick={() => handleChangeElements(1)}
                className={selectedElement === 1 ? "active" : ""}
              >
                الحركات المدينة فقط
              </li>
              <li
                onClick={() => handleChangeElements(2)}
                className={selectedElement === 2 ? "active" : ""}
              >
                الحركات الدائنة فقط
              </li>
              <li
                onClick={() => handleChangeElements(3)}
                className={selectedElement === 3 ? "active" : ""}
              >
                الأرصدة المستحقة فقط
              </li>
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
      <div
        style={{
          backgroundColor: "#F1F5F9",
          height: "100vw",
          width: "100vw",
          justifyContent: "center",
          textAlign: "end",
        }}
      >
        <div class="row" id="wallet-content">
          <div class="col-1">التاريخ</div>
          <div class="col-1">العميل</div>
          <div class="col-1">المبلغ المدين</div>
          <div class="col-1">المبلغ الدائن</div>
          <div class="col-1">الرصيد</div>
          <div class="col-1">البيان</div>
          <div class="col-2">Action</div>
        </div>
      </div>
    </div>
  );
}

export default Wallets;
