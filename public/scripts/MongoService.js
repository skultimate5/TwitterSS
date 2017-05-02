
window.angular.module('app').service('MongoService', [ '$http', '$q', function ($http, $q) {
	var mongoService = {}

	mongoService.getUserByUsername = function(username){
        var body = JSON.stringify({'username': username}),
            deferred = $q.defer()
            
		$http.post('/getUserById', body).then((user) => {
            deferred.resolve(user.data)
        })
        .catch((err) => {
            deferred.reject(err)
        })

        return deferred.promise
	}

	return mongoService
}])