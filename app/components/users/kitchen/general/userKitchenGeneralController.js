angular.module('user.kitchen.general', [
	'ngMaterial',
])

	.controller('userKitchenGeneralController', function ($scope, $timeout, $mdSidenav, devHelper, UserAPI, KitchenAPI, $state, $stateParams, $q, genericService) {
		var that = this;

		this.myCurrentKitchenId = $stateParams.myCurrentKitchenId;
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
				genericService.showToast('Oops..! Something is wrong');
				devHelper.log(response, 'error');
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
					genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
				});
		};

		this.addAdmin = function () {
			devHelper.log(that.adminToAdd);
			KitchenAPI.addAdmin(that.adminToAdd.id, that.myCurrentKitchenId).then(function (response) {
				devHelper.log(response);
				_getKitchenAdmins();
			}, function (response) {
				genericService.showToast(response.data.message);
				devHelper.log(response, 'error');
			});
		};

		this.removeAdmin = function (adminId) {
			if (confirm("Remove this admin??")) {
				KitchenAPI.removeAdmin(adminId, that.myCurrentKitchenId).then(function (response) {
					devHelper.log(response);
					_getKitchenAdmins();
				}, function (response) {
					genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
				});
			}
		};

		this.querySearch = genericService.querySearch;

		_init();

	});


