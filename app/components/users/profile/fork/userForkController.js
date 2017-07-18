'use strict';

angular.module('user.profile.fork', [
	'user.api', 'ngMaterial'
])

	.controller('UserForkController', ['$stateParams', '$state', 'UserAPI', 'devHelper', 'genericService',
		function ($stateParams, $state, UserAPI, devHelper, genericService) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var that = this;
			/*********************
			 *  Public Variables
			 **********************/
			this.currentPage = 0;
			this.forkedDishes = [];
			this.totalItems = 0;
			this.loadButton = true;

			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_getForkedDishes();
			}

			function _getForkedDishes() {
				var pageNum = ++that.currentPage;
				UserAPI.getMyForkedDishes(pageNum, 12).then(
					function (response) {
						devHelper.log(response);
						that.forkedDishes = that.forkedDishes.concat(response.data);
						that.totalItems = response.total;
						that.currentPage = response.current_page;
						if (response.last_page <= that.currentPage) {
							that.loadButton = false;
						}
					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
					});
			};

			/*********************
			 *  Public Functions
			 **********************/
			this.getForkedDishes = _getForkedDishes;

			/*********************
			 *  Initialization
			 **********************/
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
