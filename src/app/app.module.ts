import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';

import { LoginComponent } from './Components/Pages/login/login.component';
import { GestorActivitysComponent } from './Components/Pages/gestor-activitys/gestor-activitys.component';
import { CreateActivityComponent } from './Components/Modal/create-activity/create-activity.component';
import { EliminateActivityComponent } from './Components/Modal/eliminate-activity/eliminate-activity.component';
import { EditActivityComponent } from './Components/Modal/edit-activity/edit-activity.component';
import { ViewActivityComponent } from './Components/Modal/view-activity/view-activity.component';
import { ModalAlertComponent } from './Components/Modal/modal-alert/modal-alert.component';
import { ModalMessageComponent } from './Components/Modal/modal-message/modal-message.component';
import { FormCreateComponent } from './Components/SubComponents/form-create/form-create.component';
import { FormEditComponent } from './Components/SubComponents/form-edit/form-edit.component';
import { FormLoginComponent } from './Components/SubComponents/form-login/form-login.component';
import { HeaderComponent } from './Components/SubComponents/header/header.component';
import { PageActivityComponent } from './Components/Pages/page-activity/page-activity.component';
import { AsignarActivityComponent } from './Components/Modal/asignar-activity/asignar-activity.component';
import { FormAsignarComponent } from './Components/SubComponents/form-asignar/form-asignar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestorActivitysComponent,
    CreateActivityComponent,
    EliminateActivityComponent,
    EditActivityComponent,
    ViewActivityComponent,
    ModalAlertComponent,
    ModalMessageComponent,
    FormCreateComponent,
    FormEditComponent,
    FormLoginComponent,
    HeaderComponent,
    PageActivityComponent,
    AsignarActivityComponent,
    FormAsignarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
