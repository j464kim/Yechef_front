/**
 * Created by Jun on 2017-05-08.
 */
'use strict';

angular.module('kitchen.create', [
	'kitchen.api',
	'directive.loader'
])

	.controller('KitchenCreateController', ['$stateParams', 'KitchenAPI', '$scope', '$location',
		function ($stateParams, KitchenAPI, $scope, $location) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var that = this;
			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _createKitchen() {
				KitchenAPI.create($scope.kitchen).then(function (response) {
					var newKitchen = response;
					console.log(response);
					$location.path('/kitchens/' + newKitchen.id);
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.createKitchen = _createKitchen;


			/*********************
			 *  Initialization
			 **********************/

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
