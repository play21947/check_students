import { combineReducers } from "redux";
import AuthenticationReducer from "./reducers/AuthenticationReducer";
import CheckedReducer from "./reducers/CheckedReducer";

const AllReducers = combineReducers({
    authenticate: AuthenticationReducer,
    checkall: CheckedReducer
})

export default AllReducers