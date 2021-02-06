/**
 * Function for create html element
 * 
 * @param {string} tag
 * @param {string[]} classes - optional
 * @param {string} text - optional
 */
const createElem = (tag, classes = [], text = '') => {
  const elem = document.createElement(tag);

  if (classes.length > 0) {
    elem.classList.add(...classes);
  }

  if (text.trim() !== '') {
    elem.textContent = text;
  }

  return elem;
};

export default createElem;
