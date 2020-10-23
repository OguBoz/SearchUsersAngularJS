var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

// Runs before application runs and sets up the routes/routing
myApp.config(['$routeProvider', '$locationProvider' , function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
    .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'UserController'
    })
    .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController'
    })
    .when('/contact-success', {
        templateUrl: 'views/contact-success.html',
        controller: 'ContactController'
    })
    .when('/directory', {
        templateUrl: 'views/directory.html',
        controller: 'UserController'
    }).otherwise({
        redirectTo: '/home'
    })
}]);

// Custom directive for displaying random user
myApp.directive('randomUser', [function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            users: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        controller: function($scope) {
            $scope.random = Math.floor(Math.random() * $scope.users.length)
        }

    };
}])

// Main controller of the application
myApp.controller('UserController', ['$scope', '$http', function($scope, $http) {
    $scope.removeUser = function(user) {
        const removedUser = $scope.users.indexOf(user);
        $scope.users.splice(removedUser, 1);
    }

    $scope.addUser = function() {
        $scope.users.push({
            name: $scope.newuser.name,
            level: parseInt($scope.newuser.level),
            available: true,
            background: $scope.newuser.background
        });

        $scope.newuser.name = "";
        $scope.newuser.level = "";
        $scope.newuser.background = "";
    }

    $scope.removeAll = function() {
        $scope.users = [];
    }

    $http.get('data/users.json').then(function(response){
        $scope.users = response.data;
  });

    
}]);

myApp.controller('ContactController', ['$scope', '$location', function($scope, $location) {
    $scope.sendMessage = function() {
        $location.path('/contact-success');
    }
}]);


// // Runs as your application runs
// myApp.run(function() {

// });