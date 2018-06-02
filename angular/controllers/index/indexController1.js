var app=angular.module('angularApp',['webStorageModule','angular-carousel']);
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
$scope.imgs=[{"value":1,"label":"#one!"},{"value":2,"label":"#two!"},{"value":3,"label":"#three!"},{"value":4,"label":"#four!"}];
	if(webStorage.session.get("email")==undefined)
	{$scope.loggedIn=false;	}
	else
    {
		$scope.email=webStorage.session.get("email");
		$scope.token=webStorage.session.get("token");
		$scope.name=webStorage.session.get("name");
     	$scope.loggedIn=true;
	}

	//1 FETCHING HISGEST DISCOUNTED ITEMS
    var request = $http({
                        method: "post",
                        url: "server/getbitems.php",
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){$scope.bitems=response;});
	
	        var request = $http({
                        method: "post",
                        url: "server/index/amazingDiscounts.php",
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){$scope.discounted=response;});

        request.success(function(response){$scope.flagshipStores=response;});
    //4 fetching most popular female items
	     var request = $http({
                        method: "post",
                        url: "server/index/herItems.php",
                        data: {},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){           $scope.herItems=response;});
    //5 fetching most popular male items
	        var request = $http({
                        method: "post",
                        url: "server/index/hisItems.php",
                        data: {},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){            $scope.hisItems=response;});
            
            var request = $http({
                        method: "post",
                        url: "server/index/posters.php",
                        data: {
                            
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){$scope.posters=response;});
    //6 fetching gift stores
	
	        var request = $http({
                        method: "post",
                        url: "server/index/gifts_S2C.php",
                        data: {},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){     $scope.gifts=response;});
    //7 fetching discount stores
	
	        var request = $http({
                        method: "post",
                        url: "server/index/discounts_S2C.php",
                        data: {},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){           $scope.discounts=response;});
    //8 dedicated store for a particular product

	      

        request.success(function(response){           $scope.dedicated=response;});
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
    
    
    
    
    
    
$scope.setSize=function(productId,price,discount,size)
{
    $scope.size=size;
    if($scope.loggedIn)
    {
         var request = $http({
                        method: "post",
                        url: "server/cart/addtoCart.php",
                        data: {
                                email:$scope.email, 
                                productId:$scope.productId,
                               token:$scope.token,
                                size:$scope.size
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){        
            $scope.localStoreItemCount=response.count;   
           $('#quickModal').closeModal();
                 Materialize.toast('Item Added to your Cart', 4000)});
        
	}
    else
    {
        if($scope.localStoreItemCount>0) //checks if there are already items in the store
        {
            var already=false;
            $scope.cartValue = sessionStorage.getItem( "cart" ); 
            $scope.cartObj = JSON.parse( $scope.cartValue );
            //console.log($scope.cartObj);
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
                    $scope.cartObj.items.push({"productId":$scope.productId,"quantity":1,"discount":$scope.discount,"price":$scope.price,"size":$scope.size});
                    var jsonStr=JSON.stringify($scope.cartObj);
                    sessionStorage.setItem("cart",jsonStr);
                    $scope.cartValue = sessionStorage.getItem( "cart" ); 
                    $scope.cartObj = JSON.parse( $scope.cartValue );
                    $scope.localStoreItemCount=$scope.cartObj.items.length;
                     Materialize.toast('Item Added to your Cart', 4000)
                       $('#quickModal').closeModal();
                }
                else
                {
                    for(var i=$scope.cartObj.items.length-1;i>=0;i--)
                    {
                        if($scope.cartObj.items[i].productId==productId && $scope.cartObj.items[i].size==$scope.size)
                        {
                      
                            $scope.cartObj.items[i].quantity++;
                            var jsonStr=JSON.stringify($scope.cartObj);
                            sessionStorage.setItem("cart",jsonStr);
                            var cartValue = sessionStorage.getItem( "cart" ); 
                            $scope.cartObj = JSON.parse( cartValue ); 
                             Materialize.toast('Item Added to your Cart', 4000);
                     $('#quickModal').closeModal();
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
                   $('#quickModal').closeModal();
                $scope.cartValue = sessionStorage.getItem( "cart" ); 
                $scope.cartObj = JSON.parse( $scope.cartValue );
                $scope.localStoreItemCount=$scope.cartObj.items.length;
                console.log($scope.localStoreItemCount);
            }
        }
    };
    
    
    
    
	
    //2 FUNCTION TO ADD ITEM TO THE CART---------------------------------
    $scope.addtoCart=function(productId,price,discount)
    { 
        if($scope.size=="None Selected") //if size is not selected
        {
            $scope.productId=productId;
            $scope.discount=discount;
            $scope.price=price;
            $scope.sizeError="Please Select size";
        }
        else //if size is selected
        {
            if($scope.loggedIn)
            {
                 var request = $http({
                        method: "post",
                        url: "server/cart/addtoCart.php",
                        data: {
                                email:$scope.email, 
                                productId:productId,
                                size:$scope.size
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
                    for(var i=$scope.cartObj.items.length-1;i>=0;i--)
                    {
                        if($scope.cartObj.items[i].productId==productId)
                        {
                           already=true;
                           break;
                        }
                        else
                        {
                         	continue;
                        }
                    }
                    if(!already)
                    {
                        $scope.cartObj.items.push({"productId":productId,"quantity":1,"discount":discount, "price":price});
                        var jsonStr=JSON.stringify($scope.cartObj);
                        sessionStorage.setItem("cart",jsonStr);
                        $scope.cartValue = sessionStorage.getItem( "cart" ); 
                        $scope.cartObj = JSON.parse( $scope.cartValue );
                        $scope.localStoreItemCount=$scope.cartObj.items.length;
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
              
                var cart={"items":[{"productId":productId,"quantity":1}]};
                var jsonStr=JSON.stringify(cart);
                sessionStorage.setItem("cart",jsonStr);
                $scope.cartValue = sessionStorage.getItem( "cart" ); 
                $scope.cartObj = JSON.parse( $scope.cartValue );
                $scope.localStoreItemCount=$scope.cartObj.items.length;
     
            }
        } 
        }
};//-------------------end of function ------------------
            
        

    //FUNCTION TO INITIATE LAUNCH OF MODAL
       $scope.initModals = function() 
       {
           $('.modal-trigger').leanModal(); // Initialize the modals
       }

       //FUNCTION TO ASSIGN VALUES FOR MODAL
       $scope.quickView=function(productId,name,discount,price,productCategory)
       {
           $scope.quickName=name;
           $scope.productId=productId;
           $scope.discount=discount;
           $scope.price=price;
           $scope.productCategory=productCategory;
           var request = $http({
                        method: "post",
                        url: "server/getsize.php",
                        data: { productId:productId},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
                request.success(function(response){$scope.sizes=response;});
   
             $('#quickModal').openModal();
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
                    $scope.user=response;
                    if($scope.user.status=="success" && $scope.user.email==$scope.loginEmail)
                    {
                        webStorage.session.set("email",$scope.user.email);
                        webStorage.session.set("token",$scope.user.token);
		                webStorage.session.set("name",$scope.user.name);
                        $scope.name=webStorage.session.get("name");
				        $scope.loggedIn=true;
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
            {;
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
    
 });