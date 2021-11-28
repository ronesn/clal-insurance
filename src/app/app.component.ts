import { Component } from '@angular/core';
import { DepartmentsService } from './departments/departments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'clal-insurance';
  workerName: string;
  departmentID: number;

  constructor(private deptService: DepartmentsService) {}

  onWorkerSelect(workerName : string):void {
    this.workerName = workerName;
  }
  onDepartmentSelect(departmentID : number):void {
    this.departmentID = departmentID;
    debugger
  }
}

