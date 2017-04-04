let matches = (document.documentElement.matches || document.documentElement.matchesSelector || document.documentElement.oMatchesSelector || document.documentElement.msMatchesSelector || document.documentElement.mozMatchesSelector || document.documentElement.webkitMatchesSelector);
export default (selector, containerElement) => matches.call(containerElement, selector);
