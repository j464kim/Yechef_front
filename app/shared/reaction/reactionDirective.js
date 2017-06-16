'use strict';

angular.module('reaction', [
	'reaction_api'
])
	.constant('constant', {'DISLIKE': 0, 'LIKE': 1, 'FORK': 2, 'SUBSCRIBE': 3})

	.directive('reactionButton', ['constant', function (constant) {
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				reactionable: '=',
				for: '=',
			},
			templateUrl: 'shared/reaction/reactionDirective.html',
			// isolated scope
			controller: function ($scope, ReactionAPI, $state, devHelper, genericService, $rootScope) {

				/*********************
				 *  Private Variables
				 **********************/
					// reference to $scope controller
				var reactionable = $scope.reactionable;

				// figure out which eloquent model it belongs to
				var reactionableInfo = genericService.getModelType($state);

				var reactionObj = {
					reactionableId: reactionable.id,
					reactionableType: reactionableInfo['type'],
					userId: $rootScope.currentUser.id
				};

				/*********************
				 *  Public Variables
				 **********************/
				$scope.TYPE = reactionableInfo['name'];
				$scope.DISLIKE = constant.DISLIKE;
				$scope.LIKE = constant.LIKE;
				$scope.FORK = constant.FORK;
				$scope.SUBSCRIBE = constant.SUBSCRIBE;


				/*********************
				 *  Private Functions
				 **********************/

				function _init() {
					_getReactions();
				}

				// TODO(1): Along with the numeber of likes/dislikes, $scope function will retrieve current user's reaction information
				// TODO For $scope, I need know which user is logged in to retrieve the user's reaction


				function _getReactions() {

					ReactionAPI.index(reactionObj, 'getReactions').then(function (response) {
						$scope.userReactionId = response.userReactionId;
						$scope.userReactionKind = response.userReactionKind;
						$scope.numLikes = response.numLikes;
						$scope.numDislikes = response.numDislikes;
						$scope.numForks = response.numForks;
						$scope.numSubscribes = response.numSubscribes;

						_findUserReaction($scope.userReactionKind);
						devHelper.log(reactionObj);

					}, function (response) {
						// TODO handle error state
						console.error(response);
					});
				}

				function _addReaction(kind) {

					reactionObj.kind = kind;

					ReactionAPI.store(reactionObj).then(function (response) {
						var newReaction = response;
						var oldReactionKind = newReaction.oldReactionKind;
						devHelper.log(newReaction);

						// un-toggle existing reaction
						_decrementReaction(oldReactionKind);

						// toggle the button & update # likes/dislikes on the fly
						_incrementReaction(kind)

					}, function (response) {
						// TODO handle error state
						console.error(response);
					});
				}

				// TODO(2): Read the comment below
				// For behaviours such as un-liking a post right after liking it, the page has to be refreshed
				// and the newly created reaction id should be passed to _removeReaction in order to do $scope.
				// We need to open a socket in order to get just created like entry because page refresh every time
				// like is toggled isn't an ideal behavior
				// As a workaround, I will pass some extra information into request in order to look for the added reaction
				function _removeReaction(kind) {

					var userReactionId = 1; // placeholder for now until (1) is implemented
					ReactionAPI.destroy(reactionObj, userReactionId).then(function (response) {
						var removedReaction = response;
						devHelper.log(removedReaction);

						// toggle the button & update # likes/dislikes on the fly
						_decrementReaction(kind);

					}, function (response) {
						// TODO handle error state
						console.error(response);
					});
				}

				function _incrementReaction(kind) {
					switch (kind) {
						case 0:
							devHelper.log('Disliked');
							$scope.disliked = true;
							$scope.numDislikes += 1;
							break;
						case 1:
							devHelper.log('Liked');
							$scope.liked = true;
							$scope.numLikes += 1;
							break;
						case 2:
							devHelper.log('Forked');
							$scope.forked = true;
							$scope.numForks += 1;
							break;
						case 3:
							devHelper.log('Subscribed');
							$scope.subscribed = true;
							$scope.numSubscribes += 1;
							break;
					}
				}

				function _decrementReaction(kind) {
					switch (kind) {
						case 0:
							devHelper.log('Un-Disliked');
							$scope.disliked = false;
							$scope.numDislikes -= 1;
							break;
						case 1:
							devHelper.log('Un-Liked');
							$scope.liked = false;
							$scope.numLikes -= 1;
							break;
						case 2:
							devHelper.log('Un-Forked');
							$scope.forked = false;
							$scope.numForks -= 1;
							break;
						case 3:
							devHelper.log('Un-Subscribed');
							$scope.subscribed = false;
							$scope.numSubscribes -= 1;
							break;
					}
				}

				function _findUserReaction(reactionKind) {
					switch (reactionKind) {
						case 0:
							$scope.disliked = true;
							break;
						case 1:
							$scope.liked = true;
							break;
						case 2:
							$scope.forked = true;
							break;
						case 3:
							$scope.subscribed = true;
							break;
					}
				}

				/*********************
				 *  Public Functions
				 **********************/
				$scope.addReaction = _addReaction;
				$scope.removeReaction = _removeReaction;


				/*********************
				 *  Initialization
				 **********************/
				_init();

				/*********************
				 *  EVENTS
				 **********************/

			}
		};
	}]);
