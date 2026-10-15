// Data a page needs on first render (an article's text), so the pre-rendered HTML and the
// browser's first render match. The build step fills it; the page HTML carries it to the browser.
let store = (typeof window !== "undefined" && window.__PRELOAD__) || {};

export const setPreloaded = (data) => {
  store = data;
};

export const getPreloaded = (key) => store[key];
