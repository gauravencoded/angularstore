var app=angular.module('angularApp',['webStorageModule']);
app.controller('logout',function($scope,$http,webStorage)
	{
        var email= webStorage.session.get("email");
        var token=webStorage.session.get("token");
        var request = $http({
                                method: "post",
                                url: "server/logout/logout.php",
                                data: {
                                        token:token,
                                        email:email
                                      },
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                            });
        request.success(function(response)
        {
           webStorage.session.remove("email");
	       webStorage.session.remove("token");
	       webStorage.session.remove("name");
           webStorage.session.remove("cart" );
        });
});