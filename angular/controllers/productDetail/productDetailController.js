var app=angular.module('angularApp',['webStorageModule']);
app.controller('productDetails',function($scope,$http,webStorage)
{
	$scope.quantity=1;//default quantity is 1
	$scope.productId=getQueryVariable("productId");	
    $scope.size;
    var email=webStorage.session.get("email");
		
    //FUNCTION TO FETCH SELECTED ITEM FROM THE DATABASE  
    var request = $http({
                        method: "post",
                        url: "server/showItem.php",
                        data: {
                            productId:$scope.productId,
                            productCategory:getQueryVariable("productCategory")
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
    request.success(function(response)
    {         
      $scope.item=response;
       
         
    });//------------END OF FUNCTION-----------------------
     
	
    //FUNCTION TO FIND MATCHING PRODUCTS
    var request = $http({
                        method: "post",
                        url: "server/matching.php",
                        data: {
                            productId:$scope.productId
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
            request.success(function(response){$scope.matches=response;});
       //--------END OF FUNCTION-------------------------
			
		//checking if the user is already logged in or not	
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
        }//-----------END OF FUNCTION--------------------------
    
    
    //2 FETCHING COUNT OF ITEMS IN THE CART
    if($scope.loggedIn) //count of items will be fetched from the db only if the user is logged in
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
        request.success(function(response){$scope.localStoreItemCount=response;});
    }
    else // count of items if the user is not logged in
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
    };
	
   
    if($scope.loggedIn)
    { //3 FUNCTION TO ADD ITEM TO WISHLIST
        $scope.addToWishlist=function(productId)
	    {
              var request = $http({
                        method: "post",
                        url: "server/wishlist/wishlist_C2S.php",
                        data: {
                              email:$scope.email, productId: $scope.productId,token:$scope.token
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
    request.success(function(response)
    {         
        
	           if(response[0].numberOfItems>=$scope.wishlistCount) //checking if the items is really added in the table
               {
                    $scope.wishlistCount=response.numberOfItems;
                   Materialize.toast('Item Added to your Wishlist', 4000)
               }
    });
        };	   
    }//------------END OF FUNCTION--------------------
    
//FUNCTION TO ADD ITEM TO THE CART VIA SETTING THE SIZE    
$scope.setSize=function(size)
{  
    // console.log(size);
           var sizes= document.querySelector(".str");
  // console.log(sizes);
    for(var i=0;i<sizes.length;i++)
     { //console.log("df");
        sizes[i].style.color="red";
     }
   var x=document.getElementById(size);
    x.style.color="red";
 
    
};//---------------END OF THE FUNCTION-----------------------
    
//2 FUNCTION TO ADD ITEM TO THE CART
$scope.addtoCart=function(productId,discount,price,size)
    { 
      $scope.size=size; 
        if((typeof $scope.size)=='undefined' )
        {
            $('#sizeModal').openModal();
        }
        else
        {
		  if($scope.loggedIn)
          {
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
                    Materialize.toast('Item Added to your Cart', 3000)
                });
		  }
        else
        {
            if($scope.localStoreItemCount>0) //checks if there are already items in the store
            {
                var already=false;
                $scope.cartValue = sessionStorage.getItem( "cart" ); 
                $scope.cartObj = JSON.parse( $scope.cartValue );
                console.log($scope.cartObj);
                for(var i=$scope.cartObj.items.length-1;i>=0;i--)
                {
                    //checks if same item of same size is already in cart
                    if($scope.cartObj.items[i].productId==productId && $scope.cartObj.items[i].size==$scope.size)
                    {
                        already=true;
                      	break;
                    }
                    else
                    {
                    	continue;
                    }
                }
                if(!already)//if item is not already in the localcart
                {
                    
                        $scope.cartObj.items.push({"productId":productId,"quantity":1,"size":$scope.size,"discount":discount,"price":price,"size":$scope.size});
                    var jsonStr=JSON.stringify($scope.cartObj);
                    sessionStorage.setItem("cart",jsonStr);
                    $scope.cartValue = sessionStorage.getItem( "cart" ); 
                    $scope.cartObj = JSON.parse( $scope.cartValue );
                    $scope.localStoreItemCount=$scope.cartObj.items.length;
                     Materialize.toast('Item Added to your Cart', 4000)
                }
                else
                {
                    for(var i=$scope.cartObj.items.length-1;i>=0;i--)
                    {
                        if($scope.cartObj.items[i].productId==productId)
                        {
                            
                            $scope.cartObj.items[i].quantity++;
                            var jsonStr=JSON.stringify($scope.cartObj);
                            sessionStorage.setItem("cart",jsonStr);
                            var cartValue = sessionStorage.getItem( "cart" ); 
                            $scope.cartObj = JSON.parse( cartValue ); 
                             Materialize.toast('Item Added to your Wishlist', 4000);
                          
                            break;
                        }
                        else
                        {
                	        continue;
                        }
                    }  
                    $scope.cartValue = sessionStorage.getItem( "cart" ); 
                    $scope.cartObj = JSON.parse( $scope.cartValue );
                    $scope.localStoreItemCount=$scope.cartObj.items.length;
                }
                $scope.cartValue = sessionStorage.getItem( "cart" ); 
                $scope.cartObj = JSON.parse( $scope.cartValue );
                $scope.localStoreItemCount=$scope.cartObj.items.length;
             }
             else if($scope.localStoreItemCount==0) //if there are no items in the store
             {
                
                var cart={"items":[{"productId":productId,"quantity":1,"discount":discount,"price":price,"size":$scope.size}]};
                var jsonStr=JSON.stringify(cart);
                sessionStorage.setItem("cart",jsonStr);
                 Materialize.toast('Item Added to your Cart', 4000);
                $scope.cartValue = sessionStorage.getItem( "cart" ); 
                $scope.cartObj = JSON.parse( $scope.cartValue );
                $scope.localStoreItemCount=$scope.cartObj.items.length;
                
            }
        }
        }
    };//----------END OF FUNCTION -----------------------
			
		
		
		//returns the number of items in the wishlist of the user
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
	 }//----------END OF FUNCTION-----------------------
	 	

       
		
    
$scope.reviewProduct=function(){    $scope.showReviewForm=true;}  
//FUNCTION TO ADD REVIEW COMMENTS--------------------------    
$scope.addReviewComment=function(productId)
{
      var request = $http({
                        method: "post",
                        url: "server/productdetail/addProductReview.php",
                        data: {
                                email:$scope.email,username:$scope.name,productId:productId,comment:$scope.comment
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){$scope.productReviews=response;
                                          
                                            $scope.showReviewForm=false;
                                             $('#reviewModal').closeModal();
                                           Materialize.toast('Your review is sent', 4000);
                                              
                                           
                                          });
};//------END OF THE FUNCTION------------
  
      //FUNCTION TO FETCH THE PRODUCT REVIEWS
    var request = $http({
                        method: "post",
                        url: "server/productDetail/productReviews.php",
                        data: {
                                productId:$scope.productId
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response)
        {
            if(response!="")
            {$scope.productReviews=response;
            $scope.reviewAvailable=true;                                                                                                          }
            else
                {
                    $scope.reviewAvailable=false;
                } 
        });//-----------END OF THE FUNCTION--------------------------
$scope.initModals = function() {       $('.modal-trigger').leanModal(); };
   
      $scope.forgotPassword=function()
    {   
        $('#loginModal').closeModal();
        $('#sizeModal').closeModal();
        $('#registerModal').closeModal();
        $('#forgotModal').openModal();
    };
    $scope.loginModal=function()
    { 
        $('#sizeModal').closeModal();
        $('#registerModal').closeModal();
        $('#forgotModal').closeModal();
        $('#loginModal').openModal();
    };
    
    $scope.newUserModal=function()
    { 
        
        $('#sizeModal').closeModal();
        $('#forgotModal').closeModal();
        $('#loginModal').closeModal();
        $('#registerModal').openModal();
    };
    
 
    
    
    
        $scope.asyncEmailCheck=function(type)
        {
            if(type=="register")
                {
                    var request = $http({
                                        method: "post",
                                        url: "server/auth/asyncEmailCheck.php",
                                        data: {
                                                email:$scope.registerEmail,
                                                requestType:"register"
                                              },
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                    });
                request.success(function(response)
                {
                    if(response.status!="success" && response.email!=$scope.registerEmail )
                    {       
                        $scope.registererr="OOPS! This email is already in our system try logging in or recover your password."
                        $scope.registerErrorView=true;  
                    }
                });
                }
            else if(type=="login")
                {
                    var request = $http({
                                        method: "post",
                                        url: "server/auth/asyncEmailCheck.php",
                                        data: {
                                                email:$scope.loginEmail,
                                                requestType:"login"
                                              },
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                    });
                request.success(function(response)
                {
                    if(response.status=="fail"  )
                    {       
                        $scope.loginerr="We are unable to find this email."
                        $scope.loginErrorView=true;  
                    }
                });
                }
            else if(type=="forgot")
                {
                    var request = $http({
                                        method: "post",
                                        url: "server/auth/asyncEmailCheck.php",
                                        data: {
                                                email:$scope.forgotEmail,
                                                requestType:"forgot"
                                              },
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                    });
                request.success(function(response)
                {
                    if(response.status=="fail")
                    {       
                        $scope.forgoterr="We are unable to find your email in our system";
                        $scope.forgotErrorView=true;  
                    }
                });
                }
         
        };
            $scope.asyncMobileCheck=function()
        {
            if($scope.registerMobile) //checking if the email is set in the scope
            { 
                var request = $http({
                                        method: "post",
                                        url: "server/auth/asyncMobileCheck.php",
                                        data: {
                                                mobile:$scope.registerMobile,
                                                requestType:"register"
                                              },
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                    });
                request.success(function(response)
                {
                    if(response.status!="success" && response.mobile!=$scope.registerMobile)
                    {       
                        $scope.registererr="OOPS! This Mobile number is already in our system try logging in or recover your password."
                        $scope.registerErrorView=true;  
                    }
                });
            }
        };
    
    $scope.login=function() //function to login from modal
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
                            url: "server/auth/checkLogin.php",
                            data: {
                                    email:$scope.loginEmail, 
                                    password:$scope.loginPassword, 
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
                        $('#loginModal').closeModal();
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
            {
                 var request = $http({
                        method: "post",
                        url: "server/auth/checkLogin.php",
                        data: {
                                email:$scope.loginEmail, 
                                password:$scope.loginPassword
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
                        $('#loginModal').closeModal();
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
                        url: "server/auth/checkLogin.php",
                        data: {
                                email:$scope.loginEmail, 
                                password:$scope.loginPassword
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response)
        {
            $scope.user=response;
            if($scope.user.status==="success" )
            {    
                webStorage.session.set("email",$scope.user.email);
			    webStorage.session.set("token",$scope.user.token);
			    webStorage.session.set("name",$scope.user.name);
                $scope.name=webStorage.session.get("name");
			    $scope.loggedIn=true;
               $('#loginModal').closeModal();
            }
           else //when authentication fails
           {
               $scope.loginerr=$scope.user.cause;
                $scope.loginErrorView=true;
               $scope.loggedIn=false;
           }
        });
     }
             
    };
    
    
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
                    
                    if(response.status=="success")
                    {
                        webStorage.session.remove("cart" );
                        
                        $('#registerModal').closeModal();
                        $('#regconfirmModal').openModal();
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
                
                    if(response.status=="success" )
                    {        
                        $('#registerModal').closeModal();
                        $('#regconfirmModal').openModal();
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
            else //if cart is not created locally
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
                    $('#registerModal').closeModal();
                    $('#regconfirmModal').openModal();
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
    
    
    $scope.closeModal=function(x)
    {
        $('#modal'+x).closeModal();
    }
    
    
    
    $scope.addreview=function()
    {
         $('#reviewModal').openModal();
    }
});