angular.module('user.kitchen', [
	'ngMaterial',
	'chart.js',
])

	.controller('userKitchenController', function ($scope, $timeout, $mdSidenav, devHelper, UserAPI, KitchenAPI, $state, $stateParams, genericService, mapService) {
		var that = this;

		this.myCurrentKitchenId = $stateParams.myCurrentKitchenId;
		that.myCurrentKitchen = $stateParams.myCurrentKitchen;
		that.isKitchenSelected = false;


		this.myKitchensTotalItems = 0;
		this.myKitchensCurrentPage = 0;

		function _init() {
			_getMyKitchens();
		}

		$scope.$watch(function () {
			return that.myCurrentKitchen
		}, function (newVal, oldVal) {
			that.myCurrentKitchenToEdit = angular.copy(newVal);
		});
		$scope.toggleLeft = genericService.buildToggler('left');
		$scope.toggleRight = genericService.buildToggler('right');

		function _getMyKitchens() {
			var pageNum = ++that.myKitchensCurrentPage;
			UserAPI.getMyKitchens(pageNum, 100).then(
				function (response) {
					devHelper.log(response);
					if (!that.myKitchens) {
						that.myKitchens = [];
					}
					that.myKitchens = that.myKitchens.concat(response.data);
					that.myKitchensTotalItems = response.total;
					that.myKitchensCurrentPage = response.current_page;
				}, function (response) {
					genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
				});
		};

		this.preSelect = function () {
			if (that.myCurrentKitchenId) {
				for (index in that.myKitchens) {
					var kitchen = that.myKitchens[index];
					if (kitchen.id == that.myCurrentKitchenId) {
						that.myCurrentKitchen = kitchen;
						that.isKitchenSelected = true;
						// mapService.restrictAddressByCountry(that, kitchen.country);
						return true;
					}
				}
			} else {
				//If No current Kitchen is set, just set the first kitchen to be selected
				$state.go('.', {'myCurrentKitchenId': that.myKitchens[0].id});
			}
		};

		this.selectChanged = function () {
			$state.go('.', {'myCurrentKitchenId': that.myCurrentKitchen.id});
		};

		_init();

	})

	.controller("LineGraphCtrl", ['$scope', '$timeout', function ($scope, $timeout) {

		$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
		$scope.series = ['Series A', 'Series B'];
		$scope.data = [
			[65, 59, 80, 81, 56, 55, 40],
			[28, 48, 40, 19, 86, 27, 90]
		];
		$scope.onClick = function (points, evt) {
			console.log(points, evt);
		};

		// Simulate async data update
		$timeout(function () {
			$scope.data = [
				[28, 48, 40, 19, 86, 27, 90],
				[65, 59, 80, 81, 56, 55, 40]
			];
		}, 3000);
	}])

	.controller("DynamicChartCtrl", function ($scope) {
		$scope.labels = ["BiBimBab", "Cold Noodle", "Scallop Fried Rice", "HandMade Coffee", "Cookie"];
		$scope.data = [300, 500, 100, 40, 120];
		$scope.type = 'polarArea';

		$scope.toggleChart = function () {
			$scope.type = $scope.type === 'polarArea' ?
				'pie' : 'polarArea';
		};
	});


