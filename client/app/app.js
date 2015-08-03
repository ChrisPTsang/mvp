angular.module('adopt', [
  'adopt.services',
  'adopt.dog',
  'adopt.cat',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/searchDog', {
      templateUrl: 'app/dog/dog.html',
      controller: 'DogController'
    })
    .when('/searchCat', {
      templateUrl: 'app/cat/cat.html',
      controller: 'CatController'
    })
    .when('/search', {
      templateUrl: 'app/search/search.html'
    })
    .otherwise({
      redirectTo: '/search'
    });
});