app.controller('HeaderCtrl', ['$scope', '$location', '$cookies', function ($scope, $location, $cookies) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path()
    }

    var username = $cookies.get('username')
    $scope.signedIn = username ? true : false
}])