'use strict';

angular.module('user.register', [
	'user.api',
	'configuration',
])


	.controller('UserRegisterController', ['$state', 'AuthAPI', 'devHelper', 'genericService',
		function ($state, AuthAPI, devHelper, genericService) {

			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;

			/*********************
			 *    Private Variables
			 **********************/
			this.newUser = {};

			/*********************
			 *    Private Functions
			 **********************/

			function _register() {
				AuthAPI.register(that.newUser)
					.then(
						function (response) {
							AuthAPI.setCurrentUser().then(
								function (currentUser) {
									devHelper.log(currentUser);
									$state.go('home');
								},
								function (error) {
									console.error(error);
								}
							);
							//set access token
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
			 *    EVENTS
			 **********************/

		}
	]);