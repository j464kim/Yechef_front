'use strict';

angular.module('message.controller', [
	'irontec.simpleChat',
	'message.api',
	'constants.event'
])
	.controller('MessageController', function ($rootScope, $stateParams, MessageAPI, devHelper, eventConstants) {
		var that = this;

		that.username = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
		that.myUserId = $rootScope.currentUser.id;

		that.messageRoomId = $stateParams.message_room_id;
		that.messages = [];

		$rootScope.$on(eventConstants.message.type, function (event, data) {
			that.messages.push({
				'username': data.user.first_name + ' ' + data.user.last_name,
				'content': data.message.message_body,
				'fromUserId': data.user.id,
				'date': data.message.created_at
			});
		});

		MessageAPI.listMessageRooms().then(function (response) {
			devHelper.log(response);
			that.messageRooms = response;
		}, function (response) {
			devHelper.log(response, 'error');
		});

		MessageAPI.list(that.messageRoomId).then(function (response) {
			devHelper.log(response);
			that.title = response.recipient.first_name + ' ' + response.recipient.last_name;
			that.recipient = response.recipient;
			angular.extend(that.messages, response.messages.map(function (message) {
				message.username = message.user.first_name + ' ' + message.user.last_name;
				message.content = message.message_body;
				message.fromUserId = message.user_id;
				message.date = message.created_at;
				// message.imageUrl = message.user.medias[0] ? message.user.medias[0].url : '';
				return message;
			}));
			devHelper.log(that.messages);
		}, function (response) {
			devHelper.log(response, 'error');
		});

		that.sendMessage = function (message, username) {
			if (message && message !== '' && username) {
				MessageAPI.send(that.messageRoomId, message).then(function (response) {
					devHelper.log(response);
					that.messages.push({
						'username': username,
						'content': message,
						'fromUserId': $rootScope.currentUser.id,
						'date': response.created_at
					});
				}, function (response) {
					devHelper.log(response, 'error');
				});
			}
		};
		that.visible = true;
		that.expandOnNew = true;
	});