'use strict'

var app = angular.module('app', ['ngRoute', 'ngCookies', 'angularUtils.directives.dirPagination'])

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    }).
    when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'ProfileCtrl'
    }).otherwise({
      redirectTo: '/'
    })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    })
}])