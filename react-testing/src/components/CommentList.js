import React, { Component } from "react"
import { connect } from "react-redux"
import commentReducer from "reducers/comment"

class CommentList extends Component {
	renderCommentList() {
		return this.props.commentList.map(comment => (
			<li key={comment}>{comment}</li>
		))
	}

	render() {
		return (
			<div>
				<h4>Comment List</h4>
				<ul>{this.renderCommentList()}</ul>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { commentList: state.commentList }
}

export default connect(mapStateToProps)(CommentList)
