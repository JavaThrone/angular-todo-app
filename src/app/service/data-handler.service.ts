import {Injectable} from '@angular/core';
import {Task} from '../model/Task';
import {Observable} from 'rxjs';
import {TaskDao} from '../data/dao/interface/TaskDao';
import {TaskDaoImpl} from '../data/dao/impl/TaskDaoImpl';
import {Category} from '../model/Category';
import {CategoryDao} from '../data/dao/interface/CategoryDao';
import {CategoryDaoImpl} from '../data/dao/impl/CategoryDaoImpl';
import {Priority} from '../model/Priority';
import {PriorityDao} from '../data/dao/interface/PriorityDao';
import {PriorityDaoImpl} from '../data/dao/impl/PriorityDaoImpl';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDao: TaskDao = new TaskDaoImpl();
  private categoryDao: CategoryDao = new CategoryDaoImpl();
  private priorityDao: PriorityDao = new PriorityDaoImpl();

  constructor() {
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDao.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDao.getAll();
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDao.getAll();
  }

  getCategory(id: number) {
    return this.categoryDao.get(id);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDao.update(task);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDao.update(category);
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDao.search(category, searchText, status, priority);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDao.delete(id);
  }

  deleteTasksByCategoryId(id: number): Observable<Task> {
    return this.taskDao.delete(id);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDao.delete(id);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDao.add(task);
  }

  addCategory(category: Category): Observable<Category> {
    return this.categoryDao.add(category);
  }
}
