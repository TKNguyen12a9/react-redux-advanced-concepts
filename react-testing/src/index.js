import React from "react"
import ReactDOM from "react-dom"
import App from "components/App"
import Root from "root"
import { BrowserRouter, Route } from "react-router-dom"

ReactDOM.render(
	// <Provider store={createStore(reducers, {})}>
	// 	<App />
	// </Provider>,
	<Root>
		<BrowserRouter>
			<Route path="/" component={App} />
		</BrowserRouter>
	</Root>,
	document.getElementById("root")
)
