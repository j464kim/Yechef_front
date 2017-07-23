'use strict';

angular.module('user.profile.subscribe', [
	'user.api', 'ngMaterial'
])

	.controller('UserSubscribeController', ['$stateParams', '$state', 'UserAPI', 'devHelper', 'genericService',
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
			this.lastPage = 0;
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
				UserAPI.getMySubscriptions(pageNum, 12).then(
					function (response) {
						devHelper.log(response);
						that.subscribedKitchens = that.subscribedKitchens.concat(response.data);
						that.totalItems = response.total;
						that.currentPage = response.current_page;
						that.lastPage = response.last_page;
					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
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
