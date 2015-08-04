angular.module('adopt.search', [])
.controller('SearchController', function ($scope, Pets) {
  // Your code here
  $scope.data = {};
  $scope.info = {};
  $scope.info.breed = '';
  $scope.type = '';

  $scope.getPet = function(type){
    Pets.get(type).success(function(response) {
      $scope.data = angular.fromJson(response);
      $scope.info.name = $scope.data.petfinder.pet.name.$t;
      $scope.info.photo = $scope.data.petfinder.pet.media.photos.photo[2].$t;
      $scope.info.desc = $scope.data.petfinder.pet.description.$t;

      var breed = $scope.data.petfinder.pet.breeds.breed;

      if(Array.isArray(breed)){
        for(var i = 0; i < breed.length; i++) {
          if(i === 0) {
            $scope.info.breed += breed[i].$t;
          } else {
            $scope.info.breed += '/' + breed[i].$t;
          }
        }
      } else {
        // $scope.info.breed = 'Unknown';
      }
      console.log($scope.data);
    });
  };
});
