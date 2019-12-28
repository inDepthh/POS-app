import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id: string;
  pizzas = [['Sm Pizza', ' $6'], ['Md Pizza', ' $8'], ['Lg Pizza', ' $10']];
  sides = [['Garlic Bread', ' $4'], ['Sm Sub', ' $6'], ['Lg Sub', ' $8']];
  drinks = [['Mnt dew', ' $2'], ['Coke', ' $2'], ['Sunkist', ' $2'], ['Sprite', ' $2']];
  addItem = false;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  name: string;
  price: string;
  itemType: string;
  itemDetails = [];
  count = 0;
  index: number;
  pizza: boolean;
  side: boolean;
  drink: boolean;

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.id = localStorage.getItem('token');
  }

  receiveMessage($event: any) {
    this.count++;
    this.itemDetails.push($event);
    this.name = this.itemDetails[0];
    this.price = this.itemDetails[1];
    this.itemType = this.itemDetails[2];

    if ($event === 'dismiss') {
      this.closeAddItemDialog();
      this.clearList();
      return;
    }

    if (this.count === 3) {
      this.count = 0;
      this.addItems();
      this.clearList();
    }
    this.closeAddItemDialog();
  }

  receiveMsgDelete($event: any) {
    this.removeItems($event);
  }

  closeAddItemDialog() {
    this.addItem = false;
  }

  onRightClickPizza(event, index: number) {
    this.onrightClick(event, index);
    this.pizza = true;
  }

  onRightClickSide(event, index: number) {
    this.onrightClick(event, index);
    this.side = true;
  }

  onRightClickDrink(event, index: number) {
    this.onrightClick(event, index);
    this.drink = true;
  }

  // activates the menu with the coordinates
  onrightClick(event, index: number) {
    this.contextmenuX = event.clientX;
    this.contextmenuY = event.clientY;
    this.contextmenu = true;
    this.index = index;
  }

  // disables the menu
  disableContextMenu() {
    this.contextmenu = false;
  }

  logout(): void {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addItems() {
    if (this.price[0] !== '$') {
      this.price = '$' + this.price;
    }

    if (this.itemType === 'Main') {
      this.pizzas.push([this.name, ' ' + this.price]);
    } else if (this.itemType === 'Side') {
      this.sides.push([this.name, ' ' + this.price]);
    } else if (this.itemType === 'Drink') {
      this.drinks.push([this.name, ' ' + this.price]);
    }
  }

  removeItems(index: any) {
    if (index === typeof String) {
      index = +index;
    }

    if (this.pizza) {
      this.pizzas.splice(index, 1);
      this.pizza = false;
    } else if (this.side) {
      this.sides.splice(index, 1);
      this.side = false;
    } else if (this.drink) {
      this.drinks.splice(index, 1);
      this.drink = false;
    }
  }

  showAddItemDialog() {
    this.addItem = true;
  }

  clearList() {
    this.itemDetails.splice(0, this.itemDetails.length);
  }
}