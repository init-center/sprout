import { useRouter } from "next/router";
import React, { FC, memo } from "react";
import { Tag } from "../../types/tag";
import styles from "./TagList.module.scss";

interface TagListProps {
  list: Tag[];
}

const TagList: FC<TagListProps> = memo(({ list }) => {
  const router = useRouter();
  return (
    <ul className={styles.list}>
      {list.map((tag) => (
        <li
          className={styles.tag}
          key={tag.id}
          onClick={() => {
            router.push(`${router.pathname}/${tag.name}`);
          }}
        >
          #{tag.name}
          <sup className={styles.sup}>{tag.postCount}</sup>
        </li>
      ))}
    </ul>
  );
});

export default TagList;
