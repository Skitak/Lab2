import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Item } from './model/Item';

@Injectable()
export class ShopService {

  products : Item[];

    constructor(){
        //If there is no shop on session create one
        if (!localStorage.shop)
            this.createDatabase();
        else{
            //else load the products in session
            this.products = (JSON.parse(localStorage.getItem("shop"))).produits;
        }
    }

    public test(){
        console.log("ola");
    }

    //Add an item then save in session
    public addItem (name:string, image:string, price:number, description:string) {
        let id = Number(localStorage.lastId);
        this.products[id] =  new Item(
            id,
            "produit " + id,
            "/assets/images/img"+(Math.floor(Math.random() * 10) + 1)+".jpg",
            price,
            description
        );
        this.saveModifications();
        id++;
        localStorage.lastId = id;
    }

    //Add an item with random infos
    public addRandomItem(){
        this.addItem(
            "nouveau produit ",
            "/assets/images/img"+(Math.floor(Math.random() * 10) + 1)+".jpg",
            10,
            "nouvel objet ajouté récement");
    }

    //Remove an item then save in session
    public removeItem (id:number) {
        delete this.products[id];
        this.saveModifications();
    }

    //Modify an item then save in session
    public modifyItem (id:number, name:string, image:string, price:number, description:string) {
        let item:Item =  this.products[String(id)];
        item.nom = name;
        item.description = description;
        item.prix = price;
        this.saveModifications();
    }

    //Save all items in session
    private saveModifications () {
        localStorage.setItem("shop", JSON.stringify({ produits: this.products}));
    }

    public getProducts() : Item[]{
        let products:Item[] = [];
        this.products.forEach(function(element){
            if(element != null)
                products.push(element);
        })
        return products;
    }

    public getProductsFromPage(page:number) : Item[]{
      let products:Item[] = [];
      let index = 0;
      let minIndexRange = (page - 1) * 10;
      let maxIndexRange = page * 10;
      this.products.forEach(function(element){
          if(element != null){
            if (index >= minIndexRange && index < maxIndexRange){
              products.push(element);
            }
            index++;
          }
      });
      return products;
  }

  public getPages(): number[]{
    let pages: number[] = [];
    for (let i = 0; i < this.products.length / 10; i++){
      pages[i] = i + 1;
    }
    return pages;
  }

    //Create a shop in session with random items
    private createDatabase(){
        this.products = [];

        for (let i = 0; i < 100; i++)
            this.products[i] = new Item(
                i,
                "produit " + (i + 1),
                "/assets/images/img"+(Math.floor(Math.random() * 10) + 1)+".jpg",
                (i * 3 + 12 * 1 - 2) % 1026,
                "description du produit " + (i + 1)
            );
        localStorage.setItem("shop", JSON.stringify({ produits: this.products}));
        localStorage.setItem("lastId", "100");
    }

    //Find an item by ID
    public getItemFromId(id:number) : Item{
        return this.products[id];
    }

}
