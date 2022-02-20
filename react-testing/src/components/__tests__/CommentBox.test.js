import React from "react"
import { shallow, mount, unmount } from "enzyme"
import CommentBox from "../CommentBox"
import Root from "root"

let wrapped

beforeEach(() => {
	wrapped = mount(
		// provide redux store to CommentBox component
		<Root>
			<CommentBox />
		</Root>
	)
})

afterEach(() => {
	wrapped.unmount()
})

// show textarea and button
it("has a textarea and a button", () => {
	expect(wrapped.find("textarea").length).toEqual(1)
	expect(wrapped.find("button").length).toEqual(2)
})

describe("the textarea", () => {
	// handle duplicate test logic
	beforeEach(() => {
		wrapped.find("textarea").simulate("change", {
			target: { value: "new comment" },
		})
		wrapped.update()
	})

	// user can enter input into textarea
	it("has a textarea that user can type in", () => {
		expect(wrapped.find("textarea").prop("value")).toEqual("new comment")
	})

	// when the input is submitted, textarea should get emptied
	it("textarea will be emptied after user submits form", () => {
		wrapped.find("form").simulate("submit")
		wrapped.update()
		expect(wrapped.find("textarea").prop("value")).toEqual("")
	})
})
