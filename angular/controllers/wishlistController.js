
var app=angular.module('angularApp',['webStorageModule']);
app.controller('wishlist',function($scope,$http,webStorage)
{
    $scope.size="None Selected";
    //1 logic to add loggedin or logged out status
	if(webStorage.session.get("email")==undefined)
	{
		
		$scope.loggedIn=false;
        //redirect to login page
	}
	else
	{
		$scope.email=webStorage.session.get("email");
		$scope.token=webStorage.session.get("token");
		$scope.name=webStorage.session.get("name");
		$scope.loggedIn=true;
    }
		
    var request = $http({
                        method: "post",
                        url: "server/wishlist/wishlist_S2C.php",
                        data: {
                                email:$scope.email,
                                token:$scope.token
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

                        request.success(function(response)
                        { 
                            if(response!=0)
                            {
                                $scope.items=response;
                                $scope.noItem=false;
                            }
                            else
                            {   $scope.noItem=true;}
                        });
    
    
    
    
    //2 TO FETCH THE COUNT OF ITEMS IN THE CART
var request = $http({
                        method: "post",
                        url: "server/cart/cartItemCount.php",
                        data: {
                              email:$scope.email,   token:$scope.token
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){ $scope.localStoreItemCount=response[0];});
    //3 TO FETH THE COUNT OF ITEMS IN THE WISHLIST
     var request = $http({
                        method: "post",
                        url: "server/wishlist/wishlistCount.php",
                        data: {
                              email:$scope.email,   token:$scope.token
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){ $scope.wishlistCount=response;});
    
    
  //1 Function to set size
    $scope.setSize=function(size,insert,productId,discount,price)
    {
          
    $scope.size=size;
    if(insert=='Y')
    {
        if($scope.loggedIn)
        {
          //  alert($scope.email);
                  
            var request = $http({
                        method: "post",
                        url: "server/cart/addtoCart.php",
                        data: {
                                email:$scope.email, 
                                productId:productId,
                                size:$scope.size,
                                token:$scope.token
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
            request.success(function(response)
            {        
                $scope.localStoreItemCount=response.count;   
                Materialize.toast('Item Added to your Cart', 3000);
                $scope.size="None Selected";
                 $('#modal1').closeModal();
            });
        }
    } 
};

    //1 FUNCTION TO ADD ITEM TO CART
     //2 FUNCTION TO ADD ITEM TO THE CART
    $scope.addtoCart=function(productId,price,discount)
    {  if($scope.size=="None Selected") //if size is not selected
        {
            $scope.productId=productId;
            $scope.discount=discount;
            $scope.price=price;
            
             var request = $http({
                        method: "post",
                        url: "server/getsize.php",
                        data: {
                                
                                productId:productId,
                                
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
                request.success(function(response)
                {        
                    $scope.sizes=response;   
                    
                });
            
            
            
            $('#modal1').openModal();
       
        }
   /*     else
        {
           
		if($scope.loggedIn)
            {
                alert($scope.size);
                 var request = $http({
                        method: "post",
                        url: "server/cart/addtoCart.php",
                        data: {
                                email:$scope.email, 
                                productId:$scope.productId,
                                size:$scope.size
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){        
            $scope.localStoreItemCount=response.count;   
                 Materialize.toast('Item Added to your Cart', 3000)
         $('#modal1').closeModal();
        });
		        
            }
     
        }*/
        
        
    };
    //2 FUNCTION TO REMOVE ITEM FROM THE wishlist
    $scope.remove=function(productId, email)
	{
	
        
           var request = $http({
                        method: "post",
                        url: "server/wishlist/remove_C2S.php",
                        data: {
                                    productId:productId, 
                                    email:email,
                                    token:$scope.token
                            
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response)
        {   
            if(response!=0)
            {
                $scope.items=response;
                $scope.wishlistCount--;
            }
            else if(response==0)
                {
                    $scope.noItem=true; 
                    $scope.wishlistCount=0;    
                }
            
        });
    };
		
   
});
