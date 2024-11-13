import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-incrementador',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './incrementador.component.html',
})
export class IncrementadorComponent {
  @Input() valor: number = 40;
  @Input() botonNuevo: string = 'btn btn-primary'

  @Output() valorSalida = new EventEmitter<number>();


  get getValor(){
    return `${this.valor}%`;
  }

  agragarValor(valor: number){
    if(this.valor >= 100 && valor > 0){
      this.valorSalida.emit(100);
      this.valor = 100;
      return;
    }
    if(this.valor <= 0 && valor < 0){
      this.valorSalida.emit(0);
      this.valor = 0;
      return;
    }
    this.valor = this.valor + valor;
    this.valorSalida.emit(this.valor);
  }

  cambioDeValor(event: number){
    if(event > 100){
      this.valor = 100;
    }else if(event < 0){
      this.valor = 0;
    } else {
      this.valor = event;
    }
    
    console.log(this.valor, "valorrrr", event);
    this.valorSalida.emit(this.valor);
  }
}
