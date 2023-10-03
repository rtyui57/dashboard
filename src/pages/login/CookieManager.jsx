import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getCustomer = () => {
  return cookies.get("customer");
};

export const setCustomer = (value, expirationMinutes) => {
  var expirationDate = new Date(
    new Date().getTime() + expirationMinutes * 60000
  );
  cookies.set("customer", value, { path: "/", expires: expirationDate });
};
