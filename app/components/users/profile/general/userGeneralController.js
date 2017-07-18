'use strict';

angular.module('user.profile.general', [
	'user.api', 'ngMaterial'
])

	.controller('UserGeneralController', ['$state', 'UserAPI', 'devHelper', '$rootScope', 'AuthAPI', 'genericService',
		function ($state, UserAPI, devHelper, $rootScope, AuthAPI, genericService) {

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
					genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
				});
			}

			function _updateUser() {
				devHelper.log('update user');
				UserAPI.update(that.user, userId).then(function (response) {
					var updatedUser = response;
					devHelper.log(updatedUser);
					AuthAPI.setCurrentUser();
					$state.go('user.profile.info.view', {'id': updatedUser.id});
				}, function (response) {
					genericService.showToast('Oops..! Something is wrong');
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
