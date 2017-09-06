import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from './product';

import { ProductService } from '../../services/products.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  title = 'List of Foods';
  
  products:Product[] = [];

  searchBox:String;

  constructor(private productService: ProductService,
    private router: Router) { }


  ngOnInit() {
    this.productService.getProducts(this.searchBox).subscribe(data => this.products = data);
  }


  // Get all the available products
  public search(term): void {
    this.searchBox = term;
    this.productService.getProducts(this.searchBox).subscribe(data => this.products = data);
  }

  // Forward to Product form
  public addProduct(): void {
    this.router.navigate(['/product/new']);
  }

  // Delete an existed product
  deleteProduct(pto){
    if (confirm("Are you sure you want to delete " + pto.name + "?")) {
      var index = this.products.indexOf(pto);
      this.products.splice(index, 1);

      this.productService.deleteProduct(pto.id).subscribe(null,
                err => {
                  alert("An error has found.");
                  this.products.splice(index, 0, pto);
                });
      }
  }

  // View he details of a Product
  public detailProduct(pto: Product): void {
    this.router.navigate(['/product/detail', pto.id]);
  }

}
