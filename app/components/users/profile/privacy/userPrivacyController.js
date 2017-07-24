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
			this.loaded = false;

			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_getUserSettings();
			}

			function _getUserSettings() {
				UserAPI.getMySettings().then(function (response) {
					that.userSetting = response;
					devHelper.log(that.userSetting);
					that.old_show_phone = that.userSetting.show_phone;
					that.old_show_subscription = that.userSetting.show_subscription;
					that.old_show_forks = that.userSetting.show_forks;
					that.loaded = true;

					//TODO: user media to be ready soon
					// that.media = response.medias[0].url;
				}, function (response) {
					genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
				});
			}

			function _updateUserSettings() {
				devHelper.log('update user');
				UserAPI.setMySettings(that.userSetting).then(function (response) {
					var updatedUserSetting = response;
					devHelper.log(updatedUserSetting);
					genericService.showToast('Successfully Updated Settings');
				}, function (response) {
					devHelper.log(response, 'error');
					genericService.showToast('Error Updating Privacy Settings...');
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.updateUserSettings = _updateUserSettings;

			this.validate = function () {
				return that.old_show_phone === that.userSetting.show_phone &&
					that.old_show_subscription === that.userSetting.show_subscription &&
					that.old_show_forks === that.userSetting.show_forks;
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
