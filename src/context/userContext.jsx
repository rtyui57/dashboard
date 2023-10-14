import { createContext, useState } from "react";

export const CustomerContext = createContext(null);

export default function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [username, setUsername] = useState(null);

  const setCustomerHandler = (newCustomer) => {
    setCustomer(newCustomer);
  };

  const setUserHandler = (user) => {
    setUsername(user);
  };


  return (
    <CustomerContext.Provider value={{ value: customer, setCustomerContext: setCustomerHandler, user : username, setUser : setUserHandler}}>
      {children}
    </CustomerContext.Provider>
  );
}
