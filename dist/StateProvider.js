"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recompose_1 = require("recompose");
exports.StateProvider = function (initialState) {
    return recompose_1.withState('state', 'setState', initialState)(function (props) {
        return props.children ? props.children(props) : null;
    });
};
//# sourceMappingURL=StateProvider.js.map