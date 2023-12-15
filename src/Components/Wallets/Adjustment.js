import React, { Component } from "react";
import { Formik } from "formik";
import moment from "moment";

class Adjustment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserType: 0,
      adjustment: {},
    };
  }
  componentDidMount() {}

  submitAdjustment = () => {};
  render() {
    return (
      <div>
        <Formik
          onSubmit={() => this.submitAdjustment()}
          initialValues={this.state.adjustment}
          validationSchema={null}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <>
              <form onSubmit={handleSubmit}>
                <div className="adjustment-container">
                  <div class="container">
                    {/* التسوية */}
                    <div class="row">
                      <div class="col-sm-2">
                        <div className="adjustment-header">التسوية</div>
                      </div>
                    </div>
                    <div class="row" style={{ marginTop: "15px" }}>
                      <div className="adjustment-header-border"></div>
                    </div>
                    <div class="row">
                      <div className="col-sm-2 adjustment-type-header">
                        النوع
                      </div>
                    </div>
                    {/* اضافة رصيد */}
                    <div
                      className="row"
                      style={{
                        marginTop: "15px",
                        marginRight: "25px",
                      }}
                    >
                      <div
                        className="col-sm-2 adjust-btn-type-active"
                        style={{ marginLeft: "15px" }}
                      >
                        اضافة رصيد دائن
                      </div>
                      <div className="col-sm-2 adjust-btn-type">
                        خصم رصيد خاطئ
                      </div>
                    </div>
                    {/* المبلغ */}
                    <div class="row" style={{ marginTop: "15px" }}>
                      <div class="col-sm-2" style={{ marginRight: "15px" }}>
                        <p class=" m-0 px-3 py-2">
                          <span class="text-dark fs-6 fw-normal m-type">
                            المبلغ
                          </span>
                          <span class="text-danger fs-6 fw-normal font-family-MadaniArabic-Regular">
                            *
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* Input : المبلغ */}
                    <div class="row mb-3">
                      <div class="col-lg-12">
                        <input
                          placeholder="0.0"
                          className="d-flex justify-content-between adjustment-price"
                        />
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-sm-1 adjustment-details">التفاصيل</div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-lg-12">
                        <textarea
                          className="d-flex justify-content-between"
                          style={{
                            width: "100%",
                            borderRadius: "15px",
                            height: "169px",
                            paddingRight: "20px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </Formik>
      </div>
    );
  }
}
export default Adjustment;
