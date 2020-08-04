import {Priority} from '../../../model/Priority';
import {PriorityDao} from '../interface/PriorityDao';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';

export class PriorityDaoImpl implements PriorityDao {
  add(T): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(T): Observable<Priority> {
    return undefined;
  }
}
