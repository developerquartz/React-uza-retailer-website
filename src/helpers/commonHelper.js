import moment from "moment";

const DEVICE_ID_STORE = "uza-retail-device-id";
const COUPON_CODE = "uza-retail-coupon";

export const logger = (...params) => {
  console.log(...params);
};

export const smoothScrollToTop = () => {
  document.body.scrollTo({ top: 0, behavior: "smooth" });
};

export const handlePageClick = ({ setSkip = () => { }, fetchRecords = () => { } }) => (event) => {
  setSkip(event.selected + 1);
  fetchRecords(event.selected + 1);
  smoothScrollToTop();
};
export const fromNow = (date) => {
  const now = moment();
  const createdAtMoment = moment(date);
  const fromNow = now.diff(createdAtMoment, "days");

  return fromNow - (fromNow % 10) + 10;
};

export const isEqualArray = (arr1, arr2) => {
  arr1.sort();
  arr2.sort();
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

export const fixedNumber = (number, toFix = 2) => {
  return Number(parseFloat(number).toFixed(toFix));
};

export const scrollToId = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Generate a unique identifier (UUID)
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}

export const getDeviceId = () => {
  let deviceId = localStorage.getItem(DEVICE_ID_STORE);
  if (!deviceId) {
    deviceId = generateUUID();
    localStorage.setItem(DEVICE_ID_STORE, deviceId);
  }

  return deviceId;
}


export const setCoupon = (coupon = "") => {
  localStorage.setItem(COUPON_CODE, coupon);
}


export const getCoupon = () => {
  return localStorage.getItem(COUPON_CODE) || "";
}