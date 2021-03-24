import React, { FC, useState, useRef } from "react";
import { useRouter } from "next/router";
import { message, Pagination } from "antd";
import Editor, { EditorRef } from "../../Editor/Editor";
import Comment from "./Comment/Comment";
import combineClassNames from "../../../utils/combineClassNames";
import http, { ResponseData } from "../../../utils/http/http";
import styles from "./CommentItem.module.scss";
import {
  CommentChildren,
  ParentComment,
  PostCommentParams,
  ReplyTargetInfo,
} from "../../../types/comment";

interface CommentItemProps {
  comment: ParentComment;
  editorShowCid: string;
  postUid: string;
  setEditorShowCid: (editorShowCid: string) => void;
}

const CommentItem: FC<CommentItemProps> = ({
  comment,
  editorShowCid,
  setEditorShowCid,
  postUid,
}) => {
  const router = useRouter();
  const editorRef = useRef<EditorRef>(null);
  const commentRef = useRef<HTMLDivElement>(null);
  const [parentComment, setParentComment] = useState(comment);
  const [placeholder, setPlaceholder] = useState(`@${comment.userName}`);
  const [replyTargetInfo, setReplyTargetInfo] = useState<ReplyTargetInfo>(null);
  const [showShowMore, setShowShowMore] = useState(true);

  const replyCallback = (replyTargetInfo: ReplyTargetInfo) => {
    setEditorShowCid(
      replyTargetInfo.parentCid
        ? replyTargetInfo.parentCid
        : replyTargetInfo.targetCid
    );
    editorRef.current?.clearValue();
    setPlaceholder(`@${replyTargetInfo.targetName}`);
    setReplyTargetInfo(replyTargetInfo);
    setTimeout(() => {
      editorRef.current?.focusHandle();
    });
  };

  const submitHandle = () => {
    if (!replyTargetInfo) {
      message.error("无回复目标，请重试！");
      return;
    }

    const { parentCid, targetCid } = replyTargetInfo;

    const commentData: PostCommentParams = {
      parentCid,
      targetCid,
      content: editorRef.current.getContent()[1],
    };
    http
      .post(`/comments/posts/${replyTargetInfo.pid}`, commentData)
      .then((res) => {
        if (res.status === 201 && res.data.code === 2001) {
          message.success("评论成功，等待管理员审核！");
          editorRef.current && editorRef.current.clearValue();
          setEditorShowCid("");
        } else {
          res.data.message && message.warning(res.data.message);
        }
      })
      .catch((err) => {
        if (err?.request?.status === 401) {
          router.push("/login");
        }
        if (err.response.message) {
          message.error(err.response.message);
        }
      });
  };

  const cancelReply = () => {
    setEditorShowCid("");
  };

  const showMoreHandle = async () => {
    if (!showShowMore) {
      return;
    }

    try {
      const result = await http.get<ResponseData<CommentChildren>>(
        `/comments/posts/${parentComment.pid}/comment/${parentComment.cid}/children?page=1&limit=5`
      );
      const statusCode = result.status;
      if (statusCode === 200 && result.data.code === 2000) {
        setShowShowMore(false);
        const comment = { ...parentComment };
        comment.page = result.data.data.page;
        comment.children = result.data.data.list;
        setParentComment(comment);
        const commentItem = commentRef.current;
        if (commentItem) {
          commentItem.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    } catch (error) {
      if (error?.response.message) {
        message.error(error.response.message);
      }
    }
  };

  const pageChangeHandle = async (page: number, pageSize: number) => {
    try {
      const result = await http.get<ResponseData<CommentChildren>>(
        `/comments/posts/${parentComment.pid}/comment/${parentComment.cid}/children?page=${page}&limit=${pageSize}`
      );
      const statusCode = result.status;
      if (statusCode === 200 && result.data.code === 2000) {
        const comment = { ...parentComment };
        comment.page = result.data.data.page;
        comment.children = result.data.data.list;
        setParentComment(comment);
        const commentItem = commentRef.current;
        if (commentItem) {
          commentItem.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    } catch (error) {
      if (error?.response.message) {
        message.error(error.response.message);
      }
    }
  };

  return (
    <div className={styles["comment-item"]} ref={commentRef}>
      <div className={styles["main-comment"]}>
        <Comment
          comment={parentComment}
          replyCallback={replyCallback}
          postUid={postUid}
        />
      </div>
      <div className={styles["sub-section"]}>
        <div className={styles["comment-children"]}>
          {parentComment.children &&
            parentComment.children.length > 0 &&
            parentComment.children.map((child) => {
              return (
                <Comment
                  comment={child}
                  key={child.cid}
                  replyCallback={replyCallback}
                  postUid={postUid}
                />
              );
            })}
        </div>
        {parentComment.page.count > parentComment.page.size && !showShowMore && (
          <div className={styles["pagination-box"]}>
            <Pagination
              defaultCurrent={1}
              pageSize={parentComment.page.size}
              total={parentComment.page.count}
              showSizeChanger={false}
              showQuickJumper={true}
              size="small"
              onChange={pageChangeHandle}
            />
          </div>
        )}
        {showShowMore && parentComment.page.count > 2 && (
          <div className={styles["show-more-bar"]}>
            共{<b>{parentComment.page.count}</b>}条回复，
            <span className={styles["show-more"]} onClick={showMoreHandle}>
              点击查看
            </span>
          </div>
        )}
        <div
          className={combineClassNames(
            styles["reply-box"],
            editorShowCid === parentComment.cid ? "" : styles.hide
          )}
        >
          <div className={styles["cancel-reply-bar"]}>
            <span className={styles["cancel-reply"]} onClick={cancelReply}>
              收起
            </span>
          </div>
          <Editor
            ref={editorRef}
            placeholder={placeholder}
            submitHandle={submitHandle}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
