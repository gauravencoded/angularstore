'use strict';
function Cart() {
  return {
    'cartId': '',
    'cartItem': []
  };
}
// custom service maintains the cart along with its behavior to clear itself , create new , delete Item or update cart
 
app.value('sessionService', {
  cart: new Cart(),
  clear: function() {
    this.cart = new Cart();
    // mechanism to create the cart id 
    this.cart.cartId = 1;
  },
  save: function(session) {
    this.cart = session.cart;
  },
  updateCart: function(productId, productQty) {
    this.cart.cartItem.push({
      'productId': productId,
      'productQty': productQty
    });
  },
//delete Item and other cart operations function goes here...
});