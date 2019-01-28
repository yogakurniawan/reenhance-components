import * as React from 'react';
interface TimeProp {
    time: number;
}
interface ChildrenProp<TInner, TOuter> {
    children: (props: TOuter) => React.ReactElement<TInner>;
}
declare type OuterProps<TInner> = TimeProp & ChildrenProp<TimeProp & TInner, TInner> & TInner;
export declare const DebouncePropagator: <TInner>(loadingProps: TInner) => React.ComponentType<OuterProps<TInner>>;
export {};
