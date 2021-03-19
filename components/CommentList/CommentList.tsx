import React, { FC, useState, useRef, useCallback, memo } from "react";
import { Empty, message, Pagination } from "antd";
import Editor, { EditorRef } from "../Editor/Editor";
import CommentItem from "./CommentItem/CommentItem";
import http, { ResponseData } from "../../utils/http/http";
import { useRouter } from "next/router";
import styles from "./CommentList.module.scss";
import { ParentComments, PostCommentParams } from "../../types/comment";

export interface CommentListType {
  commentsData: ParentComments;
  commentCount: number;
  pid: string;
  postUid: string;
}

const CommentList: FC<CommentListType> = memo(
  ({ commentsData, commentCount, pid, postUid }) => {
    const router = useRouter();
    const editorRef = useRef<EditorRef>(null);
    const [comments, setComments] = useState(commentsData);
    const [editorShowCid, setEditorShowCid] = useState("");

    const submitHandle = useCallback(() => {
      const content = editorRef.current.getContent()[1];
      if (!content) {
        message.warning("内容为空！");
        return;
      }
      if (content.length < 1 || content.length > 1024) {
        message.warning("内容必须在1 ~ 1024个字符之间！");
        return;
      }
      const commentData: PostCommentParams = {
        content: editorRef.current.getContent()[1],
      };
      const result = http.post(`/comments/posts/${pid}`, commentData);
      result
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
          if (err?.response.message) {
            message.error(err.response.message);
          }
        });
    }, [pid, router]);

    const pageChangeHandle = useCallback(
      async (page: number, pageSize: number) => {
        try {
          const result = await http.get<ResponseData<ParentComments>>(
            `/comments/posts/${pid}?page=${page}&limit=${pageSize}`
          );
          const statusCode = result.status;
          if (statusCode === 200 && result.data.code === 2000) {
            setComments(result.data.data);
          }
        } catch (error) {
          if (error?.response.message) {
            message.error(error.response.message);
          }
        }
      },
      [pid]
    );

    return (
      <div className={styles["comment-list-box"]}>
        <Editor ref={editorRef} submitHandle={submitHandle} />
        <div className={styles["count-box"]}>{commentCount} 评论</div>
        <div className={styles["list-box"]}>
          {comments.list.length > 0 ? (
            comments.list.map((comment) => {
              return (
                <CommentItem
                  comment={comment}
                  key={comment.cid}
                  postUid={postUid}
                  editorShowCid={editorShowCid}
                  setEditorShowCid={setEditorShowCid}
                />
              );
            })
          ) : (
            <Empty
              className={styles["no-comment"]}
              description="暂无评论，快来发表你的看法吧~"
            />
          )}
        </div>
        {comments.page.count > comments.page.size && (
          <div className={styles["pagination-box"]}>
            <Pagination
              defaultCurrent={1}
              pageSize={comments.page.size}
              total={comments.page.count}
              showSizeChanger={false}
              showQuickJumper={true}
              responsive={true}
              onChange={pageChangeHandle}
            />
          </div>
        )}
      </div>
    );
  }
);

export default CommentList;
