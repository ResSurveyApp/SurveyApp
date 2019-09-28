import http from "./httpService";
import IP from "../Api";

var cors_url = `${IP}/categories`;

export function UserGraphsCount(
    key,
    Survey_name,
    company_name,
    user_id,
  ) {
    const url = `${IP}/getSingle${key}?survey=${Survey_name}&company=${company_name}&userid=${user_id}`;
    return http.get(url, {  headers: {
      "Access-Control-Allow-Credentials" : "true",
      "Access-Control-Allow-Origin" : cors_url,
      "Content-Type" : "application/json"
  }}).catch(error=>{
    return {status:400}
  });
};

export function AdminGraphsCount(
  key,
  dataframe,
) {
 
  const url = `${IP}/getAll${key}?dataframe=${dataframe}`;
  return http.get(url, {  headers: {
    "Access-Control-Allow-Credentials" : "true",
    "Access-Control-Allow-Origin" : cors_url,
    "Content-Type" : "application/json"
}}).catch(error=>{
  return {status:400}
});
};

export function ChartsAll(
  Survey_name,
  company_name,
) {
 
  const url = `${IP}/chartsAll?survey=${Survey_name}&company=${company_name}`;
  return http.get(url, {  headers: {
    "Access-Control-Allow-Credentials" : "true",
    "Access-Control-Allow-Origin" : cors_url,
    "Content-Type" : "application/json"
}}).catch(error=>{
  return {status:400}
});
};

export function DeptAllCharts(
  Survey_name,
  company_name,
  dept_name,
) {
 
  const url = `${IP}/chartsByDept?survey=${Survey_name}&company=${company_name}&department=${dept_name}`;
  return http.get(url, {  headers: {
    "Access-Control-Allow-Credentials" : "true",
    "Access-Control-Allow-Origin" : cors_url,
    "Content-Type" : "application/json"
}}).catch(error=>{
  return {status:400}
});
};

