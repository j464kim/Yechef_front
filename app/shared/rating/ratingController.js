'use strict';

angular.module('rating', [
    'rating.api',
])
    .controller('RatingController', ['$state', '$stateParams', 'RatingAPI', '$q',
        function ($state, $stateParams, RatingAPI, $q) {
            /*********************
             *    Private Variables
             **********************/
                // reference to this controller
            var that = this;

            /*********************
             *    Public Variables
             **********************/
            this.totalItems = 0;
            this.currentPage = 0;
            this.ratings = [];
            this.avg = [];
            this.readonly = true;
            this.dishId = $stateParams.id;
            this.bestAvgName = '';

            //Rating Inputs
            this.taste = 0;
            this.visual = 0;
            this.quantity = 0;
            this.bestAvg = 0;
            this.comment = '';

            /*********************
             *    Private Functions
             **********************/

            function _init() {
                _getAverage();
                _getRatings();
            }

            function _getRatings() {
                var pageNum = that.currentPage || that.currentPage++;

                RatingAPI.list(that.dishId, '', pageNum).then(
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
                RatingAPI.list(that.dishId, 'avg', 0).then(
                    function (response) {
                        console.log(response);
                        that.avg = response;
                        that.bestAvg = that.avg.taste_rating;
                        that.bestAvgName = 'Taste';
                        if (that.bestAvg < that.avg.visual_rating) {
                            that.bestAvg = that.avg.visual_rating;
                            that.bestAvgName = 'Visual';
                        }
                        if (that.bestAvg < that.avg.quantity_rating) {
                            that.bestAvg = that.avg.quantity_rating;
                            that.bestAvgName = 'Quantity';
                        }
                        that.bestAvg = Number(that.bestAvg).toFixed(2);
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
                //TODO: All ratings must be at minimum 1.
                if (that.taste < 1) {

                }
                if (that.visual < 1) {

                }
                if (that.quantity < 1) {

                }
                RatingAPI.create(that.dishId, that.taste, that.visual, that.quantity, that.comment).then(
                    function (response) {
                        $state.reload();
                    }, function (response) {
                        console.error(response);
                    })
            };

            this.updateComment = function (ratingId, taste, visual, quantity, comment) {
                var defer = $q.defer();
                RatingAPI.update(that.dishId, ratingId, taste, visual, quantity, comment).then(
                    function (response) {
                        console.log(response);
                        defer.resolve(true);
                    }, function (response) {
                        console.error(response);
                        defer.resolve(false);
                    }
                );
                return defer.promise;
            };

            this.destroyRating = function ($ratingId) {
                RatingAPI.destroy(that.dishId, $ratingId).then(
                    function (response) {
                        $state.reload();
                    }, function (response) {
                        console.error(response);
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