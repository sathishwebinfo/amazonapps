import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck, OnInit {
  title = 'amazonapp';
  isMenuRequired = false;
  isAdminUser = false;
  public totalItem : number = 0;
  public searchTerm !: string;
  constructor(
    private _router: Router,
    private _service: AuthService,
    private cartService : CartService
  ) { }
  ngDoCheck(): void {
    let currentUrl = this._router.url;
    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
    if(this._service.getUserRole()==='admin'){
      this.isAdminUser = true;
    }else{
      this.isAdminUser = false;
    }
  }
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
    
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
}
