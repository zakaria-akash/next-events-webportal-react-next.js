import React from "react";

import classes from "./comment-list.module.css";

const CommentList = (props) => {
  const { items } = props;
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {Array.isArray(items) ? (
        items.map((item) => {
          return (
            <li key={item._id}>
              <p>{item.text}</p>
              <div>
                By{" "}
                <address>
                  "{item.name} ({item.email})"
                </address>
              </div>
            </li>
          );
        })
      ) : (
        <li className="center">Error in loading comments...</li>
      )}
    </ul>
  );
};

export default CommentList;
