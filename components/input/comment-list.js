import React from "react";

import classes from "./comment-list.module.css";

const CommentList = (props) => {
  const { items } = props;
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map((item) => {
        return (
          <li key={item.id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
