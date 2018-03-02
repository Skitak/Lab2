import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ShopService } from './shop.service';
import { BasketService } from './basket.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/basket.component';
import { ConnectionComponent } from './connection/connection.component';
import { DescriptionComponent } from './description/description.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BasketComponent,
    ConnectionComponent,
    DescriptionComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ShopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
