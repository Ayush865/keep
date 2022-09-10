import React from "react";
import logo from "../images/keep-logo.png"
function Header(p) {

  return (
    <div className="header">
      <img
      src={logo}
      alt="logo"
      />
      <h1>SKeeps</h1>
    </div>
  );
}

export default Header;
