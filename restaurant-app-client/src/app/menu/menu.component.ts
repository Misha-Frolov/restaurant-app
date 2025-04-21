import {Component, OnInit} from '@angular/core';
import {MenuService} from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: any[] = [];
  error: string | null = null;

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        this.menu = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'Ошибка загрузки меню';
        console.error(err);
      }
    });
  }
}
