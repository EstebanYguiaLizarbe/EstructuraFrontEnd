import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from './store/loading.actions';
import { delay, Observable } from 'rxjs';
import { aparece, desaparece } from './store/loading.reduce';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Frontend-Migra';

  loading$!: Observable<boolean>

  constructor(
    private store: Store<{ loading: boolean }>
  ){
    console.log(store.subscribe(resp => console.log(resp, "respuesta")))
    this.loading$ = store.select('loading');
    
  }
  ngOnInit(): void {
      // this.store.dispatch(desaparece());


  }
}

// 