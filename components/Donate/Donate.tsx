import React, { FC, memo, useCallback, useState } from "react";
import { Image } from "antd";
import styles from "./Donate.module.scss";
import { scrollToElement } from "../../utils/scrollToElement";

interface DonateProps {
  inGlobalPage?: boolean;
}

export const Donate: FC<DonateProps> = memo(({ inGlobalPage = false }) => {
  const [qrBoxShow, setQrBoxShow] = useState(false);

  const toggleQrBoxShow = useCallback(() => {
    setQrBoxShow(!qrBoxShow);
    setTimeout(() => {
      const qrBox = document.querySelector(`.${styles["donate-qr-box"]}`);
      if (qrBox) {
        scrollToElement(qrBox);
      }
    });
  }, [qrBoxShow]);

  return (
    <div className={styles["donate-bar"]}>
      <p className={styles["donate-caption"]}>
        {`${
          inGlobalPage ? "本博客" : "这篇文章"
        }对你有帮助吗？可以考虑打赏作者以支持我的创作！`}
      </p>
      <button className={styles["donate-btn"]} onClick={toggleQrBoxShow}>
        打赏
      </button>
      {qrBoxShow && (
        <div className={styles["donate-qr-box"]}>
          <div className={styles["qr-item"]}>
            <Image
              className={styles["qr-image"]}
              src="https://static.init.center/sprout/donate-qr/wechat.png"
              alt="微信支付"
            />
            <p className={styles.name}>微信支付</p>
          </div>
          <div className={styles["qr-item"]}>
            <Image
              className={styles["qr-image"]}
              src="https://static.init.center/sprout/donate-qr/alipay.jpg"
              alt="支付宝"
            />
            <p className={styles.name}>支付宝</p>
          </div>
          <p className={styles["donate-tips"]}>
            扫码打赏时请备注您的昵称，以便我将您的信息添加到打赏列表！
          </p>
          <p className={styles["donate-tips"]}>
            为防止低金额捣乱，只添加一元及以上的打赏，望理解！
          </p>
          <p className={styles["donate-tips"]}>真的非常感谢！</p>
        </div>
      )}
    </div>
  );
});
