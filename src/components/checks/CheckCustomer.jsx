import { getCustomer } from "../../pages/login/CookieManager";
import { useNavigate } from "react-router-dom";

export const isLogged = () => {
    console.log(getCustomer())
    return !!getCustomer()
}

export function redirectToLogin() {
    window.location.href = '/login';
}