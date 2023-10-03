import Cookies from "universal-cookie";

const cookies = new Cookies();
const customerKey = "customer"

export const getCustomer = () => {
  return cookies.get(customerKey);
};

export const setCustomer = (value, expirationMinutes) => {
  var expirationDate = new Date(
    new Date().getTime() + expirationMinutes * 60000
  );
  cookies.set(customerKey, value, { path: "/", expires: expirationDate });
};

export const removeCustomer = () => {
  cookies.remove(customerKey)
}
