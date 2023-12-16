import React, { useState, useEffect } from "react";
import { DateObject } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";

import Adjustment from "./Adjustment";
import API from "../Api";
import moment from "moment";

function Wallets(props) {
  const [selectedElement, setSelectedElement] = useState(0);
  const [showAdjustment, setShowAdjustment] = useState(false);
  const [values, setValues] = useState([new DateObject(), new DateObject()]);
  const [walletData, setWalletData] = useState([]);

  useEffect(() => {
    moment.locale("en");
    let fromDate = values[0];
    let toDate = values[1];
    if (toDate !== undefined) {
      API.get(
        `dashboard/wallets/transactions?date_from=${fromDate}&date_to=${toDate}`
      )
        .then((res) => {
          if (res.status === 200) {
            setWalletData(res.data.items);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [setValues, values]);
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
  const handleCloseAdjustment = (data) => {
    setShowAdjustment(data);
  };
  const showAdjustmentScreen = () => {
    setShowAdjustment(!showAdjustment);
  };
  const handleChangeValues = (values) => {
    console.log(
      "🚀 ~ file: Wallets.js:67 ~ handleChangeValues ~ values:",
      values
    );

    let fromDate = values[0];
    let formatedDate = moment(values[0]).format("YYYY-MM-DD");
    let toDate = moment(values[1]).format("YYYY-MM-DD");
  };
  return (
    <div class="container walletPage">
      {/* كل الحركات " حركات مدينة فقط | حركات دائنة فقط | ..." */}
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
            format="YYYY-MM-DD"
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
        <div
          style={{
            paddingTop: "35px",
            paddingLeft: "90px",
            display: showAdjustment === true ? "none" : "",
          }}
        >
          <table
            style={{
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <th className="bannerText">التاريخ</th>
                  <th className="bannerText">العميل</th>
                  <th className="bannerText">مبلغ دائن</th>
                  <th className="bannerText">مبلغ مدين</th>
                  <th className="bannerText">الرصيد</th>
                  <th className="bannerText">البيان</th>
                  <th className="bannerText">Actions</th>
                </div>
              </tr>
            </thead>
            <div
              style={{
                visibility: "hidden",
                marginTop: "20px",
                marginBottom: "80px",
              }}
            ></div>
            <tbody>
              {walletData.map((item) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      backgroundColor: "white",
                      borderRadius: "20px",
                      height: "70px",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <span className="wallet-date">
                      {moment(item.created_at).format("MM/DD/YYYY")}
                    </span>
                    <span className="wallet-client-name">{item.user.name}</span>
                    <span className="wallet-price">{item.amount} جم</span>
                    <span className="wallet-price">{item.amount} جم</span>
                    <span className="wallet-price">{item.balance} جم</span>
                    <span className="wallet-price">
                      {item.statement_type}
                      <span className="mission-number">
                        {item.mission != null ? `رقم ${item.mission.id}` : ""}
                        {console.log(
                          "🚀 ~ file: Wallets.js:225 ~ {walletData.map ~ values:",
                          moment(values[0]).format("MM/DD/YYYY")
                        )}{" "}
                      </span>
                    </span>
                    <span
                      className="adjust-wallet"
                      onClick={() => showAdjustmentScreen()}
                    >
                      تسوية
                    </span>
                  </div>
                );
              })}
            </tbody>
          </table>
          {/* Banner : التاريخ & العميل ... */}

          {/* Wallet Data */}
        </div>

        <div class="row">
          {showAdjustment === true ? (
            <Adjustment closeAdjustment={handleCloseAdjustment} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Wallets;
