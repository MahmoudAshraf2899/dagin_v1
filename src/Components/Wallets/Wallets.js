import React, { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import Ellipse from "../../Assets/images/Ellipse 3.svg";
import { Button, UncontrolledPopover, PopoverBody, Util } from "reactstrap";

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
    <div class="container walletPage">
      <div class="row">
        <div class="col">
          <div
            onClick={() => handleChangeElements(0)}
            className={
              selectedElement === 0 ? "mission-active" : "mission-type"
            }
          >
            <span
              class="d-inline"
              id={
                selectedElement === 0
                  ? "mission-span-active"
                  : "mission-type-span"
              }
            >
              كل الحركات
            </span>
          </div>
          <div
            onClick={() => handleChangeElements(1)}
            className={
              selectedElement === 1 ? "mission-active" : "mission-type"
            }
          >
            <span
              class="d-inline"
              id={
                selectedElement === 1
                  ? "mission-span-active"
                  : "mission-type-span"
              }
            >
              الحركات المدينة فقط
            </span>
          </div>
          <div
            onClick={() => handleChangeElements(2)}
            className={
              selectedElement === 2 ? "mission-active" : "mission-type"
            }
          >
            <span
              class="d-inline"
              id={
                selectedElement === 2
                  ? "mission-span-active"
                  : "mission-type-span"
              }
            >
              الحركات الدائنة فقط
            </span>
          </div>
          <div
            onClick={() => handleChangeElements(3)}
            className={
              selectedElement === 3 ? "mission-active" : "mission-type"
            }
          >
            <span
              class="d-inline"
              id={
                selectedElement === 3
                  ? "mission-span-active"
                  : "mission-type-span"
              }
            >
              الأرصدة المستحقة فقط
            </span>
          </div>
        </div>
        {/* Date Filter */}
        <div class="col-md-auto" style={{ marginLeft: "50px" }}>
          <DatePicker
            inputClass="filterWallet"
            value={values}
            dateSeparator="الي"
            onChange={setValues}
            range
            rangeHover
            animations={[opacity(), transition({ from: 35, duration: 800 })]}
          />
        </div>
      </div>

      <div
        className="container"
        style={{
          backgroundColor: "#F1F5F9",
          height: "100vw",
          width: "100vw",
          marginTop: "15px",
        }}
      >
        <div>
          {/* Banner : التاريخ & العميل ... */}
          <div className="walletBanner">
            <div className="bannerText">التاريخ</div>
            <div className="bannerText">العميل</div>
            <div className="bannerText">المبلغ المدين</div>
            <div className="bannerText">المبلغ الدائن</div>
            <div className="bannerText">الرصيد</div>
            <div className="bannerText">البيان</div>
            <div className="bannerText">Action</div>
          </div>

          {/* Wallet Data */}
          <div>
            <div class="row">
              <div className="wallet-data-section">
                <div className="wallet-container">
                  <div className="wallet-child">
                    <div className="container">
                      <div className="row">
                        <div class="col-lg-12 wallet-wrapper">
                          <span class="ml-2 wallet-date">١٢\١٠\٢٠٢٣</span>
                          <span class="ml-2 wallet-client-name">رحمة محمد</span>
                          <span class="ml-2 wallet-price">400 جم</span>
                          <span class="ml-2 wallet-price">400 جم</span>
                          <span class="ml-2 wallet-price">1000 جم</span>
                          <span class="ml-2 wallet-price">
                            قيمة مهمة
                            <span className="mission-number">رقم 123</span>
                          </span>
                          <span class="ml-2 adjust-wallet">تسوية</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallets;
