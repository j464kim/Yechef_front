'use strict';

angular.module('dish.list.feature', [
	'dishes.api',
])

	.controller('FeaturedDishController', ['$state', 'DishesAPI', 'devHelper', 'genericService', '$timeout', '$scope',
		function ($state, DishesAPI, devHelper, genericService, $timeout, $scope) {

			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;

			/*********************
			 *    Public Variables
			 **********************/
			this.totalItems = 0;
			this.currentPage = 0;
			this.dishes = [];
			this.dishBreakpoints = genericService.dishBreakpoints;

			/*********************
			 *    Private Functions
			 **********************/

			function _init() {
				_getFeaturedDishes();
			}

			function _getFeaturedDishes() {
				var pageNum = that.currentPage || that.currentPage++;

				DishesAPI.list(pageNum).then(function (response) {
					devHelper.log(response);
					$scope.dishes = response.data;
					that.dishes = response.data;
					that.totalItems = response.total;
					that.currentPage = response.current_page;
				}, function (response) {
					genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
				});
			}

			/*********************
			 *    Public Functions
			 **********************/
			this.getFeaturedDishes = _getFeaturedDishes;

			/*********************
			 *    Initialization
			 **********************/
			_init();

			/*********************
			 *    EVENTS
			 **********************/
		}
	])