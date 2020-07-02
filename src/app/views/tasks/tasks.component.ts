import {Component, OnInit} from '@angular/core';
import {Task} from '../../model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task>;
  private readonly COMPLETED_TASK_COLOR = '#F8F9FA';
  private readonly DEFAULT_TASK_COLOR = '#fff';

  tasks: Task[];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.tasksSubject.subscribe(tasks => this.tasks = tasks);
    this.dataSource = new MatTableDataSource<Task>();
    this.refreshTable();
  }

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  getPriorityColor(task: Task): string {
    if (task.completed) {
      return this.COMPLETED_TASK_COLOR;
    } else if (task.priority && task.priority.color) {
      return task.priority.color;
    } else {
      return this.DEFAULT_TASK_COLOR;
    }
  }

  private refreshTable(): void {
    this.dataSource.data = this.tasks;
  }

}
