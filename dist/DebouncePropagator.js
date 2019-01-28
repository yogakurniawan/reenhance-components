"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recompose_1 = require("recompose");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
exports.DebouncePropagator = function (loadingProps) {
    return recompose_1.componentFromStream(function (props$) {
        var debounced$ = rxjs_1.from(props$)
            .pipe(operators_1.debounce(function (p) { return rxjs_1.timer(p.time); }), operators_1.startWith(loadingProps));
        return rxjs_1.combineLatest(props$, debounced$, function (props, debounced) {
            return props.children(debounced);
        });
    });
};
//# sourceMappingURL=DebouncePropagator.js.map