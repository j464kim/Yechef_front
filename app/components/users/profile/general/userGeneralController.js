'use strict';

angular.module('user.profile.general', [
	'user.api', 'ngMaterial'
])

	.controller('UserGeneralController', ['$stateParams', 'UserAPI', 'devHelper',
		function ($stateParams, UserAPI, devHelper) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var that = this;
			var userId = $stateParams.id;
			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_showUser()
			}

			function _showUser() {
				UserAPI.show(userId).then(function (response) {
					devHelper.log('user info: ');
					devHelper.log(response);
					that.user = response;

					//TODO: user media to be ready soon
					// that.media = response.medias[0].url;

				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			/*********************
			 *  Public Functions
			 **********************/


			/*********************
			 *  Initialization
			 **********************/
			_init();


			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
