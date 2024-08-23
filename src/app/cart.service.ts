import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  CartData: any = [];
  constructor() {}

  addingCart(product: any) {
    // this.movies.push(newMovie);
    // this.CartData.push(product);
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex(
      (item: { id: any }) => item.id === product.id
    );

    if (existingProductIndex >= 0) {
      // Product already in cart, increment quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // Add new product to cart
      product.quantity = 1; // Initialize quantity
      console.log(product);
      this.CartData.push(product);
    }
  }
}
