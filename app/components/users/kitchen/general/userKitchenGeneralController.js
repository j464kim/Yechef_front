angular.module('user.kitchen.general', [
	'ngMaterial',
])

	.controller('userKitchenGeneralController', function ($scope, $timeout, $mdSidenav, devHelper, UserAPI, KitchenAPI, $state, $stateParams, $q, genericService) {
		var that = this;

		this.myCurrentKitchenId = $stateParams.myCurrentKitchenId;
		that.myCurrentKitchen = $stateParams.myCurrentKitchen;
		that.isKitchenSelected = false;

		function _init() {
			_getKitchenAdmins();
			_getUsers();
		}

		function _getKitchenAdmins() {
			KitchenAPI.getAdmins(that.myCurrentKitchenId).then(function (response) {
				devHelper.log(response);
				that.kitchenAdmins = response;
			}, function (response) {
				//TODO handle error state
				console.error(response);
			});
		}

		function _getUsers() {
			UserAPI.list('list').then(
				function (response) {
					devHelper.log(response);
					that.users = response;
					that.users = that.users.map(function (user) {
						user.value = user.email.toLowerCase();
						return user;
					});
				}, function (response) {
					//TODO handle error state
					console.error(response);
				});
		};

		function _updateKitchen(myCurrentKitchenToEdit, mainCtrl) {
			KitchenAPI.update(myCurrentKitchenToEdit, that.myCurrentKitchen.id).then(function (response) {
				var updatedKitchen = response;
				mainCtrl.myCurrentKitchen.name = updatedKitchen.name;
				mainCtrl.myCurrentKitchen.phone = updatedKitchen.phone;
				mainCtrl.myCurrentKitchen.address = updatedKitchen.address;
				mainCtrl.myCurrentKitchen.email = updatedKitchen.email;
				mainCtrl.myCurrentKitchen.description = updatedKitchen.description;
				mainCtrl.myCurrentKitchen.medias = updatedKitchen.medias;
				devHelper.log(response);
				$state.go('user.kitchen.general.view', {'myCurrentKitchenId': updatedKitchen.id});
			}, function (response) {
				// TODO handle error state
				console.error(response);
			});
		}

		this.addAdmin = function () {
			devHelper.log(that.adminToAdd);
			KitchenAPI.addAdmin(that.adminToAdd.id, that.myCurrentKitchenId).then(function (response) {
				devHelper.log(response);
				_getKitchenAdmins();
			}, function (response) {
				//TODO handle error state
				console.error(response);
			});
		};

		this.removeAdmin = function (adminId) {
			if (confirm("Remove this admin??")) {
				KitchenAPI.removeAdmin(adminId, that.myCurrentKitchenId).then(function (response) {
					devHelper.log(response);
					_getKitchenAdmins();
				}, function (response) {
					//TODO handle error state
					console.error(response);
				});
			}
		};

		this.querySearch = genericService.querySearch;
		this.updateKitchen = _updateKitchen;

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


