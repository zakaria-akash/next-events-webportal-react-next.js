import React, { useContext, useRef } from "react";

import NotificationContext from "../../store/notification-context";

import classes from "./newsletter-registration.module.css";

const NewsletterRegistration = () => {
  const emailInputRef = useRef();

  const NotificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    NotificationCtx.showNotification({
      title: "Signing up...",
      message: "Registration for newsletter update is on process.",
      status: "pending",
    });

    fetch("/api/newsletter-registration.api", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
      }),
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
      .then((data) =>
        NotificationCtx.showNotification({
          title: "Submitted!",
          message: data.message,
          status: "success",
        })
      )
      .catch((err) => {
        NotificationCtx.showNotification({
          title: "Error!",
          message: "Failed to post data to the server!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
