'use strict';


angular.module('ngCart', [
	'ngCart.directives',
	'cart.api',
])

	.config([function () {

	}])

	.provider('$ngCart', function () {
		this.$get = function () {
		};
	})

	.service('ngCart', ['$rootScope', 'ngCartItem', 'store', 'devHelper', function ($rootScope, ngCartItem, store, devHelper) {

		var that = this;

		this.init = function (storedCart, kitchenId) {
			devHelper.log('storedCart in json: ');
			devHelper.log(storedCart);

			// if there is nothing in storage
			if (!storedCart) {
				// on page refresh,
				devHelper.log('Init on refresh - no cart');

				// kitchenId = 0;
				this.$cart = {};

				if (kitchenId) {
					this.$cart[kitchenId] = {
						shipping: null,
						taxRate: null,
						tax: null,
						items: []
					}
				}
			}

			else {
				// if there is already an item in storage
				// this.$cart = storedCart;

				if (kitchenId) {
					// on adding items to cart, assign kitchenId as a key of cart object
					devHelper.log('Init to add items ' + kitchenId);

					// if cart of the kitchenId not exists yet
					if (typeof this.$cart[kitchenId] == 'undefined') {
						devHelper.log('make new cart of kitchen ' + kitchenId);
						this.$cart[kitchenId] = {
							shipping: null,
							taxRate: null,
							tax: null,
							items: []
						}
						devHelper.log(this.getCart());
					} else {
						devHelper.log('already have cart of kitchen ' + kitchenId);
						devHelper.log(this.$cart);
					}

				} else {
					// on page refresh,
					devHelper.log('Init on refresh');

					this.$cart = {};
					for (var key in storedCart) {
						this.$cart[key] = {
							shipping: null,
							taxRate: null,
							tax: null,
							items: []
						}
					}

				}
			}

			devHelper.log(this.getCart());
			this.$save();
		};

		this.initDb = function (dbCart) {
			// on page refresh,
			devHelper.log('Init dbCart on refresh');

			this.$cart = {};
			angular.forEach(dbCart, function (cart) {
				that.$cart[cart.kitchen_id] = {
					shipping: null,
					taxRate: null,
					tax: null,
					items: []
				}
			});

			devHelper.log(this.getCart());
		};

		this.getItemById = function (itemId, kitchenId) {
			if (!this.getCart(kitchenId)) {
				return false;
			}
			var items = this.getCart(kitchenId).items;
			var build = false;
			angular.forEach(items, function (item) {
				if (item.getId() == itemId) {
					build = item;
				}
			});
			return build;
		};

		// this.setShipping = function (shipping) {
		//
		// 	devHelper.log('set shipping');
		// 	for (var key in this.$cart) {
		// 		this.$cart[key].shipping = shipping;
		// 	}
		//
		// 	return this.getShipping();
		// };

		// this.getShipping = function () {
		// 	devHelper.log('get shipping');
		//
		// 	if (this.getCart(kitchenId).items.length == 0) return 0;
		// 	return this.getCart(kitchenId).shipping;
		// };

		this.setTaxRate = function (taxRate) {
			devHelper.log(this.$cart);
			for (var key in this.$cart) {
				this.$cart[key].taxRate = +parseFloat(taxRate).toFixed(2);
			}

			// return this.getTaxRate();
		};

		this.getTaxRate = function () {
			devHelper.log('get tax rate');
			devHelper.log(this.$cart);
			return this.$cart[Object.keys(this.$cart)[0]].taxRate;
			// return this.$cart.taxRate
		};

		this.getTax = function (kitchenId) {
			return +parseFloat(((this.getSubTotal(kitchenId) / 100) * this.getCart(kitchenId).taxRate )).toFixed(2);
		};

		this.setCart = function (cart, kitchenId) {

			if (typeof kitchenId == 'undefined') {
				this.$cart = cart;
				this.$save();
				return this.getCart();
			} else {
				this.$cart[kitchenId] = cart;
				this.$save();
				return this.getCart(kitchenId);
			}

		};

		this.getCart = function (kitchenId) {
			if (typeof kitchenId == 'undefined') {
				return this.$cart;
			} else {
				return this.$cart[kitchenId];
			}
		};

		// this.getItems = function () {
		// 	return this.getCart().items;
		// };

		this.getTotalItems = function (kitchenId) {
			var count = 0;

			if (kitchenId) {
				// for total # of a particular cart
				var items = this.getCart(kitchenId).items;

				angular.forEach(items, function (item) {
					count += item.getQuantity();
				});

			} else {
				// for total # of all carts
				for (var key in this.$cart) {
					var items = this.getCart(key).items;

					angular.forEach(items, function (item) {
						count += item.getQuantity();
					});
				}
			}


			return count;
		};

		// this.getTotalUniqueItems = function () {
		// 	return this.getCart().items.length;
		// };

		this.getSubTotal = function (kitchenId) {
			var total = 0;
			angular.forEach(this.getCart(kitchenId).items, function (item) {
				total += item.getTotal();
			});
			return +parseFloat(total).toFixed(2);
		};

		this.totalCost = function (kitchenId) {
			return +parseFloat(this.getSubTotal(kitchenId) + this.getTax(kitchenId)).toFixed(2);
		};

		this.removeItem = function (index) {
			this.$cart.items.splice(index, 1);
			$rootScope.$broadcast('ngCart:itemRemoved', {});
			$rootScope.$broadcast('ngCart:change', {});

		};

		// this.empty = function () {
		//
		// 	$rootScope.$broadcast('ngCart:change', {});
		// 	this.$cart.items = [];
		// 	localStorage.removeItem('cart');
		// };

		this.isEmpty = function () {

			return (this.$cart.items.length > 0 ? false : true);

		};

		// this.toObject = function () {
		//
		// 	if (this.getItems().length === 0) return false;
		//
		// 	var items = [];
		// 	angular.forEach(this.getItems(), function (item) {
		// 		items.push(item.toObject());
		// 	});
		//
		// 	return {
		// 		shipping: this.getShipping(),
		// 		tax: this.getTax(),
		// 		taxRate: this.getTaxRate(),
		// 		subTotal: this.getSubTotal(),
		// 		totalCost: this.totalCost(),
		// 		items: items
		// 	}
		// };

		this.$save = function () {
			devHelper.log('save to storage');
			return store.set('cart', JSON.stringify(this.getCart()));
		};

		// this.$remove = function () {
		// 	devHelper.log('remove storage');
		// 	return store.set('cart');
		// };

	}])

	// called from $restore
	.factory('ngCartItem', ['$rootScope', 'devHelper', function ($rootScope, devHelper) {

		var item = function (id, name, price, quantity, data, kitchenId) {
			this.setId(id);
			this.setName(name);
			this.setPrice(price);
			this.setQuantity(quantity);
			this.setData(data);
			this.setKitchenId(kitchenId);
		};

		item.prototype.setId = function (id) {
			if (id) this._id = id;
			else {
				devHelper.log('An ID must be provided', 'error');
			}
		};

		item.prototype.setKitchenId = function (kitchenId) {
			if (kitchenId) this._kitchenId = kitchenId;
			else {
				devHelper.log('KitchenId must be provided', 'error');
			}
		};

		item.prototype.getId = function () {
			return this._id;
		};

		item.prototype.setName = function (name) {
			if (name) this._name = name;
			else {
				devHelper.log('A name must be provided', 'error');
			}
		};
		item.prototype.getName = function () {
			return this._name;
		};

		item.prototype.setPrice = function (price) {
			var priceFloat = parseFloat(price);
			if (priceFloat) {
				if (priceFloat <= 0) {
					devHelper.log('A price must be over 0', 'error');
				} else {
					this._price = (priceFloat);
				}
			} else {
				devHelper.log('A price must be provided', 'error');
			}
		};

		item.prototype.getPrice = function () {
			return this._price;
		};

		item.prototype.setQuantity = function (quantity, relative) {
			var quantityInt = parseInt(quantity);
			if (quantityInt % 1 === 0) {
				if (relative === true) {
					this._quantity += quantityInt;
					devHelper.log(this._name + ' qty in cart is updated to ' + this._quantity);

				} else {
					this._quantity = quantityInt;
					devHelper.log(this._name + ' qty is set to ' + quantityInt);
				}
				if (this._quantity < 1) this._quantity = 1;

			} else {
				this._quantity = 1;
				devHelper.log('Quantity must be an integer and was defaulted to 1');
			}
			$rootScope.$broadcast('ngCart:change', {});

		};

		item.prototype.getQuantity = function () {
			return this._quantity;
		};

		item.prototype.setData = function (data) {
			if (data) this._data = data;
		};

		item.prototype.getData = function () {
			if (this._data) return this._data;
			else devHelper.log('This item has no data');
		};


		item.prototype.getTotal = function () {
			return +parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);
		};

		item.prototype.toObject = function () {
			return {
				id: this.getId(),
				name: this.getName(),
				price: this.getPrice(),
				quantity: this.getQuantity(),
				data: this.getData(),
				kitchenId: this._kitchenId,
				total: this.getTotal()
			}
		};

		return item;

	}])

	.service('store', ['$window', function ($window) {

		return {

			get: function (key) {
				if ($window.localStorage [key]) {
					var cart = angular.fromJson($window.localStorage [key]);
					return JSON.parse(cart);
				}
				return false;

			},

			set: function (key, val) {
				if (val === undefined) {
					$window.localStorage.removeItem(key);
				} else {
					$window.localStorage [key] = angular.toJson(val);
				}
				return $window.localStorage [key];
			},

		}
	}])

	.value('version', '1.0.0');
