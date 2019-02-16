import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/Observable/from';
import 'rxjs/add/operator/share';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';

const addItem = (val:any) => {
  const node = document.createElement("li");
  const textNode = document.createTextNode(val);
  node.appendChild(textNode);
  document.getElementById('output').appendChild(node);
}

// const observableMouse = fromEvent(document, 'mousemove');

// setTimeout(() => {
//   const subscription = observableMouse.subscribe(
//     (x: any) => addItem(x)
//   )
// }, 2000);

const subject = new Subject();

subject.subscribe(
  data => addItem('Observer 1: '+data),
  err => addItem(err),
  () => addItem('Observer 1 Completed')
)

subject.next('The first thing has been sent')

const observer2 = subject.subscribe(
  data => addItem('Observer 2: '+data)
)

subject.next('The second thing has been sent');
subject.next('The third thing has been sent');

observer2.unsubscribe()

subject.next('A final thing has been sent');

const bSubject = new BehaviorSubject('First');
bSubject.subscribe(
  data => addItem('Observer behavior 1: '+data),
  err => addItem(err),
  () => addItem('Observer behavior 1 Completed')
)

bSubject.next('The first thing has been sent');
bSubject.next('...Observer 2 is about to subscirbe...');


const bObserver2 = bSubject.subscribe(
  data => addItem('Observer behavior 2: '+data)
)

const rSubject = new ReplaySubject(30, 200);
const rObserver = rSubject.subscribe(
  data => addItem('Observer replay 1: '+data),
  err => addItem(err),
  () => addItem('Observer replay 1 Completed')
)

let i = 1;
let int = setInterval(() => rSubject.next(i++), 100);

setTimeout(() => {
  const rObserver2 = rSubject.subscribe(
    data => addItem('Observer replay 2: '+data)
  )
  rObserver.add(rObserver2)
}, 500);

setTimeout(() => {
  rObserver.unsubscribe()
}, 2000)

const aSubject = new AsyncSubject();
const aObserver = aSubject.subscribe(
  data => addItem('Observer async 1: '+data),
  err => addItem(err),
  () => addItem('Observer async 1 Completed')
)

let j = 1;
let aint = setInterval(() => aSubject.next(j++), 100);

setTimeout(() => {
  const aObserver2 = aSubject.subscribe(
    data => addItem('Observer async 2: '+data)
  )
  aObserver.add(aObserver2)
  aSubject.complete()
}, 500);

setTimeout(() => {
  aObserver.unsubscribe()
}, 2000)

const observable = Observable.create((observer:any) => {
  try {
    observer.next('O1: Hey guys!')
    observer.next('O1: How are you?')
    setTimeout(() => {
      observer.next('O1: I am good')
    }, 2000)
  } catch(err) {
    observer.error(err)
  }
})

const observable2 = Observable.create((observer:any) => {
  try {
    observer.next('O2: Hey guys!')
    observer.next('O2: How are you?')
    setTimeout(() => {
      observer.next('O2: I am good')
    }, 2000)
  } catch(err) {
    observer.error(err)
  }
}).map((val:any) => val.toUpperCase())

const newObs = merge(observable, observable2);

newObs.subscribe((x:any) => addItem(x))

from([
  {first: 'Gary', last: 'Simon', age: '34'},
  {first: 'Jane', last: 'Simon', age: '34'},
  {first: 'John', last: 'Simon', age: '34'},
])
  .pluck('first')
  .subscribe((x:any) => addItem(x))

// const rSubject = new ReplaySubject(30, 500);
// rSubject.subscribe(
//   data => addItem('Observer replay 1: '+data),
//   err => addItem(err),
//   () => addItem('Observer replay 1 Completed')
// )

// let i = 1;
// let int = setInterval(() => rSubject.next(i++), 100);

// setTimeout(() => {
//   const rObserver2 = rSubject.subscribe(
//     data => addItem('Observer replay 2: '+data)
//   )
// }, 500);

// const observable = Observable.create((observer:any) => {
//   try {
//     observer.next('Hey guys!')
//     observer.next('How are you?')
//     setInterval(() => {
//       observer.next('I am good')
//     }, 2000)
//   } catch(err) {
//     observer.error(err)
//   }
// }).share();

// const observer = observable.subscribe(
//   (x:any) => addItem(x),
//   (error:any) => addItem(error),
//   () => addItem('Completed')
// );

// setTimeout(() => {
//   const observer2 = observable.subscribe(
//     (x:any) => addItem("Subscriber 2: " + x)
//   )
// }, 1000)