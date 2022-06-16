export const AddChecked=(id, status)=>{
    return ((dispatch)=>{
        dispatch({
            type: "ADD_CHECKED",
            payload: {id: id, status: status}
        })
    })
}