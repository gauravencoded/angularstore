var app=angular.module('angularApp',['webStorageModule']);
app.directive('repeatDone', function() {
    return function(scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone);
        }
    }
});
app.controller('index',function($scope,$http,webStorage)
{
    $scope.localStoreItemCount=0;
    $scope.size="None Selected";

	if(webStorage.session.get("email")==undefined)
	{$scope.loggedIn=false;	}
	else
    {
		$scope.email=webStorage.session.get("email");
		$scope.token=webStorage.session.get("token");
		$scope.name=webStorage.session.get("name");
     	$scope.loggedIn=true;
	}


    //FETCHING THE NUMBER OF ITEMS IN THE WISHLIST
    if($scope.loggedIn)
    {
        var request = $http({
                        method: "post",
                        url: "server/wishlist/wishlistCount.php",
                        data: {email:$scope.email, token:$scope.token},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
        request.success(function(response){$scope.wishlistCount=response;});
    }
    //2 FETCHING COUNT OF ITEMS IN THE CART
    if($scope.loggedIn)
        {
            var request = $http({
                        method: "post",
                        url: "server/cart/cartItemCount.php",
                        data: {email:$scope.email, token:$scope.token},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
        request.success(function(response){$scope.localStoreItemCount=response;});
        }
    else
        {
           
            $scope.cartValue = sessionStorage.getItem( "cart" );
            if($scope.cartValue!=null)
            {
                $scope.cartObj = JSON.parse( $scope.cartValue );
                $scope.localStoreItemCount=$scope.cartObj.items.length;
            }
            else
            {
                    
            }
        }
    
   
        var request = $http({
                        method: "post",
                        url: "server/orders/myOrders.php",
                        data: {email:"gauravencoded@gmail.com"},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
        request.success(function(response){$scope.orders=response[0].active;
                                          //console.log(response[0].active);
                                          });
   
    
    
    
 
    
 });