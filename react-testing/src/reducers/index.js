import { combineReducers } from "redux"
import { authReducer } from "./auth"
import commentReducer from "./comment"

export default combineReducers({
	commentList: commentReducer,
	auth: authReducer,
})
