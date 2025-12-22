import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false; 

  currentPage: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;
  previousKeyword: string = '';


  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }


  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.currentPage - 1, this.pageSize, this.currentCategoryId)
                        .subscribe(this.paginateResult());
  }


  handleSearchProducts() {

    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != keyword) {
      this.currentPage = 1;
    }

    this.previousKeyword = keyword;

    this.productService.searchProductsPaginate(this.currentPage - 1, this.pageSize, keyword)
                        .subscribe(this.paginateResult());
  }


  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.currentPage = 1;
    this.listProducts();
  }

  paginateResult() {
    return (data:any) => {
      this.products = data._embedded.products;
      this.currentPage = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }


}
