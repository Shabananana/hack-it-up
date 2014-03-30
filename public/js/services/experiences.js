'use strict';

//Experiences service used for experiences REST endpoint
angular.module('mean.experiences').factory('Experiences', ['$resource', function($resource) {
    return $resource('experiences/:experienceId', {
        experienceId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);