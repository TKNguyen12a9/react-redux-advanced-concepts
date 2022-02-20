import React, { Component } from "react"
import { connect } from "react-redux"
import * as actions from "actions"
import requireAuth from "./requireAuth"

class CommentBox extends Component {
	state = { comment: "" }

	handleChange = evt => {
		evt.preventDefault()
		this.setState({
			comment: evt.target.value,
		})
	}

	handleSubmit = evt => {
		evt.preventDefault()
		this.props.saveComment(this.state.comment)
		this.setState({
			comment: "",
		})
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<h4>Add comment here</h4>
					<textarea
						onChange={this.handleChange}
						value={this.state.comment}></textarea>
					<div>
						<button>Submit Comment</button>
					</div>
				</form>
				<button
					className="fetch-comments-btn"
					onClick={this.props.fetchComments}>
					Fetch Comments
				</button>
			</div>
		)
	}
}

export default connect(null, actions)(requireAuth(CommentBox))
