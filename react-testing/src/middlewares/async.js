// Note: version 1 (ES6)
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ dispatch }) =>
	next =>
	action => {
		// debugger
		/**
		 * check to see if the action
		 * has a promise on its payload property.
		 * If it does, then wait for it to resolve
		 * If it doesn't, then send the action on to the next middleware
		 */
		if (!action.payload || !action.payload.then) {
			return next(action)
		}

		// we want to wait for promise to resolve(get its data)
		// and then create a new action with that data and dispatch it
		action.payload.then(response => {
			const newAction = { ...action, payload: response }
			dispatch(newAction)
		})
	}

// Note: version 2
/**
 * @param  {} {dispatch}
 *@ logs all actions and states after they are dispatched
 */
export const logger = store => next => action => {
	console.group(action.type)
	console.info("dispatching", action)
	let result = next(action)
	console.log("next state", store.getState())
	console.groupEnd()
	return result
}

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
export const crashReporter = store => next => action => {
	try {
		return next(action)
	} catch (err) {
		console.error(`catch on exception ${err}`)
		throw err
	}
}

/**
 * Lets you dispatch promises in addition to actions.
 * If the promise is resolved, its result will be dispatched as an action.
 * The promise is returned from `dispatch` so the caller may handle rejection.
 */
export const vanillaPromise = store => next => action => {
	if (typeof action.then !== "function") {
		return next(action)
	}

	return Promise.resolve(action).then(store.dispatch)
}

/**
 * Lets you dispatch special actions with a { promise } field.
 *
 * This middleware will turn them into a single action at the beginning,
 * and a single success (or failure) action when the `promise` resolves.
 *
 * For convenience, `dispatch` will return the promise so the caller can wait.
 */
export const readyStatePromise = store => next => action => {
	if (!action.promise) {
		return next(action)
	}

	function makeAction(ready, data) {
		const newAction = Object.assign({}, action, { ready }, data)
		delete newAction.promise
		return newAction
	}

	next(makeAction(false))
	return action.promise.then(
		result => next(makeAction(true, { result })),
		error => next(makeAction(true, { error }))
	)
}

/**
 * Lets you dispatch a function instead of an action.
 * This function will receive `dispatch` and `getState` as arguments.
 *
 * Useful for early exits (conditions over `getState()`), as well
 * as for async control flow (it can `dispatch()` something else).
 *
 * `dispatch` will return the return value of the dispatched function.
 */
export const thunk = store => next => action =>
	typeof action === "function"
		? action(store.dispatch, store.getState)
		: next(action)
