import dayjs from "../dayjs/dayjs";

interface LicenseOptions {
  title: string;
  author: string;
  authorUrl: string;
  postLink: string;
  createTime: string;
}

export const genLicenceHTMLString = (options: LicenseOptions) => {
  return `
  <div>
    <ul style="margin: 20px 0 0; padding: 6px 12px;border-left: 4px solid var(--theme-color);
    background-color: var(--background-color-second);list-style: none; color: var(--font-color-second);
    line-height: 1.8">
      <li>
        <strong style="color: var(--font-color)">本文标题：</strong> ${
          options.title
        }
      </li>
      <li>
        <strong style="color: var(--font-color)">本文作者: </strong> <a href="${
          options.authorUrl
        }" target="__blank">${options.author}</a>
      </li>
      <li>
        <strong style="color: var(--font-color)">本文链接：</strong> <a href="${
          options.postLink
        }" target="__blank">${options.postLink}</a>
      </li>
      <li>
        <strong style="color: var(--font-color)">发布于：</strong> ${dayjs(
          options.createTime
        ).format("YYYY-MM-DD")}
      </li>
      <li>
        <strong style="color: var(--font-color)">许可协议：</strong> 
        本博客所有文章除特别声明外，均采用 
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="__blank">CC BY-NC-SA 4.0</a> 
        许可协议。转载或引用本文时请遵守许可协议，注明出处、不得用于商业用途！
      </li>
    </ul>
  </div>
`;
};
