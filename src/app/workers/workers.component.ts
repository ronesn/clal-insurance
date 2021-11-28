import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Iworker } from "./worker";
import { WorkersService } from './workers.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  @Output() workerSelcted: EventEmitter<string> = 
    new EventEmitter<string>();

  workerList: Iworker[] = [];
  selected: any;
  constructor(private service: WorkersService) { }

  ngOnInit(): void {
    this.service.getWorkers().subscribe(
      worker => this.workerList = worker
    );
  }
  onSelect (event: any) {
    //update the ui
    let selectedWorker:string = event.target.value;
    console.log(selectedWorker);
    this.workerSelcted.emit(selectedWorker);
  }
  getValues() {
    console.log(this.selected);
    this.workerSelcted.emit(this.selected);
  }
}
