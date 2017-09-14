'use strict';

angular.module('constants.event', [])

	.constant('eventConstants', (function () {
		var message = {
			'type': 'event:message',
			'action': {
				'sent': 'message.sent',
				'deleted': 'message.deleted'
			}
		};
		var order = {
			'type': 'event:order',
			'action': {
				'sent': 'order.sent',
				'accepted': 'order.accepted',
				'cancelled': 'order.cancelled'
			}
		};

		return {
			unchecked: 0,
			checked: 1,
			deleted: 2,
			message: message,
			order: order
		}
	})());