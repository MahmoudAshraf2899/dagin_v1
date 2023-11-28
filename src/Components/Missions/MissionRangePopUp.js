import React, { Component } from "react";
import closeIcon from "../../Assets/icons/Close Icon.svg";
class MissionRangePopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closePopUp: false,
    };
  }
  closePopUp = () => this.setState({ closePopUp: true });
  handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const { data } = this.state;

    const filteredData = data.filter((item) =>
      item.toLowerCase().includes(query)
    );

    this.setState({ filteredData });
  };

  render() {
    return (
      <div className="mission-range">
        <div class="container">
          {/* Header Row */}
          <div class="row mt-3 mission-header-range">
            <div class="col-10">
              <div className="mission-details" style={{ width: "32%" }}>
                <span className="mission-details-span">تفاصيل المهمة</span>
              </div>
            </div>
            <div class="col-2">
              <img src={closeIcon} alt="close-icon" />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12 range-border"></div>
          </div>
          {/* اختر المنطقة الجغرافية */}
          <div class="row mt-3">
            <div class="col-12">
              <span className="select-area">اختر المنطقة الجغرافية</span>
            </div>
          </div>
          {/* اختر المنطقة الجغرافية */}
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
          <div class="row mt-3">
            <div class="col-12">
              <ul class="list-unstyled">
                <li class="d-flex w-100 justify-content-between py-2">
                  <div class="custom-border">Item 1</div>
                  <input type="checkbox" className="mark-city" />
                </li>
                <li class="py-2">
                  <div class="custom-border">Item 2</div>
                </li>
                <li class="py-2">
                  <div class="custom-border">Item 3</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MissionRangePopUp;
