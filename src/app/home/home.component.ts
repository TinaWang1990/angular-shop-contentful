import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service'
import { Entry } from 'contentful';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  cart = [];
  inCart = [] as any;
  private products: Entry<any>[] = [];
  items = [] as any;
  visual = false;
  show = false;
  tnumber = 0;
  sum = 0;
  tips = "add to bag";
  buttons = [];
  buttonsDOM = [];
  constructor(private config: ConfigService) { }

  ngOnInit() {
    this.config.getProducts()
      .then(products => this.products = products)

    this.config.logContent()

    this.inCart = this.getCart();
    console.log(this.inCart);
    this.setCartValue(this.inCart);
  }

  storeProd() {
    localStorage.setItem("products", JSON.stringify(this.products));
    console.log(localStorage.getItem('products'));
  }
  saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  getCart() {
    return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  }

  setCartValue(cart) {
    this.tnumber = cart.length;
    let tempTotal = 0;
    document.addEventListener("DOMContentLoaded", function () {
      // var cartBtn = document.getElementsByClassName("bag-btn");
      // this.buttonsDOM = cartBtn;
      // console.log(this.buttonsDOM);
      // console.log(this.buttonsDOM[6]);
      var cartBtn = document.getElementsByTagName("button").namedItem('7')

      console.log(cartBtn);
      // cart.forEach(item => {
      //   var cartBtn = document.getElementsByTagName("button").namedItem('7');
      //   console.log(item.sys.id);
      //   console.log(cartBtn);
      //   // this.buttonsDOM[item.sys.id - 1].innerText = "in cart";
      // });
    })
    cart.forEach(item => {
      tempTotal += item.fields.price * item.fields.amount;
    });
    this.sum = parseFloat(tempTotal.toFixed(2));
  }

  addCart(event) {
    // console.log(this.products);
    this.products.forEach((item)=> console.log(item.fields))
    this.items = this.products;
    //get target info
    var target = event.currentTarget;
    console.log(target.id);
    //check item is selcted 
    let cart = this.inCart.find(item => item.sys.id == target.id);
    if (cart) {
      target.disabled = true;
    } else {
      
      var selectItem = this.items.find(item => item.sys.id = target.id);
      console.log(selectItem.fields);
      selectItem.fields.amount = 1;
     
      //disable button
      target.disabled = true;

      // change button text
      target.innerText = "in cart";
      //add to cart
      this.inCart.push(selectItem);
      console.log(this.inCart);
      //save in local
      // this.saveCart(this.inCart);
      // this.setCartValue(this.inCart);
    }

  }

  clearCart() {
    this.inCart = [];
    this.sum = 0;
    this.tnumber = 0;
    this.saveCart(this.inCart);
  }
  showCart() {
    this.visual = true;
    this.show = true;
  }
  hideCart() {
    this.visual = false;
    this.show = false;
  }

  removeItem(event) {
    var target = event.currentTarget || event.target;

    this.inCart = this.inCart.filter(item => item.sys.id !== target.id);
    var cartBtn = document.getElementsByClassName("bag-btn");
    cartBtn[target.id - 1].innerHTML = `<img src="https://img.icons8.com/carbon-copy/100/000000/shopping-cart.png">
    <span class="btn-innerText">add to bag</span>`;
    cartBtn[target.id - 1].removeAttribute('disabled');

    this.setCartValue(this.inCart);
    this.saveCart(this.inCart);
  }

  addAmount(event) {
    var target = event.currentTarget || event.target;
    let selectItem = this.inCart.find(item => item.sys.id == target.id);
    selectItem.fields.amount = selectItem.fields.amount + 1;
    this.saveCart(this.inCart)
    this.setCartValue(this.inCart)
  }
  cutAmount(event) {
    var target = event.currentTarget || event.target;
    let selectItem = this.inCart.find(item => item.sys.id == target.id);
    if (selectItem.fields.amount > 1) {
      selectItem.fields.amount = selectItem.fields.amount - 1;
    } else {
      selectItem.fields.amount = 1;
    }
    this.saveCart(this.inCart)
    this.setCartValue(this.inCart)
  }
}
