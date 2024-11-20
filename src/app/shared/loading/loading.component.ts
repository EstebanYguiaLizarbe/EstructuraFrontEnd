import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './loading.component.html'
})
export class LoadingComponent {

}
