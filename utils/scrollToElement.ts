export const scrollToElement = (elem: Element) => {
  if (!elem) return;
  const top = elem.getBoundingClientRect().top;
  const scrollTop = document.documentElement.scrollTop;
  window.scrollTo({
    left: 0,
    top: top + scrollTop,
    behavior: "smooth",
  });
};
