import { CHANGE_AUTH } from "actions/types"

export function authReducer(state = false, action) {
	switch (action.type) {
		case CHANGE_AUTH:
			return action.payload
		default:
			return false
	}
}
