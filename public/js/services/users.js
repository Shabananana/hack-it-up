/**
 * Created by Jeffrey on 3/29/2014.
 */
'use strict';

//Users service used for users REST endpoint
angular.module('mean.users').factory('Users', ['$resource', function($resource) {
    return $resource('users/:userId', {
        userId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);