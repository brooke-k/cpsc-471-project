import React from "react";
import { useNavigate } from "react-router-dom";
import { banishCookie, getCookie } from "./Cookies";

const regularUserPages = [
  {
    pagename: "RegularUserHome",
    path: "/regular_home",
  },
  {},
];

export function toHexStr(toBeHexed) {
  let shiftString = "";
  for (let i = 0; i < toBeHexed.length; i++) {
    if (i % 2 === 0) {
      let tempStr = toBeHexed.charCodeAt(i);
      shiftString += tempStr.toString(16);
    } else {
      let tempStr = toBeHexed.charCodeAt(i) - 255 + 7;
      shiftString += tempStr.toString(16);
    }
  }
  return shiftString.toString();
}
