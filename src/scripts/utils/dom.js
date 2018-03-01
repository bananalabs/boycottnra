// Creates a DOM element and appends it to it's parent
export function addElement(type, props, parent) {
    let elem = document.createElement(type);
    for (let prop in props) {
      elem[prop] = props[prop];
    }
    parent.appendChild(elem);
    return elem;
}