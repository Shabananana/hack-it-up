'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'mean.system', 'mean.articles', 'mean.experiences', 'mean.users']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.experiences', []);
angular.module('mean.users', []);