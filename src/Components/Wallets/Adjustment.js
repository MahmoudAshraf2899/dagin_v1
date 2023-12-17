import React, { Component } from "react";
import { Formik } from "formik";
import moment from "moment";
import API from "../Api";
import { toast } from "react-toastify";

class Adjustment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: 1,
      adjustment: {},
      file: null,
      imageUploadWrapClass: "image-upload-wrap",
      fileUploadContentVisible: false,
      price: null,
      details: null,
    };
  }
  componentDidMount() {}
  closeAdjustment = () => {
    const data = false;
    // Call the callback function passed from the parent
    this.props.closeAdjustment(data);
  };
  readURL = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.setState({
          imageUploadWrapClass: "image-upload-wrap image-dropping",
          fileUploadContentVisible: true,
        });

        this.setState((prevState) => ({
          file: input.files[0],
        }));
      };

      reader.readAsDataURL(input.files[0]);
    } else {
      this.removeUpload();
    }
  };

  removeUpload = () => {
    this.setState({
      file: null,
      imageUploadWrapClass: "image-upload-wrap",
      fileUploadContentVisible: false,
    });
  };

  handleDragOver = () => {
    this.setState({
      imageUploadWrapClass: "image-upload-wrap image-dropping",
    });
  };

  handleDragLeave = () => {
    this.setState({
      imageUploadWrapClass: "image-upload-wrap",
    });
  };
  handleChangeType = (e) => {
    this.setState({ selectedType: e });
  };
  handleChangePrice = (e) => {
    this.setState({ price: e });
  };
  handleChangeDetails = (e) => {
    this.setState({ details: e });
  };
  submitAdjustment = () => {
    const axios = require("axios");
    const FormData = require("form-data");
    // const fs = require("fs");
    let data = new FormData();
    data.append(
      "type",
      this.state.selectedType === 1 ? "إضافة رصيد دائن" : "خصم رصيد خاطئ"
    );
    data.append("amount", this.state.price);
    data.append("details", "bla bla");
    data.append(
      "attachments",
      this.state.file
      // fs.createReadStream("/C:/Users/Mahmoud/Downloads/Requirements.png")
    );
    API.post(
      `dashboard/wallets/transactions/${this.props.id}/settlements`,
      data
    ).then((res) => {
      if (res.status === 201) {
        toast.success("تمت التسوية بنجاح");
        this.closeAdjustment();
      } else {
        toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
        this.closeAdjustment();
      }
    });
  };
  render() {
    const { file, imageUploadWrapClass, fileUploadContentVisible } = this.state;

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
                    {/* النوع */}
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
                        onClick={() => this.handleChangeType(1)}
                        className={
                          this.state.selectedType === 1
                            ? "col-sm-2 adjust-btn-type-active"
                            : "col-sm-2 adjust-btn-type"
                        }
                        style={{ marginLeft: "15px" }}
                      >
                        اضافة رصيد دائن
                      </div>
                      <div
                        className={
                          this.state.selectedType === 2
                            ? "col-sm-2 adjust-btn-type-active"
                            : "col-sm-2 adjust-btn-type"
                        }
                        onClick={() => this.handleChangeType(2)}
                      >
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
                          onChange={(e) =>
                            this.handleChangePrice(e.target.value)
                          }
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
                          onChange={(e) =>
                            this.handleChangeDetails(e.target.value)
                          }
                          style={{
                            width: "100%",
                            borderRadius: "15px",
                            height: "169px",
                            paddingRight: "20px",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>

                    {/* Upload Image */}
                    <div class="row mb-3" style={{ paddingRight: "25px" }}>
                      <div className="row mb-3">
                        <div className={imageUploadWrapClass}>
                          <input
                            onDragOver={() => this.handleDragOver()}
                            onDragLeave={() => this.handleDragLeave()}
                            className="file-upload-input"
                            type="file"
                            onChange={(e) => this.readURL(e.target)}
                            accept="image/*"
                          />
                          <div className="drag-text">
                            <h3>قم بسحب الملفات وإفلاتها، أو تصفحها</h3>
                            <p className="">
                              دعم جميع الملفات، الحجم الأقصى 60 ميجابايت
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {fileUploadContentVisible && (
                      <div className="row mb-3">
                        <div className="file-upload-content">
                          <img
                            className="file-upload-image"
                            src={URL.createObjectURL(file)}
                            alt="your"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="adjustment-factor">
                  <div className="row">
                    <div class="col">
                      <button
                        type="submit"
                        class="d-inline confirm-adjust"
                        onClick={() => this.submitAdjustment()}
                      >
                        تم
                      </button>

                      <button
                        onClick={() => this.closeAdjustment()}
                        class="d-inline cancel-adjust"
                      >
                        الغاء
                      </button>
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
