import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from '../components/product/products.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: ProductsComponent },
  { path: 'products', component: ProductsComponent }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
