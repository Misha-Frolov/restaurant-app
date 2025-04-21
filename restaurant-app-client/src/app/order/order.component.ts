import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: any = null;
  total: number = 0.00;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? parseInt(idParam, 10) : null;

    if (id !== null) {
      this.orderService.getOrderById(id).subscribe({
        next: (data) => {
          this.order = data.order;
          this.total = data.total;
        },
        error: (err) => {
          this.error = (err.status === 404) ? 'Заказ не найден' : 'Ошибка при получении заказа';
          console.error(err);
        }
      });
    } else {
      this.error = 'Некорректный ID заказа';
    }
  }

  closeOrder(): void {
    if (!this.order) {
      return;
    }
    this.orderService.updateOrder(this.order.id, {isActive: false}).subscribe({
      next: () => window.location.reload(),
      error: () => alert('Ошибка при закрытии заказа')
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
