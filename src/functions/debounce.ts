const debounce = (fn: Function, delay = 100) => {
  let timer: number;

  function debounced(this: unknown, ...args: unknown[]) {
    const context = this;
    const _args = args;

    window.clearTimeout(timer);

    timer = window.setTimeout(() => {
      fn.apply(context, _args);
    }, delay);
  }

  debounced.clear = (): void => {
    window.clearTimeout(timer);
  };

  return debounced;
};

export default debounce;
