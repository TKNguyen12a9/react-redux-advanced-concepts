import commentReducer from "reducers/comment"
import { SAVE_COMMENT } from "actions/types"

it("handles action of type SAVE_COMMENT", () => {
	// fake action
	const action = {
		type: SAVE_COMMENT,
		payload: "New comment",
	}

	const newState = commentReducer([], action)

	expect(newState).toEqual(["New comment"])
})

it("handles action of type unknown", () => {
	const newState = commentReducer([], { type: "HAHAHHAZZ" })

	expect(newState).toEqual([])
})
