import React from "react";
import logo from "../assest/Logo.jpeg";

const Logo = ({ w, h }) => {
  return <img src={logo} alt="log" width={w} height={h} />;
};

export default Logo;
