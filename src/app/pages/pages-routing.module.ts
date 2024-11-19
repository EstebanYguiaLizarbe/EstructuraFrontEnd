import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponent } from '../shared/shared.component';
import { authGuard } from '../guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    // canActivate: [ authGuard ],
    canActivate: [ authGuard ],
    //CanLoad
    loadChildren: () => import('./child-routes.routes').then(m => m.childRoute)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
