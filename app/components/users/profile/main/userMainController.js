angular.module('user.profile', ['ngMaterial'])
	.controller('userMainController', function ($scope, $timeout, $mdSidenav, devHelper, sessionService, $state, genericService) {
		if (!sessionService.isLogin()) {
			$state.go('user.login');
		}
		$scope.toggleLeft = genericService.buildToggler('left');
		$scope.toggleRight = genericService.buildToggler('right');
		$scope.isOpenRight = function () {
			return $mdSidenav('right').isOpen();
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