'use strict';

angular.module('user.profile.payout.list', [
	'payout.api', 'ngMaterial',
])

	.controller('PayoutListController', ['$stateParams', '$state', 'PayoutAPI', 'CheckoutService', 'devHelper', 'genericService', 'config', '$scope',
		function ($stateParams, $state, PayoutAPI, CheckoutService, devHelper, genericService, config, $scope) {

			/*********************
			 *  Private Variables
			 **********************/

			/*********************
			 *  Public Variables
			 **********************/
			var that = this;
			this.payoutCountries = genericService.loadItems(config.payoutCountries);
			this.hasAccount = false;
			this.hasNoAccount = false;

			/*********************
			 *  Private Functions
			 **********************/
			function _init() {
				_getPayoutAccount();
			}

			function _getPayoutAccount() {
				PayoutAPI.getAccount()
					.then(function (response) {
						devHelper.log(response);
						that.account = response;
						if (that.account) {
							that.hasAccount = true
						} else {
							that.hasNoAccount = true;
						}
						devHelper.log('Successfully retrieved the list of Payout Account of the user');
					}, function (response) {
						// TODO handle error state-*/ ˙
						devHelper.log(response, 'error');
					})
			}

			function _updateAddress() {
				devHelper.log(that.address);
				PayoutAPI.updateAddress(that.address, that.account.id)
					.then(function (response) {
						devHelper.log(response);
						that.account = response;
						devHelper.log('Successfully updated address of payout account');
						$state.go('user.profile.payout.list');
					}, function (response) {
						// TODO handle error state-*/ ˙
						devHelper.log(response, 'error');
					})
			}

			function _updatePersonalInfo() {
				PayoutAPI.updateInfo(that.info, that.account.id)
					.then(function (response) {
						devHelper.log(response);
						that.account = response;
						devHelper.log('Successfully updated personal information of payout account');
						$state.go('user.profile.payout.list');
					}, function (response) {
						// TODO handle error state-*/ ˙
						devHelper.log(response, 'error');
					})
			}

			function _uploadID() {
				// instantiate Dropzone
				var dropzoneInstance = Dropzone.forElement("#dropzone");

				// specific config for id upload
				dropzoneInstance.options.url = config.endpoint + 'payout/identity';
				dropzoneInstance.options.uploadMultiple = false;

				dropzoneInstance.processQueue();

				dropzoneInstance.on("success", function (file, xhr, formData) {
					$state.go('user.profile.payout.list');
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.updateAddress = _updateAddress;
			this.updatePersonalInfo = _updatePersonalInfo;
			this.uploadID = _uploadID;
			this.getStates = genericService.getStates;
			this.querySearch = genericService.querySearch;

			/*********************
			 *  Initialization
			 **********************/
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
