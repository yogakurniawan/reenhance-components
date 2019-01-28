"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recompose_1 = require("recompose");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
exports.AsyncResolver = function (distinctKey, initialProps) {
    if (distinctKey === void 0) { distinctKey = 'subject'; }
    return recompose_1.componentFromStream(function (props$) {
        var subject$ = rxjs_1.from(props$)
            .pipe(operators_1.distinctUntilKeyChanged(distinctKey), operators_1.flatMap(function (props) { return props.subject(props); }), operators_1.startWith(initialProps));
        return rxjs_1.combineLatest(props$, subject$, function (props, subject) {
            return props.children(subject);
        });
    });
};
//# sourceMappingURL=AsyncResolver.js.map