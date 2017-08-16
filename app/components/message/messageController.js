'use strict';

angular.module('message.controller', [
	'irontec.simpleChat'
])
	.controller('MessageController', function ($rootScope, $pusher) {
		var that = this;

		var pusher = $pusher($rootScope.pusherClient);

		var my_channel = pusher.subscribe('angmotti');

		// var channels = pusher.allChannels();

		my_channel.bind('my-event', function (data) {
			console.log(data);
		});

		// my_channel.bind_all(function (event,data) {
		// 	console.log(event);
		// 	console.log(data);
		// });

		that.messages = [
			{
				'username': 'username1',
				'content': 'Hi!'
			},
			{
				'username': 'username2',
				'content': 'Hello!'
			},
			{
				'username': 'username2',
				'content': 'Hello!'
			},
			{
				'username': 'username2',
				'content': 'Hello!'
			},
			{
				'username': 'username2',
				'content': 'Hello!'
			},
			{
				'username': 'username2',
				'content': 'Hello!'
			}
		];

		that.username = 'username1';

		that.sendMessage = function (message, username) {
			if (message && message !== '' && username) {
				that.messages.push({
					'username': username,
					'content': message
				});
			}
		};
		that.visible = true;
		that.expandOnNew = true;
	});