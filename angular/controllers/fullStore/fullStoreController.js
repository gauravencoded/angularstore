var app=angular.module('angularApp',['webStorageModule']);
app.controller('fullStore',function($scope,$http,webStorage)
{
    $scope.localStoreItemCount=0;
    
     var request = $http({
                        method: "post",
                        url: "server/fullstore/fullstore.php",
                        data: {
                                
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
    request.success(function(response)
    {        
        $scope.stores=response; 
       
    });

    
    
    
	//1 CHECKING IF THE ISER IS LOGGED IN 				
	if(webStorage.session.get("email")==undefined)
	{
		$scope.loggedIn=false;
	}
	else
    {
		$scope.email=webStorage.session.get("email");
		$scope.token=webStorage.session.get("token");
		$scope.name=webStorage.session.get("name");
     
	
		$scope.loggedIn=true;
	}


	
    
       if($scope.loggedIn)
        {
            
     var request = $http({
                        method: "post",
                        url: "server/wishlist/wishlistCount.php",
                        data: {
                                email:$scope.email,
                                token:$scope.token
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
        request.success(function(response){$scope.wishlistCount=response; });
        }
    //2 FETCHING COUNT OF ITEMS IN THE CART
if($scope.loggedIn)
{
    var request = $http({
                        method: "post",
                        url: "server/cart/cartItemCount.php",
                        data: {
                                email:$scope.email,
                                token:$scope.token
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
    request.success(function(response)
    {        
        $scope.localStoreItemCount=response; 
    });
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
        $scope.localStoreItemCount=0; 
    }
}
	
    
    $scope.register=function()
    {
          $scope.cartValue = sessionStorage.getItem( "cart" );
        if($scope.cartValue!=null)
        {
            $scope.cartObj = JSON.parse( $scope.cartValue );
            $scope.localStoreItemCount=$scope.cartObj.items.length;
            if($scope.localStoreItemCount>0)
            { 
                //login and insert items in the cart
                var cartObj=JSON.stringify($scope.cartObj);
                var request = $http({
                            method: "post",
                            url: "server/auth/registeration.php",
                            data: {
                                   registerName:$scope.registerName,
                                registerEmail:$scope.registerEmail,
                                registerPassword:$scope.registerPassword, 
                                registerMobile:$scope.registerMobile,
                                registerCollege:$scope.registerCollege,
                                    products:cartObj
                                  },
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                            });
                request.success(function(response)
                {
                    $scope.user=response;
                    if($scope.user.status=="success" && $scope.user.email==$scope.loginEmail)
                    {
                        webStorage.session.set("email",$scope.user.email);
                        webStorage.session.set("token",$scope.user.token);
		                webStorage.session.set("name",$scope.user.name);
                        $scope.name=webStorage.session.get("name");
				        $scope.loggedIn=true;
                        webStorage.session.remove("cart" );
                        $('#modal2').closeModal();
                    }
                    else  //when authentication fails
                    {
                        $scope.loginerr=$scope.user.cause;
                        $scope.loginErrorView=true;  
                        $scope.loggedIn=false;
                    } 
                });
            }
            else
            {alert("0");
                 var request = $http({
                        method: "post",
                        url: "server/auth/registeration.php",
                        data: {
                                registerName:$scope.registerName,
                                registerEmail:$scope.registerEmail,
                                registerPassword:$scope.registerPassword, 
                                registerMobile:$scope.registerMobile,
                                registerCollege:$scope.registerCollege
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

                request.success(function(response)
                {
                    $scope.user=response;
                    if($scope.user.status=="success" )
                    {        
                        webStorage.session.set("email",$scope.user.email);
				        webStorage.session.set("token",$scope.user.token);
				        webStorage.session.set("name",$scope.user.name);
                        $scope.name=webStorage.session.get("name");
				        $scope.loggedIn=true;
                        $('#modal2').closeModal();
                    }
                    else//when authentication fails
                    {
                        $scope.loginerr=$scope.user.cause;
                        $scope.loginErrorView=true;
                        $scope.loggedIn=false;
                    }
                });
            }
     }
            else
            {
                    var request = $http({
                        method: "post",
                        url: "server/auth/registeration.php",
                        data: {
                                registerName:$scope.registerName,
                                registerEmail:$scope.registerEmail,
                                registerPassword:$scope.registerPassword, 
                                registerMobile:$scope.registerMobile,
                                registerCollege:$scope.registerCollege
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response)
        {
              $scope.result=response;
              if( $scope.result.status=="success")
                {
                    $('#modal4').closeModal();
                    $('#modal5').openModal();
                }
              else if($scope.result.status="fail")
                {
                
                //REGISTRATION FAILS HERE    
                }
              else
                {
                    //SOME UNKNOWN PROBLEM OCCURED
                }
        });
            }
    
   };
    
    $scope.forgotPassword=function()
    {   
        $('#quickModal').closeModal();
         $('#loginModal').closeModal();
        $('#sizeModal').closeModal();
        $('#registerModal').closeModal();
        $('#forgotModal').openModal();
    };
    $scope.loginModal=function()
    { 
        $('#sizeModal').closeModal();
        $('#registerModal').closeModal();
        $('#quickModal').closeModal();
        $('#forgotModal').closeModal();
        $('#loginModal').openModal();
    };
    
    $scope.newUserModal=function()
    { 
        
        $('#sizeModal').closeModal();
        $('#forgotModal').closeModal();
        $('#quickModal').closeModal();
        $('#loginModal').closeModal();
        $('#registerModal').openModal();
    };
    

 
});

