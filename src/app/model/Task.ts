import {Priority} from './Priority';
import {Category} from './Category';

export class Task {
  id: number;
  title: string;
  completed: boolean;
  priority?: Priority;
  category?: Category;
  creationDate?: Date;

  constructor(id: number, title: string, completed: boolean, priority?: Priority, category?: Category, creationDate?: Date) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.priority = priority;
    this.category = category;
    this.creationDate = creationDate;
  }
}
