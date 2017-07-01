'use strict';


angular.module('ngCart.directives')

	.directive('ngcartAddtocart', ['ngCart', function (ngCart) {
		return {
			restrict: 'E',
			controller: 'CartController as cartCtrl',
			scope: {
				id: '@',
				name: '@',
				quantity: '@',
				quantityMax: '@',
				price: '@',
				data: '='
			},
			transclude: true,
			templateUrl: function (element, attrs) {
				if (typeof attrs.templateUrl == 'undefined') {
					return 'components/cart/template/addtocart.html';
				} else {
					return attrs.templateUrl;
				}
			},
			link: function (scope, element, attrs) {
				scope.attrs = attrs;
				scope.inCart = function () {
					return ngCart.getItemById(parseInt(attrs.id));
				};

				if (scope.inCart()) {
					scope.q = ngCart.getItemById(parseInt(attrs.id)).getQuantity();
				} else {
					scope.q = parseInt(scope.quantity);
				}

				scope.qtyOpt = [];
				for (var i = 1; i <= scope.quantityMax; i++) {
					scope.qtyOpt.push(i);
				}

			}

		};
	}])

	.directive('ngcartCart', [function () {
		return {
			restrict: 'E',
			controller: 'CartController as cartCtrl',
			scope: {},
			templateUrl: function (element, attrs) {
				if (typeof attrs.templateUrl == 'undefined') {
					return 'components/cart/template/cart.html';
				} else {
					return attrs.templateUrl;
				}
			},
			link: function (scope, element, attrs) {

			}
		};
	}])

	.directive('ngcartSummary', [function () {
		return {
			restrict: 'E',
			controller: 'CartController as cartCtrl',
			scope: {},
			transclude: true,
			templateUrl: function (element, attrs) {
				if (typeof attrs.templateUrl == 'undefined') {
					return 'components/cart/template/summary.html';
				} else {
					return attrs.templateUrl;
				}
			}
		};
	}])

	.directive('ngcartCheckout', [function () {
		return {
			restrict: 'E',
			controller: ('CartCheckoutController', ['$rootScope', '$scope', 'ngCart', 'fulfilmentProvider', function ($rootScope, $scope, ngCart, fulfilmentProvider) {
				$scope.ngCart = ngCart;

				$scope.checkout = function () {
					fulfilmentProvider.setService($scope.service);
					fulfilmentProvider.setSettings($scope.settings);
					fulfilmentProvider.checkout()
						.success(function (data, status, headers, config) {
							$rootScope.$broadcast('ngCart:checkout_succeeded', data);
						})
						.error(function (data, status, headers, config) {
							$rootScope.$broadcast('ngCart:checkout_failed', {
								statusCode: status,
								error: data
							});
						});
				}
			}]),
			scope: {
				service: '@',
				settings: '='
			},
			transclude: true,
			templateUrl: function (element, attrs) {
				if (typeof attrs.templateUrl == 'undefined') {
					return 'components/cart/template/checkout.html';
				} else {
					return attrs.templateUrl;
				}
			}
		};
	}]);
