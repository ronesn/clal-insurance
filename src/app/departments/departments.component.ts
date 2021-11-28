import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Idepartment } from './department';
import { DepartmentsService } from './departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  
  constructor(private service: DepartmentsService) { }
  
  isOpen: boolean=false;
  departmentList: Idepartment[];
  DepartmentTree: Map<number,Idepartment[]> = new Map<number,Idepartment[]>();
  showChildren = false;

  @Input() level: number = 0;
  @Input() department: Idepartment ;
  @Output() departmentSelected: EventEmitter<number> = new EventEmitter<number>();


  ngOnInit(): void {
    this.service.getDepartmentList().subscribe(departmentList => {
      //this.departmentList = departmentList, 
      this.initDepartmentTree(departmentList)
    }
        //error(err) { console.error('Error: ' + err); },
        //complete: this.initDepartmentTree()
    );
  }

  handleDeptClick(event: any){

    let departmentID:number = +event.target.getAttribute('DepartmentID');
    this.department?.DepartmentID;
    this.departmentSelected.emit(this.department?.DepartmentID);
    this.service.setDepartment(this.department.DepartmentID);
    this.showChildren = true;
    
  }

   initDepartmentTree(departmentList: Idepartment[]):void{
    departmentList.forEach(department => {
      if (this.DepartmentTree.has(department.ParentID)){
        this.DepartmentTree.get(department.ParentID)?.push(department)
      }else{
        let tempList:Idepartment[] = [department];
        this.DepartmentTree.set(department.ParentID,tempList);
      }
    });
  }

  onSelect(event: any):void{
    // let tr = event.target;
    // let departmentID:number = +tr.getAttribute('DepartmentID');
    // debugger;
    // if (this.DepartmentTree.has(departmentID)){
    //   let ui = this.createUi(this.DepartmentTree.get(departmentID)!);
    //   tr.append(ui);
    // }
    // this.departmentSelected.emit(departmentID);
  }

  createUi(departmentList :Idepartment[] ):HTMLElement{
    let ul = document.createElement("ul");
    departmentList.forEach(department => {
      let li = document.createElement("li");
      li.addEventListener("click",this.onSelect);
      li.setAttribute('DepartmentID',''+department.DepartmentID);
      li.append(department.DepartmentName);
      ul.append(li);
    });
    return ul;
  }
}

// <li *ngFor="let department of DepartmentTree.get(0)" (click)=onSelect($event) 
//             [attr.DepartmentID]="department.DepartmentID" >
//             {{ department.DepartmentName}}
//         </li>


