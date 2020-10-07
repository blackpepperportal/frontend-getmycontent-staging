import React from "react";
import { NavLink } from "react-router-dom";

const SideBarIndex = ({ toggleClass }) => {
  return (
    <div
      className={
        toggleClass ? "side-content-wrap newClass" : "side-content-wrap"
      }
    >
      <div
        className="sidebar-left open rtl-ps-none"
        data-perfect-scrollbar=""
        data-suppress-scroll-x="true"
      >
        <ul className="navigation-left">
          <li className="nav-item">
            <NavLink className="nav-item-hold" to={"/dashboard"}>
              {/* <i className="nav-icon i-Bar-Chart"></i> */}
              <img
                src={
                  window.location.origin +
                  "/assets/images/sidebar/dashboard.svg"
                }
                className="nav-icon"
              ></img>
              <span className="nav-text">Dashboard</span>
            </NavLink>
            <div className="triangle"></div>
          </li>

          <li className="nav-item">
            <NavLink className="nav-item-hold" to={"/meetings"}>
              <i className="nav-icon i-Conference"></i>
              <span className="nav-text">Meetings</span>
            </NavLink>
            <div className="triangle"></div>
          </li>

          <li className="nav-item">
            <NavLink className="nav-item-hold" to={"/my-subscriptions"}>
              <i className="nav-icon i-Download"></i>
              <span className="nav-text">Subscriptions</span>
            </NavLink>
            <div className="triangle"></div>
          </li>

          <li className="nav-item">
            <NavLink className="nav-item-hold" to={"/cards"}>
              <i className="nav-icon i-Wallet"></i>
              <span className="nav-text">Payments</span>
            </NavLink>
            <div className="triangle"></div>
          </li>

          {/* <li className="nav-item">
            <NavLink className="nav-item-hold" to={"/recordings"}>
              <i className="nav-icon i-Gears"></i>
              <span className="nav-text">Recordings</span>
            </NavLink>
            <div className="triangle"></div>
          </li> */}

          <li className="nav-item">
            <NavLink className="nav-item-hold" to={"/profile"}>
              <i className="nav-icon i-Administrator"></i>
              <span className="nav-text">Account</span>
            </NavLink>
            <div className="triangle"></div>
          </li>
          <li className="nav-item">
            <NavLink className="nav-item-hold" to={"/logout"}>
              <i className="nav-icon i-Endways"></i>
              <span className="nav-text">Exit</span>
            </NavLink>
            <div className="triangle"></div>
          </li>
        </ul>
      </div>
      <div className="sidebar-overlay"></div>
    </div>
  );
};

export default SideBarIndex;
