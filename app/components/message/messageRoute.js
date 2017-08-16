'use strict';

angular.module('message', [
	'message.controller',
	'message.service',
	'irontec.simpleChat'
])

	.config(function ($stateProvider) {

		$stateProvider
			.state('message', {
				url: '/messages',
				templateUrl: 'components/message/messageMain.html',
				controller: 'MessageController as MessageCtrl'
			})
			.state('message.joined', {
				url: '/{message_room_id}',
				templateUrl: 'components/message/message.html'
			})
	});