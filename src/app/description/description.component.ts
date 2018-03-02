import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { ShopService } from '../shop.service';
import { Item } from '../model/Item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  providers: [BasketService]
})
export class DescriptionComponent implements OnInit {
  item:Item;
  id:number;

  constructor(private _shop: ShopService, private router: Router ,private route: ActivatedRoute, private _basket: BasketService) { }

  ngOnInit() {
    this.route.params.subscribe( res => {this.id = res.id;});
    this.item = this._shop.getItemFromId(this.id);
  }

  ajouterPanier(id:number){
    alert("Vous avez ajouté ce produit dans votre pannier");
    this._basket.addItem(id);
    this.router.navigate([""]);

  }

}
