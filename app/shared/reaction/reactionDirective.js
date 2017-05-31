'use strict';

angular.module('reaction', [
	'reaction_api'
])

	.directive('reactionDirective', function () {
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				reactionable: '='
			},
			templateUrl: 'shared/reaction/template.html',
			// isolated scope
			controller: function ($scope, ReactionAPI, $state, devHelper) {

				/*********************
				 *  Private Variables
				 **********************/
					// reference to $scope controller
				var reactionable = $scope.reactionable;

				// figure out which eloquent model it belongs to
				var stateName = $state.current.name;
				var modelName = stateName.split(".")[0];
				var reactionable_type = 'App\\Models\\' + modelName;

				var reactionObj = {
					reactionableId: reactionable.id,
					reactionableType: reactionable_type,
					// TODO: set it to 1 for now until (1) is done
					userId: 1
				};

				/*********************
				 *  Public Variables
				 **********************/

				// Is there a way HTML can access constant value of its controller?
				$scope.DISLIKE = 0;
				$scope.LIKE = 1;

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
						$scope.numLikes = response.numLikes;
						$scope.numDislikes = response.numDislikes;
						$scope.userReactionId = response.userReactionId;
						$scope.userReactionKind = response.userReactionKind;

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
							devHelper.log('disliked');
							$scope.disliked = true;
							$scope.numDislikes += 1;
							break;
						case 1:
							devHelper.log('liked');
							$scope.liked = true;
							$scope.numLikes += 1;
							break;
					}
				}

				function _decrementReaction(kind) {
					switch (kind) {
						case 0:
							devHelper.log('un-disliked');
							$scope.disliked = false;
							$scope.numDislikes -= 1;
							break;
						case 1:
							devHelper.log('un-liked');
							$scope.liked = false;
							$scope.numLikes -= 1;
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
	});
