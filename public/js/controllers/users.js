/**
 * Created by Jeffrey on 3/29/2014.
 */
'use strict';

angular.module('mean.users').controller('UsersController', ['$scope', '$stateParams', '$location', 'Global', 'Users', function ($scope, $stateParams, $location, Global, Users) {
    $scope.global = Global;

    $scope.update = function() {
        var user = $scope.user;
        if (!user.updated) {
            user.updated = [];
        }
        user.updated.push(new Date().getTime());

        user.$update(function() {
            $location.path('users/' + user._id);
        });
    };

    $scope.find = function() {
        Users.query(function(users) {
            $scope.users = users;
        });
    };

    $scope.findOne = function() {
        Users.get({
            userId: $stateParams.userId
        }, function(user) {
            $scope.user = user;
        });
    };
}]);