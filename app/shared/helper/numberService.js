/* Number Services */
angular.module('helper')
	.factory("numberService", function (devHelper, config) {

		var _amtToStripe = function(value) {
			return Math.round(value * 100);
		};

		return {
			amtToStripe: _amtToStripe,
		}
	});