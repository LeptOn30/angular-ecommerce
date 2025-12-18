import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'http://localhost:8080/api/v1';


  constructor(private httpClient: HttpClient) {}

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetProductListResponse>(searchUrl)
      .pipe(map(response => response._embedded.products));

  }
  
  getProductCategoryList(): Observable<ProductCategory[]> {
    const searchUrl = `${this.baseUrl}/product-category`;

    return this.httpClient.get<GetProductCategoryListResponse>(searchUrl)
      .pipe(map(response => response._embedded.productCategory));

  }

}

interface GetProductListResponse {
  _embedded: {
    products: Product[];
  };
}

interface GetProductCategoryListResponse {
  _embedded: {
    productCategory: ProductCategory[];
  };
}

