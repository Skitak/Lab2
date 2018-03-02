import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Item } from './model/Item';
import { ShopService } from './shop.service';

@Injectable()
export class BasketService {

  products : number[];

  constructor(private _shop: ShopService){
      //If there is no basket session create one
      if (!localStorage.basket){
          this.products = [];
          this.saveModifications();
      }
      else{
          //else get the products in session
          this.products = (JSON.parse(localStorage.getItem("basket"))).produits;
      }
  }

  //Add a product then save in session
  public addItem (id:number) : void {
      this.products.push(id);
      this.products.sort();
      this.saveModifications();
  }

  //Remove a product then save in session
  public removeItem (id:number) : void {
      let index = this.products.indexOf(id);
      if (index != -1)
          this.products.splice(index);
      this.saveModifications();
  }

  //Save all the products in the session
  private saveModifications() : void {
      localStorage.setItem("basket", JSON.stringify({produits :this.products}));
  }

  //Get a product from the shop with ID
  public getItemFromId(id:number) : Item {
      return this._shop.products[String(id)];
  }

  //Empty the basket then save in session
  public clear(){
      this.products = [];
      this.saveModifications();
  }

  //Get all the items in the basket and convert them in itemModel
  public getItems(): Item[] { 
      let items:Item[] = [];
      this.products.forEach(element => {
          items.push(this.getItemFromId(element));
      });
      return items;
  }

  public getProductsFromPage(page:number) : Item[]{
    let items:Item[] = [];
    let index = 0;
    let minIndexRange = (page - 1) * 10;
    let maxIndexRange = page * 10;
    this.products.forEach(element => {
        if (index >= minIndexRange && index < maxIndexRange && this.getItemFromId(element) != null){
          items.push(this.getItemFromId(element));
        }
        index++;
    });
    return items;
}

public getPages(): number[]{
  let pages: number[] = [];
  for (let i = 0; i < this.products.length / 10; i++){
    pages[i] = i + 1;
  }
  return pages;
}

}
