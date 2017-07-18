'use strict';

angular.module('kitchen.list', [
    'kitchen.api'
])

    .controller('KitchenListController', ['$state', 'KitchenAPI', 'devHelper', 'genericService',
        function ($state, KitchenAPI, devHelper, genericService) {

            /*********************
             *  Private Variables
             **********************/
                // reference to this controller
            var that = this;
            /*********************
             *  Public Variables
             **********************/
            this.totalItems = 0;
            this.currentPage = 0;
            this.kitchens = [];

            /*********************
             *  Private Functions
             **********************/

            function _init() {
                _getKitchens();
            }

            function _getKitchens() {
                var pageNum = that.currentPage || that.currentPage++;

                KitchenAPI.list(pageNum).then(function (response) {
                    devHelper.log(response);
                    that.kitchens = that.kitchens.concat(response.data);
                    that.totalItems = response.total;
                    that.currentPage = response.current_page;
                }, function (response) {
                    genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
                });
            }

            /*********************
             *  Public Functions
             **********************/
            this.getKitchens = _getKitchens;

            /*********************
             *  Initialization
             **********************/
            _init();


            /*********************
             *  EVENTS
             **********************/

        }
    ]);
