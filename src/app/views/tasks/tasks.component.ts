import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from '../../model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dataSource: MatTableDataSource<Task>;

  @Output()
  updateTask = new EventEmitter<Task>();
  @Output()
  deleteTask = new EventEmitter<Task>();
  @Output()
  selectCategory = new EventEmitter<Category>();
  @Output()
  filterByTitle = new EventEmitter<string>();
  @Output()
  filterByStatus = new EventEmitter<boolean>();
  @Output()
  filterByPriority = new EventEmitter<Priority>();

  priorities: Priority[];
  tasks: Task[];
  searchTaskText: string;
  selectedStatusFilter: boolean;
  private readonly COMPLETED_TASK_COLOR = '#F8F9FA';
  private readonly DEFAULT_TASK_COLOR = '#fff';
  selectedPriorityFilter: Priority;

  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog) {
  }

  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  ngAfterViewInit(): void {
    this.addTableObjects();
  }

  ngOnInit(): void {
    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataSource = new MatTableDataSource<Task>();
    this.fillTable();
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

  openEditTaskDialog(task: Task): void {

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Edit task'], autoFocus: false});

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'complete') {
        task.completed = true;
        this.updateTask.emit(task);
        return;
      }

      if (result === 'activate') {
        task.completed = false;
        this.updateTask.emit(task);
        return;
      }

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }
    });

    this.updateTask.emit(task);
  }

  openDeleteTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Approve action',
        message: `Do you really want to delete the task: "${task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task);
      }
    });

  }

  onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  onSelectCategory(category: any): void {
    this.selectCategory.emit(category);
  }

  onFilterByTitle(): void {
    this.filterByTitle.emit(this.searchTaskText);
  }

  onFilterByStatus(value: boolean): void {
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
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

  onFilterByPriority(value: Priority) {
    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }
}
