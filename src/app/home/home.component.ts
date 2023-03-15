import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bannerimg: string = "./assets/img/banner-1.jpg";
  objArray: Array<any> = [
    { proName: "Product 1", imgUrl: './assets/img/product-item-1.jpg' },
    { proName: "Product 2", imgUrl: './assets/img/product-item-2.jpg' },
    { proName: "Product 3", imgUrl: './assets/img/product-item-3.jpg' },
    { proName: "Product 4", imgUrl: './assets/img/product-item-1.jpg' },
    { proName: "Product 5", imgUrl: './assets/img/product-item-2.jpg' },
  ]
  
  constructor() {

  }
  ngOnInit(): void {

  }
}
