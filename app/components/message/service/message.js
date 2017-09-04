'use strict'

angular.module('message.api', [
	'configuration'
])

	.factory('MessageResource', ['$resource', 'config',
		function ($resource, config) {
			var apiEndpoint = config.endpoint;

			return $resource(apiEndpoint + 'message/:id', {id: '@id'}, {
				list: {
					method: 'GET',
					params: {messageRoomId: '@messageRoomId'}
				},
				destroy: {
					method: 'DELETE'
				},
				send: {
					method: 'POST',
					url: apiEndpoint + 'sendMessage'
				},
				listMessageRooms: {
					method: 'GET',
					url: apiEndpoint + 'myMessageRooms'
				},
				joinMessageRoom: {
					method: 'POST',
					url: apiEndpoint + 'joinMessageRoom'
				}
			})
		}])

	.service('MessageAPI', ['$q', 'MessageResource',
		function ($q, MessageResource) {
			function list(messageRoomId) {
				return $q(function (resolve, reject) {
					MessageResource.list(
						{
							messageRoomId: messageRoomId
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function destroy(messageId) {
				return $q(function (resolve, reject) {
					MessageResource.destroy(
						{
							id: messageId
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function send(messageRoomId, messageBody) {
				return $q(function (resolve, reject) {
					MessageResource.send(
						{
							messageRoomId: messageRoomId,
							messageBody: messageBody
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function listMessageRooms() {
				return $q(function (resolve, reject) {
					MessageResource.listMessageRooms()
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function joinMessageRoom(messageTo) {
				return $q(function (resolve, reject) {
					MessageResource.joinMessageRoom(
						{
							messageTo: messageTo
						}
					)
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				list: list,
				destroy: destroy,
				send: send,
				listMessageRooms: listMessageRooms,
				joinMessageRoom: joinMessageRoom
			}
		}]);