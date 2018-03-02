import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnectionComponent } from './connection/connection.component';
import { BasketComponent } from './basket/basket.component';
import { DescriptionComponent } from './description/description.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home/:page',
    component: HomeComponent
  },
  {
    path: 'basket',
    component: BasketComponent
  },
  {
    path: 'basket/:page',
    component: BasketComponent
  },
  {
    path: 'connection',
    component: ConnectionComponent
  },
  {
    path: 'item/:id',
    component: DescriptionComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
