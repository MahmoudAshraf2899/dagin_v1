import React, { Component } from "react";
import closeIcon from "../../Assets/icons/Close Icon.svg";
import API from "../Api";
class MissionRangePopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closePopUp: props.status,
      selectedTypes: [],
      selectedItemId: null,
      selectedItemName: null,
      selectedObj: {},
      data: [],
    };
  }
  componentDidMount = () => {
    API.get("mission-types").then((res) => {
      if (res) {
        this.setState({ data: res.data });
      }
    });
  };
  // Define a method to send data to the parent component
  sendDataToParent = () => {
    const data = false;
    const selectedTypeObj = this.state.selectedObj;
    // Call the callback function passed from the parent
    this.props.sendDataToParent(data);
    this.props.selectedMissionType(selectedTypeObj);
  };
  handleSelectMissionType = (itemId, itemName) => {
    this.setState({
      selectedItemId: itemId === this.state.selectedItemId ? null : itemId,
      selectedItemName: itemId === this.state.selectedItemId ? null : itemName,
    });
    if (itemId != this.state.selectedItemId) {
      let obj = { ...this.state.selectedObj };
      obj.id = itemId;
      obj.name = itemName;
      obj.isType = true;
      this.setState({ selectedObj: obj });
    }
  };

  render() {
    return (
      <div className="mission-range">
        <div className="content">
          <div class="container">
            {/* Header Row */}
            <div class="row mt-3 mission-header-range">
              <div class="col-11">
                <div className="mission-details" style={{ width: "32%" }}>
                  <span className="mission-details-span">تفاصيل المهمة</span>
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
              <div class="col-12 range-border"></div>
            </div>
            {/* اختر المنطقة الجغرافية */}
            <div class="row mt-3">
              <div class="col-12">
                <span className="select-area">اختر نوع المهمة</span>
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
            {/* Types */}
            <div class="row" style={{ height: "150px" }}>
              <div
                class="col-12"
                style={{ maxHeight: "800px", overflowY: "auto" }}
              >
                <ul class="list-unstyled scrollable-m-type">
                  {this.state.data.map((item) => {
                    return (
                      <li class="d-flex w-100 justify-content-between py-2">
                        <div class="custom-border">{item.name}</div>
                        <div class="checkbox checkbox-success">
                          <input
                            id={`checkbox ${item.id}`}
                            type="checkbox"
                            checked={item.id === this.state.selectedItemId}
                            onChange={() =>
                              this.handleSelectMissionType(item.id, item.name)
                            }
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
              <button
                className="done-add-range"
                onClick={() => this.sendDataToParent()}
              >
                تم
              </button>
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
      </div>
    );
  }
}
export default MissionRangePopUp;
