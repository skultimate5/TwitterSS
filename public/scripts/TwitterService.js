window.angular.module('app').service('TwitterService', [ '$http', '$q', function ($http, $q) {
	var twitterService = {}

	twitterService.getUser = function(username, accessToken, tokenSecret){
        var body = JSON.stringify({   
                'userKey': accessToken,
                'userSecret': tokenSecret,
                'username': username
            }),
            deferred = $q.defer()

		$http.post('/twitter/getUser', body).then((user) => {
            if (user.data.errors) {
                deferred.reject(user.data.errors)
            }
            deferred.resolve(user.data)
        })
        .catch((err) => {
            deferred.reject(err)
        })

        return deferred.promise
	}

    twitterService.searchString = function(searchString, accessToken, tokenSecret){
        var body = JSON.stringify({   
                'userKey': accessToken,
                'userSecret': tokenSecret,
                'searchString': searchString
            }),
            deferred = $q.defer()

		$http.post('/twitter/search', body).then((user) => {
            deferred.resolve(user.data)
        })
        .catch((err) => {
            deferred.reject(err)
        })

        return deferred.promise
	}

    twitterService.searchUser = function(searchUsername, accessToken, tokenSecret){
        var body = JSON.stringify({   
                'userKey': accessToken,
                'userSecret': tokenSecret,
                'searchUser': searchUsername
            }),
            deferred = $q.defer()

		$http.post('/twitter/getUserTimeline', body).then((user) => {
            deferred.resolve(user.data)
        })
        .catch((err) => {
            deferred.reject(err)
        })

        return deferred.promise
	}

    twitterService.getUserFavorites = function(username, accessToken, tokenSecret){
        var body = JSON.stringify({   
                'userKey': accessToken,
                'userSecret': tokenSecret,
                'username': username
            }),
            deferred = $q.defer()

		$http.post('/twitter/getUserFavorites', body).then((user) => {
            deferred.resolve(user.data)
        })
        .catch((err) => {
            deferred.reject(err)
        })

        return deferred.promise
	}

	return twitterService
}])