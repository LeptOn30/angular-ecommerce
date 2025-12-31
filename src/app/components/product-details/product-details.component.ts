import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  category: ProductCategory = new ProductCategory();

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })

  }


  handleProductDetails() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductCategory(productId).subscribe(
      data => {
        this.category = data;
      });

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      });
    
  }

  addToCart(productToCart: Product) {
    console.log(`Adding to cart from detail page: ${productToCart.name}, ${productToCart.unitPrice}`);

    const theCartItem = new CartItem(productToCart);

    // Reuse the addToCart method of CartService
    this.cartService.addToCart(theCartItem);
    
  }

}
