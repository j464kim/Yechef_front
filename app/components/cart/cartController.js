'use strict';

angular.module('cart.create', [
	'cart.api',
])

	.controller('CartController', ['$state', 'CartAPI', 'devHelper', 'config', '$rootScope',
		function ($state, CartAPI, devHelper, config, $rootScope) {

			/*********************
			 *  Private Variables
			 **********************/
			// reference to this controller


			/*********************
			 *  Public Variables
			 **********************/
			var that = this;


			/*********************
			 *  Private Functions
			 **********************/

			function _addToCart(dishId) {
				devHelper.log('clicked add to cart ' + dishId);
				CartAPI.add(dishId).then(function (response) {
					devHelper.log(response);
					devHelper.log('successfully added to Cart');
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}


			/*********************
			 *  Public Functions
			 **********************/
			this.addToCart = _addToCart;

			/*********************
			 *  Initialization
			 **********************/

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
