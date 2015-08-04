angular.module('adopt.search', [])
.controller('SearchController', function ($scope, $location, $window, Pets) {
  // Your code here
  $scope.data = {};
  $scope.info = {};
  $scope.info.breed = '';

  $scope.getPet = function(type){
    Pets.get(type).success(function(response) {
      //api object variables
      $scope.data = angular.fromJson(response);
      $scope.info.name = $scope.data.petfinder.pet.name.$t;
      $scope.info.photo = $scope.data.petfinder.pet.media.photos.photo;
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
      $scope.addSlide();
    });
  };

  //for carousel images
  $scope.myInterval = 3000;
  $scope.noWrapSlides = false;
  $scope.slides = [];

  $scope.addSlide = function() {
    for (var i = 0; i < $scope.info.photo.length; i++) {
      if($scope.info.photo[i]['@size'] === 'x'){
        $scope.slides.push($scope.info.photo[i].$t);
      }
    }
  };
  
  $scope.redirect = function(url, refresh) {
    if(refresh || $scope.$$phase) {
        $window.location.href = url;
    } else {
        $location.path(url);
        $scope.$apply();
    }
  };
  // $scope.$on('$routeChangeSuccess', function() {
    if($location.path() === '/searchDog') {
      console.log('getting');
      $scope.getPet('dog');
    } else if($location.path() === '/searchCat') {
      $scope.getPet('cat');
    }
  // });
});
