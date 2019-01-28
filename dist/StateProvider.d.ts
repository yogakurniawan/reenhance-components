import * as React from 'react';
declare type mapper<TInner, TOutter> = (input: TInner) => TOutter;
export interface StateAndUpdater<TState> {
    state: TState;
    setState: (newState: TState) => TState;
}
declare type StateProviderType = <TState, TExtOuter = {}>(initialState: TState | mapper<TExtOuter, TState>) => React.ComponentType<TExtOuter>;
export declare const StateProvider: StateProviderType;
export {};
