/**
 * Created by Jun on 2017-05-08.
 */
'use strict';

angular.module('kitchen.show', [
	'kitchen.api',
	'directive.loader'
])

	.controller('KitchenShowController', ['$stateParams', 'KitchenAPI', '$scope',
		function ($stateParams, KitchenAPI, $scope) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var that = this;
			var kitchenId = $stateParams.id;
			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_showKitchen();
			}

			function _showKitchen() {
				KitchenAPI.show(kitchenId).then(function (response) {
					console.log(response);
					$scope.kitchen = response;
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.showKitchen = _showKitchen;


			/*********************
			 *  Initialization
			 **********************/
			_init();


			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
