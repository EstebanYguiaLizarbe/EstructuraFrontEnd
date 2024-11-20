import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';

import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';

// icons
// import { TablerIconsModule } from 'angular-tabler-icons';
// import * as TablerIcons from 'angular-tabler-icons/icons';

// perfect scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';
//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideState, provideStore } from '@ngrx/store';
import { loadingReducer } from './store/loading.actions';


export const appConfig: ApplicationConfig = {
  providers: [
    //manejo del estado global
    provideStore(),
    provideState({ name: 'loading', reducer: loadingReducer }),

    //fin del manejo del estado global
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(),
    provideAnimationsAsync(),

    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      // TablerIconsModule.pick(TablerIcons),
      NgScrollbarModule,
    ),
  ],
};
