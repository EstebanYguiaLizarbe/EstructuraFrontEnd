import { Component } from '@angular/core';
import { IncrementadorComponent } from '../../components/incrementador/incrementador.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IncrementadorComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  valor: number = 15;
  getValor2: number = 40;

  get getValor(){
    return `${this.valor}%`;
  }

  get getValorDos(){
    return `${this.getValor2}%`;
  }
}
