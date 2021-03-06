import React, { FC, memo } from "react";
import md2html from "../../../../utils/md2html/md2html";
import combineClassNames from "../../../../utils/combineClassNames";
import dayjs from "../../../../utils/dayjs/dayjs";
import styles from "./Comment.module.scss";
import mdStyles from "../../../../styles/mdStyle.module.scss";
import {
  ChildComment,
  ParentComment,
  ReplyTargetInfo,
} from "../../../../types/comment";
import { useRouter } from "next/router";

interface CommentProps {
  comment: ChildComment | ParentComment;
  postUid: string;
  replyCallback: (replyTargetInfo: ReplyTargetInfo) => unknown;
}

const Comment: FC<CommentProps> = memo(
  ({ comment, replyCallback, postUid }) => {
    const router = useRouter();

    return (
      <div
        className={styles["comment"]}
        id={comment.cid}
        data-cid={comment.cid}
      >
        <img
          className={styles["comment-avatar"]}
          src={comment.avatar}
          alt="avatar"
          onClick={() => {
            router.push(`/users/${comment.uid}`);
          }}
        />
        <div className={styles["comment-info"]}>
          <div className={styles["comment-header"]}>
            <span
              className={combineClassNames(
                styles.name,
                comment.uid === postUid ? styles["is-blogger"] : ""
              )}
              title={`${comment.userName}${
                comment.uid === postUid ? " (博主)" : ""
              }`}
              onClick={() => {
                router.push(`/users/${comment.uid}`);
              }}
            >
              {comment.userName}
            </span>
            {"targetUid" in comment && "targetName" in comment ? (
              <span className={styles["reply-target"]}>
                {` -> `}
                <span
                  className={combineClassNames(
                    styles.name,
                    comment.targetUid === postUid ? styles["is-blogger"] : ""
                  )}
                  title={`${comment.targetName}${
                    comment.targetUid === postUid ? " (博主)" : ""
                  }`}
                  onClick={() => {
                    router.push(`/users/${comment.targetUid}`);
                  }}
                >
                  {comment.targetName}
                </span>
              </span>
            ) : null}
          </div>
          <div className={styles["comment-meta"]}>
            <span className={styles.time}>
              {dayjs(new Date(comment.createTime)).format("YYYY/MM/DD HH:mm")}
            </span>
            <span
              className={styles.reply}
              onClick={() => {
                let replyTargetInfo: ReplyTargetInfo;
                if ("parentCid" in comment) {
                  replyTargetInfo = {
                    pid: comment.pid,
                    parentCid: comment.parentCid,
                    targetCid: comment.cid,
                    targetName: comment.userName,
                  };
                } else {
                  replyTargetInfo = {
                    pid: comment.pid,
                    parentCid: comment.cid,
                    targetCid: comment.cid,
                    targetName: comment.userName,
                  };
                }

                replyCallback(replyTargetInfo);
              }}
            >
              回复
            </span>
          </div>
          <div
            className={combineClassNames(
              styles["comment-content"],
              mdStyles["md-box"]
            )}
            dangerouslySetInnerHTML={{
              __html: md2html(comment.content, false).htmlContent,
            }}
          ></div>
          <div className={styles["ua-info"]}>
            {`${comment.browser ? comment.browser : "未知浏览器"} ${
              comment.os ? `| ${comment.os}` : ""
            }`}
          </div>
        </div>
      </div>
    );
  }
);

export default Comment;
