import React from "react";
import { useNavigate } from "react-router-dom";
import { banishCookie, getCookie } from "./Cookies";
import { navigate } from "react-router-dom";

const regularUserPaths = [
  "/regular_home",
  "/search_product",
  "/regular_profile",
  "/search_manufacturer",
];

const manufacturerUserPaths = [
  "/manufacturer_home",
  "/search_product",
  "/add_product",
  "/manufacturer_profile",
];

const adminUserPaths = [
  "/admin_home",
  "/admin_profile",
  "/search_users",
  "/manage_users",
  "/viewall_users",
  "/viewall_products",
];

function isLoggedIn() {
  const userAccess = getCookie("access_level");

  if (getCookie("access_level") === "") {
    return false;
  } else {
    if (
      userAccess === "regular" ||
      userAccess === "manufacturer" ||
      userAccess === "admin"
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export function handleNav(destpath) {
  console.log("SUMMONED HANDLE NAV");
  if (!isLoggedIn()) {
    return "/";
  } else {
    const userAccess = getCookie("access_level");
    if (userAccess === "regular") {
      let moved = false;
      for (let i = 0; i < regularUserPaths.length; i++) {
        if (destpath === regularUserPaths[i]) {
          i = regularUserPaths.length;
          moved = true;
          return destpath;
        }
      }
      if (!moved) {
        return "/regular_home";
      }
    } else if (userAccess === "admin") {
      let moved = false;
      for (let i = 0; i < adminUserPaths.length; i++) {
        if (destpath === adminUserPaths[i]) {
          i = adminUserPaths.length;
          moved = true;
          return destpath;
        }
      }
      if (!moved) {
        return "/admin_home";
      }
    } else {
      let moved = false;
      for (let i = 0; i < manufacturerUserPaths.length; i++) {
        if (destpath === manufacturerUserPaths[i]) {
          i = manufacturerUserPaths.length;
          moved = true;
          return destpath;
        }
      }
      if (!moved) {
        return "/manufacturer_home";
      }
    }
  }
}

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
