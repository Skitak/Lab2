import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { ShopService } from '../shop.service';
import { Item } from '../model/Item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css'],
  providers: [ConnectionService]
})

export class ConnectionComponent implements OnInit {
  isConnected: boolean;
  items: Item[];
  userNickname: string;
  userPassword: string;
  constructor(private _connection: ConnectionService, private _shop: ShopService, private router: Router) { }

  ngOnInit() {
    this.isConnected = this._connection.isConnected();
    this.items = this._shop.getProducts();
  }

  tryConnect(){
    if (this._connection.login(this.userNickname, this.userPassword))
      location.reload();
    else
      alert("Mauvais combinaison (admin, admin)");
  }

  modify(id:number){
    this.router.navigate(["/edit/" + id]);
  }

  delete(id:number){
    if (confirm("Voulez-vous vraiment supprimer cet article?")){
      this._shop.removeItem(id);
      location.reload();
    }
  }

  addProduct(){
    this._shop.addRandomItem();
    location.reload();
  }

  deconnect(){
    this._connection.deconnect();
    location.reload();
  }

}
