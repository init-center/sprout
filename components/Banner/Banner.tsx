import React, { FC, useEffect, useRef } from "react";
import Parallax from "parallax-js";
import { BarsOutlined, CloseOutlined } from "@ant-design/icons";
import combineClassNames from "../../utils/combineClassNames";
import styles from "./Banner.module.scss";

interface BannerProps {
  isMenuShow: boolean;
  toggleIsMenuShow: (isMenuShow: boolean) => void;
}

const Banner: FC<BannerProps> = ({ isMenuShow, toggleIsMenuShow }) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      const scene = imageRef.current;
      new Parallax(scene);
    }
  }, []);

  return (
    <div className={styles.banner}>
      <div className={styles["parallax-box"]} ref={imageRef}>
        <div className={styles["image-box"]} data-depth="0.4">
          <div className={styles.image}></div>
        </div>
      </div>
      <div className={styles.layer}></div>
      <svg
        className={styles.mask}
        viewBox="0 0 2880 1620"
        preserveAspectRatio="xMaxYMax slice"
      >
        <polygon
          className={styles.polygon}
          opacity="0.7"
          points="2000,1620 0,1620 0,0 600,0 "
        />
      </svg>
      <div className={styles.post0}>
        <p className={styles.date}>十一月 24, 2018</p>
        <h2 className={styles.title}>你走了真好，不然总担心你要走</h2>
        <p className={styles.preview}>
          最近一次苏晴产生离婚的想法，是两个月以前，天桥下买煎饼的时候，老公掏零钱，不小心从裤兜里掉落一...
        </p>
      </div>
      <div className={styles.navbar}>
        <div className={combineClassNames(styles.logo, isMenuShow ? styles.ms : "")}>Sprout</div>
        <div
          className={styles["menu-show"]}
          onClick={(): void => {
            toggleIsMenuShow(!isMenuShow);
          }}
        >
          {isMenuShow ? <CloseOutlined /> : <BarsOutlined />}
        </div>
      </div>
    </div>
  );
};

export default Banner;
