import React, { FC, memo, useEffect, useMemo, useRef } from "react";
import Parallax from "parallax-js";
import { defaultImg } from "../../utils/lazyLoad/imgUrl";
import { useRouter } from "next/router";
import dayjs from "../../utils/dayjs/dayjs";
import styles from "./Banner.module.scss";
import { PostItem } from "../../types/post";
import NavBar from "../NavBar/NavBar";

interface BannerProps {
  post: PostItem;
}

const Banner: FC<BannerProps> = memo(({ post }) => {
  const router = useRouter();
  const imageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (imageRef.current) {
      const scene = imageRef.current;
      new Parallax(scene);
    }
  }, []);

  const customLogoStyles = useMemo(
    () => ({ color: "var(--banner-font-color)" }),
    []
  );

  const customControlItemStyles = useMemo(
    () => ({ backgroundColor: "var(--banner-font-color)" }),
    []
  );

  return (
    <div className={styles.banner}>
      <div className={styles["parallax-box"]} ref={imageRef}>
        <div className={styles["image-box"]} data-depth="0.4">
          <img
            alt="cover"
            src={defaultImg}
            data-src={post.cover}
            className={styles.image}
          />
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
        <p className={styles.date}>
          {dayjs(post.createTime).format("MMMM DD, YYYY")}
        </p>
        <h2
          className={styles.title}
          onClick={() => {
            router.push(`/posts/${post.pid}`);
          }}
        >
          {post.title}
        </h2>
        <p className={styles.preview}>{post.summary}</p>
      </div>
      <NavBar
        logoStyles={customLogoStyles}
        controlItemStyles={customControlItemStyles}
      />
    </div>
  );
});

export default Banner;
