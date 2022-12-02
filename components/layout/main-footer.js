import React from "react";

import classes from "./main-footer.module.css";

const MainFooter = () => {
  return (
    <footer className={classes.footer}>
      <nav>
        <ul className={classes.footer__links}>
          <li className={classes.footer__link}>
            <a href="#">Support</a>
          </li>
          <li className={classes.footer__link}>
            <a href="#">Terms of Use</a>
          </li>
        </ul>
      </nav>
      <div className={classes.copyright}>
        <ul className={classes.footer__links}>
          <li className={classes.footer__link}>
            <a href="https://github.com/zakaria-akash" target="_blank">
              &copy; Zakaria Ibrahim 2022
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default MainFooter;
