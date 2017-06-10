'use strict';

angular.module('dish.update', [
    'dishes.api',
])

    .controller('DishUpdateController', ['$state', '$stateParams', 'DishesAPI', 'config', '$q', '$timeout',
        function ($state, $stateParams, DishesAPI, config, $q, $timeout) {

            /*********************
             *    Private Variables
             **********************/
                // reference to this controller
            var that = this;
            var dishId = $stateParams.id;

            /*********************
             *    Public Variables
             **********************/
            this.nationalities = _loadNationalities();
            this.querySearch = querySearch;

            /*********************
             *    Private Functions
             **********************/

            function _init() {
                _showDish(dishId);
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

            function _updateDish() {
                DishesAPI.update(that.dish, that.dish.id)
                    .then(function (response) {
                        $state.go('dish.show', {"id": response.id});
                    }, function (response) {
                        //     TODO handle error state
                        console.error(response);
                    });
            }

            /**
             * Search for nationalities... use $timeout to simulate
             * remote dataservice call.
             */
            function querySearch(query) {
                var results = query ? that.nationalities.filter(createFilterFor(query)) : that.nationalities,
                    deferred;
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            }

            /**
             * Build `states` list of key/value pairs
             */
            function _loadNationalities() {

                return (config.nationalities).split(/, +/g).map(function (nationality) {
                    return {
                        value: nationality.toLowerCase(),
                        display: nationality
                    };
                });
            }

            /**
             * Create filter function for a query string
             */
            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(nationality) {
                    return (nationality.value.indexOf(lowercaseQuery) === 0);
                };

            }

            /*********************
             *    Public Functions
             **********************/
            this.updateDish = _updateDish;
            this.cancel = function cancel() {
                if (confirm("Do you want to go back?")) {
                    $state.go('dish.show', {"id": dishId});
                }
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