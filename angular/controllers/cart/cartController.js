var app=angular.module('angularApp',['webStorageModule']);
app.controller('cartContent',function($scope,$http,webStorage)
{
    var email=webStorage.session.get("email");
    $scope.localStoreItemCount=0;
    $scope.showList=false;
    $scope.showTextBox=false;
    $scope.sizeValue="None Selected";
    
    //size arra
    $scope.allSizes=[{sizeValue:"Select Size"},
                     {sizeValue:"S"},
                     {sizeValue:"M"},
                     {sizeValue:"L"},
                     {sizeValue:"XL"}
                    ];
    //1 FUNCTION TO SET UP LOGGED IN STATUS-------------
    if(webStorage.session.get("email")==undefined)
	{
       $scope.loggedIn=false;
      
    }
    else
	{  
		$scope.email =webStorage.session.get("email");
		$scope.token =webStorage.session.get("token");
		$scope.name =webStorage.session.get("name");
		$scope.loggedIn=true;
	}
        
    //1 TO FETCH ITEMS IN THE CART-------------------------
    if($scope.loggedIn)
    {
    
         var request = $http({
                        method: "post",
                        url: "server/cart/cartContent_S2C.php",
                        data: {
                                email:$scope.email,   token:$scope.token
                                
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){        $scope.items=response;
        var i=0;
        $scope.youPay=0;
        $scope.youSave=0;
        while(typeof($scope.items[i])!=='undefined' )
        { 
             var saving=parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].discount)*   parseFloat($scope.items[i].price)/100; 
             $scope.youPay=parseFloat($scope.youPay)+(parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].price))-parseFloat(saving); 
            $scope.youSave=parseFloat($scope.youSave)+parseFloat(saving);
            i++;
        }});
        
	    
    }
    else
    {
      var cartValue = sessionStorage.getItem( "cart" ); 
        if(cartValue==null)
        {
                
        }
        else
        {
            $scope.cartObj = JSON.parse( cartValue ); 
            $scope.items=$scope.cartObj.items;
            var i=0;
            $scope.youPay=0;
            $scope.youSave=0;
            while(typeof($scope.items[i])!=='undefined' )
            {
             
                var saving=parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].discount)*   parseFloat($scope.items[i].price)/100; 
         
                $scope.youPay=parseFloat($scope.youPay)+(parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].price))-parseFloat(saving);              
                $scope.youSave=parseFloat($scope.youSave)+parseFloat(saving);
                i++;
            }
        }

        
    }
	
    //2 TO FETCH THE NUMBER OF ITEMS IN THE CART
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

        request.success(function(response){         $scope.localStoreItemCount=response; });
        
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
    
    //3 TO FETCH THE NUMBER OF ITEMS IN THE WISHLIST
    
    if($scope.loggedIn)
        {
            var request = $http({
                        method: "post",
                        url: "server/wishlist/wishlistCount.php",
                        data: {
                              email:$scope.email, token:$scope.token
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){ $scope.wishlistCount=response;});
    

        }
    
    //1 FUNCTION TO REMOVE ITEM FROM THE CART
    $scope.remove=function(productId, email,size) //why are we passing email?????
	{
       
		if($scope.loggedIn)
        {
            
                       var request = $http({
                        method: "post",
                        url: "server/cart/remove_C2S.php",
                        data: {
                               productId:productId, email:email,size:size,   token:$scope.token
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){  $scope.items=null;
		 
                if(response!=0)
                {
                      $scope.items=response;
                var i=0;
                $scope.youPay=0;
                $scope.youSave=0;
                while(typeof($scope.items[i])!=='undefined' )
                {
                     var saving=parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].discount)*   parseFloat($scope.items[i].price)/100; 
                  $scope.youPay=parseFloat($scope.youPay)+(parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].price))-parseFloat(saving);               
                    $scope.youSave=parseFloat($scope.youSave)+parseFloat(saving);
                    i++;
                }
              
            
                }
                else
                {
                    $scope.localStoreItemCount=0;
                }
              });
	           
        }
        else
        {
             $scope.cartValue = sessionStorage.getItem("cart"); 
             $scope.cartObj = JSON.parse($scope.cartValue);
            
             for(var i=$scope.cartObj.items.length-1;i>=0;i--)
             {
                if($scope.cartObj.items[i].productId==productId)
                {
                    //remove item from the array and push again here
                    $scope.cartObj.items.splice(i,1);
                    var jsonStr=JSON.stringify($scope.cartObj);
                    sessionStorage.setItem("cart",jsonStr);
                    
                    var cartValue = sessionStorage.getItem( "cart" ); 
                    $scope.cartObj = JSON.parse( cartValue ); 
                    $scope.items=$scope.cartObj.items;
                    $scope.localStoreItemCount=$scope.cartObj.items.length;
                     var i=0;
            $scope.youPay=0;
            $scope.youSave=0;
            while(typeof($scope.items[i])!=='undefined' )
            {
                var saving=parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].discount)*   parseFloat($scope.items[i].price)/100; 
                $scope.youPay=parseFloat($scope.youPay)+(parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].price))-parseFloat(saving);              
                $scope.youSave=parseFloat($scope.youSave)+parseFloat(saving);
                i++;
            }
                  	break;
                }
                else
                {
                	continue;
                }
             }
        }
    };
		
	//2 FUNCTION TO INCREASE THE COUNT OF ITEM IN THE CART
	$scope.increase=function(productId, email, size) //why are we passing email?????
    {
	    if($scope.loggedIn)
        {
            $scope.localStoreItemCount=0;
            
            
                   var request = $http({
                        method: "post",
                        url: "server/cart/quantityChange_C2S.php",
                        data: {
                               productId:productId, 
                               email:$scope.email,
                               action:"increase",
                                size:size,
                                token:$scope.token
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response)
        { 
		      $scope.items=response;
              var i=0;
              $scope.youPay=0;
              $scope.youSave=0;
              while(typeof($scope.items[i])!=='undefined' )
              {
                  var saving=parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].discount)*   parseFloat($scope.items[i].price)/100; 
                  $scope.youPay=parseFloat($scope.youPay)+(parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].price))-parseFloat(saving);            
                  $scope.youSave=parseFloat($scope.youSave)+parseFloat(saving);
                          $scope.localStoreItemCount=parseFloat($scope.items[i].quantity)+parseInt($scope.localStoreItemCount);
                  i++;
              }});
        }
        else
        {
             $scope.cartValue = sessionStorage.getItem( "cart" ); 
             $scope.cartObj = JSON.parse( $scope.cartValue );
             for(var i=$scope.cartObj.items.length-1;i>=0;i--)
             {
                if($scope.cartObj.items[i].productId==productId  && $scope.cartObj.items[i].size==size)
                {
                    $scope.cartObj.items[i].quantity++;
                    var jsonStr=JSON.stringify($scope.cartObj);
                    sessionStorage.setItem("cart",jsonStr);
                    
                    var cartValue = sessionStorage.getItem( "cart" ); 
                    $scope.cartObj = JSON.parse( cartValue ); 
                    $scope.items=$scope.cartObj.items;
                     var i=0;
            $scope.youPay=0;
            $scope.youSave=0;
            while(typeof($scope.items[i])!=='undefined' )
            {
                var saving=parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].discount)*   parseFloat($scope.items[i].price)/100; 
                $scope.youPay=parseFloat($scope.youPay)+(parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].price))-parseFloat(saving);              
                $scope.youSave=parseFloat($scope.youSave)+parseFloat(saving);
                i++;
            }
                  	break;
                }
                else
                {
                	continue;
                }
             }                                                                                                                     
        }                                                                                                                     

		};
    
		
	//3 FUNCTION TO DECREASE THE COUNT OF ITEMS IN THE CART
	$scope.decrease=function(productId, email, size)
    {
	   if($scope.loggedIn)
           {  $scope.localStoreItemCount=0;
                var request = $http({
                        method: "post",
                        url: "server/cart/quantityChange_C2S.php",
                        data: {
                               productId:productId, email:email,action:"decrease",size:size,token:$scope.token
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response)
        {  
            $scope.items=response;
            var i=0;
            $scope.youPay=0;
            $scope.youSave=0;
            while(typeof($scope.items[i])!=='undefined' )
            {
                      $scope.localStoreItemCount=parseFloat($scope.items[i].quantity)+parseInt($scope.localStoreItemCount);
             var saving=parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].discount)*   parseFloat($scope.items[i].price)/100; 
             $scope.youPay=parseFloat($scope.youPay)+(parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].price))-parseFloat(saving); $scope.youSave=parseFloat($scope.youSave)+parseFloat(saving);
       
         
                i++;
                
            }
        });
           }
        else
        {
            $scope.cartValue = sessionStorage.getItem( "cart" ); 
             $scope.cartObj = JSON.parse( $scope.cartValue );
             for(var i=$scope.cartObj.items.length-1;i>=0;i--)
             {
                if($scope.cartObj.items[i].productId==productId && $scope.cartObj.items[i].size==size)
                {
                 
                    //remove item from the array and push again here
                    $scope.cartObj.items[i].quantity--;
                    var jsonStr=JSON.stringify($scope.cartObj);
                    sessionStorage.setItem("cart",jsonStr);
                    
                    var cartValue = sessionStorage.getItem( "cart" ); 
                    $scope.cartObj = JSON.parse( cartValue ); 
                    $scope.items=$scope.cartObj.items;
                    var i=0;
                    $scope.youPay=0;
                    $scope.youSave=0;
                    while(typeof($scope.items[i])!=='undefined' )
                    {
                        var saving=parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].discount)*   parseFloat($scope.items[i].price)/100; 
                        $scope.youPay=parseFloat($scope.youPay)+(parseFloat($scope.items[i].quantity)*parseFloat($scope.items[i].price))-parseFloat(saving);              
                        $scope.youSave=parseFloat($scope.youSave)+parseFloat(saving);
                        i++;
                    }
                  	break;
                }
                else
                {
                	continue;
                }
             } 
        }
    };
    
    $scope.setSize=function()
    {
        var request = $http({
                        method: "post",
                        url: "server/cart/updateCart.php",
                        data: {
                                updateType:"size",    
                                size:size,
                                email:$scope.email,
                               token:$scope.token
                            
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
        
    };
    
    
    $scope.changeSizeModal=function(productId,oldSize)
    {
        $scope.oldSize=oldSize;
        $scope.productId=productId;
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
            $('#sizeModal').openModal();
       
    }
    $scope.changeSizeValue=function(productId,newSize,oldSize)
    {
        if(newSize===oldSize)
            {
               $('#sizeModal').closeModal();
               return;
            }
      
        else if($scope.loggedIn)
            { 
                   var request = $http({
                                            method: "post",
                                            url: "server/setsize.php",
                                            data: {
                                
                                                        productId:productId,
                                                        
                                                        email:$scope.email,
                                                        token:$scope.token,
                                                        newSize:newSize,
                                                        oldSize:oldSize
                                
                                                  },
                                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                       });
                                    request.success(function(response)
                                                {        
                                        $scope.items=response;            
                                        //$scope.sizes=response;   
                                                    $('#sizeModal').closeModal();
                    
                                                });
            }
        else
            {
                $scope.cartValue = sessionStorage.getItem( "cart" );  //STEP 1: GET THE CART OBJ
                $scope.cartObj = JSON.parse( $scope.cartValue );
                for(var i=$scope.cartObj.items.length-1;i>=0;i--) //loop 1: to find position of item with old size
                    { 
                        
                         if($scope.cartObj.items[i].size==oldSize && $scope.cartObj.items[i].productId==productId )
                            {
                                var x=i;
                                
                                break;
                            }
                        else
                            {
                                continue;
                            }
                    }
                for(var i=$scope.cartObj.items.length-1;i>=0;i--)//loop2:to find item with new size f already existing
                    {
                        if($scope.cartObj.items[i].productId==productId && $scope.cartObj.items[i].size==newSize)
                            { 
                                $scope.cartObj.items[i].quantity++;
                                $scope.cartObj.items.splice(x,1);
                                var jsonStr=JSON.stringify($scope.cartObj);
                                sessionStorage.setItem("cart",jsonStr);
                                break;
                            }
                        
                        else if(i==0)
                            {
                              
                                $scope.cartObj.items[x].size=newSize;
                                var jsonStr=JSON.stringify($scope.cartObj);
                                sessionStorage.setItem("cart",jsonStr);
                                break;
                            }
                        else
                            {
                                continue;
                            }
                       
                    }
                    var cartValue = sessionStorage.getItem( "cart" ); 
                    $scope.cartObj = JSON.parse( cartValue ); 
                    $scope.items=$scope.cartObj.items;
                    $('#sizeModal').closeModal();
              
            }
    }
    
    
    $('#sizeModal').closeModal();
       
       
      $scope.forgotPassword=function()
    {   
        $('#loginModal').closeModal();
            $('#sizeModal').closeModal();
        $('#sizeModal').closeModal();
        $('#registerModal').closeModal();
        $('#forgotModal').openModal();
    };
    $scope.loginModal=function()
    { 
        $('#sizeModal').closeModal();
        $('#registerModal').closeModal();
          $('#sizeModal').closeModal();
        $('#forgotModal').closeModal();
        $('#loginModal').openModal();
    };
    
    $scope.newUserModal=function()
    { 
         
        $('#sizeModal').closeModal();
        $('#forgotModal').closeModal();
          $('#sizeModal').closeModal();
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
                                                email:$scope.registerMobile,
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
            {alert("0");
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
