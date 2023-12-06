import React, { Component } from "react";
import closeIcon from "../../Assets/icons/Close Icon.svg";
import API from "../Api";
class AssignMissionToPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closePopUp: props.status,
      selectedSales: [],
      selectedspecialties: [],
      salesToParent: [],
      specialtiesToParent: [],
      data: [],
      selectedItem: 0,
    };
  }
  componentDidMount = () => {
    API.get("salesman").then((res) => {
      if (res) {
        const men = res.data.items.map((item) => ({
          id: item.id,
          name: item.name,
        }));
        this.setState({ data: men });
      }
    });
  };
  // Define a method to send data to the parent component
  sendDataToParent = () => {
    const data = false;
    const list =
      this.state.selectedItem === 0
        ? [...this.state.salesToParent]
        : [...this.state.specialtiesToParent];
    // Call the callback function passed from the parent
    this.props.sendDataToParent(data);
    this.props.SalesSpecialties(list);
  };

  handleSelectItem = (id, name) => {
    if (this.state.selectedItem === 0) {
      //اشخاص
      let men = [...this.state.selectedSales];
      const isSelectedBefore = men.includes(id);
      if (isSelectedBefore) {
        const indexToRemove = men.indexOf(id);
        // Remove the ID if it exists in the array
        if (indexToRemove !== -1) {
          men.splice(indexToRemove, 1);
          this.setState({ selectedSales: men });
        }
      } else {
        men.push(id);
        let arrayOfObj = [...this.state.salesToParent];
        arrayOfObj.push({ id: id, name: name });
        this.setState({ selectedSales: men, salesToParent: arrayOfObj });
      }
    } else {
      let specialties = [...this.state.selectedspecialties];
      const isSelectedBefore = specialties.includes(id);
      if (isSelectedBefore) {
        const indexToRemove = specialties.indexOf(id);
        // Remove the ID if it exists in the array
        if (indexToRemove !== -1) {
          specialties.splice(indexToRemove, 1);
          this.setState({ selectedspecialties: specialties });
        }
      } else {
        specialties.push(id);
        let arrayOfObj = [...this.state.specialtiesToParent];
        arrayOfObj.push({ id: id, name: name });
        this.setState({
          selectedspecialties: specialties,
          specialtiesToParent: arrayOfObj,
        });
      }
    }
  };

  handleActiveType = (e) => {
    this.setState({ selectedItem: e });
    if (e === 0) {
      //اشخاص
      API.get("salesman").then((res) => {
        if (res) {
          const men = res.data.items.map((item) => ({
            id: item.id,
            name: item.name,
          }));
          this.setState({ data: men });
        }
      });
    } else {
      //تخصصات

      API.get("specialties").then((res) => {
        if (res) {
          this.setState({ data: res.data });
        }
      });
    }
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
                  this.state.selectedItem === 0
                    ? "assign-type-active"
                    : "assign-type"
                }
                onClick={() => this.handleActiveType(0)}
              >
                لحسابات اشخاص
              </div>
              <div
                className={
                  this.state.selectedItem === 1
                    ? "assign-type-active"
                    : "assign-type"
                }
                onClick={() => this.handleActiveType(1)}
              >
                لتخصص
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12 range-border"></div>
          </div>
          {/* اضف الاشخاص */}
          <div class="row mt-3">
            <div class="col-12">
              <span className="select-area">
                {this.state.selectedItem === 0
                  ? "اضف الاشخاص"
                  : "اختر التخصصات"}
              </span>
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
              <ul class="list-unstyled scrollable-list-assign">
                {this.state.data.map((item) => {
                  return (
                    <li class="d-flex w-100 justify-content-between py-2">
                      <div class="custom-border">{item.name}</div>
                      <div class="checkbox checkbox-success">
                        <input
                          id={`checkbox ${item.id}`}
                          type="checkbox"
                          onChange={(e) =>
                            this.handleSelectItem(item.id, item.name)
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
          style={{ marginTop: "100px", textAlign: "center" }}
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
    );
  }
}

export default AssignMissionToPopUp;
