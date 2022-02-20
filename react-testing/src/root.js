import React from "react"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import reducers from "reducers"
import async, {
	thunk,
	logger,
	crashReporter,
	readyStatePromise,
	vanillaPromise,
} from "middlewares/async"
import stateValidator from "middlewares/stateValidator"

// utility component to handle Redux-used components in testing
export default function Root({ children, initialState = {} }) {
	const store = createStore(
		reducers,
		initialState,
		applyMiddleware(
			async,
			readyStatePromise,
			vanillaPromise,
			thunk,
			logger,
			crashReporter,
			stateValidator
		) // this helps in making network request + stateValidator to validate states
	)
	return <Provider store={store}>{children}</Provider>
}
