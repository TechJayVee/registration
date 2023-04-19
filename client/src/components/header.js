import React from "react";
import logo from "../assets/logo.png"; // Import your logo image here

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={logo} alt="Logo" style={{ width: "100px", height: "100px" }} />
    </div>
  );
};

export default Header;
