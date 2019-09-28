import * as actionTypes from './actionTypes';
import axios from 'axios';
import Base64 from 'crypto-js/enc-base64';
import * as CryptoJS from 'crypto-js';
import ip from "../../Api";

import { userlogin } from "../../services/login";



function generateToken(email,password){

    function base64url(source) {
        // Encode in classical base64
        let encodedSource = Base64.stringify(source);
        
        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');
        
        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');
        
        return encodedSource;
      }

     let header = {
        "alg": "HS256",
        "typ": "JWT"
      };
      
      let data = {
        "user":email,
        "password":password
      };
      
      
      let stringifiedHeader =CryptoJS.enc.Utf8.parse(JSON.stringify(header));
      let encodedHeader = base64url(stringifiedHeader);
      
      let stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
      let encodedData = base64url(stringifiedData);
      
      let token = encodedHeader + "." + encodedData;

      let secret = "secret";
      var signature = CryptoJS.HmacSHA256(token, secret);
      signature = base64url(signature);

      let signedToken = token + "." + signature;
      return signedToken
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess= (isAdmin, registered) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        isAdmin : isAdmin,
        registered: registered
    };
};

export const authFail= (error) => {
    console.log(error)
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userDetails')
    sessionStorage.removeItem('survey');
    sessionStorage.removeItem('company')
    sessionStorage.removeItem('registered');
    sessionStorage.removeItem('expirationDate')
    sessionStorage.removeItem('isAdmin');
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userDetails')
    sessionStorage.removeItem('survey');
    sessionStorage.removeItem('company')
    sessionStorage.removeItem('registered');
    sessionStorage.removeItem('expirationDate')
    sessionStorage.removeItem('isAdmin');
    return ({
        type: actionTypes.AUTH_LOGOUT
    });
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000);
    };
};

const login = async (email, password) => {
    const LoginData = await userlogin(
      email, password
    );

    return LoginData
}

export const auth= (email, password) =>{
    console.log(generateToken(email,password))

    // const respnew = {
    //     data : {
    //         isValid : 'true',
    //         survey : 'MySurvey',
    //         company: 'ITH',
    //         isAdmin: 'false',
    //         user: {
    //             username: 'Vignesh',
    //             password: 'k'
    //         }
    //     },
    //     status : 200
    // }
    
    return async dispatch => {
        dispatch(authStart());
        const resp = await userlogin(
            email, password
          );

          console.log(resp, email, password)
        
        if(resp.status === 200 && resp.data.users.length === 1){
            const expirationDate= new Date(new Date().getTime() + "7200" *1000)
            sessionStorage.setItem('userName',resp.data.users[0].username);
            sessionStorage.setItem('userDetails',JSON.stringify(resp.data.users[0]));
            sessionStorage.setItem('survey',resp.data.survey);
            sessionStorage.setItem('company',resp.data.company);
            sessionStorage.setItem('expirationDate', expirationDate);
            sessionStorage.setItem('registered',resp.data.isValid);
            sessionStorage.setItem('isAdmin',resp.data.isAdmin);
            if(( resp.data.isValid === 'true' && resp.data.users[0].password ) || resp.data.isAdmin === 'true'){
                dispatch(authSuccess(resp.data.isAdmin, resp.data.isValid));
                dispatch(checkAuthTimeout("7200"))
            }else if(resp.data.isValid === 'true' && !resp.data.users[0].password){
                dispatch(authFail({message:"Your Account is not Registered. Go To SignUp Page to Register"}))
            }else{
                dispatch(authFail({message:"Please Activate Your Account by clicking Activation link sent to your company mailID"}))
            }
        }else{
                console.log('Login Failed')
                dispatch(authFail({message:"Invalid EmailID and Password"}))
            }
        }
    
    // return dispatch => {
    //     //...
    //     dispatch(authStart());
    //     axios.post(ip+'/user/auth',{},{headers:{"Content-Type":"application/json","Bearer":generateToken(email,password)}})
    //     .then(function (response) {
    //         console.log(response)
    //         if(response.status=== 200){           
    //             const header = {
    //                 'Bearer': response.data.token,
    //                 'Content-Type':'application/json'
    //             }
    //             console.log("Check ", response.data, " header ", header)
    //         let tok = response.data.token
    //         let atleastApprovedChk = response.data.AtleaseOneApproved
    //         console.log("     sdasda", ip+"user/isSiteAdmin?userName="+email)
    //         axios.get(ip+"/user/isSiteAdmin?userName="+email,{headers:header})
    //             .then(resp=>{
    //                 console.log(resp)
    //                 if(resp.data=== true){   
    //                     const expirationDate= new Date(new Date().getTime() + "7200" *1000)
    //                     console.log("       sddfsdfsdfsdf",response.data)             
    //                     sessionStorage.setItem('userName',email);
    //                     sessionStorage.setItem('token',tok);
    //                     sessionStorage.setItem('registered',true);
    //                     sessionStorage.setItem('expirationDate', expirationDate);
    //                     dispatch(authSuccess(email,password,tok,true))
    //                     dispatch(checkAuthTimeout("7200"))
    //                 }
    //                 else{
    //                         const expirationDate= new Date(new Date().getTime() + "7200" *1000)
    //                         if(atleastApprovedChk===false){
    //                             sessionStorage.setItem('userName',[]);
    //                             dispatch(authFail({message:"registered"}))
    //                         }else{
    //                                 sessionStorage.setItem('userName',email);
    //                                 sessionStorage.setItem('token',tok);
    //                                 sessionStorage.setItem('registered',JSON.stringify(atleastApprovedChk));
    //                                 sessionStorage.setItem('expirationDate', expirationDate);
    //                                 dispatch(authSuccess(email,password,tok,atleastApprovedChk))
    //                                 dispatch(checkAuthTimeout("7200"))
    //                                 }
    //                         }
    //                 }).catch(error=>{
    //                     dispatch(authFail({message:"Invalid"}))
    //                     })          
    //      }else{
    //          console.log('Login Failed')
    //         dispatch(authFail({message:"Invalid"}))
    //      }
    //   }).catch(error=>{
    //     dispatch(authFail({message:"Invalid"}))
    //     })
    // }
};


export const authCheckState = () => {
    return dispatch => {
        const isAdmin= sessionStorage.getItem('isAdmin');
        const registered= sessionStorage.getItem('registered')

        console.log(isAdmin, registered, "Check State")
        if (!isAdmin){
            dispatch(logout());
        } else if(!registered) {
            dispatch(logout());
        } else {
                const expirationDate=new Date(sessionStorage.getItem('expirationDate'));
                if(expirationDate <= new Date()){
                    dispatch(logout());
                } else {
                    console.log(isAdmin,registered)
                    // dispatch(logout());
                    dispatch(authSuccess(isAdmin, registered));
                    // dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000));
                }
        }
    }
}