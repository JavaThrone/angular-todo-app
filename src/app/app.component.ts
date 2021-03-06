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
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];

  totalTasksCountInCategory: number;
  completeCountInCategory: number;
  uncompletedCountInCategory: number;
  uncompletedCountTotalTaskCount: number;

  selectedCategory: Category = null;

  searchTaskText: string;
  searchCategoryText: string;

  statusFilter: boolean;
  priorityFilter: Priority;
  showStatistic: boolean;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.onSelectCategory(null);
    this.searchTaskText = '';
    this.searchCategoryText = '';
    this.showStatistic = true;
  }

  onSelectCategory(category: Category): void {
    this.selectedCategory = category;

    this.updateTasksAndStatistic();
  }

  onUpdateTask(task: Task): void {
    this.dataHandler.updateTask(task).subscribe(cat => {
      this.updateTasksAndStatistic();
    });
  }

  onDeleteTask(task: Task): void {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.updateTasksAndStatistic();
    });
  }

  onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  onDeleteCategory(category: Category): void {
    this.dataHandler.deleteCategory(category.id).subscribe(() => {
      this.selectedCategory = null;
      this.onSelectCategory(null);
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

  onFilterTasksByPriority(priority: Priority): void {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  onAddTask(task: Task): void {
    this.dataHandler.addTask(task).subscribe(result => {
      this.updateTasksAndStatistic();
    });
  }

  onAddCategory(category: Category): void {
    this.dataHandler.addCategory(category).subscribe(() => this.updateCategories());
  }

  onSearchCategory(title: string) {
    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }

  toggleStatistic(showStatistic: boolean) {
    this.showStatistic = showStatistic;
  }

  private updateCategories(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
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

  private updateTasksAndStatistic(): void {
    this.updateTasks();

    this.updateStatistic();
  }

  private updateStatistic(): void {
    this.dataHandler.getTotalCountInCategory(this.selectedCategory).subscribe(result => {
      this.totalTasksCountInCategory = result;
    });

    this.dataHandler.getCompletedCountInCategory(this.selectedCategory).subscribe(result => {
      this.completeCountInCategory = result;
    });

    this.dataHandler.getUncompletedCountInCategory(this.selectedCategory).subscribe(result => {
      this.uncompletedCountInCategory = result;
    });

    this.dataHandler.getUncompletedTotalCount().subscribe(result => {
      this.uncompletedCountTotalTaskCount = result;
    });
  }
}
