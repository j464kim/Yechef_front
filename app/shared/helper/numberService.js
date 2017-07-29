/* Number Services */
angular.module('helper')
	.factory("numberService", function (devHelper, config) {

		var _getAmountInStripe = function(amount) {
			return Math.round(amount * 100);
		};

		return {
			getAmountInStripe: _getAmountInStripe
		}
	});