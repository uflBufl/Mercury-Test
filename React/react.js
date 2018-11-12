window.React = (function() {
  function isFunction(element) {
    return typeof element === "function";
  }

  function isClass(element) {
    return /class[\s]/.test(element.toString());
  }

  function isString(element) {
    return typeof element === "string";
  }

  function isObject(element) {
    return typeof element === "object";
  }

  function createElement(element, props, ...children) {
    if (isClass(element)) {
      const instance = new element(props);
      return instance.render();
    }

    if (isFunction(element)) {
      return element(props);
    }

    if (isString(element)) {
      const domNode = document.createElement(element);

      if (props) {
        Object.keys(props).forEach(propName => {
          if (/^on.*$/.test(propName)) {
            domNode.addEventListener(
              propName.substring(2).toLowerCase(),
              props[propName]
            );
          } else {
            domNode[propName] = props[propName];
          }
        });
      }

      children.forEach(function(child) {
        if (isObject(child)) {
          domNode.appendChild(child);
        } else {
          domNode.innerHTML = domNode.innerHTML + child;
        }
      });

      return domNode;
    }
  }

  class Component {
    constructor(props) {
      this.props = props;
    }
  }

  return {
    createElement,
    Component
  };
})();

window.ReactDOM = (function() {
  function render(element, domNode) {
    domNode.appendChild(element);
  }

  return {
    render
  };
})();
