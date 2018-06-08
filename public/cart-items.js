"use strict";

const cartItems = {
  template: `
  <div>
    <section ng-repeat="item in $ctrl.cart-list">
      <input type="text" ng-blur="$ctrl.updateItem(item)" ng-model="item.product">
      <input type="text" ng-blur="$ctrl.updateItem(item)" ng-model="item.price">
      <input type="text" ng-blur="$ctrl.updateItem(item)" ng-model="item.quantity">
      <a href="" ng-click="$ctrl.deleteItem(item.id);">X</a>
    </section>
  </div>
  <form ng-submit="$ctrl.addItem($ctrl.newItem);">
    <input type="text" placeholder="Product" ng-model="$ctrl.newItem.product">
    <input type="text" placeholder="Price" ng-model="$ctrl.newItem.price">
    <input type="text" placeholder="Quantity" ng-model="$ctrl.newItem.quantity"> 
    <button>Submit</button>
  </form>
  `,
  controller: ["CartService", function(CartService) {
    const vm = this;
    CartService.getAllItems().then((response) => {
      vm.cartList = response.data;
    });
    vm.addItem = (newItem) => {
      CartService.addItem(newItem).then((response) => {
        vm.cartList = response.data;
      });
      vm.newItem = {};
    }
    vm.deleteItem = (id) => {
      CartService.deleteItem(id).then((response) => {
        vm.cartList = response.data;
      });
    }
    vm.updateItem = (item) => {
      CartService.updateItem(item).then((response) => {
        vm.cartList = response.data;
      })
    }
  }] 
} 

angular
  .module("app")
  .component("cartItems", cartItems);