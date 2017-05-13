'use strict';

angular.module('dish.show', [
    'dishes.api',
])

    .controller('DishShowController', ['$state', '$stateParams', 'DishesAPI',
        function ($state, $stateParams, DishesAPI) {

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
                _showDish();
            }

            function _showDish() {
                DishesAPI.show(dishId)
                    .then(function (response) {
                        that.dish = response;
                    }, function (response) {
                        // TODO handle error state
                        console.error(response);
                    });
            }

            /*********************
             *    Public Functions
             **********************/
            this.update = function _update() {
                //TODO: Will need to validate the user access control.
                $state.go('dish.update', {"id": this.dish.id});
            };
            this.destroy = function _destory() {
                //TODO: Will need to validate the user access control.
                $state.go('dish.destroy', {"id": this.dish.id});
            };

            /*********************
             *    Initialization
             **********************/
            _init();

            /*********************
             *    EVENTS
             **********************/


        }
    ])