angular.module('ngCart.directives', [
	'ngCart',
	'ngCart.fulfilment'
])

	.controller('CartController', ['$scope', 'ngCart', 'CartAPI', 'devHelper', 'ngCartItem', '$rootScope', 'store',
		function ($scope, ngCart, CartAPI, devHelper, ngCartItem, $rootScope, store) {

			$scope.ngCart = ngCart;

			/*********************
			 *  Private Variables
			 **********************/
			// reference to this controller


			/*********************
			 *  Public Variables
			 **********************/
			var that = this;

			function _init() {
				_onRefresh();

				ngCart.setTaxRate(7.5);
				// ngCart.setShipping(2.99);
			}

			/*********************
			 *  Private Functions
			 **********************/
			function _onRefresh() {
				$rootScope.$on('ngCart:change', function () {
					ngCart.$save();
				});

				if (angular.isObject(store.get('cart')) || !_.isEmpty($rootScope.currentUser)) {
					that.restore(store.get('cart'));

				} else {
					devHelper.log('You do not have a cart yet');
					ngCart.init();
					$scope.isCartReady = true;
				}
			}

			this.restore = function (storedCart) {

				// ngCart.$cart.shipping = storedCart.shipping;
				// ngCart.$cart.tax = storedCart.tax;
				if (!_.isEmpty($rootScope.currentUser)) {
					CartAPI.list().then(function (response) {
						devHelper.log('successfully retrieved cart information from db');
						devHelper.log(response);
						ngCart.initDb(response);

						// Iterate through each item in cart session and create a new instance of ngCartItem for each one
						// technically, every time page is refreshed, new items(in local storage) are being added to cart
						angular.forEach(response, function (cart) {
							angular.forEach(cart.items, function (item) {
								ngCart.$cart[item.kitchenId].items.push(new ngCartItem(item.id, item.name, item.eachPrice, item.quantity, item.data, item.kitchenId));
							});
						});

						devHelper.log('restored cart from db: ');
						devHelper.log(ngCart.getCart());
						ngCart.setTaxRate(7.5);
						that.carts = ngCart.getCart();
						$scope.isCartReady = true;

					}, function (response) {
						// TODO handle error state
						devHelper.log(response, 'error');
					});

				} else {
					ngCart.init(storedCart);
					devHelper.log('Retrieving cart from local storage..');
					devHelper.log('storageCart: ');
					devHelper.log(storedCart);
					// Iterate through each item in cart session and create a new instance of ngCartItem for each one
					// technically, every time page is refreshed, new items(in local storage) are being added to cart

					if (storedCart) {
						for (var key in storedCart) {
							angular.forEach(storedCart[key].items, function (item) {
								devHelper.log('stroedCart key: ' + key);
								var storedItem = new ngCartItem(item._id, item._name, item._price, item._quantity, item._data, item._kitchenId);
								devHelper.log(ngCart.$cart);
								ngCart.$cart[key].items.push(storedItem);
								// ngCart.$cart[1].items.push(new ngCartItem(item._id, item._name, item._price, item._quantity, item.data));
							});
						}
					}
					that.carts = ngCart.getCart();
					ngCart.$save();
					$scope.isCartReady = true;
				}

			};

			function _updateQty(inCart, quantity, relative) {

				devHelper.log(inCart);
				var quantityInt = parseInt(quantity);

				// for modifying qty from cart.html
				if (relative === true) {

					inCart._quantity += quantityInt;
					devHelper.log(inCart._name + ' quantity in cart is updated to ' + inCart._quantity);

					// for adding the same item with different qty
				} else {
					inCart._quantity = quantityInt;
					devHelper.log(inCart._name + ' qty is set to ' + quantity);

				}

				if (!_.isEmpty($rootScope.currentUser)) {
					CartAPI.update(inCart._id, inCart._quantity).then(function (response) {
						devHelper.log(response);
						devHelper.log(inCart._name + ' in cart is successfully updated');
					}, function (response) {
						// TODO handle error state
						devHelper.log(response, 'error');
					});
				}

				$rootScope.$broadcast('ngCart:change', {});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.updateQty = _updateQty;

			this.addItem = function (id, name, price, quantity, data, kitchenId) {
				ngCart.init(store.get('cart'), kitchenId);
				var inCart = ngCart.getItemById(id, kitchenId);

				// if the item is already in cart
				if (typeof inCart === 'object') {

					_updateQty(inCart, quantity, false);

					// for a new item
				} else {
					// create a new instance of cart item
					var newItem = new ngCartItem(id, name, price, quantity, data, kitchenId);

					// store it into $cart object
					devHelper.log('trying to push item to cart.. ');
					devHelper.log(newItem);
					ngCart.$cart[kitchenId].items.push(newItem);

					devHelper.log('new item added to cart ' + kitchenId);
					devHelper.log(ngCart.$cart);

					$rootScope.$broadcast('ngCart:itemAdded', newItem);
					ngCart.$save();

					devHelper.log('check if cart is saved to storage');
					devHelper.log(store.get('cart'));

					if (!_.isEmpty($rootScope.currentUser)) {
						CartAPI.create(id, quantity).then(function (response) {
							devHelper.log('a new item is successfully added to Cart');
							devHelper.log(response);
						}, function (response) {
							// TODO handle error state
							devHelper.log(response, 'error');
						});
					}

				}
				$scope.isInCart = true;
				$rootScope.$broadcast('ngCart:change', {});
			};

			this.removeItemById = function (id, kitchenId) {
				devHelper.log('trying to remove item of dish ' + id);

				var cart = ngCart.getCart(kitchenId);
				angular.forEach(cart.items, function (item, index) {
					devHelper.log(item);
					if (item.getId() === id) {
						cart.items.splice(index, 1);
						devHelper.log(item._name + ' is successfully removed from cart');
					}
				});
				ngCart.$cart[kitchenId] = cart;
				ngCart.setCart(ngCart.getCart());

				$rootScope.$broadcast('ngCart:itemRemoved', {});
				$rootScope.$broadcast('ngCart:change', {});

				// remove the cart object if no items exist
				if (ngCart.getTotalItems(kitchenId) == 0) {
					devHelper.log('removing cart of kitchen ' + kitchenId + ' since there is no more item left');
					delete ngCart.$cart[kitchenId];
					devHelper.log(ngCart.getCart());
				}

				// remove all cart objects if total # items are zero
				if (ngCart.getTotalItems() == 0) {
					devHelper.log('total # items are zero - empty cart object');
					ngCart.setCart({});
					devHelper.log(ngCart.getCart());
				}

				if (!_.isEmpty($rootScope.currentUser)) {
					CartAPI.destroy(id).then(function (response) {
						devHelper.log('dish ' + id + ' is successfully removed from cart db');
						devHelper.log(response);
					}, function (response) {
						// TODO handle error state
						devHelper.log(response, 'error');
					});
				}
				$scope.isInCart = false;

			};

			/*********************
			 *  Initialization
			 **********************/
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}]);