import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import { Subject } from 'rxjs/Subject';

const addItem = (val:any) => {
  const node = document.createElement("li");
  const textNode = document.createTextNode(val);
  node.appendChild(textNode);
  document.getElementById('output').appendChild(node);
}

const observableMouse = fromEvent(document, 'mousemove');

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