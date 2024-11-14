import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, retry, Subscription, take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-observable',
  standalone: true,
  imports: [],
  templateUrl: './observable.component.html'
})
export class ObservableComponent implements OnDestroy{
  public intervalSubs: Subscription = new Subscription();

  constructor() {
    // const obs$ = new Observable( obser => {
    //   let i = 0;

    //   const intervalo = setInterval(() => {
    //     i++;
    //     obser.next(i);

    //     if(i === 2){
    //       obser.error("Auxilio");
    //     }

    //     if(i === 5){
    //       clearInterval: { intervalo }
    //       obser.complete();
    //     }
    //   }, 1000);
      
      
    // })

    // obs$.subscribe(valor => console.log("Subs", valor), error => console.error(error), () => console.log("finalizado"));

    this.intervalSubs = this.contadorInterval().subscribe(console.log);

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }


  contadorInterval(){
    const intervalo = interval(600);
    return intervalo;
  }
}
