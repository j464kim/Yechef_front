angular.module('user.profile', ['ngMaterial'])
	.controller('userMainController', function ($scope, $timeout, $mdSidenav, devHelper) {
		$scope.toggleLeft = buildDelayedToggler('left');
		$scope.toggleRight = buildToggler('right');
		$scope.isOpenRight = function () {
			return $mdSidenav('right').isOpen();
		};
		$scope.privacy = {
			phone: false,
			forkedDish: true,
			subscribedKitchen: false

		};
		$scope.paymentCards = [
			{
				type: 'VISA',
				number: '1111-2222-3333-4444'
			},
			{
				type: 'MASTER',
				number: '1111-2222-3333-4444'
			},
			{
				type: 'AMEX',
				number: '1111-2222-3333-4444'
			}
		]
		/**
		 * Supplies a function that will continue to operate until the
		 * time is up.
		 */
		function debounce(func, wait, context) {
			var timer;

			return function debounced() {
				var context = $scope,
					args = Array.prototype.slice.call(arguments);
				$timeout.cancel(timer);
				timer = $timeout(function () {
					timer = undefined;
					func.apply(context, args);
				}, wait || 10);
			};
		}

		/**
		 * Build handler to open/close a SideNav; when animation finishes
		 * report completion in console
		 */
		function buildDelayedToggler(navID) {
			return debounce(function () {
				// Component lookup should always be available since we are not using `ng-if`
				$mdSidenav(navID)
					.toggle()
					.then(function () {
						devHelper.log("toggle " + navID + " is done");
					});
			}, 200);
		}

		function buildToggler(navID) {
			return function () {
				// Component lookup should always be available since we are not using `ng-if`
				$mdSidenav(navID)
					.toggle()
					.then(function () {
						devHelper.log("toggle " + navID + " is done");
					});
			};
		}
	})
	.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, devHelper) {
		$scope.close = function () {
			// Component lookup should always be available since we are not using `ng-if`
			$mdSidenav('left').close()
				.then(function () {
					devHelper.log("close LEFT is done");
				});

		};
	})
	.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, devHelper) {
		$scope.close = function () {
			// Component lookup should always be available since we are not using `ng-if`
			$mdSidenav('right').close()
				.then(function () {
					devHelper.log("close RIGHT is done");
				});
		};
	});