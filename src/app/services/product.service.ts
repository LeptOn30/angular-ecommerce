import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'http://localhost:8080/api/v1/products';
  private httpClient!: HttpClient


  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl)
      .pipe(map(response => response._embedded.products));

  }
  
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}

