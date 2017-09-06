import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { FormComponent } from '../form/form.component';

import { ProductService } from '../../services/products.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule
  ],
  declarations: [
    ProductsComponent,
    FormComponent
  ],
  exports: [
    ProductsComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
