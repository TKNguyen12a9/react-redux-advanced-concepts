import React from "react"
import { mount } from "enzyme" // mount: full DOM rendering
import Root from "root"
import CommentList from "components/CommentList"

let wrapped

beforeEach(() => {
	const initialState = {
		commentList: ["haha", "hihi"],
	}

	wrapped = mount(
		<Root initialState={initialState}>
			<CommentList />
		</Root>
	)
})

it("creates one LI per comment", () => {
	console.log(wrapped.find("li").length)
	expect(wrapped.find("li").length).toEqual(2)
})

it("shows the text for each comment", () => {
	expect(wrapped.render().text()).toContain("haha")
	expect(wrapped.render().text()).toContain("hihi")
})
