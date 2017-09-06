import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from '../route/route.component';
import { FormsModule }   from '@angular/forms';

import { ProductsRouting }   from '../components/product/products-route.component';
import { ProductModule }   from '../components/product/product.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ProductsRouting,
    ProductModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
