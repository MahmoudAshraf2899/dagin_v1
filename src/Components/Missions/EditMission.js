import React, { Component } from "react";
import MissionRangePopUp from "./MissionRangePopUp";
import MissionTypePopUp from "./MissionTypePopUp";
import AssignMissionToPopUp from "./AssignMissionToPopUp";
import DatePickerComponent from "../SubComponents/DatePickerComponent";
import { Formik } from "formik";
import moment from "moment";
import { toast } from "react-toastify";
import API from "../Api";

class EditMission extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // moment.locale("en");
    API.get(`dashboard/missions/${this.props.id}`).then((res) => {
      console.log(
        "🚀 ~ file: EditMission.js:20 ~ EditMission ~ API.get ~ res:",
        res
      );
      console.log(
        "🚀 ~ file: EditMission.js:20 ~ EditMission ~ API.get ~ res:",
        res
      );
      console.log(
        "🚀 ~ file: EditMission.js:20 ~ EditMission ~ API.get ~ res:",
        res
      );
    });
  }
  render() {
    return (
      <div>
        <h3>Edit Missions</h3>
      </div>
    );
  }
}

export default EditMission;
