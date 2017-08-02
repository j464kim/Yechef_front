'use strict';

angular.module('rating')
    .controller('RatingCreateController', ['$state', '$scope', 'RatingAPI', 'devHelper', '$mdDialog',
        function ($state, $scope, RatingAPI, devHelper, $mdDialog) {
            /*********************
             *    Private Variables
             **********************/
                // reference to this controller
            var that = this;

            /*********************
             *    Public Variables
             **********************/

            /*********************
             *    Private Functions
             **********************/
            function _init(dishId, orderItemId) {
                that.dishId = dishId;
                that.orderItemId = orderItemId;
            }
            function _isValidInput() {
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
            this.init = _init;

            this.rateDish = function () {
                if (!_isValidInput()) {
                    devHelper.log("Invalid Rating Inputs");
                    return;
                }
                RatingAPI.create(that.dishId, that.orderItemId, that.rating).then(
                    function (response) {
						$mdDialog.hide();
						$state.go('dish.show', {"id": that.dishId});
					}, function (response) {
						devHelper.log(response, 'error');
                    })
            };

            /*********************
             *    EVENTS
             **********************/
        }
    ])