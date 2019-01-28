import * as React from 'react';
declare type ChangeHandler = (newValue: any, oldValue: any, propName: string) => void;
interface OuterProps<TObject> {
    onChange?: ChangeHandler;
    children?: (props: TObject) => React.ReactElement<any>;
}
interface Indexable {
    [name: string]: any;
}
export declare const ObjectWatcher: <TObject extends Indexable>(targetObject: TObject, watchProps: string | string[]) => React.ComponentType<OuterProps<TObject>>;
export {};
