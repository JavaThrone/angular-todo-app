import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from './service/data-handler.service';
import {Task} from './model/Task';
import {Category} from './model/Category';
import {Priority} from './model/Priority';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-todo-app';
  selectedCategory: Category = null;
  selectedTask: Task;
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];
  searchTaskText: string;
  statusFilter: boolean;
  priorityFilter: Priority;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.onSelectCategory(null);
    this.searchTaskText = '';
  }

  onSelectCategory(category: Category): void {
    this.selectedCategory = category;

    this.dataHandler.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onUpdateTask(): void {
    this.updateTasks();
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }

  onUpdateCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasks();
  }

  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(() => {
      this.selectedCategory = null;
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onSearchTasks(searchString: string): void {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  onFilterTasksByStatus(status: boolean): void {
    this.statusFilter = status;
    this.updateTasks();
  }

  onFilterTasksByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  private updateTasks(): void {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }
}
