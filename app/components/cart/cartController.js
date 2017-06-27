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
				ngCart.setShipping(2.99);
			}

			/*********************
			 *  Private Functions
			 **********************/
			function _onRefresh() {
				console.log('Cart initialized');
				$rootScope.$on('ngCart:change', function () {
					ngCart.$save();
				});

				if (angular.isObject(store.get('cart'))) {
					that.restore(store.get('cart'));

				} else {
					devHelper.log('new cart is created');
					ngCart.init();
				}
			}

			this.restore = function (storedCart) {
				ngCart.init();
				ngCart.$cart.shipping = storedCart.shipping;
				ngCart.$cart.tax = storedCart.tax;

				if ($rootScope.currentUser) {
					CartAPI.list().then(function (response) {

						devHelper.log('successfully retrieved cart information from db');
						devHelper.log(response);
						storedCart = response;

						// Iterate through each item in cart session and create a new instance of ngCartItem for each one
						// technically, every time page is refreshed, new items(in local storage) are being added to cart
						angular.forEach(storedCart.items, function (item) {
							ngCart.$cart.items.push(new ngCartItem(item.id, item.name, item.eachPrice, item.quantity, item.data));
						});

					}, function (response) {
						// TODO handle error state
						console.error(response);
					});

				} else {
					devHelper.log('Retrieving cart from local storage..');

					devHelper.log(storedCart);
					// Iterate through each item in cart session and create a new instance of ngCartItem for each one
					// technically, every time page is refreshed, new items(in local storage) are being added to cart
					angular.forEach(storedCart.items, function (item) {
						ngCart.$cart.items.push(new ngCartItem(item._id, item._name, item._price, item._quantity, item.data));
					});
				}

				ngCart.$save();
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

				if ($rootScope.currentUser) {
					CartAPI.update(inCart._id, inCart._quantity).then(function (response) {
						devHelper.log(response);
					}, function (response) {
						// TODO handle error state
						console.error(response);
					});
				}

				$rootScope.$broadcast('ngCart:change', {});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.updateQty = _updateQty;

			this.addItem = function (id, name, price, quantity, data) {

				var inCart = ngCart.getItemById(id);

				// if the item is already in cart
				if (typeof inCart === 'object') {

					console.log('item in cart is ');
					devHelper.log(inCart);

					_updateQty(inCart, quantity, false);

					if ($rootScope.currentUser) {
						CartAPI.update(id, quantity).then(function (response) {
							devHelper.log(name + ' in cart is successfully updated');
							devHelper.log(response);
						}, function (response) {
							// TODO handle error state
							console.error(response);
						});
					}

					// for a new item
				} else {
					var newItem = new ngCartItem(id, name, price, quantity, data);
					ngCart.$cart.items.push(newItem);
					$rootScope.$broadcast('ngCart:itemAdded', newItem);

					if ($rootScope.currentUser) {
						CartAPI.create(id, quantity).then(function (response) {
							devHelper.log('item is successfully added to Cart');
							devHelper.log(response);
						}, function (response) {
							// TODO handle error state
							console.error(response);
						});
					}

				}

				$rootScope.$broadcast('ngCart:change', {});
			};

			this.removeItemById = function (id) {
				console.log('removeItem');
				var cart = ngCart.getCart();
				angular.forEach(cart.items, function (item, index) {
					if (item.getId() === id) {
						cart.items.splice(index, 1);
						devHelper.log(item._name + ' is successfully removed from cart');
					}
				});
				ngCart.setCart(cart);

				$rootScope.$broadcast('ngCart:itemRemoved', {});
				$rootScope.$broadcast('ngCart:change', {});

				if ($rootScope.currentUser) {
					CartAPI.destroy(id).then(function (response) {
						devHelper.log('dish ' + id + ' is successfully removed from cart db');
						devHelper.log(response);
					}, function (response) {
						// TODO handle error state
						console.error(response);
					});
				}

			};

			/*********************
			 *  Initialization
			 **********************/
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}]);