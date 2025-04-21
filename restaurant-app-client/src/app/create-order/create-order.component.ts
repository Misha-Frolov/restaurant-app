import {Component, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {UserService} from '../services/user.service';
import {MenuService} from '../services/menu.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  waiters: any[] = [];
  menu: any[] = [];
  selectedWaiterId: number;
  selectedMenuItems: number[] = [];
  error: string | null = null;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private menuService: MenuService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loadWaiters();
    this.loadMenu();
  }

  loadWaiters() {
    this.userService.getWaiters().subscribe({
      next: (data) => (this.waiters = data),
      error: () => (this.error = 'Ошибка загрузки официантов')
    });
  }

  loadMenu() {
    this.menuService.getMenu().subscribe({
      next: (data) => (this.menu = data),
      error: () => (this.error = 'Ошибка загрузки меню')
    });
  }

  createOrder() {
    if (!this.selectedWaiterId || this.selectedMenuItems.length === 0) {
      this.error = 'Пожалуйста, выберите официанта и хотя бы один пункт меню';
      return;
    }

    this.orderService.createOrder({
      userId: this.selectedWaiterId,
      menuItems: this.selectedMenuItems
    }).subscribe({
      next: (response) => {
        const orderId = response.orderId;
        this.router.navigate([`/orders`, orderId]);
      },
      error: () => (this.error = 'Ошибка при создании заказа')
    });
  }
}
