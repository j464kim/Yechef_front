'use strict';

angular.module('rating')
    .controller('RatingCreateController', ['$state', '$stateParams', 'RatingAPI', 'devHelper',
        function ($state, $stateParams, RatingAPI, devHelper) {
            /*********************
             *    Private Variables
             **********************/
                // reference to this controller
            var that = this;

            /*********************
             *    Public Variables
             **********************/
            this.dishId = $stateParams.id;

            /*********************
             *    Private Functions
             **********************/
            function _validateInputs() {
                if (that.rating === undefined) {
                    return false;
                }
                if (that.rating.taste_rating === undefined) {
                    return false;
                }
                if (that.rating.visual_rating === undefined) {
                    return false;
                }
                if (that.rating.quantity_rating === undefined) {
                    return false;
                }
                return true;
            }

            // /*********************
            //  *    Public Functions
            //  **********************/
            this.rateDish = function () {
                if (!_validateInputs()) {
                    devHelper.log("Invalid Rating Inputs");
                    return;
                }
                RatingAPI.create(that.dishId, that.rating).then(
                    function (response) {
                        $state.reload();
                    }, function (response) {
                        console.error(response);
                    })
            };

            /*********************
             *    EVENTS
             **********************/
        }
    ])