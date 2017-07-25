angular.module('ngCart.directives', [
	'ngCart',
	'ngCart.fulfilment'
])

	.controller('CartController', ['$scope', 'ngCart', 'CartAPI', 'devHelper', 'ngCartItem', '$rootScope', 'store', 'genericService',
		function ($scope, ngCart, CartAPI, devHelper, ngCartItem, $rootScope, store, genericService) {

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

						angular.forEach(response, function (cart) {
							angular.forEach(cart.items, function (item) {
								ngCart.$cart[item.kitchenId].items.push(new ngCartItem(item.id, item.name, item.eachPrice, item.quantity, item.data, item.kitchenId));
							});
						});

						ngCart.checkEmptyCart();
						that.carts = ngCart.getCart();
						devHelper.log('restored cart from db: ');
						devHelper.log(that.carts);
						ngCart.setTaxRate(7.5);
						$scope.isCartReady = true;

					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
					});

				} else {
					ngCart.init(storedCart);
					devHelper.log('Retrieving cart from local storage..');
					devHelper.log('storageCart: ');
					devHelper.log(storedCart);

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

					ngCart.checkEmptyCart();
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

				} else {
					// for adding the same item with different qty
					inCart._quantity = quantityInt;
					devHelper.log(inCart._name + ' qty is set to ' + quantity);

				}
				$rootScope.$broadcast('ngCart:change', {});

				if (!_.isEmpty($rootScope.currentUser)) {
					CartAPI.update(inCart._id, inCart._quantity).then(function (response) {
						devHelper.log(response);
						devHelper.log(inCart._name + ' in cart is successfully updated');
					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
					});
				}

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

					ngCart.checkEmptyCart(kitchenId);
					$scope.isInCart = true;
					$rootScope.$broadcast('ngCart:change', {});

					if (!_.isEmpty($rootScope.currentUser)) {
						CartAPI.create(id, quantity).then(function (response) {
							devHelper.log('a new item is successfully added to Cart');
							devHelper.log(response);
						}, function (response) {
							genericService.showToast('Oops..! Something is wrong');
							devHelper.log(response, 'error');
						});
					}

				}
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
				ngCart.setCart(cart, kitchenId);

				$rootScope.$broadcast('ngCart:itemRemoved', {});
				$rootScope.$broadcast('ngCart:change', {});
				ngCart.checkEmptyCart(kitchenId);
				$scope.isInCart = false;

				if (!_.isEmpty($rootScope.currentUser)) {
					CartAPI.destroy(id).then(function (response) {
						devHelper.log('dish ' + id + ' is successfully removed from cart db');
						devHelper.log(response);
					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
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