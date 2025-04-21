import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  getOrdersByWaiterId(waiterId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/waiter-orders/${waiterId}`);
  }

  // Создать новый заказ
  createOrder(data: { userId: number, menuItems: number[] }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/orders`, data);
  }







  // Получить заказ по ID
  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orders/${orderId}`);
  }



  // Обновить заказ (например, завершить)
  updateOrder(orderId: number, data: { isActive: boolean, items?: number[] }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/orders/${orderId}`, data);
  }

  // Получить все активные заказы
  getAllActiveOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`);
  }

  // Удалить (деактивировать) заказ
  deleteOrder(orderId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/orders/${orderId}/delete`, {});
  }
}
//
//
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {
//   private apiUrl = 'http://localhost:3000/api';
//
//   constructor(private http: HttpClient) {}
//
//   // Получить заказы по ID официанта
//   getOrdersByWaiterId(waiterId: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/waiter-orders/${waiterId}`);
//   }
//
//   // Получить заказ по ID
//   getOrderById(orderId: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/orders/${orderId}`);
//   }
//
//   // Создать новый заказ
//   createOrder(data: { userId: number, menuItems: number[] }): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/orders`, data);
//   }
//
//   // Обновить заказ (например, завершить)
//   updateOrder(orderId: number, data: { isActive: boolean, items?: number[] }): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/orders/${orderId}`, data);
//   }
//
//   // Получить все активные заказы
//   getAllActiveOrders(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/orders`);
//   }
//
//   // Удалить (деактивировать) заказ
//   deleteOrder(orderId: number): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/orders/${orderId}/delete`, {});
//   }
// }
