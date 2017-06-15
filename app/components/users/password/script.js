'use strict';

angular.module('user.password', [
	'configuration'
])


	.controller('PasswordController', ['$stateParams', 'PasswordAPI', 'devHelper',
		function ($stateParams, PasswordAPI, devHelper) {

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

			function _showResetForm() {
				PasswordAPI.showResetForm(
					that.email
				).then(
					function (response) {
						//set access token
						devHelper.log(response);
					},
					function (response) {
						console.error(response);
					}
				);
			};

			function _sendResetLinkEmail() {
				PasswordAPI.sendResetLinkEmail(
					that.email
				).then(
					function (response) {
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
				).then(
					function (response) {
						//set access token
						devHelper.log(response);
					},
					function (response) {
						console.error(response);
					}
				);
			};

			/*********************
			 *    Public Functions
			 **********************/
			this.showResetForm = _showResetForm;
			this.sendResetLinkEmail = _sendResetLinkEmail;
			this.resetPassword = _resetPassword;


			/*********************
			 *    Initialization
			 **********************/
			_init();

			/*********************
			 *    EVENTS
			 **********************/


		}

	]);