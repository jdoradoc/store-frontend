import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from '../form/form.component';

const productRoutes: Routes = [
  { path: 'product/new', component: FormComponent, pathMatch: 'full' },
  { path: 'product/detail/:id', component: FormComponent}
];

export const ProductsRouting = RouterModule.forChild(productRoutes);