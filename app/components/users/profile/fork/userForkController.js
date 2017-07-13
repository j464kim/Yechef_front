'use strict';

angular.module('user.profile.fork', [
	'user.api', 'ngMaterial'
])

	.controller('UserForkController', ['$stateParams', '$state', 'UserAPI', 'devHelper',
		function ($stateParams, $state, UserAPI, devHelper) {

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

			function _init() {
				_getForkedDishes();
			}

			function _getForkedDishes() {
				UserAPI.list('getForkedDishes').then(
					function (response) {
						devHelper.log(response);
						that.forkedDishes = response;
					}, function (response) {
						// TODO handle error state ie. front end display
						devHelper.log(response, 'error');
					});
			};

			/*********************
			 *  Public Functions
			 **********************/

			/*********************
			 *  Initialization
			 **********************/
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
