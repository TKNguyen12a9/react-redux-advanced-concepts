import React from "react"
import { mount } from "enzyme"
import moxios, { wait } from "moxios"
import Root from "root"
import App from "components/App"

// TODO: read more about moxios (mock version of axios, used in testing)
beforeEach(() => {
	moxios.install()
	moxios.stubRequest("http://jsonplaceholder.typicode.com/comments", {
		status: 200,
		response: [{ name: "fetch #1" }, { name: "fetch #2" }],
	})
})

// clean up testing recipes after testing done
afterEach(() => {
	moxios.uninstall()
})

it("fetch a list of comments and display them", done => {
	// attempt to render entire app
	const wrapped = mount(
		<Root>
			<App />
		</Root>
	)
	// find the `fetchComments` button and click it
	wrapped.find(".fetch-comments-btn").simulate("click")
	done()

	// eslint-disable-next-line testing-library/await-async-utils
	moxios.wait(() => {
		// force app update itself
		wrapped.update()

		// expect to find a list of comments
		expect(wrapped.find("li").length).toEqual(3)
		done()

		// clean up component after testing done
		wrapped.unmount()
	})
})
