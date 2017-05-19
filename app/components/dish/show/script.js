'use strict';

angular.module('dish.show', [
    'dishes.api', 'rating.api',
])

    .controller('DishShowController', ['$state', '$stateParams', 'DishesAPI', 'RatingAPI',
        function ($state, $stateParams, DishesAPI, RatingAPI) {

            /*********************
             *    Private Variables
             **********************/
                // reference to this controller
            var that = this;
            var dishId = $stateParams.id;

            /*********************
             *    Public Variables
             **********************/
            this.totalItems = 0;
            this.currentPage = 0;
            this.ratings = [];
            this.avg = [];
            this.readonly = true;

            //Rating Inputs
            this.taste = 0;
            this.visual = 0;
            this.quantity = 0;
            this.comment = '';
            this.dishId = dishId;
            /*********************
             *    Private Functions
             **********************/

            function _init() {
                _showDish();
                _getAverage();
                _getRatings();
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

            function _getRatings() {
                var pageNum = that.currentPage || that.currentPage++;

                RatingAPI.list(dishId, '', pageNum).then(
                    function (response) {
                        console.log(response);
                        that.ratings = that.ratings.concat(response.data);
                        that.totalItems = response.total;
                        that.currentPage = response.currentPage;
                    }, function (response) {
                        // TODO handle error state ie. front end display
                        console.error(response);
                    });
            }

            function _getAverage() {
                RatingAPI.list(dishId, 'avg', 0).then(
                    function (response) {
                        console.log(response);
                        that.avg = response;
                    }, function (response) {
                        console.error(response);
                    });
            }

            // /*********************
            //  *    Public Functions
            //  **********************/
            this.getRatings = _getRatings;
            this.getAvg = _getAverage;
            this.rateDish = function () {
                RatingAPI.create(dishId, that.taste, that.visual, that.quantity, that.comment).then(
                    function (response) {
                        $state.reload();
                    })
            };
            this.destroyRating = function ($ratingId) {
                RatingAPI.destroy(dishId, $ratingId).then(
                    function (response) {
                        $state.reload();
                    }
                )
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