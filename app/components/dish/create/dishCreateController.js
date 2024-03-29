'use strict';

angular.module('dish.create', [
	'dishes.api',
	'mediaUpload',
])

	.controller('DishCreateController', ['$state', 'DishesAPI', 'devHelper', 'config', '$q', '$timeout', 'genericService', '$stateParams', 'KitchenAPI', 'mediaService',
		function ($state, DishesAPI, devHelper, config, $q, $timeout, genericService, $stateParams, KitchenAPI, mediaService) {

			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;

			this.kitchenId = $stateParams.kid;
			this.nationalities = genericService.loadItems(config.nationalities);

			that.dish = {};
			that.dish.gluten_free = false;
			that.dish.vegetarian = false;
			that.dish.vegan = false;

			function init() {
				_checkAccess();
			}

			function _checkAccess() {
				KitchenAPI.checkOwnership(that.kitchenId).then(
					function (response) {
						devHelper.log(response);
					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
					});
			}

			function _createDish() {
				//TODO: Add User permission so that only registered users can create dish
				that.dish.kitchen_id = that.kitchenId;
				that.dish.nationality = that.dish.nationality.value;

				DishesAPI.create(that.dish)
					.then(function (response) {
						var newDish = response;
						devHelper.log(newDish);
						mediaService.uploadMedia(newDish);
						$state.go('dish.show', {"id": newDish.id});
					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
					});
			}

			/*********************
			 *    Public Functions
			 **********************/
			this.querySearch = genericService.querySearch;
			this.createDish = _createDish;
			this.cancel = function cancel() {
				if (confirm("Do you want to go back?")) {
					$state.go('dish.list');
				}
			};

			init();

			/*********************
			 *    EVENTS
			 **********************/


		}
	])