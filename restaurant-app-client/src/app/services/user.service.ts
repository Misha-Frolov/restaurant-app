import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  getWaiters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/waiters`);
  }

  createWaiter(waiter: { name: string; role: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/waiters`, waiter);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }
}
