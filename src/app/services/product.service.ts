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

  getProduct(productId: number): Observable<Product> {
    const searchUrl = `${this.baseUrl}/products/${productId}`;
    
    return this.httpClient.get<Product>(searchUrl);
  }

  getProductCategory(productId: number): Observable<ProductCategory> {
    const searchUrl = `${this.baseUrl}/products/${productId}/category`;
    
    return this.httpClient.get<ProductCategory>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);

  }
  
  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${keyword}`;

    return this.getProducts(searchUrl);

  }

  private getProducts(searchUrl: string): Observable<Product[]> {
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

