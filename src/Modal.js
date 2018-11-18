import React from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    // this is the div we're going to render into
    // and stick that into modal
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
    //
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    // cleaning up after outselves
    // if we don't do this we're going to have memoryleaks and eventually crash the browser
    // ComponentWillUnmount is almost always meant for... cleaning up memory
    // Removing eventlisteners, extaneous documents, anything that's going to leak memory
  }

  render() {
    return createPortal(this.props.children, this.el);
  }
}

export default Modal;
