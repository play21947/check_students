import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { Alert } from "react-native"
import { end_point } from "../EndPoint"

export const SignInAction = (username, password) => {

    return (dispatch) => {
        axios.post(end_point + 'sign_in', {
            username: username,
            password: password
        }).then((res) => {
            if (res.data.success) {
                AsyncStorage.setItem('username_email', res.data.user_data[0].username)
                dispatch({
                    type: 'SIGN_IN',
                    payload: res.data.user_data[0].username
                })
            } else {
                Alert.alert("Username or password is wrong")
            }
        })
    }
}


export const AutoSignIn=()=>{
    return((dispatch)=>{
        AsyncStorage.getItem("username_email").then((res)=>{
            dispatch({
                type: 'AUTO_SIGN_IN',
                payload: res
            })
        }) // get user that you store
    })
}


export const LoadedScreen=()=>{
    return((dispatch)=>{
        dispatch({
            type: "LOADED_SCREEN"
        })
    })
}


export const Exit=()=>{
    return((dispatch)=>{
        AsyncStorage.removeItem("username_email")
        dispatch({
            type: 'EXIT'
        })
    })
}