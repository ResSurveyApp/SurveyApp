import http from "./httpService";
import IP from "../Api";

export function userlogin(email, password) {
    const url = `${IP}/userlogin`;
    return http.post(url, { email, password }).catch(error=> {
      return {status : 400}
    });
}

export function forgetPassword(email, password, company, forgotphrase) {
  const url = `${IP}/passwordReset?email=${email}&password=${password}&company=${company}&forgotphrase=${forgotphrase}`;
  return http.get(url).catch(error=> {
    return {status : 400}
  });
}

export function otp(email, company) {
  const url = `${IP}/generateOTP?email=${email}&company=${company}`;
  return http.get(url).catch(error=> {
    return {status : 400}
  });
}