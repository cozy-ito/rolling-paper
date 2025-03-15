import React from "react";

import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

import Logo from "../../assets/icons/logo.svg";
import { ROUTES } from "../../constants/routes";

import styles from "./Header.module.css";

const Header = ({ visibleOn = ALL_BREAKPOINTS }) => {
  const { pathname } = useLocation();
  const showCreateButton = ROUTES_WITH_CREATE_BUTTON.includes(pathname);

  return (
    <ResponsiveElement visibleOn={visibleOn}>
      <div className={styles.innerContainer}>
        <Link to={ROUTES.HOME}>
          <img src={Logo} alt="로고" />
        </Link>
        {showCreateButton && (
          <Link to={ROUTES.POST}>
            <button className={styles.button}>롤링 페이퍼 만들기</button>
          </Link>
        )}
      </div>
    </ResponsiveElement>
  );
};

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

const BREAKPOINTS = {
  DESKTOP: "desktop",
  TABLET: "tablet",
  MOBILE: "mobile",
};

const ALL_BREAKPOINTS = Object.values(BREAKPOINTS);
const ROUTES_WITH_CREATE_BUTTON = [ROUTES.HOME, ROUTES.LIST];

export default Header;
