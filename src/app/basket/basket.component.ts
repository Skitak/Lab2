import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { BasketService } from '../basket.service';
import { Router } from '@angular/router';
import { Item } from '../model/Item';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  providers: [BasketService]
})
export class BasketComponent implements OnInit {
  page: number;
  pages: number[];
  items: Item[]; 

  constructor(private route: ActivatedRoute, private router: Router, private _shop: ShopService, private _basket: BasketService) { 
    this.route.params.subscribe(res => {this.page = res.page;});

    if (!this.page)
      this.page = 1;

  }

  ngOnInit() {

    this.items = this._basket.getProductsFromPage(this.page);
    // this.items = this._basket.getItems();
    this.pages = this._basket.getPages();
  }

  isPageActive(page:number): string{
    if (page == this.page)
      return "active";
    return "";
  }

  changePage(page: number){
    this.page = page;
    this.router.navigate(["/basket/" + page]);
    location.reload();
  }

  removeItemFromBasket(id:number) {
    if (confirm("Voulez-vous vraiment retirer le produit?")){
      this._basket.removeItem(id);
      location.reload();
    }
  }

  description(id:number){
    this.router.navigate(["/item/" + id]);
  }

  preview(){
    this.changePage(this.page - 1);
  }

  next(){
    this.page++;
    this.changePage(this.page);
  }

}
