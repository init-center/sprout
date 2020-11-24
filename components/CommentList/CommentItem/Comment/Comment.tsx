import React, { FC } from "react";
import md2html from "../../../../utils/md2html";
import combineClassNames from "../../../../utils/combineClassNames";
import dayjs from "../../../../utils/dayjs/dayjs";
import styles from "./Comment.module.scss";
import mdStyles from "../../../../styles/mdStyle.module.scss";

interface BaseComment {
  pid: number;
  cid: string;
  uid: string;
  userName: string;
  avatar: string;
  createTime: string;
  updateTime: string;
  deleteTime: string;
  content: string;
}

export interface ChildComment extends BaseComment {
  parentCid: string;
  parentUid: string;
  targetCid: string;
  targetUid: string;
  targetName: string;
}

export interface ParentComment extends BaseComment {
  page: Page;
  children: ChildComment[];
}

export interface Page {
  count: number;
  currentPage: number;
  size: number;
}

export interface ParentComments {
  page: Page;
  list: ParentComment[];
}

export interface ReplyTargetInfo {
  pid: number;
  parentCid: string;
  targetCid: string;
  targetName: string;
}

export interface PostCommentParams {
  targetCid?: string;
  targetUid?: string;
  parentCid?: string;
  parentUid?: string;
  content: string;
}

interface CommentProps {
  comment: ChildComment | ParentComment;
  postUid: string;
  replyCallback: (replyTargetInfo: ReplyTargetInfo) => unknown;
}

const Comment: FC<CommentProps> = ({ comment, replyCallback, postUid }) => {
  return (
    <div className={styles["comment"]}>
      <img
        className={styles["comment-avatar"]}
        src={comment.avatar}
        alt="avatar"
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
          >
            {comment.userName}
          </span>
          {"targetUid" in comment && "targetName" in comment ? (
            <span className={styles["reply-target"]}>
              回复&nbsp;
              <span
                className={combineClassNames(
                  styles.name,
                  comment.targetUid === postUid ? styles["is-blogger"] : ""
                )}
                title={`${comment.targetName}${
                  comment.targetUid === postUid ? " (博主)" : ""
                }`}
              >
                {comment.targetName}
              </span>
            </span>
          ) : null}
        </div>
        <div className={styles["comment-meta"]}>
          <span className={styles.time}>
            {dayjs.tz(comment.createTime).format("YYYY/MM/DD HH:mm")}
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
      </div>
    </div>
  );
};

export default Comment;
