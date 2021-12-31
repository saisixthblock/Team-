import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./userType"

export const fetchRequest=()=>{
    return{
        type:FETCH_USER_REQUEST
    }
}

export const fetchSuccess=user=>{
    return{
        type:FETCH_USER_SUCCESS,
        payload:user
    }
}

export const fetchFailure=error=>{
    return{
        type: FETCH_USER_FAILURE,
        payload:error
    }
}