import React, { Component } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';

import Comment from './comment.component';

export default class CommentController extends React.Component {
    render() {
        return (
            <>
                <div className="poster-comment"></div>
                <div className="post-comments">
                    {this.props.comments.map((comment) => <Comment user={comment.user} comment={comment.comment} />)}
                </div>
            </>
        );
    }
}