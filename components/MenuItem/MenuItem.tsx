import React, { FC } from "react";
import { Title, TitleChildrenIdMap } from "../../utils/md2html";
import combineClassNames from "../../utils/combineClassNames";
import styles from "./MenuItem.module.scss";

interface MenuItemProps {
  index: string;
  title: Title;
  depth: number;
  maxDepth?: number;
  activeTitleId?: string;
  titleChildrenIdMap?: TitleChildrenIdMap;
}

function judgeHighlight(
  titleChildrenIdMap: TitleChildrenIdMap,
  activeTitleId: string,
  selfId: string
) {
  if (activeTitleId === selfId) {
    return true;
  }
  if (titleChildrenIdMap[selfId]?.includes(activeTitleId)) {
    return true;
  }
  return false;
}

const MenuItem: FC<MenuItemProps> = ({
  index,
  title,
  depth,
  maxDepth = 3,
  activeTitleId = "",
  titleChildrenIdMap = {},
}) => {
  return (
    <div className={styles["menu-item"]}>
      <a
        className={combineClassNames(
          styles["item-parent"],
          judgeHighlight(titleChildrenIdMap, activeTitleId, title.id)
            ? styles.active
            : ""
        )}
        href={`#${title.id}`}
      >
        <span className={styles.index}>{index}</span>
        <span className={styles.title}>{title.text}</span>
      </a>
      {title.children.length > 0 && depth < maxDepth && (
        <div
          className={combineClassNames(
            styles["item-children"],
            judgeHighlight(titleChildrenIdMap, activeTitleId, title.id)
              ? ""
              : styles["children-hidden"]
          )}
        >
          {title.children.map((child, idx) => {
            return (
              <MenuItem
                index={`${index}${idx + 1}.`}
                title={child}
                depth={depth + 1}
                key={child.id}
                activeTitleId={activeTitleId}
                titleChildrenIdMap={titleChildrenIdMap}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
