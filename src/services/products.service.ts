import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';

import { Product } from '../components/product/product';



@Injectable()
export class ProductService {

    private baseUrl: string = 'http://localhost:8080/store/';
    
    constructor(private http: Http) { }

    getProducts(param: String): Observable<Product[]> {

        if (!param) param = 'ALL';
        const url = `${this.baseUrl}search/${param}`;
        return this.http.get(url).map(res => res.json());
    }

    getProduct(id:String):Observable<Product> {
        const url = `${this.baseUrl}product/detail/${id}`;
        return this.http.get(url).map(res => res.json());
    }

    updateProduct(pto: Product):Observable<number> {
        const url = `${this.baseUrl}product/update`;
        return this.http.post(url, pto)
            .map(success => success.status)
            .catch(this.handleError);
    }

    deleteProduct(id: number) {
        const url = `${this.baseUrl}product/delete/${id}`;
        return this.http.delete(url);
    }

    // Private methods
    private handleError(error: any): Promise<any> {
        console.error('An Error has been found: ', error);
        return Promise.reject(error.message || error);
    }

}