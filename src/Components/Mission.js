import React, { Component } from "react";
class Mission extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div class="container missionPage">
        <div class="row ">
          <div class="col">
            <div className="mission-active">
              <span class="d-inline" id="mission1-span">
                مهمة قيد الإنتظار
              </span>
            </div>
            <div className="mission-type">
              <span class="d-inline" id="mission-type-span">
                مهمة تحت التنفيذ
              </span>
            </div>
            <div className="mission-type">
              <span class="d-inline" id="mission-type-span">
                مهمة متأخرة
              </span>
            </div>
            <div className="mission-type">
              <span class="d-inline" id="mission-type-span">
                مهمة تامة تنتظر التقييم
              </span>
            </div>
            <div className="mission-type">
              <span class="d-inline" id="mission-type-span">
                مهمة تامة
              </span>
            </div>
          </div>
          <div class="col-md-auto">
            <div className="filter-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.58342 4.16666H15.4168C15.5368 4.20875 15.6456 4.27775 15.7348 4.36838C15.824 4.459 15.8913 4.56885 15.9315 4.68951C15.9718 4.81016 15.9838 4.93842 15.9668 5.06446C15.9498 5.1905 15.9042 5.31098 15.8334 5.41666L11.6668 9.99999V15.8333L8.33342 13.3333V9.99999L4.16676 5.41666C4.096 5.31098 4.05037 5.1905 4.03336 5.06446C4.01636 4.93842 4.02842 4.81016 4.06864 4.68951C4.10886 4.56885 4.17616 4.459 4.26539 4.36838C4.35462 4.27775 4.46341 4.20875 4.58342 4.16666Z"
                  stroke="#64748B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="filter-container-span">الفلتر </span>
            </div>
          </div>
          <div class="col col-lg-2">
            <div className="Add-New-Mission">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M10.5049 1.02539C6.02189 1.02539 2.375 4.67228 2.375 9.15527C2.375 13.6383 6.02189 17.2852 10.5049 17.2852C14.9879 17.2852 18.6348 13.6383 18.6348 9.15527C18.6348 4.67228 14.9879 1.02539 10.5049 1.02539ZM14.0617 9.83272H11.1823V12.7121C11.1823 13.0861 10.8789 13.3895 10.5049 13.3895C10.1309 13.3895 9.82743 13.0861 9.82743 12.7121V9.83272H6.94806C6.57404 9.83272 6.27061 9.52929 6.27061 9.15527C6.27061 8.78126 6.57404 8.47782 6.94806 8.47782H9.82743V5.59845C9.82743 5.22443 10.1309 4.921 10.5049 4.921C10.8789 4.921 11.1823 5.22443 11.1823 5.59845V8.47782H14.0617C14.4357 8.47782 14.7392 8.78126 14.7392 9.15527C14.7392 9.52929 14.4357 9.83272 14.0617 9.83272Z"
                  fill="white"
                />
              </svg>
              <span className="Add-New-Mission-btn">اضافة مهمة</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Mission;
