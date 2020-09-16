import marked, { Renderer } from "marked";
import hljs from "highlight.js";

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;
type Title = {
  level: TitleLevel;
  text: string;
  id: string;
  children: Title[];
};

//封装解析标题的函数
function pushTitle(
  level: TitleLevel,
  text: string,
  index: number,
  array: Title[]
): void {
  //如果数组内没有内容，则直接插入
  if (array.length === 0) {
    array.push({
      level: level,
      text: text,
      id: `${text}_${index}`,
      children: [],
    });
    return;
  }
  //如果数组不为空，则与数组的最后一个对象中的level比较
  //如果比最后一个大
  if (level > array[array.length - 1].level) {
    //如果比子节点对象的level只大一，那么就直接插入它的子数组
    if (level - array[array.length - 1].level === 1) {
      array[array.length - 1].children.push({
        level: level,
        text: text,
        id: `${text}_${index}`,
        children: [],
      });
    } else {
      //如果不止大一，则递归，直到找到一个空的子数组或者刚好比它小一的子对象
      pushTitle(level, text, index, array[array.length - 1].children);
    }
  } else {
    //比最后一个小或者一样大，那么说明这个标题是和这个数组中的标题一样大的标题或者比它更大，
    //这时不管是不是输入错误都直接push一个与之并列的即可
    array.push({
      level: level,
      text: text,
      id: `${level}_${text}_${index}`,
      children: [],
    });
  }
}

export default function (
  mdString: string,
  getTitle = true
): { htmlContent: string; titles: Title[] } {
  const renderer = new Renderer();

  const titleArr: Title[] = [];

  if (getTitle) {
    let index = 0;
    renderer.heading = function (text, level): string {
      //使用上面定义的分析标题函数
      pushTitle(level, text, index, titleArr);

      //返回标题格式
      return `<h${level} id="${level}_${text}_${index++}">${text}</h${level}>`;
    };
  }

  marked.setOptions({
    highlight: function (code) {
      return hljs ? hljs.highlightAuto(code).value : code;
    },
    gfm: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  });
  return {
    htmlContent: marked(mdString, { renderer: renderer }),
    titles: titleArr,
  };
}
