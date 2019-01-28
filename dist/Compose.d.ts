/// <reference types="react" />
declare type RenderFn<RenderPropsType extends any[]> = (...args: RenderPropsType) => JSX.Element;
declare type ChildType<RenderPropsType extends any[]> = JSX.Element | RenderFn<RenderPropsType>;
interface ChildrenType<RenderPropsType extends any[]> {
    children: ChildType<RenderPropsType>[];
}
export declare const Compose: <RenderPropsType extends any[]>(props: ChildrenType<RenderPropsType>) => JSX.Element | null;
export {};
