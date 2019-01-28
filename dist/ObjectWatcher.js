"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var recompose_1 = require("recompose");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
// ProxeeHandler<T extends object, TOut extends object>
var makeWatchProxy = function (targetObject, subject$, watchProps) {
    return new Proxy(targetObject, {
        set: function (target, name, value) {
            var prevValue = target[name];
            target[name] = value;
            if (Array.isArray(watchProps) ? watchProps.includes(name) : name === watchProps) {
                subject$.next({ name: name, prevValue: prevValue, newValue: value });
            }
            return true;
        },
        get: function (target, name) { return target[name]; },
    });
};
exports.ObjectWatcher = function (targetObject, watchProps) {
    var observation$ = new rxjs_1.BehaviorSubject(null);
    var proxy = makeWatchProxy(targetObject, observation$, watchProps);
    return recompose_1.componentFromStream(function (props$) {
        var change$ = rxjs_1.from(props$).pipe(operators_1.distinctUntilKeyChanged('onChange'), operators_1.switchMapTo(observation$, function (props, obs) {
            props.onChange && obs && props.onChange(obs.newValue, obs.prevValue, obs.name);
            return props;
        }));
        return rxjs_1.combineLatest(props$, observation$, change$, function (props, obs, _) {
            return props.children ? props.children(proxy) : React.createElement(React.Fragment);
        });
    });
};
//# sourceMappingURL=ObjectWatcher.js.map