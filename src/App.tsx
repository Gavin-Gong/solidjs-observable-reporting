import { from, Observable } from "rxjs";
import { observable, createSignal, onMount } from "solid-js";

function App() {
  const [getText, setText] = createSignal("Hello Solid");
  onMount(() => {
    setInterval(() => {
      setText(new Date().toLocaleTimeString());
    }, 1000);
  });

  // use custom operator as workaround
  fromObservablePattern<string>(observable(getText)).subscribe((v) => {
    console.log("custom operator", v);
  });

  // bug
  // const text$ = from(observable(getText));
  // text$.subscribe((v) => {
  //   console.log(" builtin from operator", v);
  // });

  return <div>{getText()}</div>;
}

function fromObservablePattern<T = unknown>(observableLike: any) {
  return new Observable<T>((sub) => {
    observableLike.subscribe!({
      next: (v: T) => sub.next(v),
      error: (v) => sub.error(v),
      complete: () => sub.complete(),
    });
  });
}

export default App;
