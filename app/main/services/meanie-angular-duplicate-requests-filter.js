/**
 * meanie-angular-duplicate-requests-filter * https://github.com/meanie/angular-duplicate-requests-filter
 *
 * Copyright (c) 2016 Adam Reis <adam@reis.nz>
 * License: MIT
 */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	return typeof obj;
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

(function (window, angular, undefined) {
	'use strict';

	/**
	 * Module definition and dependencies
	 */

	angular.module('DuplicateRequestsFilter.Decorator', [])

	/**
	 * Config
	 */
		.config(['$provide', function ($provide) {

			/**
			 * Decorator for the $http service
			 */
			$provide.decorator('$http', ['$delegate', '$q', function ($delegate, $q) {

				//Pending requests and local $http let for natural reference
				var pendingRequests = {};
				var $http = $delegate;

				function trimConfigData(configData) {
					var trimList = ['token'];
					var configDataTrimmed = angular.copy(configData);
					for (var i in trimList) {
						if (_.has(configDataTrimmed, trimList[i])) {
							configDataTrimmed = _.omit(configDataTrimmed, trimList[i]);
						}
					}
					return configDataTrimmed;
				}

				/**
				 * Hash generator
				 */
				function hash(str) {
					var h = 0;
					var strlen = str.length;
					if (strlen === 0) {
						return h;
					}
					for (var i = 0, n; i < strlen; ++i) {
						n = str.charCodeAt(i);
						h = (h << 5) - h + n;
						h = h & h;
					}
					return h >>> 0;
				}

				/**
				 * Helper to generate a unique identifier for a request
				 */
				function getRequestIdentifier(config) {
					var str = config.method + config.url;
					if (config.params && _typeof(config.params) === 'object') {
						str += angular.toJson(config.params);
					}
					if (config.data && _typeof(config.data) === 'object') {
						var dataTrimmed = trimConfigData(config.data);
						str += angular.toJson(dataTrimmed);
					}
					if (config.headers && _typeof(config.headers) === 'object') {
						str += angular.toJson(config.headers);
					}
					return hash(str);
				}

				/**
				 * Modified $http service
				 */
				function $duplicateRequestsFilter(config) {
					//Ignore for this request?
					if (config.ignoreDuplicateRequest) {
						return $http(config);
					}

					//Get unique request identifier
					var identifier = getRequestIdentifier(config);

					//Check if such a request is pending already
					if (pendingRequests[identifier]) {

						return $q.reject({
							data: '',
							headers: {},
							status: config.rejectDuplicateStatusCode || 400,
							config: config
						});
						return pendingRequests[identifier];
					}

					//Create promise using $http and make sure it's reset when resolved
					pendingRequests[identifier] = $http(config).finally(function () {
						delete pendingRequests[identifier];
					});

					//Return promise
					return pendingRequests[identifier];
				}

				//Map rest of methods
				Object.keys($http).filter(function (key) {
					return typeof $http[key] === 'function';
				}).forEach(function (key) {
					return $duplicateRequestsFilter[key] = $http[key];
				});

				//Return it
				return $duplicateRequestsFilter;
			}]);
		}]);
})(window, window.angular);