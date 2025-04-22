import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  waiterId: number = 0;
  waiter: any = null;
  orders: any[] = [];
  error: string | null = null;

  constructor(private router: Router, private orderService: OrderService) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  fetchOrders() {
    if (!this.waiterId) {
      this.error = 'Введите ID официанта';
      return;
    }

    this.orderService.getOrdersByWaiterId(this.waiterId).subscribe({
      next: (data) => {
        this.waiter = data.waiter;
        this.orders = data.orders;
        this.error = null;
      },
      error: (err) => {
        this.error = err.error.message || 'Ошибка при получении заказов';
        console.error(err);
      }
    });
  }
}
