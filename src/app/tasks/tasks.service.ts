import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable } from 'rxjs';
import { ITask } from './task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private taskUrl = 'api/tasks.json';
  constructor(private http: HttpClient) {

   }
  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.taskUrl);
  }
}
