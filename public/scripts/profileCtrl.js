app.controller('ProfileCtrl', ['$scope', '$cookies', 'MongoService', 'TwitterService', function ($scope, $cookies, MongoService, TwitterService) {
  var username = $cookies.get('username'),
      accessToken = $cookies.get('accessToken'),
      tokenSecret = $cookies.get('tokenSecret')

  MongoService.getUserByUsername(username, accessToken, tokenSecret).then((user) => {
      $scope.user = user
      TwitterService.getUser(user.username, user.accessToken, user.tokenSecret).then((userProfile) => {
        var profile = userProfile[0]
        $scope.twitterNumFavorites = profile.favourites_count
        $scope.twitterNumFollowers = profile.followers_count
        console.log(profile)
      })
  })
}])