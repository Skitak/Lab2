import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { BasketService } from '../basket.service';
import { Router } from '@angular/router';
import { Item } from '../model/Item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BasketService]
})
export class HomeComponent implements OnInit {

  page: number;
  pages: number[];
  items: Item[]; 

  constructor(private route: ActivatedRoute, private router: Router, private _shop: ShopService, private _basket: BasketService) { 
    this.route.params.subscribe(res => {this.page = res.page;});

    if (!this.page)
      this.page = 1;
  }

  ngOnInit() {
    this.items = this._shop.getProductsFromPage(this.page);
    this.pages = this._shop.getPages();
  }

  isPageActive(page:number): string{
    if (page == this.page)
      return "active";
    return "";
  }

  changePage(page: number){
    this.page = page;
    this.router.navigate(["/home/" + page]);
    location.reload();
  }

  addItemToBasket(id: number){
    this._basket.addItem(id);
    alert("Le produit a été ajouté au panier.");
  }

  preview(){
    this.changePage(this.page - 1);
  }

  next(){
    this.page++;
    this.changePage(this.page);
    // console.log(this.page);       // retourne 7
    // console.log(this.page + 1);   //  retourne 71 ... 
  }

  description(id:number) {
    this.router.navigate(["/item/" + id]);
  }

}
