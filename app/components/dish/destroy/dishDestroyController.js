'use strict';

angular.module('dish.destroy', [
    'dishes.api',
])

    .controller('DishDestroyController', ['$state', '$stateParams', 'DishesAPI', 'devHelper', 'genericService',
        function ($state, $stateParams, DishesAPI, devHelper, genericService) {

            /*********************
             *    Private Variables
             **********************/
                // reference to this controller
            var that = this;
            var dishId = $stateParams.id;

            /*********************
             *    Public Variables
             **********************/

            /*********************
             *    Private Functions
             **********************/
            function _init() {
                _destroyDish(dishId);
            }

            /*********************
             *    Public Functions
             **********************/
            function _destroyDish() {
                devHelper.log(dishId);
                //TODO: Probably better to use ng directive to handle confirmation popup
                if (confirm("Do you want to delete the dish?")) {
                    DishesAPI.destroy(dishId)
                        .then(function (response) {
                            $state.go('dish.list');
                        }, function (response) {
                            genericService.showToast('Oops..! Something is wrong');
							devHelper.log(response, 'error');
                        });
                } else {
                    $state.go('dish.show', {"id": dishId});
                }
            }

            /*********************
             *    Initialization
             **********************/
            _init();

            /*********************
             *    EVENTS
             **********************/

        }
    ])