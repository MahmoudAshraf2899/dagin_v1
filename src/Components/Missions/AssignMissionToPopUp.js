import React, { Component } from "react";
import closeIcon from "../../Assets/icons/Close Icon.svg";
import API from "../Api";
class AssignMissionToPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closePopUp: props.status,
      selectedCities: [],
      data: [],
      selectedType: 0,
    };
  }
  componentDidMount = () => {
    API.get("cities").then((res) => {
      if (res) {
        const cities = res.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));

        this.setState({ data: cities });
      }
    });
  };
  // Define a method to send data to the parent component
  sendDataToParent = () => {
    const data = false;
    // Call the callback function passed from the parent
    this.props.sendDataToParent(data);
  };

  //Todo : Change it to handleChangeType
  handleSelectType = (cityId) => {
    //Check if city added before
    let cities = [...this.state.selectedCities];
    const isSelectedBefore = cities.includes(cityId);
    if (isSelectedBefore) {
      const indexToRemove = cities.indexOf(cityId);
      // Remove the ID if it exists in the array
      if (indexToRemove !== -1) {
        cities.splice(indexToRemove, 1);
        this.setState({ selectedCities: cities });
      }
    } else {
      cities.push(cityId);
      this.setState({ selectedCities: cities });
    }
  };

  handleActiveType = (e) => {
    this.setState({ selectedType: e });
  };

  render() {
    return (
      <div className="mission-range">
        <div class="container">
          {/* Header Row */}
          <div class="row mt-3 mission-header-range">
            <div class="col-11">
              <div className="mission-details" style={{ width: "32%" }}>
                <span className="mission-details-span">تعيين المهمة ل</span>
              </div>
            </div>
            <div class="col-1">
              <img
                src={closeIcon}
                alt="close-icon"
                onClick={() => this.sendDataToParent()}
              />
            </div>
          </div>
          <div class="row mt-3">
            <div className="assign-people-type">
              <div
                className={
                  this.state.selectedType === 0
                    ? "assign-type-active"
                    : "assign-type"
                }
                onClick={() => this.handleActiveType(0)}
              >
                لحسابات اشخاص
              </div>
              <div
                className={
                  this.state.selectedType === 1
                    ? "assign-type-active"
                    : "assign-type"
                }
                onClick={() => this.handleActiveType(1)}
              >
                لتخصص
              </div>
              <div
                className={
                  this.state.selectedType === 2
                    ? "assign-type-active"
                    : "assign-type"
                }
                onClick={() => this.handleActiveType(2)}
              >
                لمنطقة جغرافية
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12 range-border"></div>
          </div>
          {/* اضف الاشخاص */}
          <div class="row mt-3">
            <div class="col-12">
              <span className="select-area">اضف الأشخاص</span>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12">
              <input
                type="text"
                placeholder="ابحث"
                className="cities-search"
                onChange={this.handleSearch}
              />
            </div>
          </div>
          {/* Cities */}
          <div class="row" style={{ height: "150px" }}>
            <div
              class="col-12"
              style={{ maxHeight: "600px", overflowY: "auto" }}
            >
              <ul class="list-unstyled scrollable-list">
                {this.state.data.map((item) => {
                  return (
                    <li class="d-flex w-100 justify-content-between py-2">
                      <div class="custom-border">{item.name}</div>
                      <div class="checkbox checkbox-success">
                        <input
                          id={`checkbox ${item.id}`}
                          type="checkbox"
                          onChange={(e) => this.handleSelectType(item.id)}
                        />
                        <label for={`checkbox ${item.id}`}></label>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* Footer */}
        </div>
        <div
          class="row mb-4"
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          <div class="col-2">
            <button className="done-add-range">تم</button>
            {/* <button className="cancel-add-range">الغاء</button> */}
          </div>
          <div className="col-2">
            <button
              className="cancel-add-range"
              onClick={() => this.sendDataToParent()}
            >
              الغاء
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AssignMissionToPopUp;
