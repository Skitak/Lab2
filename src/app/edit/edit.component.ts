import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../model/Item';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  item: Item;

  itemName: string;
  itemImage: string;
  itemDescription: string;
  itemPrice: number;

  id: number;
  constructor(private route: ActivatedRoute, private router: Router, private _shop: ShopService) { }

  ngOnInit() {
    this.route.params.subscribe(res =>{this.id = res.id;});
    this.item = this._shop.getItemFromId(this.id);
    this.itemName = this.item.nom;
    this.itemImage = this.item.image;
    this.itemPrice = this.item.prix;
    this.itemDescription = this.item.description;
  }

  validate(){
    if (this.itemName != "" && this.itemImage != "" && this.itemDescription != "" && this.itemPrice !== null){
      this._shop.modifyItem(this.id, this.itemName, this.itemImage, this.itemPrice, this.itemDescription);
      this.router.navigate(["/connection"]);
    }
  }

}
