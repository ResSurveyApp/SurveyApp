import http from "./httpService";
import IP from "../Api";

// const apiEndpoint = apiUrl + "/movies";

export function surveyUpload(Survey_name, company_name,formData) {
  const url = `${IP}/questionsUpload?survey=${Survey_name}&company=${company_name}`;
  return http.post(url,formData);
}
export function userdataupload(Survey_name, company_name) {
  const url = `${IP}/usersUpload?survey=${Survey_name}&company=${company_name}`;
  return http.post(url, { Survey_name, company_name });
}
export function releaseSurvey(Survey_name, company_name,department_name,url_name) {
  
  const url = `${IP}/releaseSurvey?survey=${Survey_name}&company=${company_name}&department=${department_name}&host=${url_name}`;
  return http.post(url, { Survey_name, company_name });
}
export function companynames() {
  const url = `${IP}/companyNames`;
  return http.get(url);
}
export function companySurveyNames(company_name) {
  const url = `${IP}/companySurveyNames?company=${company_name}`;
  return http.get(url);
}
export function departmentnames(Survey_name, company_name) {
  const url = `${IP}/departmentNames?company=${company_name}&survey=${Survey_name}`;
  return http.get(url);
}

export function companynamesFromUser() {
  const url = `${IP}/userCompanyNames`;
  return http.get(url);
}
export function companySurveyNamesFromUser(company_name) {
  const url = `${IP}/userCompanySurveyNames?company=${company_name}`;
  return http.get(url);
}
export function departmentnamesFromUser(Survey_name, company_name) {
  const url = `${IP}/userDepartmentNames?company=${company_name}&survey=${Survey_name}`;
  return http.get(url);
}

export function reportToMail(Survey_name, company_name) {
  const url = `${IP}/genReport?company=${company_name}&survey=${Survey_name}`;
  return http.get(url).catch(error=>{
    return {status:400}
  });
};


export function GetAllUsers(Survey_name, company_name, department_name) {
  const url = `${IP}/getUsers?company=${company_name}&department=${department_name}&survey=${Survey_name}`;
  return http.get(url);
}