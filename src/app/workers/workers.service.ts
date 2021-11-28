import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iworker } from "./worker";

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  private workerUrl = 'api/workers.json';

  constructor(private http: HttpClient) {  }
  
  getWorkers() : Observable<Iworker[]> {
    return this.http.get<Iworker[]>(this.workerUrl);
  }
}
