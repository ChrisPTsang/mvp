angular.module('adopt.services', [])

.factory('Pets', function ($http) {
  // Your code here
  return {
    get: function(type) {
    return $http.jsonp('http://api.petfinder.com/pet.getRandom?key=66179b33176569544383ef84306d94d2&output=basic&format=json&animal='+type+'&callback=JSON_CALLBACK');
    }
  };
});