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
						//set access token
						devHelper.log('Successfully sent email verify link');
						$state.go('home');
					},
					function (response) {
						console.error(response);
					}
				);
			}

			function _confirmEmail() {
				AuthAPI.confirmEmail(
					that.token
				).then(function (response) {
						//set access token
						devHelper.log('Successfully confirmed that user is verified');
						$state.go('home');
					},
					function (response) {
						console.error(response);
					}
				);
			}

			function _register() {
				AuthAPI.register(that.newUser)
					.then(
						function (response) {
							// AuthAPI.setCurrentUser().then(
							// 	function (currentUser) {
							// 		devHelper.log(currentUser);
							// 		$state.go('home');
							// 	},
							// 	function (error) {
							// 		console.error(error);
							// 	}
							// );
							//set access token
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
							console.error(response);
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