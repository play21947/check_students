const initialState = {
    user_checked: []
}


let CheckedReducer = (state = initialState, action) => {
    if (action.type === "ADD_CHECKED") {

        let updatedState = []


        let fil = state.user_checked.filter((item)=>{
            return item.id === action.payload.id
        })

        if(fil.length > 0){
            updatedState = state.user_checked.map((item)=>{
                return{
                    ...item,
                    status: item.id === action.payload.id ? action.payload.status : item.status
                }
            })
        }else{
            updatedState = [...state.user_checked, action.payload]
        }

        return{
            user_checked: updatedState
        }

    } else {
        return state
    }
}

export default CheckedReducer