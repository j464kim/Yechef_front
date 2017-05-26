'use strict';

angular.module('like', [
	'like_api'
])

	.directive('likeDirective', function () {
		return {
			restrict: 'EA',
			transclude: true,
			scope: {
				likable: '='
			},
			templateUrl: 'shared/like/template.html',
			controller: function ($scope) {
				console.log('inside directive: ');
				console.log($scope.likable);
			}
		};
	})

	.controller('LikeController', ['$scope', 'LikeAPI',
		function ($scope, LikeAPI) {

			/*********************
			 *  Private Variables
			 **********************/
			// reference to this controller


			/*********************
			 *  Public Variables
			 **********************/
			var that = this;

			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_getReactions();
			}

			// TODO(1): Along with the numeber of likes/dislikes, this function will retrieve current user's reaction information
			// TODO For this, I need know which user is logged in to retrieve the user's reaction


			function _getReactions() {

				var likable = $scope.likable;
				var likeObj = {
					likableId: likable.id,
					// TODO: set it to 1 for now until (1) is done
					userId: 1
				};

				LikeAPI.index(likeObj, 'getReactions').then(function (response) {
					that.numLikes = response.numLikes;
					that.numDislikes = response.numDislikes;
					that.userReactionId = response.userReactionId;
					that.userReactionKind = response.userReactionKind;

					_findUserReaction(that.userReactionKind);

					console.log(likeObj);

				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			function _addReaction(likableId, isLike) {
				var reactionObj = {
					likableId: likableId,
					isLike: isLike,
					// TODO: set it to 1 for now until (1) is done
					userId: 1
				};

				LikeAPI.store(reactionObj).then(function (response) {
					var newReaction = response;
					var oldReactionKind = newReaction.oldReactionKind;
					console.log(newReaction);

					// un-toggle existing reaction
					_toggleReaction(false, oldReactionKind);

					// toggle the button & update # likes/dislikes on the fly
					_toggleReaction(true, isLike)

				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			// TODO(2): Read the comment below
			// For behaviours such as un-liking a post right after liking it, the page has to be refreshed
			// and the newly created reaction id should be passed to _removeReaction in order to do that.
			// We need to open a socket in order to get just created like entry because page refresh every time
			// like is toggled isn't an ideal behavior
			// As a workaround, I will pass some extra information into request in order to look for the added reaction
			function _removeReaction(likableId, isLike) {

				var reactionObj = {
					likableId: likableId,
					// TODO: set it to 1 for now until (1) is done
					userId: 1
				};

				var userReactionId = 1; // placeholder for now until (1) is implemented
				LikeAPI.destroy(reactionObj, userReactionId).then(function (response) {
					var removedReaction = response;
					console.log(removedReaction);

					// toggle the button & update # likes/dislikes on the fly
					_toggleReaction(false, isLike);

				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			function _toggleReaction(toAdd, isLike) {
				if (toAdd) {
					switch (isLike) {
						case 0:
							console.log('disliked');
							that.disliked = true;
							that.numDislikes += 1;
							break;
						case 1:
							console.log('liked');
							that.liked = true;
							that.numLikes += 1;
							break;
					}
				} else {
					switch (isLike) {
						case 0:
							console.log('un-disliked');
							that.disliked = false;
							that.numDislikes -= 1;
							break;
						case 1:
							console.log('un-liked');
							that.liked = false;
							that.numLikes -= 1;
							break;
					}
				}
			}

			function _findUserReaction(reactionKind) {
				switch (reactionKind) {
					case 0:
						that.disliked = true;
						break;
					case 1:
						that.liked = true;
						break;
				}
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.addReaction = _addReaction;
			this.removeReaction = _removeReaction;


			/*********************
			 *  Initialization
			 **********************/
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}])
;


