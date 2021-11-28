import { Component, Input, OnInit } from '@angular/core';
import { DepartmentsService } from '../departments/departments.service';
import { ITask } from './task';
import { TasksService } from './tasks.service';
//import {NgbdTablePaginationModule} from './app/table-pagination.module';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskList: ITask[] = [];
  filterTaskList: ITask[] = [];
  today: Date = new Date();
  title:string = 'All tasks';
  // page = 1;
  // pageSize = 4;

  constructor(private service: TasksService, private deptService: DepartmentsService) { }

  @Input() set workerName(workerName: string) {
    this.filterTasksByWorker(workerName);
  }


  ngOnInit(): void {
    this.service.getTasks().subscribe(
      tasks => this.taskList = this.filterTaskList = tasks
    );

    this.deptService.departmentSelected.subscribe(
      departmentId => {
        this.filterTasksByDepartment(departmentId);
      }
    );


  }

  filterTasksByWorker(workerName: string): void {
    if (!workerName) {
      this.filterTaskList = this.taskList;
    } else {
      this.filterTaskList = this.taskList.filter(
        task => task.employeeName === workerName);
        this.title = workerName +"'s tasks";
    }
  }
  filterTasksByDepartment(departmentId: number): void {
    this.filterTaskList = this.taskList.filter(
      task => task.departmentID === departmentId);
      this.title = "department:" +departmentId +" tasks";
  }
  // refreshCountries() {
  //   this.filterTaskList.
  //   slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  // }

}

