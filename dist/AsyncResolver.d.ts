import * as React from 'react';
interface SubjectProp<TInner, TSubjectArgs> {
    subject: (args: TSubjectArgs) => Promise<TInner>;
}
interface ChildrenProp<TInner, TOuter> {
    children: (props: TOuter) => React.ReactElement<any>;
}
export declare const AsyncResolver: <TInner, TSubjectArgs = {}>(distinctKey?: string, initialProps?: TInner | undefined) => React.ComponentType<SubjectProp<TInner, TSubjectArgs> & ChildrenProp<SubjectProp<TInner, TSubjectArgs>, TInner> & TSubjectArgs>;
export {};
