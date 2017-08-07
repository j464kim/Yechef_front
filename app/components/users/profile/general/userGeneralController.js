'use strict';

angular.module('user.profile.general', [
	'user.api',
	'ngMaterial',
	'mediaUpload'
])

	.controller('UserGeneralController', ['$state', 'UserAPI', 'devHelper', '$rootScope', 'AuthAPI', 'genericService', 'mediaService',
		function ($state, UserAPI, devHelper, $rootScope, AuthAPI, genericService, mediaService) {

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
					if (response.medias.length) {
						that.media = response.medias[0].url;
					}
					if ($state.current.name == 'user.profile.info.edit') {
						mediaService.previewUploadedMedia(that.user);
					}
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
					mediaService.uploadMedia(updatedUser);
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
