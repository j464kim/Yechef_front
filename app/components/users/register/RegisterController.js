'use strict';

angular.module('user.register', [
	'user.api',
	'configuration',
])


	.controller('RegisterController', ['$state', '$stateParams', 'AuthAPI', 'devHelper', 'genericService',
		function ($state, $stateParams, AuthAPI, devHelper, genericService) {

			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;

			/*********************
			 *    Private Variables
			 **********************/
			this.newUser = {};
			this.token = $stateParams.token;


			/*********************
			 *    Private Functions
			 **********************/

			function _verifyEmail() {
				AuthAPI.sendVerifyLink(
					that.newUser.email
				).then(function (response) {

						var data = response;
						devHelper.log('Successfully sent email verify link');
						devHelper.log(data.body);
						$state.go('home');
						genericService.showToast(data.message);
					},
					function (response) {
						devHelper.log(response, 'error');
					}
				);
			}

			function _confirmEmail() {
				AuthAPI.confirmEmail(
					that.token
				).then(function (response) {

						var data = response;
						devHelper.log('Successfully confirmed that user is verified');
						devHelper.log(data.body);
						$state.go('user.login');
						genericService.showToast(data.message);
					},
					function (response) {
						devHelper.log(response, 'error');
					}
				);
			}

			function _register() {
				AuthAPI.register(that.newUser)
					.then(
						function (response) {

							_verifyEmail();
							devHelper.log(response);
						},
						function (response) {
							var message;
							if (response.data.message.includes('already')) {
								message = 'The email is already taken';
							} else {
								message = response.data.message;
							}
							genericService.showToast(message);
							devHelper.log(response, 'error');
						}
					);
			}


			/*********************
			 *    Public Functions
			 **********************/
			this.register = _register;


			/*********************
			 *  Initialization
			 **********************/
			if (this.token) {
				_confirmEmail();
			}


			/*********************
			 *    EVENTS
			 **********************/

		}
	]);