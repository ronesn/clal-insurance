import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idepartment } from './department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient) { }
  departmentSelected: EventEmitter<number> = new EventEmitter<number>();
  private workerUrl = 'api/departments.json';
 

  getDepartmentList(): Observable<Idepartment[]>{
    return this.http.get<Idepartment[]>(this.workerUrl);
  }
  setDepartment(id:number){
    this.departmentSelected.emit(id);
  }
  
}
