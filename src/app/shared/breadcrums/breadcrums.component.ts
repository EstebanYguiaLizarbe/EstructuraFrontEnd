import { Component, OnDestroy } from '@angular/core';
import { Router, Route, ActivationEnd } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

Router
@Component({
  selector: 'app-breadcrums',
  standalone: true,
  imports: [],
  templateUrl: './breadcrums.component.html'
})
export class BreadcrumsComponent implements OnDestroy {
  titulo: string = '';
  titulo$: Subscription = new Subscription();


  constructor(
    private router: Router
  ) {
    this.titulo$ = this.obtenerTitulo().subscribe((resp : any) => {this.titulo = resp.titulo, document.title = `Frontend-Migra - ${resp.titulo}`});;
  }

  ngOnDestroy(): void {
    this.titulo$.unsubscribe();
  }

  obtenerTitulo(){
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd), 
      filter(event => event.snapshot.firstChild === null), 
      map(event => event.snapshot.data))
  }


}
