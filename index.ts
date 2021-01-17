import { of, timer, interval, BehaviorSubject, ReplaySubject, Subject, throwError, VirtualAction, VirtualTimeScheduler } from 'rxjs'; 
import { map, scan, takeUntil, mergeMap, 
share, shareReplay, filter, concatMap, withLatestFrom, retry, retryWhen, repeatWhen, race, reduce, repeat, refCount
, publishLast, pairwise, pluck, publishBehavior, publishReplay, partition, publish, audit, skip,
catchError, combineAll, combineLatest, concat, concatAll,
count, auditTime, debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';

const source = of('World').pipe(
  map(x => `Hello ${x}!`)
);

source.subscribe(console.log);

const myObserver = {
  next: value => console.log('Next:', value),
  error: err => console.log('Error', err),
  complete: () => console.log('Complete')
}

function producer(subscribe) {
  setTimeout(() => {
    subscribe.next(1);
  }, 1000);
  subscribe.next(2);
  setTimeout(() => {
    subscribe.next(3);
    subscribe.complete();
  }, 2000);
}
producer(myObserver);

const score$ = of(5, -10, 20, 20, 20, -5, 10);
score$.pipe(
  scan((acc, score) => acc + score, 0)
).subscribe(x => console.log(x));

const source$ = of(1, 2);
const inner$ = of('A', 'B', 'C');
source$.pipe(
  mergeMap(() => inner$)
).subscribe(x => console.log(x));
