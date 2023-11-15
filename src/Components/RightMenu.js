import React, { Component } from "react";
import mainPhoto from "../Assets/images/pexels-petr-ganaj-18346899.jpg";
class RightMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementId: 0,
    };
  }
  componentDidMount() {}
  handleOnClick = (e) => {
    this.setState({ elementId: e });
  };
  render() {
    return (
      <div className="right-menu">
        <div class="menu-logo">منصة داچن</div> {/* Put Dajin Logo Here */}
        <div className="menu-title">القائمة</div>
        <ul className="list-group">
          <li onClick={() => this.handleOnClick(0)}>
            <div
              className={
                this.state.elementId === 0 ? "menuItemActive" : "menu-item"
              }
            >
              <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
              <span
                className={
                  this.state.elementId === 0 ? "ulActiveElement" : "ulElement"
                }
              >
                الرئيسية
              </span>
            </div>
          </li>
          <li onClick={() => this.handleOnClick(1)}>
            <div
              className={
                this.state.elementId === 1 ? "menuItemActive" : "menu-item"
              }
            >
              <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
              <span
                className={
                  this.state.elementId === 1 ? "ulActiveElement" : "ulElement"
                }
              >
                {" "}
                المهام
              </span>
            </div>
          </li>

          <li onClick={() => this.handleOnClick(2)}>
            <div
              className={
                this.state.elementId === 2 ? "menuItemActive" : "menu-item"
              }
            >
              <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
              <span
                className={
                  this.state.elementId === 2 ? "ulActiveElement" : "ulElement"
                }
              >
                الأختبارات
              </span>
            </div>
          </li>
          <li onClick={() => this.handleOnClick(3)}>
            <div
              className={
                this.state.elementId === 3 ? "menuItemActive" : "menu-item"
              }
            >
              <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
              <span
                className={
                  this.state.elementId === 3 ? "ulActiveElement" : "ulElement"
                }
              >
                المسابقات
              </span>
            </div>
          </li>
          <li onClick={() => this.handleOnClick(4)}>
            <div
              className={
                this.state.elementId === 4 ? "menuItemActive" : "menu-item"
              }
            >
              <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
              <span
                className={
                  this.state.elementId === 4 ? "ulActiveElement" : "ulElement"
                }
              >
                ادارة المستخدمين
              </span>
            </div>
          </li>
          <li onClick={() => this.handleOnClick(5)}>
            <div
              className={
                this.state.elementId === 5 ? "menuItemActive" : "menu-item"
              }
            >
              <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
              <span
                className={
                  this.state.elementId === 5 ? "ulActiveElement" : "ulElement"
                }
              >
                ادارة المحافظ
              </span>
            </div>
          </li>
          <li onClick={() => this.handleOnClick(6)}>
            <div
              className={
                this.state.elementId === 6 ? "menuLastItemActive" : "menu-item"
              }
            >
              <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
              <span
                className={
                  this.state.elementId === 6 ? "ulActiveElement" : "ulElement"
                }
              >
                التقارير
              </span>
            </div>
            {/* {this.state.elementId === 6 ? (
              <>
                <div className="lastItemBorder"></div>
              </>
            ) : null} */}
          </li>
        </ul>
        <div className="lastItemBorder"></div>
        <div onClick={() => this.handleOnClick(7)}>
          <div className="menuSettingsItem">
            <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
            <span
              className={
                this.state.elementId === 7 ? "ulActiveElement" : "ulElement"
              }
            >
              الأعدادات
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export default RightMenu;
