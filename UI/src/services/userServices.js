import http from "./httpService";
import IP from "../Api";

// const apiEndpoint = apiUrl + "/movies";
var cors_url = `${IP}/categories`;
export function surveyUpload(Survey_name, company_name) {
  const url = `${IP}/questionsUpload?survey=${Survey_name}&company=${company_name}`;
  return http.post(url, { Survey_name, company_name });
}
export function userdataupload(Survey_name, company_name) {
  const url = `${IP}/usersUpload?survey=${Survey_name}&company=${company_name}`;
  return http.post(url, { Survey_name, company_name });
}
export function companynames(
  Survey_name,
  company_name,
  sector_name,
  sub_sector_name
) {
 
  const url = `${IP}/categories?survey=${Survey_name}&company=${company_name}&sector=${sector_name}&subsector=${sub_sector_name}`;
  return http.get(url, {  headers: {
    "Access-Control-Allow-Credentials" : "true",
    "Access-Control-Allow-Origin" : cors_url,
    "Content-Type" : "application/json"
}});
}

export function surveyQuestions(
  Survey_name,
  company_name,
  sector_name,
  sub_sector_name,
  c_name,
  email
) {
  const url = `${IP}/surveyQuestions?survey=${Survey_name}&company=${company_name}&sector=${sector_name}&subsector=${sub_sector_name}&cname=${c_name}&email=${email}`;
  return http.get(url, {  headers: {
    "Access-Control-Allow-Credentials" : "true",
    "Access-Control-Allow-Origin" : cors_url,
    "Content-Type" : "application/json"
}});
}

export function userRegistration(
  Survey_name,
  company_name,
  email,
  username,
  password
) {
 
  const url = `${IP}/Registration?survey=${Survey_name}&company=${company_name}&email=${email}&username=${username}&password=${password}`;
  return http.get(url, {  headers: {
    "Access-Control-Allow-Credentials" : "true",
    "Access-Control-Allow-Origin" : cors_url,
    "Content-Type" : "application/json"
}}).catch(error => {
  return {status:400}
});
}

export function userQuestionUpload(Json) {
  const url = `${IP}/userResponse`;
  return http.post(url, Json).catch(error => {
    return {status:400}
  });
  }

  export function userTable(
    Survey_name,
    company_name,
    user_id,
  ) {
   
    const url = `${IP}/getTable?survey=${Survey_name}&company=${company_name}&userid=${user_id}`;
    return http.get(url).catch(error => {
    return {status:400}
  });
  }

  export function QuestionsCount(
    Survey_name,
    company_name,
  ) {
   
    const url = `${IP}/questionsCount?survey=${Survey_name}&company=${company_name}`;
    return http.get(url).catch(error => {
    return {status:400}
  });
  }


  export function getSavedQuestions(
    Survey_name,
    company_name,
    email,
  ) {
    const url = `${IP}/autoSavedResponse?survey=${Survey_name}&company=${company_name}&email=${email}`;
    return http.get(url).catch(error => {
    return {status:400}
  });
  }

  export function getSurvey(email, company) {
    const url = `${IP}/getAllSurveybyUser?email=${email}&company=${company}`;
    return http.get(url).catch(error=> {
      return {status : 400}
    });
  }


