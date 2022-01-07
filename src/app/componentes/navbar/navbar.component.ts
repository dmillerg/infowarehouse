import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  menuItem(e: any) {
    this.resetearTodo();
    document.getElementById(e.target.id)?.classList.add('active');
  }

  resetearTodo() {
    let menus = document.querySelectorAll('.menu-item');
    menus.forEach((e) => {
      e.classList.remove('active');
    })
  }
}
