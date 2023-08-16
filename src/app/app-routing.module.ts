import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Pages/login/login.component';
import { GestorActivitysComponent } from './Components/Pages/gestor-activitys/gestor-activitys.component';

const routes: Routes = [
  {path:'inicio',component: LoginComponent},
  {path:'activitys', component: GestorActivitysComponent},

  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
