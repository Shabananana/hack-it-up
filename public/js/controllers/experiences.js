/**
 * Created by Jeffrey on 3/29/2014.
 */
'use strict';

angular.module('mean.experiences').controller('ExperiencesController', ['$scope', '$stateParams', '$location', 'Global', 'Experiences', function ($scope, $stateParams, $location, Global, Experiences) {
    $scope.global = Global;

    $scope.create = function() {
        var experience = new Experiences({
            Description: this.Description,
            SourcePeepName: this.SourcePeepName,
            XP: this.XP
        });
        experience.$save(function(response) {
            $location.path('xp/' + response._id);
        });

        this.Description = '';
        this.SourcePeepName = '';
        this.XP = 0;
    };

    $scope.remove = function(experience) {
        if (experience) {
            experience.$remove();

            for (var i in $scope.experiences) {
                if ($scope.experiences[i] === experience) {
                    $scope.experiences.splice(i, 1);
                }
            }
        }
        else {
            $scope.experience.$remove();
            $location.path('xp');
        }
    };

    $scope.update = function() {
        var experience = $scope.experience;
        if (!experience.updated) {
            experience.updated = [];
        }
        experience.updated.push(new Date().getTime());

        experience.$update(function() {
            $location.path('xp/' + experience._id);
        });
    };

    $scope.find = function() {
        Experiences.query(function(experiences) {
            $scope.experiences = experiences;
        });
    };

    $scope.findOne = function() {
        Experiences.get({
            experienceId: $stateParams.experienceId
        }, function(experience) {
            $scope.experience = experience;
        });
    };
}]);
