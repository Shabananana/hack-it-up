'use strict';

angular.module('mean.experiences').controller('ExperiencesController', ['$scope', '$stateParams', '$location', 'Global', 'Experiences', function ($scope, $stateParams, $location, Global, Experiences) {
    $scope.global = Global;

    $scope.create = function() {
        var experience = new Experiences({
            awardee: this.awardee,
            xp: this.xp,
            created: this.created,
            description: this.description
        });
        experience.$save(function(response) {
            $location.path('experiences/' + response._id);
        });

        this.awardee = '';
        this.description = '';
        this.xp = 0;
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
            $location.path('experiences');
        }
    };

    $scope.update = function() {
        var experience = $scope.experience;
        if (!experience.updated) {
            experience.updated = [];
        }
        experience.updated.push(new Date().getTime());

        experience.$update(function() {
            $location.path('experiences/' + experience._id);
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