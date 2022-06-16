const initialState = {
    user: null,
    loading_screen: false
}


const AuthenticationReducer=(state = initialState, action)=>{
    if(action.type === "SIGN_IN"){
        return{
            ...state,
            user: action.payload
        }
    }else if(action.type === "LOADED_SCREEN"){
        return{
            ...state,
            loading_screen: true
        }
    }else if(action.type === "AUTO_SIGN_IN"){
        return{
            ...state,
            user: action.payload,
        }
    }else if(action.type === "EXIT"){
        return{
            ...state,
            user: null
        }
    }else{
        return state
    }
}

export default AuthenticationReducer