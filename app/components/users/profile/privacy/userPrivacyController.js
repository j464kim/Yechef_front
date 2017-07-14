'use strict';

angular.module('user.profile.privacy', [
	'user.api',
	'ngMaterial'
])

	.controller('UserPrivacyController', ['$state', 'UserAPI', 'devHelper', '$rootScope', 'genericService', 'AuthAPI',
		function ($state, UserAPI, devHelper, $rootScope, genericService, AuthAPI) {

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
					that.old_show_phone = that.user.show_phone;
					that.old_show_subscription = that.user.show_subscription;
					that.old_show_forks = that.user.show_forks;

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
					AuthAPI.setCurrentUser();
					genericService.showToast('Successfully Updated Privacy Settings');
				}, function (response) {
					// TODO handle error state
					devHelper.log(response, 'error');
					genericService.showToast('Error Updating Privacy Settings...');
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.updateUser = _updateUser;

			this.validate = function () {
				return that.old_show_forks === that.user.show_phone &&
					that.old_show_subscription === that.user.show_subscription &&
					that.old_show_forks === that.user.show_forks;
			};
			/*********************
			 *  Initialization
			 **********************/
			_init();


			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
