import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { loadingReducer } from './app/store/loading.actions';
import { provideState, provideStore } from '@ngrx/store';

// ----appConfig--- esta como segundo argumento en lugar de ese objeto providers despues de AppComponent, appConfig 

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
