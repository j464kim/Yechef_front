'use strict';

angular.module('event.service', [])

	.service('EventService', ['devHelper', '$rootScope',
		function (devHelper, $rootScope) {
			function handleEvent(event, data) {
				devHelper.log(event);
				devHelper.log(data);
				$rootScope.$broadcast(event, data);
			}

			return {
				handleEvent: handleEvent
			}
		}]);