import {Injectable} from '@angular/core';
import {Task} from '../model/Task';
import {Observable} from 'rxjs';
import {TaskDao} from '../data/dao/interface/TaskDao';
import {TaskDaoImpl} from '../data/dao/impl/TaskDaoImpl';
import {Category} from '../model/Category';
import {CategoryDao} from '../data/dao/interface/CategoryDao';
import {CategoryDaoImpl} from '../data/dao/impl/CategoryDaoImpl';
import {Priority} from '../model/Priority';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDao: TaskDao = new TaskDaoImpl();
  private categoryDao: CategoryDao = new CategoryDaoImpl();

  constructor() {
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDao.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDao.getAll();
  }

  getCategory(id: number) {
    return this.categoryDao.get(id);
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDao.search(category, searchText, status, priority);
  }
}
