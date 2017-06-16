'use strict';

angular.module('user.register', [
	'user.api',
	'configuration',
])


	.controller('UserRegisterController', ['$state', 'AuthAPI', 'devHelper', '$mdToast',
		function ($state, AuthAPI, devHelper, $mdToast) {

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
							$mdToast.show(
								$mdToast.simple()
									.textContent(message)
									.position('top center')
									.highlightClass('md-warn')
									.capsule(true)
									.hideDelay(3000)
							);
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