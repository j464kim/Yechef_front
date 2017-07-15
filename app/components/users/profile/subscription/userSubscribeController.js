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
			this.currentPage = 0;
			this.subscribedKitchens = [];
			this.totalItems = 0;
			this.loadButton = true;

			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_getSubscriptions();
			}

			function _getSubscriptions() {
				var pageNum = ++that.currentPage;
				UserAPI.getMySubscriptions(pageNum).then(
					function (response) {
						devHelper.log(response);
						that.subscribedKitchens = that.subscribedKitchens.concat(response.data);
						that.totalItems = response.total;
						that.currentPage = response.current_page;
						if (response.last_page <= that.currentPage) {
							that.loadButton = false;
						}
					}, function (response) {
						// TODO handle error state ie. front end display
						devHelper.log(response, 'error');
					});
			};

			/*********************
			 *  Public Functions
			 **********************/
			this.getSubscriptions = _getSubscriptions;

			/*********************
			 *  Initialization
			 **********************/
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
