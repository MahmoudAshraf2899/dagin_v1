import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// CustomCloseButton component to handle the custom close button
class CustomCloseButton extends Component {
  render() {
    const { onClick, style } = this.props;
    return (
      <button type="button" className="close" onClick={onClick} style={style}>
        <span aria-hidden="true">&times;</span>
      </button>
    );
  }
}
export default CustomCloseButton;
