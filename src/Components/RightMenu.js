import React, { Component } from "react";
import mainPhoto from "../Assets/images/pexels-petr-ganaj-18346899.jpg";
class RightMenu extends Component {
  render() {
    return (
      <div class="left-menu">
        <div class="menu-item">منصة داجن</div> {/* Put Dajin Logo Here */}
        <div class="menu-item">القائمة</div>
        <div class="menu-item">
          <span> الرئيسية</span>

          <img
            className="ulElementLogo"
            src={mainPhoto}
            alt="Logo"
            class="menu-logo"
          />
        </div>
        <div class="menu-item">المهام</div>
        <div class="menu-item">الأختبارات</div>
        <div class="menu-item">المسابقات</div>
        <div class="menu-item">ادارة المستخدمين</div>
        <div class="menu-item">ادارة المحافظ</div>
        <div class="menu-item">التقارير</div>
      </div>
    );
  }
}
export default RightMenu;
