import { Component } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faCartShopping = faCartPlus;
  notificationDropdownVisible: boolean = false;

  toggleNotificationDropdown() {
    this.notificationDropdownVisible = !this.notificationDropdownVisible;
  }


}
