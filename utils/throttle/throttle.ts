const throttle = (fn: (...args: unknown[]) => unknown, delay = 60) => {
  let lastTime = Date.now();
  return function (...args: unknown[]) {
    const now = Date.now();
    if (now - lastTime > delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
};

export default throttle;
