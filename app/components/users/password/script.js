'use strict';

angular.module('user.password', [
	'configuration'
])


	.controller('PasswordController', ['$stateParams', 'PasswordAPI',
		function ($stateParams, PasswordAPI) {

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
				console.log('loaded passwordController');
			}

			function _showResetForm() {
				PasswordAPI.showResetForm(
					that.email
				).then(
					function (response) {
						//set access token
						console.log(response);
					},
					function (response) {
						console.error(response);
					}
				);
			};

			function _sendResetLinkEmail() {
				console.log('_sendResetLinkEmail to ' + that.email);
				PasswordAPI.sendResetLinkEmail(
					that.email
				).then(
					function (response) {
						//set access token
						console.log('success');
						console.log(response);
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
						console.log(response);
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