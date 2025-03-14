import React from "react";

import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

import Logo from "../../assets/icons/logo.svg";

import styles from "./Header.module.css";

const BREAKPOINTS = {
  DESKTOP: "desktop",
  TABLET: "tablet",
  MOBILE: "mobile",
};

const ALL_BREAKPOINTS = Object.values(BREAKPOINTS);

const ResponsiveElement = ({ children, visibleOn = ALL_BREAKPOINTS }) => {
  const hiddenOnDesktop = !visibleOn.includes(BREAKPOINTS.DESKTOP);
  const hiddenOnTablet = !visibleOn.includes(BREAKPOINTS.TABLET);
  const hiddenOnMobile = !visibleOn.includes(BREAKPOINTS.MOBILE);

  return (
    <div
      className={clsx(styles.container, {
        [styles.hiddenOnDesktop]: hiddenOnDesktop,
        [styles.hiddenOnTablet]: hiddenOnTablet,
        [styles.hiddenOnMobile]: hiddenOnMobile,
      })}
    >
      {children}
    </div>
  );
};

const showButtonPageList = ["/", "/list"];

const Header = ({ visibleOn = ALL_BREAKPOINTS }) => {
  const { pathname } = useLocation();
  const isShow = showButtonPageList.includes(pathname);

  return (
    <ResponsiveElement visibleOn={visibleOn}>
      <div className={styles.innerContainer}>
        <Link to="/">
          <img src={Logo} alt="로고" />
        </Link>
        {isShow && (
          <Link to="/post">
            <button className={styles.button}>롤링 페이퍼 만들기</button>
          </Link>
        )}
      </div>
    </ResponsiveElement>
  );
};

export default Header;
