import clsx from "clsx";

import styles from "./Spinner.module.css";

const Spinner = ({ text = "Loading", size = "sm", responsive = false }) => {
  return (
    <div
      className={clsx(styles.container, styles[size], {
        [styles.free]: responsive,
      })}
    >
      {text && <p className={styles.text}>{text}</p>}
      <svg
        version="1.1"
        baseProfile="tiny"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="28px"
        height="28px"
        viewBox="0 0 28 28"
        overflow="auto"
        xmlSpace="preserve"
        className={styles.loader}
      >
        <path
          className={styles.trail}
          fill="#F2F2F2"
          d="M20.827,7.024c-2.512-2.512-6.207-3.507-9.646-2.599l0.442,1.668c2.844-0.751,5.904,0.073,7.982,2.152
	c3.231,3.23,3.231,8.487,0.001,11.718c-3.231,3.23-8.487,3.303-11.718,0.073c-1.426-1.427-2.27-3.225-2.404-5.225H3.755
	c0.137,2,1.162,4.694,2.913,6.444c1.951,1.951,4.515,2.891,7.079,2.891s5.128-0.993,7.08-2.944
	C24.731,17.299,24.731,10.929,20.827,7.024z"
        />
        <g>
          <polygon
            className={styles.planeInnerBody}
            points="5.253,7.828 3.692,15.821 5.253,18.461 6.812,15.821 	"
          />
          <g>
            <path
              className={styles.planeBody}
              d="M5.253,7.966c0,0-5.056,8.846-5,8.846c0.055,0,3.935,0,3.935,0L5.253,7.966z"
            />
            <path
              className={styles.planeBody}
              d="M5.253,7.968c0,0,5.056,8.845,5,8.845s-3.936,0-3.936,0L5.253,7.968z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Spinner;
