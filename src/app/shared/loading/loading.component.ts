import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { LoadingState } from '../../store/loading.actions';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit, OnDestroy {
  mostrarBarra: boolean = false;
  mostrarSpinner: boolean = false;
  public mostrar!: Subscription;

  constructor(
    private store: Store<{ loading: LoadingState }>
  ){
    this.mostrar = this.store.select('loading').subscribe(resp => {
      this.mostrarBarra = resp.barra;
      this.mostrarSpinner = resp.spinner;
    });
  }
  ngOnDestroy(): void {
    this.mostrar.unsubscribe();
  }

  ngOnInit(): void {
    // console.log(this.store.select('loading'));
    // this.store.select('loading').subscribe(resp => {
    //   this.mostrarBarra = resp.barra;
    //   this.mostrarSpinner = resp.spinner;
    // });

    
  }


  
}
