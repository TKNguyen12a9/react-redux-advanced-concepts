import React, { Component } from "react"
import CommentBox from "./CommentBox"
import CommentList from "./CommentList"
import { Route, Link } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "actions"
class App extends Component {
	constructor() {
		super()
		this.handleChangeAuth = this.handleChangeAuth.bind(this)
	}

	renderHeader() {
		return (
			<>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/post">Post A Comment</Link>
					</li>
					<li>{this.renderButton()}</li>
				</ul>
			</>
		)
	}

	renderButton() {
		if (this.props.auth) {
			return <button onClick={this.handleChangeAuth}>Sign Out</button>
		} else {
			return <button onClick={this.handleChangeAuth}>Sign In</button>
		}
	}

	handleChangeAuth() {
		if (this.props.auth) {
			this.props.changeAuth(false)
		} else {
			this.props.changeAuth(true)
		}
	}

	render() {
		return (
			<div className="App" style={{ align: "center" }}>
				{this.renderHeader()}
				<Route path="/post" component={CommentBox} />
				<Route path="/" exact component={CommentList} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
	}
}

export default connect(mapStateToProps, actions)(App)
