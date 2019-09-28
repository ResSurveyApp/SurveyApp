import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    error:null,
    loading:false,
    authRedirectPath:'/'
};

const authStart=(state,action)=>{
    return updateObject(state,{error:null,loading:true});
}

const authSuccess=(state,action)=> {
    return updateObject(state,{
        error:null,
        loading:false,
        isAdmin:action.isAdmin,
        registered: action.registered
    });
}

const authFail=(state,action)=> {
    console.log(action.error)
    return updateObject(state,{
        error:action.error,
        loading:false
    });
}

const authLogout = (state,action)=>{
    return updateObject(state,{email: null, password:null,isAdmin:null,registered:null})
}



const reducer = (state = initialState, action) => {
    //console.log("Vignesh ", action, "state  ", state)
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
};

export default reducer;