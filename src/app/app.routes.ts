import { Routes } from '@angular/router';
import { SharedComponent } from './shared/shared.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';



export const routes: Routes = [

    //   {
    //     path: '',
    //     component: BlankComponent,
    //     children: [
    //       {
    //         path: 'authentication',
    //         loadChildren: () =>
    //           import('./pages/authentication/authentication.routes').then(
    //             (m) => m.AuthenticationRoutes
    //           ),
    //       },
    //     ], 
    //   },
    
      {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },  

      {
        path: '',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
      },

      {
        path: '**',
        component: NopagefoundComponent,
      },
];
