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
			var userId = $stateParams.id;
			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				console.log('get subscription');
				_getSubscriptions();
			}

			function _getSubscriptions() {
				UserAPI.list('getSubscriptions').then(
					function (response) {
						devHelper.log('subscriptions:');
						devHelper.log(response);
						that.subscribedKitchens = response;
					}, function (response) {
						// TODO handle error state ie. front end display
						console.error(response);
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
