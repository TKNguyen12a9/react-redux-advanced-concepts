import { FETCH_COMMENTS, SAVE_COMMENT } from "actions/types"

export default function commentReducer(state = [], action) {
	switch (action.type) {
		case SAVE_COMMENT:
			return [...state, action.payload]
		case FETCH_COMMENTS:
			const commentsAsName = action.payload?.map(comment => comment.name)
			return [...state, ...commentsAsName]
		default:
			return state
	}
}
