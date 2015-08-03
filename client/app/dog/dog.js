angular.module('adopt.dog', [])
.controller('DogController', function ($scope, Pets) {
  // Your code here
  $scope.data = {};
  $scope.info = {};

  $scope.getPet = function(){
    Pets.get('dog').success(function(response) {
      $scope.data = angular.fromJson(response);
      $scope.info.name = $scope.data.petfinder.pet.name.$t;
      $scope.info.photo = $scope.data.petfinder.pet.media.photos.photo[2].$t;
      $scope.info.desc = $scope.data.petfinder.pet.description.$t;
      console.log($scope.data);
    });
  };

  $scope.getPet();
});
