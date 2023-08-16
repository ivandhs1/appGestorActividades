import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-page-activity',
  templateUrl: './page-activity.component.html',
  styleUrls: ['./page-activity.component.css']
})
export class PageActivityComponent implements OnInit {

  public active: Boolean;

  constructor() {
    this.active = false;
  }

  ngOnInit(): void {
  }

  mostrar(){
    this.active = true;
  }

  ocultar(){
    this.active = false;
  }

}
