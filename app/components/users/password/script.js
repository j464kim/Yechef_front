'use strict';

angular.module('user.password', [
	'configuration'
])


	.controller('PasswordController', ['$stateParams', '$state', 'PasswordAPI', 'devHelper', '$rootScope',
		function ($stateParams, $state, PasswordAPI, devHelper, $rootScope) {

			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;

			/*********************
			 *    Public Variables
			 **********************/
			this.token = $stateParams.token;
			this.email = '';
			this.password = '';
			this.password_confirmation = '';

			/*********************
			 *    Private Functions
			 **********************/

			function _init() {
			}

			function _sendResetLinkEmail() {
				PasswordAPI.sendResetLinkEmail(
					that.email
				).then(function (response) {
						//set access token
						devHelper.log(response);
					},
					function (response) {
						console.error(response);
					}
				);
			};

			function _resetPassword() {
				PasswordAPI.resetPassword(
					that.token,
					that.email,
					that.password,
					that.password_confirmation
				).then(function (response) {
						//set access token
						devHelper.log(response);
						$state.go('user.profile.info.view', {'id': $rootScope.currentUser.id});
					},
					function (response) {
						console.error(response);
					}
				);
			};

			function _updatePassword() {
				PasswordAPI.updatePassword(
					that.oldPassword,
					that.newPassword,
					that.newPassword_confirmation
				).then(function (response) {
						devHelper.log(response);
						$state.go('user.profile.info.view', {'id': $rootScope.currentUser.id});
					},
					function (response) {
						console.error(response);
					}
				);
			};

			/*********************
			 *    Public Functions
			 **********************/
			this.sendResetLinkEmail = _sendResetLinkEmail;
			this.resetPassword = _resetPassword;
			this.updatePassword = _updatePassword;


			/*********************
			 *    Initialization
			 **********************/
			_init();

			/*********************
			 *    EVENTS
			 **********************/


		}

	]);