import { from, Observable } from "rxjs";
import { observable, createSignal, onMount } from "solid-js";

function App() {
  const [getText, setText] = createSignal("Hello Solid");
  onMount(() => {
    setInterval(() => {
      setText(new Date().toLocaleTimeString());
    }, 1000);
  });

  // workaround
  new Observable((sub) => {
    observable(getText).subscribe((v) => {
      sub.next(v);
    });
  }).subscribe((v) => {
    console.log("new Observable", v);
  });

  // bug
  const text$ = from(observable(getText));
  text$.subscribe((v) => {
    console.log("from operator", v);
  });

  return <div>{getText()}</div>;
}

export default App;
