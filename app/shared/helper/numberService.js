/* Number Services */
angular.module('helper')
	.factory("numberService", function (devHelper, config) {

		var _dbToStripe = function(value) {
			return Math.round(value * 100);
		};

		var _stripeToDb = function(value) {
			return (value / 100).toFixed(2);
		};

		return {
			dbToStripe: _dbToStripe,
			stripeToDb: _stripeToDb
		}
	});