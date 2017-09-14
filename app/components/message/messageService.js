'use strict';

angular.module('message.service', [
	'message.api'
])

	.service('MessageService', ['MessageAPI', 'devHelper', '$state',
		function (MessageAPI, devHelper, $state) {
			function joinMessageRoom(messageTo) {
				MessageAPI.joinMessageRoom(messageTo).then(function (response) {
					devHelper.log(response);
					$state.go('message.join', {"message_room_id": response.id});
				}, function (response) {
					devHelper.log(response, 'error');
				});
			}

			return {
				joinMessageRoom: joinMessageRoom
			}
		}]);