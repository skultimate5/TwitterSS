app.controller('HomeCtrl', ['$scope', '$cookies', 'TwitterService', function ($scope, $cookies, TwitterService) {
    var username = $cookies.get('username'),
        accessToken = $cookies.get('accessToken'),
        tokenSecret = $cookies.get('tokenSecret')

    $scope.signedIn = username ? true : false

    $scope.searchTwitter = function(searchTerm) {
        console.log(searchTerm)
        // TwitterService.searchString(searchTerm, accessToken, tokenSecret).then((searchResults) => {
        //     console.log(searchResults)
        // })
        TwitterService.getUser(searchTerm, accessToken, tokenSecret).then((user) => {
            TwitterService.searchUser(searchTerm, accessToken, tokenSecret).then((searchResults) => {
                console.log(searchResults)
            })
        })
        .catch((err) => {
            if (err[0].code === 17) {
                console.log('No user found by that name')
            }
        })
    }
}])