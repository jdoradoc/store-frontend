import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/products.service';
import { Product } from '../../components/product/product';

@Component({
  selector: 'product-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  title;

  myform: FormGroup;

  product: Product = new Product();

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) 
  {
    this.myform = formBuilder.group({
      name: ['', [
          Validators.required,
          Validators.minLength(50)
        ]
      ],
      amount: ['', [
          Validators.required,
          Validators.minLength(50)
        ]
      ],
      category: ['', [
          Validators.required,
          Validators.minLength(100)
        ]
      ]
    });
  }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
      this.title = id ? 'EDIT PRODUCT' : 'NEW PRODUCT';
      this.productService.getProduct(id)
          .subscribe(
            product => this.product = product
          );
    });
  }

  save() {
    this.product.name = this.myform.value.name;
    this.product.amount = this.myform.value.amount;
    this.product.category = this.myform.value.category;

    this.productService.updateProduct(this.product).subscribe(data => this.router.navigate(['/products']));

  }

  back() {
    this.router.navigate(['/products']);
  }
}
