export const getCookie = (userName) => {
  const cookieData = document.cookie.split(';');
  const userCookie = cookieData.map((e) => e.split('='));
  const finalCookie = userCookie.find((c) => c[0].trim() === userName);
  if (finalCookie && finalCookie[1]) {
    return finalCookie[1].trim();
  } else {
    return "";
  }
}

export const bakeCookie = (fieldName, cookieContent) => {
  const dateToday = new Date();
  const timeNow = dateToday.getTime();
  const kiloDaySec = 24 * 60 * 60 * 1000;
  const expirationTime = timeNow + (1 * kiloDaySec);
  dateToday.setTime(expirationTime);
  const freshCookie = `${fieldName}=${cookieContent};expires=${dateToday.toUTCString()};samesite=lax`;
  document.cookie = freshCookie;
}

export const banishCookie = () => {
  document.cookie = `username_email='';expires=${new Date()};samesite=lax`;
  document.cookie = `access_level='';expires=${new Date()};samesite=lax`;
}