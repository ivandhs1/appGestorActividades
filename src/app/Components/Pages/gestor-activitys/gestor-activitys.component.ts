import { Activity } from './../../../Models/activity';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateActivityComponent } from '../../Modal/create-activity/create-activity.component';
import { ViewActivityComponent } from '../../Modal/view-activity/view-activity.component';
import { EditActivityComponent } from '../../Modal/edit-activity/edit-activity.component';
import { EliminateActivityComponent } from '../../Modal/eliminate-activity/eliminate-activity.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DbActivitys } from 'src/app/Services/db-activitys.service';
import { DatePipe } from '@angular/common';
import { AsignarActivityComponent } from '../../Modal/asignar-activity/asignar-activity.component';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-gestor-activitys',
  templateUrl: './gestor-activitys.component.html',
  styleUrls: ['./gestor-activitys.component.css']
})
export class GestorActivitysComponent implements OnInit {

  actividades!: Array<Activity>;
  actsNoAsignadas!: Array<Activity>;
  actsAsignadas!: Array<Activity>;
  actsProceso!: Array<Activity>;
  actsFinalizadas!: Array<Activity>;
  userLocal: User =  new User();
  
  @ViewChild(CreateActivityComponent, {static: false}) modalCreate!: CreateActivityComponent;
  @ViewChild(ViewActivityComponent, {static: false}) modalView!: ViewActivityComponent;
  @ViewChild(EditActivityComponent, {static: false}) modalEdit!: EditActivityComponent;
  @ViewChild(EliminateActivityComponent, {static: false}) modalDelete!: EliminateActivityComponent;
  @ViewChild(AsignarActivityComponent, {static: false}) modalAsignar!: AsignarActivityComponent;

  constructor(private serviceDB: DbActivitys,private router: Router) {

  }

  ngOnInit(): void {
    this.obtenerActs();
    this.actsNoAsignadas = [];
    this.actsAsignadas = [];
    this.actsProceso = [];
    this.actsFinalizadas = [];
    this.obtenerUserLocal();

  }

  obtenerUserLocal(){
    let user: any =  JSON.parse(localStorage.getItem('idUser') || '{}');
    this.userLocal = user;
    console.log(this.userLocal._id);
    
  }


  obtenerActs(){
    this.serviceDB.obtenerActs().subscribe( actividades =>{
      this.actividades = actividades  
      this.ordenarActs();  
    });
  }

  ordenarActs() {
    this.actividades.forEach((actividad: Activity)=>{
      actividad.setTime = new Date(actividad.setTime);
    })
    
    this.actividades.forEach( (actividad:Activity) =>{
      if(actividad.stateActivity === 0){
        this.actsNoAsignadas.push(actividad)
      }else if(actividad.stateActivity === 1){
        this.actsAsignadas.push(actividad)
      }else if(actividad.stateActivity === 2){
        this.actsProceso.push(actividad)
      }else if(actividad.stateActivity === 3){
        this.actsFinalizadas.push(actividad)
      }
    })
    this.ordenarActsPorFecha();
  }

  ordenarActsPorFecha(){
    this.actsNoAsignadas.sort((a, b) => b.setTime.valueOf() - a.setTime.valueOf());
    this.actsAsignadas.sort((a, b) => b.setTime.valueOf() - a.setTime.valueOf());
    this.actsProceso.sort((a, b) => b.setTime.valueOf() - a.setTime.valueOf());
    this.actsFinalizadas.sort((a, b) => b.setTime.valueOf() - a.setTime.valueOf());
  }

  crearActivity(){
    this.modalCreate.mostrar();
  }

  activityCreada($event:any){
    this.actsNoAsignadas.push($event);
  }

  verActivity(activity: Activity){
    this.modalView.mostrar(activity);
  }

  editarActivity(event:any, activity: Activity){
    event.stopPropagation();
    this.modalEdit.mostrar(activity);
  }

  activityUpdate(event: any){
    this.vaciarArrays();
    this.obtenerActs();
  }

  deleteActivity(event:any, idActivity:string, nameActivity: string){
    event.stopPropagation();
    this.modalDelete.mostrar(idActivity, nameActivity);
  }

  eliminatedActivity($event:any){
    this.vaciarArrays();
    this.obtenerActs();
  }

  editarEstado(id: string, estado: number){
    this.serviceDB.updateEstAct(id, estado).subscribe((a:any) => {
      this.vaciarArrays();
      this.obtenerActs()
      this.ordenarActs();
    });

  }

  asignarActivity(event:any, activity: Activity){
    event.stopPropagation();
    this.modalAsignar.mostrar(activity)
  }

  activityAsignada(event:any){
    if(event==true){
      this.vaciarArrays();
      this.obtenerActs()
      this.ordenarActs();
    }
  }

  vaciarArrays(){
    this.actividades = [];
    this.actsNoAsignadas = [];
    this.actsAsignadas = [];
    this.actsProceso = [];
    this.actsFinalizadas = [];
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
        
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let idActivity:string="";
      idActivity = event.container.data[event.currentIndex]._id;


      if(event.container.id=="cdk-drop-list-1"){
        this.editarEstado(idActivity, 1);
      }else if(event.container.id=="cdk-drop-list-2"){
        this.editarEstado(idActivity, 2);
      }else if(event.container.id=="cdk-drop-list-3"){
        this.editarEstado(idActivity, 3);
      }      
    } 
  }

  cerrarSesion(){
    localStorage.removeItem("idUser")
    this.router.navigate(['inicio']);
  }

}
