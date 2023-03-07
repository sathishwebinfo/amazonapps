import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'amazonapp';
  bannerimg : string ="./assets/img/banner-1.jpg";
  objArray: Array<any> = [
    { proName: "Product 1", imgUrl: './assets/img/product-item-1.jpg' },
    { proName: "Product 2", imgUrl: './assets/img/product-item-2.jpg' },
    { proName: "Product 3", imgUrl: './assets/img/product-item-3.jpg' },
    { proName: "Product 4", imgUrl: './assets/img/product-item-1.jpg' },
    { proName: "Product 5", imgUrl: './assets/img/product-item-2.jpg' },
  ]
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['Next', 'Prev'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  constructor() {

  }
  ngOnInit(): void {

  }
}
