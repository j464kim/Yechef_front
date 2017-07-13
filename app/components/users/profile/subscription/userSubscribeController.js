'use strict';

angular.module('user.profile.subscribe', [
	'user.api', 'ngMaterial'
])

	.controller('UserSubscribeController', ['$stateParams', '$state', 'UserAPI', 'devHelper',
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
				_getSubscriptions();
			}

			function _getSubscriptions() {
				UserAPI.list('getSubscriptions').then(
					function (response) {
						devHelper.log(response);
						that.subscribedKitchens = response;
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
