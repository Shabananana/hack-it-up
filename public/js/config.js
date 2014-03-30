'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('all articles', {
        url: '/articles',
        templateUrl: 'views/articles/list.html'
    })
      .state('create article', {
        url: '/articles/create',
        templateUrl: 'views/articles/create.html'
    })
      .state('edit article', {
        url: '/articles/:articleId/edit',
        templateUrl: 'views/articles/edit.html'
    })
      .state('article by id', {
        url: '/articles/:articleId',
        templateUrl: 'views/articles/view.html'
    })
      .state('all users', {
        url: '/users',
        templateUrl: 'views/users/list.html'
    })
      .state('user by id', {
        url: '/users/:userId',
        templateUrl: 'views/users/view.html'
    })
      .state('all experiences', {
        url: '/experiences',
        templateUrl: 'views/experiences/list.html'
    })
      .state('create experience', {
        url: '/experiences/create',
        templateUrl: 'views/experiences/create.html'
    })
      .state('edit experience', {
        url: '/experiences/:experienceId/edit',
        templateUrl: 'views/experiences/edit.html'
    })
      .state('experience by id', {
        url: '/experiences/:experienceId',
        templateUrl: 'views/experiences/view.html'
    })
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
