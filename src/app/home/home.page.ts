import { Employee } from './../Model/Employee';
import { DatabaseService } from './../Services/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public employees:Employee[]=new Array();

  constructor(private dbService:DatabaseService) {

  }

  ngOnInit(){
    this.dbService.getDatabaseState().subscribe((isReady)=>{
      if(isReady){
        this.dbService.getEmployees().then(data=>{
          console.log('Employees: ',data);
          this.employees = data;
        })
      }
    })
  }



}
