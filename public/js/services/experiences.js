/**
 * Created by Jeffrey on 3/29/2014.
 */
'use strict';

//Experiences service used for experiences REST endpoint
angular.module('mean.experiences').factory('Experiences', ['$resource', function($resource) {
    return $resource('xp/:xpId', {
        experienceId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);