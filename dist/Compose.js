"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.Compose = function (props) {
    var renderProps = [];
    var cmps = props.children.slice();
    var render = cmps.pop();
    if (!render) {
        return null;
    }
    cmps = cmps.reverse();
    var renderFn = function () {
        if (!(render instanceof Function)) {
            return render;
        }
        return render.apply(void 0, renderProps);
    };
    var resultFn = cmps.reduce(function (prevFn, el) {
        return function () { return React.cloneElement(el, el.props, function (props) {
            renderProps.push(props);
            return prevFn();
        }); };
    }, renderFn);
    return resultFn();
};
//# sourceMappingURL=Compose.js.map