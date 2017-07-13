'use strict';

angular.module('user.profile.general', [
	'user.api', 'ngMaterial'
])

	.controller('UserGeneralController', ['$stateParams', '$state', 'UserAPI', 'devHelper', '$rootScope',
		function ($stateParams, $state, UserAPI, devHelper, $rootScope) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var that = this;
			var userId = $rootScope.currentUser.id;
			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_showUser();
			}

			function _showUser() {
				UserAPI.show(userId).then(function (response) {
					that.user = response;
					devHelper.log(that.user);

					//TODO: user media to be ready soon
					// that.media = response.medias[0].url;

				}, function (response) {
					// TODO handle error state
					devHelper.log(response, 'error');
				});
			}

			function _updateUser() {
				devHelper.log('update user');
				UserAPI.update(that.user, userId).then(function (response) {
					var updatedUser = response;
					devHelper.log(updatedUser);
					$state.go('user.profile.info.view', {'id': updatedUser.id});
				}, function (response) {
					// TODO handle error state
					devHelper.log(response, 'error');
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.updateUser = _updateUser;

			/*********************
			 *  Initialization
			 **********************/
			_init();


			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
