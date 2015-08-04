angular.module('adopt', [
  'adopt.services',
  'adopt.search',
  'ui.bootstrap',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/searchDog', {
      templateUrl: 'app/dog/dog.html',
      controller: 'SearchController'
    })
    .when('/searchCat', {
      templateUrl: 'app/cat/cat.html',
      controller: 'SearchController'
    })
    .when('/search', {
      templateUrl: 'app/search/search.html',
      controller: 'SearchController'
    })
    .otherwise({
      redirectTo: '/search'
    });
});