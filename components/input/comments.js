import React, { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import NotificationContext from "../../store/notification-context";

import classes from "./comments.module.css";

const Comments = (props) => {
  const { eventId } = props;

  const NotificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    setIsFetchingComments(true);
    if (showComments) {
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    NotificationCtx.showNotification({
      title: "Sending comment...",
      message: "Submitting your comment is on process.",
      status: "pending",
    });
    // send data to API
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        }
      })
      .then((data) => {
        NotificationCtx.showNotification({
          title: "Submitted!",
          message: data.comment.text,
          status: "success",
        });
      })
      .catch((err) => {
        NotificationCtx.showNotification({
          title: "Error!",
          message: "Failed to post data to the server!",
          status: "error",
        });
      });
  }
  //console.log(data.comment.text)
  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && (
        <h3 className="center">Loading...</h3>
      )}
    </section>
  );
};

export default Comments;
