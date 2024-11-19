import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafico1Component } from './grafico1/grafico1.component';
import { ObservableComponent } from './observable/observable.component';
import { authGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { adminGuard } from '../guards/admin.guard';
import { Route, RouterModule, Routes } from '@angular/router';

export const childRoute : Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full',},
      { path: 'dashboard', title: 'Dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }},
      { path: 'test01', component: Grafico1Component, data: { titulo : 'Grafico 1' }},
      { path: 'observable', component: ObservableComponent, data: { titulo: 'Observable'}},
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perifl settings'}},
      
    //   {
    //     path: 'ui-components',
    //     loadChildren: () =>
    //       import('./pages/ui-components/ui-components.routes').then(
    //         (m) => m.UiComponentsRoutes
    //       ), 
    //   },
    //   {
    //     path: 'extra',
    //     loadChildren: () => 
    //       import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
    //   },

      //Mantenimiento:
      { path: 'usuarios', canActivate: [adminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios'}},
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales'}},
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos'}},
      { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busqueda'}},
      { path: 'medicos/:id', component: MedicoComponent, data: { titulo: 'Editar Medico'}},
]

// @NgModule({
//   declarations: [],
//   imports: [
//     RouterModule.forChild(childRoute),
//   ],
//   exports: [RouterModule]
// })
export class ChildRoutesModule { }
