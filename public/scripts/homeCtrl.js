app.controller('HomeCtrl', ['$scope', '$cookies', 'TwitterService', function ($scope, $cookies, TwitterService) {
    var username = $cookies.get('username'),
        accessToken = $cookies.get('accessToken'),
        tokenSecret = $cookies.get('tokenSecret')

    $scope.signedIn = username ? true : false
    $scope.getUserFavoritesSelected = false
    $scope.sort = function(keyname) {
        $scope.sortKey = keyname
        $scope.reverse = !$scope.reverse
    }

    $scope.searchTwitter = function(searchTerm) {
        $scope.getUserFavoritesSelected = false
        // TwitterService.searchString(searchTerm, accessToken, tokenSecret).then((searchResults) => {
        //     console.log(searchResults)
        // })
        TwitterService.getUser(searchTerm, accessToken, tokenSecret).then((user) => {
            TwitterService.searchUser(searchTerm, accessToken, tokenSecret).then((searchResults) => {
                $scope.tweets = searchResults
            })
        })
        .catch((err) => {
            if (err[0].code === 17) {
                console.log('No user found by that name')
            }
        })
    }

    $scope.getUserFavorites = function() {
        $scope.getUserFavoritesSelected = true
        TwitterService.getUserFavorites(username, accessToken, tokenSecret).then((favorites) => {
            $scope.tweets = favorites
        })
        .catch((err) => {
            if (err[0].code === 17) {
                console.log('No user found by that name')
            }
        })
    }

    $scope.loadMoreTweets = function(newPageNumber, oldPageNumber) {
        console.log(newPageNumber)
        console.log(oldPageNumber)
    }
}])