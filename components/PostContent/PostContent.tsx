import React, { FC, memo } from "react";
import combineClassNames from "../../utils/combineClassNames";
import styles from "./PostContent.module.scss";
import mdStyles from "../../styles/mdStyle.module.scss";
import md2html from "../../utils/md2html/md2html";
import { genLicenceHTMLString } from "../../utils/genLicenceHTMLString/genLicenceHTMLString";
import { PostDetail } from "../../types/post";
import {
  DEFAULT_AUTHOR_URL,
  DEFAULT_WEBSITE_URL,
} from "../../constants/defaultConfig";
import { useSelector } from "react-redux";
import { StateType } from "../../store";
import { ConfigItem } from "../../types/config";
import { AUTHOR_URL_KEY, WEBSITE_URL_KEY } from "../../constants/configKey";

interface PostContentProps {
  post: PostDetail;
}

const areEqual = function () {
  return true;
};

const PostContent: FC<PostContentProps> = memo(({ post }) => {
  const authorUrl = useSelector<StateType, ConfigItem>(
    (state) => state.configs[AUTHOR_URL_KEY]
  );
  const websiteUrl = useSelector<StateType, ConfigItem>(
    (state) => state.configs[WEBSITE_URL_KEY]
  );
  return (
    <div
      className={combineClassNames(styles.content, mdStyles["md-box"])}
      dangerouslySetInnerHTML={{
        __html:
          md2html(post.content, true).htmlContent +
          genLicenceHTMLString({
            title: post.title,
            author: post.userName,
            authorUrl: authorUrl?.value ?? DEFAULT_AUTHOR_URL,
            postLink: `${websiteUrl?.value ?? DEFAULT_WEBSITE_URL}/posts/${
              post.pid
            }`,
            createTime: post.createTime,
          }),
      }}
    ></div>
  );
}, areEqual);

export default PostContent;
