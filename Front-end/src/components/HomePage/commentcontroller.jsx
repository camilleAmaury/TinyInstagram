import React, { Component } from "react";
import Comment from './comment';

export default class CommentController extends Component {
    
    render() {
        return (
            <>
                <div className="poster-comment"></div>
                <div className="post-comments">
                    {this.props.comments.map((comment, i) => <Comment key={i} user={comment.user} comment={comment.comment} />)}
                </div>
            </>
        );
    }
}