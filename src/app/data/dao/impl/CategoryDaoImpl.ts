import {CategoryDao} from '../interface/CategoryDao';
import {Category} from '../../../model/Category';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';

export class CategoryDaoImpl implements CategoryDao {

  add(category: Category): Observable<Category> {
    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory();
    }
    TestData.categories.push(category);
    return of(category);
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });

    const categoryTmp = TestData.categories.find(t => t.id === id);
    TestData.categories.splice(TestData.categories.indexOf(categoryTmp), 1);
    return of(categoryTmp);
  }

  get(id: number): Observable<Category> {
    return of(TestData.categories.find(category => category.id === id));
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return of(TestData.categories.filter(
      cat => cat.title.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) => c1.title.localeCompare(c2.title)));
  }

  update(category: Category): Observable<Category> {
    const categoryTmp = TestData.categories.find(c => c.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(categoryTmp), 1, category);
    return of(categoryTmp);
  }

  private getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map(c => c.id)) + 1;
  }
}
