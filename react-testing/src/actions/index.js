import { CHANGE_AUTH, FETCH_COMMENTS, SAVE_COMMENT } from "./types"
import axios from "axios"
export function saveComment(comment) {
	return {
		type: SAVE_COMMENT,
		payload: comment,
	}
}

export function fetchComments() {
	const response = axios
		.get("http://jsonplaceholder.typicode.com/comments")
		.then(response => {
			return response.data
		})
	console.log(Array.isArray(response))
	return {
		type: FETCH_COMMENTS,
		payload: response,
	}
}

export function changeAuth(isLoggedIn) {
	return {
		type: CHANGE_AUTH,
		payload: isLoggedIn,
	}
}
