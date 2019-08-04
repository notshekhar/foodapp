import React from "react";

import Veg_img from "../icons/veg.png";
import Nonveg_img from "../icons/nonveg.png";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      prefrence: "none"
    };
    this.check();
  }
  check() {
    if (
      localStorage.getItem("prefrence") == "veg" ||
      localStorage.getItem("prefrence") == "nonveg"
    ) {
      document.location.href = "/suggestions";
    }
  }
  veg_active() {
    if (this.state.prefrence !== "veg") {
      this.setState({ prefrence: "veg" });
      document.querySelector(".veg").classList.add("active");
      document.querySelector(".nonveg").classList.remove("active");
      document.querySelector(".next").disabled = false;
    } else {
      this.setState({ prefrence: "none" });
      document.querySelector(".veg").classList.remove("active");
      document.querySelector(".next").disabled = true;
    }
    if (document.querySelector(".next").disabled) {
      document.querySelector(".next").classList.remove("nodisabled");
    } else {
      document.querySelector(".next").classList.add("nodisabled");
    }
  }
  nonveg_active() {
    if (this.state.prefrence !== "nonveg") {
      this.setState({ prefrence: "nonveg" });
      document.querySelector(".nonveg").classList.add("active");
      document.querySelector(".veg").classList.remove("active");
      document.querySelector(".next").disabled = false;
    } else {
      this.setState({ prefrence: "none" });
      document.querySelector(".nonveg").classList.remove("active");
      document.querySelector(".next").disabled = true;
    }
    if (document.querySelector(".next").disabled) {
      document.querySelector(".next").classList.remove("nodisabled");
    } else {
      document.querySelector(".next").classList.add("nodisabled");
    }
  }
  changeroute() {
    // alert("okay");
    if (this.state.prefrence == "veg" || this.state.prefrence == "nonveg") {
      localStorage.setItem("prefrence", this.state.prefrence);
      document.location.href = "/suggestions";
    }
  }
  render() {
    return (
      <div>
        <div className="wrap">
          <div className="one">
            <button className="veg but" onClick={() => this.veg_active()}>
              <div className="fade" />
              <img src={Veg_img} className="veg_img" />
              <span className="veg_text">Veg</span>
            </button>
          </div>
          <div className="two">
            <button className="nonveg but" onClick={() => this.nonveg_active()}>
              <img src={Nonveg_img} className="veg_img" />
              <span className="veg_text">Non Veg</span>
            </button>
          </div>
        </div>
        <button className="next" onClick={() => this.changeroute()}>
          Next
        </button>
      </div>
    );
  }
}
