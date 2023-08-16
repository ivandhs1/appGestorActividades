import { Component, OnInit, ViewChild } from '@angular/core';
import { FormLoginComponent } from '../../SubComponents/form-login/form-login.component';
import { FormCreateComponent } from '../../SubComponents/form-create/form-create.component';
import { DbUsersService } from 'src/app/Services/db-users.service';
import { ModalMessageComponent } from '../../Modal/modal-message/modal-message.component';
import { Router } from '@angular/router';
import { ModalAlertComponent } from '../../Modal/modal-alert/modal-alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(ModalMessageComponent, {static: false}) messageModal!: ModalMessageComponent;
  @ViewChild(ModalAlertComponent, {static: false}) modalAlert!: ModalAlertComponent;

  constructor(private serviceDB: DbUsersService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('idUser')!=null){
      let user: any = localStorage.getItem('idUser');
      this.router.navigate(['activitys',{ id: user._Id}]);
    }
  }

  crearUser($event:any){
    let user = $event;

    this.serviceDB.verificateUser(user.emailUser).subscribe((res:any)=>{
      if(res.verificate == true){
        localStorage.setItem('idUser',JSON.stringify(res.user));
        this.router.navigate(['activitys',{ id:res.user._id}]);
      }else{
        this.serviceDB.crearUser(user).subscribe((res:any)=>{
          console.log(res);
          
          let message: string = "Se ha creado correctamente la actividad."
          this.messageModal.mostrar(message)
          localStorage.setItem('idUser',JSON.stringify(res.user));
          this.router.navigate(['activitys',{ id:res.user._id }]);

        })
      }
    })


  }

}
