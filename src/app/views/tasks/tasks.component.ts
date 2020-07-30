import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from '../../model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dataSource: MatTableDataSource<Task>;
  private readonly COMPLETED_TASK_COLOR = '#F8F9FA';
  private readonly DEFAULT_TASK_COLOR = '#fff';

  @Output()
  updateTask = new EventEmitter<Task>();

  tasks: Task[];

  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  constructor(private dataHandler: DataHandlerService) {
  }

  ngAfterViewInit(): void {
    this.addTableObjects();
  }

  ngOnInit(): void {
    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataSource = new MatTableDataSource<Task>();
    this.fillTable();
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

  onClickTask(task: Task): void {
    this.updateTask.emit(task);
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private fillTable(): void {

    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.tasks;

    this.addTableObjects();

    this.dataSource.sortingDataAccessor = (task, colName) => {
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.creationDate ? task.creationDate : null;
        }
        case 'title': {
          return task.title;
        }
      }
    };

  }

}
