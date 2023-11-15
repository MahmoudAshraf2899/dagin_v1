import React, { Component } from "react";
import mainPhoto from "../Assets/images/pexels-petr-ganaj-18346899.jpg";
class RightMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      currentActiveElement: "",
    };
  }
  componentDidMount() {
    console.log(this.state.isActive);
  }
  handleOnClick(e) {
    console.log(
      "🚀 ~ file: RightMenu.js:14 ~ RightMenu ~ handleOnClick ~ e:",
      e.target
    );
    console.log("Clicked");
  }
  render() {
    return (
      <div class="right-menu">
        <div class="menu-logo">منصة داچن</div> {/* Put Dajin Logo Here */}
        <div className="ulItems">
          <div class="menu-title">القائمة</div>

          <div
            className={this.state.isActive ? "menuItemActive" : "menu-item"}
            onClick={(e) => this.handleOnClick(e)}
          >
            <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
            <span
              className={this.state.isActive ? "ulActiveElement" : "ulElement"}
            >
              الرئيسية
            </span>
          </div>

          <div class="menu-item" onClick={(e) => this.handleOnClick(e)}>
            <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
            <span className="ulElement"> المهام</span>
          </div>

          <div class="menu-item" onClick={(e) => this.handleOnClick(e)}>
            <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
            <span className="ulElement">الأختبارات</span>
          </div>

          <div class="menu-item" onClick={(e) => this.handleOnClick(e)}>
            <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
            <span className="ulElement">المسابقات</span>
          </div>

          <div class="menu-item" onClick={(e) => this.handleOnClick(e)}>
            <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
            <span className="ulElement">ادارة المستخدمين</span>
          </div>

          <div class="menu-item" onClick={(e) => this.handleOnClick(e)}>
            <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
            <span className="ulElement">ادارة المحافظ</span>
          </div>

          <div class="menuLastItem" onClick={(e) => this.handleOnClick(e)}>
            <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
            <span className="ulElement">التقارير</span>
          </div>

          <div class="menuSettingsItem" onClick={(e) => this.handleOnClick(e)}>
            <img className="ulElementLogo" src={mainPhoto} alt="Logo" />
            <span className="ulElement">الأعدادات</span>
          </div>
        </div>
      </div>
    );
  }
}
export default RightMenu;
