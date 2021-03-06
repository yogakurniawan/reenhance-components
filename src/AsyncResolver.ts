import * as React from 'react';
import { componentFromStream } from 'recompose';
import { of, from, Observable, combineLatest } from 'rxjs';
import { flatMap, distinctUntilKeyChanged, startWith } from 'rxjs/operators';


interface SubjectProp<TInner, TSubjectArgs> {
  subject: (args: TSubjectArgs) => Promise<TInner>;
}

interface ChildrenProp<TInner, TOuter> {
  children: (props: TOuter) => React.ReactElement<any>;
}

type OuterProps<TInner, TSubjectArgs> =
  SubjectProp<TInner, TSubjectArgs> & ChildrenProp<SubjectProp<TInner, TSubjectArgs>, TInner>;

type ChildrenType = React.ReactElement<any>;


export const AsyncResolver =
  <TInner, TSubjectArgs = {}>(distinctKey: string = 'subject', initialProps?: TInner) =>
    componentFromStream<OuterProps<TInner, TSubjectArgs> & TSubjectArgs>(
    (props$) => {
      const subject$ = from(props$)
        .pipe(
          distinctUntilKeyChanged(distinctKey),
          flatMap((props: SubjectProp<TInner, TSubjectArgs> & TSubjectArgs) => props.subject(props)),
          startWith(initialProps),
        );

      return combineLatest<OuterProps<TInner, TSubjectArgs> & TSubjectArgs, TInner, ChildrenType>(
        props$,
        subject$,
        (props: OuterProps<TInner, TSubjectArgs> & TSubjectArgs, subject: TInner) =>
          props.children(subject),
      );
    });
