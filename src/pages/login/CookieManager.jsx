import Cookies from "universal-cookie";

const cookies = new Cookies();
const customerKey = "customer";
const userKey = "user";

export const getCustomer = () => {
  //const { value } = useContext(CustomerContext);
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

export const getUser = () => {
  return cookies.get(userKey);
};

export const setUser = (value, expirationMinutes) => {
  var expirationDate = new Date(
    new Date().getTime() + expirationMinutes * 60000
  );
  cookies.set(userKey, value, { path: "/", expires: expirationDate });
};

export const removeUser = () => {
  cookies.remove(userKey)
}