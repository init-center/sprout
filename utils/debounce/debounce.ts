export const debounce = (func: (...args: unknown[]) => unknown, wait = 500) => {
  let timer: ReturnType<typeof setTimeout> = null;
  return function (...args: unknown[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};
