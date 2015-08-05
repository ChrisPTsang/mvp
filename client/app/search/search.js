angular.module('adopt.search', [])
.controller('SearchController', function ($scope, $location, $window, Pets) {
  // Your code here
  $scope.data = {};
  $scope.info = {};
  $scope.info.breed = '';

  $scope.searchResults = [];
  //helper function to cut up array
  var chunk = function(arr) {
   var newArr = [];
      for (var i=0; i<arr.length; i+=4) {
          newArr.push(arr.slice(i, i+4));
      }
   return newArr;
  };

  $scope.getPet = function(type){
    Pets.get(type).success(function(response) {
      $scope.data = angular.fromJson(response);
      $scope.info.name = $scope.data.petfinder.pet.name.$t;
      $scope.info.photo = $scope.data.petfinder.pet.media.photos.photo;
      $scope.info.desc = $scope.data.petfinder.pet.description.$t;
      $scope.info.loc = $scope.data.petfinder.pet.contact.city.$t + ', ' + $scope.data.petfinder.pet.contact.state.$t;

      var breed = $scope.data.petfinder.pet.breeds.breed;

      if(breed)
      if(Array.isArray(breed)){
        for(var i = 0; i < breed.length; i++) {
          if(i === 0) {
            $scope.info.breed += breed[i].$t;
          } else {
            $scope.info.breed += '/' + breed[i].$t;
          }
        }
      } else {
        $scope.info.breed = breed.$t;
      }
      console.log($scope.data);
      $scope.addSlide();
    });
  };

  $scope.getPetByZip = function(zip){
    Pets.getByZip(zip).success(function(response) {
      $scope.data = angular.fromJson(response);
      console.log($scope.data);
      $scope.searchResults = chunk($scope.data.petfinder.pets.pet);
    });
  };

  $scope.getPetById = function(pet){
    var id = pet.id.$t;
    console.log(id);
    Pets.getById(id).success(function(response) {
      $scope.info = {};
      $scope.data = angular.fromJson(response);
      $scope.info.name = $scope.data.petfinder.pet.name.$t;
      $scope.info.photo = $scope.data.petfinder.pet.media.photos.photo;
      $scope.info.desc = $scope.data.petfinder.pet.description.$t;
      $scope.info.loc = $scope.data.petfinder.pet.contact.city.$t + ', ' + $scope.data.petfinder.pet.contact.state.$t;

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
        $scope.info.breed = breed.$t;
      }
      $scope.slides = [];
      $scope.addSlide();
      $scope.openClose = true;
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

  $scope.$on('$routeChangeSuccess', function() {
    if($location.path() === '/searchDog') {
      $scope.getPet('dog');
    } else if($location.path() === '/searchCat') {
      $scope.getPet('cat');
    }
  });
});
