var app=angular.module('angularApp',['webStorageModule','ngOrderObjectBy']);
app.controller('storeMaker',function($scope,$http,webStorage)
{
    var gender=getQueryVariable("gender");
    var storeType=getQueryVariable("type");    
	$scope.orderBy='incart';//setting initial value for product sorting
    $scope.showAll=true;//setting initial value for product filtering
    $scope.localStoreItemCount=0;
    $scope.size="None Selected";
    $scope.filterArray=Array();
    
    //LOAD ITEMS AS PER THE STORE SELECTED
    if(getQueryVariable("storeType")=='Discounts') //select from the product table 
    {
		 var request = $http({
                                method: "post",
                                url: "server/stores/discountStore.php",
                                data: {
                                        discount:getQueryVariable("typeValue")
                                      },
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                            });
        request.success(function(response){
                                            $scope.items=response;
                                            $scope.filtertypes=Array(5);
                                            $scope.filtertypes[0]="cult";
                                            $scope.filtertypes[1]="designer";
                                            $scope.filtertypes[2]="gender";
                                            $scope.filtertypes[3]="productCategory";
                                            $scope.filtertypes[4]="content";
                                            $scope.generateFilters($scope.items,$scope.filtertypes[0]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[1]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[2]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[3]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[4]);
                                             
                                          });
    }
    else if(getQueryVariable("storeType")=='Brand') // select from the dedicated table joined with product
	{	
		var request = $http({
                        method: "post",
                        url: "server/fullstore/brands.php",
                        data: {
                                brand:getQueryVariable("typeValue")
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){
                                            $scope.items=response;
                                            $scope.filtertypes=Array(4);
                                            $scope.filtertypes[0]="gender";
                                            $scope.filtertypes[3]="cult";
                                            $scope.filtertypes[1]="productCategory";
                                            $scope.filtertypes[2]="content";
                                            $scope.generateFilters($scope.items,$scope.filtertypes[0]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[1]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[2]);
                    $scope.generateFilters($scope.items,$scope.filtertypes[3]);
                                            });
	}
	else if(getQueryVariable("storeType")=='Gifts') //select on the basis of gift table joined with product
	{
		 var request = $http({
                        method: "post",
                        url: "server/fullstore/giftStore.php",
                        data: {
                                giftName:getQueryVariable("typeValue")
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){
                                            $scope.items=response;
                                            $scope.filtertypes=Array(4);
                                            $scope.filtertypes[0]="gender";
                                            $scope.filtertypes[3]="cult";
                                            $scope.filtertypes[1]="productCategory";
                                            $scope.filtertypes[2]="content";
                                            $scope.generateFilters($scope.items,$scope.filtertypes[0]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[1]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[2]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[3]);
                                          });
    }
    else if(getQueryVariable("storeType")=='cult')//select on the basis of cult column mappin in the cult table oined with product
	{
       
		 var request = $http({
                        method: "post",
                        url: "server/stores/cultStore.php",
                        data: {
                                cult:getQueryVariable("typeValue")
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){
                                                $scope.items=response;
                                            $scope.filtertypes=Array(4);
                                            $scope.filtertypes[0]="gender";
                                            $scope.filtertypes[1]="productCategory";
                                            $scope.filtertypes[2]="content";
                                            $scope.filtertypes[3]="designer";
                                            $scope.generateFilters($scope.items,$scope.filtertypes[0]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[1]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[2]);
                          $scope.generateFilters($scope.items,$scope.filtertypes[3]);
                                          });
	}
    else if(getQueryVariable("storeType")=='M') //select on the basis of gender of the item joined with product table
    {
        var request = $http({
                        method: "post",
                        url: "server/fullstore/gstore.php",
                        data: {
                                gender:'M',
                                type:getQueryVariable("typeValue")
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){
                                            $scope.items=response;
                                            $scope.filtertypes=Array(2);
                                            $scope.filtertypes[0]="cult";
                                            $scope.filtertypes[1]="content";
                                            $scope.filtertypes[2]="designer";
                                            $scope.generateFilters($scope.items,$scope.filtertypes[0]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[1]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[2]);
                                          });
    }
		  else if(getQueryVariable("storeType")=='F') //select on the basis of gender of the item joined with product table
    {
        var request = $http({
                        method: "post",
                        url: "server/fullstore/gstore.php",
                        data: {
                                gender:'F',
                                type:getQueryVariable("typeValue")
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){
                                            $scope.items=response;
                                            
                                            $scope.filtertypes=Array(2);
                                            $scope.filtertypes[0]="cult";
                                            $scope.filtertypes[1]="content";
                                            $scope.filtertypes[2]="designer";
                                            $scope.generateFilters($scope.items,$scope.filtertypes[0]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[1]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[2]);
                                            });
    }   
      else if(getQueryVariable("storeType")=='TV') //select on the basis of gender of the item joined with product table
    {
        var request = $http({
                        method: "post",
                        url: "server/fullstore/content.php",
                        data: {
                                
                                content:getQueryVariable("typeValue")
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){
                                            $scope.items=response;
            $scope.filtertypes=Array(2);
                                            $scope.filtertypes[0]="cult";
                                            $scope.filtertypes[1]="content";
                                            $scope.filtertypes[2]="designer";
                                            $scope.generateFilters($scope.items,$scope.filtertypes[0]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[1]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[2]);
                                            
                                          });
    }  
         else if(getQueryVariable("storeType")=='Superheroes') //select on the basis of gender of the item joined with product table
    {
        var request = $http({
                        method: "post",
                        url: "server/fullstore/content.php",
                        data: {
                                
                                content:getQueryVariable("typeValue")
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){ 
                                            $scope.items=response;
                                            $scope.filtertypes=Array(3);
                                            $scope.filtertypes[0]="productCategory";
                                            $scope.filtertypes[1]="designer";
                                            $scope.filtertypes[2]="gender";
                                            $scope.generateFilters($scope.items,$scope.filtertypes[0]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[1]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[2]);
                                            });
    }
else if(getQueryVariable("storeType")=='Sports') 
{
        var request = $http({
                        method: "post",
                        url: "server/fullstore/content.php",
                        data: {
                                
                                content:getQueryVariable("typeValue")
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
        request.success(function(response){
                                            $scope.items=response;
                                            $scope.filtertypes=Array(3);
                                            $scope.filtertypes[0]="productCategory";
                                            $scope.filtertypes[1]="designer";
                                            $scope.filtertypes[2]="gender";
                                            $scope.generateFilters($scope.items,$scope.filtertypes[0]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[1]);
                                            $scope.generateFilters($scope.items,$scope.filtertypes[2]);
                                         });
    }

//FUNCTION TO GENERATE FILTERS
$scope.generateFilters=function (items, param )
    {
        $scope.forcheck=Array();
        for( x in items)
        {
            var idx=$scope.forcheck.indexOf(items[x][param]);
            if(idx===-1 && items[x][param]!='')
            {  
                $scope.forcheck.push(items[x][param]);
                $scope.filterArray.push({name:items[x][param], type:param, on:false});        
            }
        }   
    };
 
    //1 FUNCTION TO SET UP LOGGED IN STATUS
    if(webStorage.session.get("email")==undefined)
	{
       $scope.loggedIn=false;
        $scope.cartItemCount=0;
    }
    else
	{
		$scope.email =webStorage.session.get("email");
		$scope.token =webStorage.session.get("token");
		$scope.name =webStorage.session.get("name");
		$scope.loggedIn=true;
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

		
    //3 FETCHING COUNT OF ITEMS IN THE WISHLIST
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

        request.success(function(response){         $scope.wishlistCount=response; });
        }
    

	  //1 Function to set size
$scope.setSize=function(size,insert,productId,discount,price)
{
    $scope.size=size;
    if($scope.loggedIn)
    { 
         var request = $http({
                        method: "post",
                        url: "server/cart/addtoCart.php",
                        data: {
                                email:$scope.email, 
                                productId:$scope.toBeAddedProductId,
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
                //checks if same item of same size is already in cart
                if($scope.cartObj.items[i].productId==productId && $scope.cartObj.items[i].size==$scope.size)
                {
                    already=true;
                    $scope.cartObj.items[i].quantity++;
                    console.log("item fount");
                    var jsonStr=JSON.stringify($scope.cartObj);
                    sessionStorage.setItem("cart",jsonStr);
                    var cartValue = sessionStorage.getItem( "cart" ); 
                    $scope.cartObj = JSON.parse( cartValue ); 
                    $scope.localStoreItemCount=$scope.cartObj.items.length;
                    Materialize.toast('Item Added to your Cart', 4000);
                  	break;
                }
                else
                {
                	continue;
                }
            }
            if(!already)//if item is not already in the localcart
            {
                $scope.cartObj.items.push({"productId":productId,"quantity":1,"discount":discount,"price":price,"size":$scope.size});
                var jsonStr=JSON.stringify($scope.cartObj);
                sessionStorage.setItem("cart",jsonStr);
                $scope.cartValue = sessionStorage.getItem( "cart" ); 
                $scope.cartObj = JSON.parse( $scope.cartValue );
                $scope.localStoreItemCount=$scope.cartObj.items.length;
                $('#modal1').closeModal();
                Materialize.toast('Item Added to your Cart', 4000)
            }
         
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
            $('#modal1').closeModal();
        }
    }};
	
    //2 FUNCTION TO ADD ITEM TO THE CART
$scope.addtoCart=function(productId,price,discount)
{  
    $scope.productId=productId;
    $scope.discount=discount;
    $scope.price=price;
    var request = $http({
                        method: "post",
                        url: "server/getsize.php",
                        data: { productId:productId},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
    request.success(function(response){$scope.sizes=response;});
    $('#modal1').openModal();
};
            
        
		
		
    //3 FUNCTION TO ADD ITEM TO WISHLIST
    if($scope.loggedIn)
    {
        $scope.addToWishlist=function(productId)
	    {
		  var request = $http({
                        method: "post",
                        url: "server/wishlist/wishlist_C2S.php",
                        data: {
                                email:$scope.email,
                                productId: productId,
                            token:$scope.token
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response){        
             $scope.wishlistCount[0]++;
                   $scope.itemadded[productId]=true;
                  console.log($scope.itemadded[productId]);
                 Materialize.toast('Item Added to your Wishlist', 3000)});	
        };	   
    }
		
		
//7 FUNCTION TO SORT ITEMS
$scope.orderItems=function(field){ $scope.orderBy=field;};
    
//FUNCTION TO CHECK THE CHANGES IN THE ON VALUE OF FILTERS
$scope.checkChange=function()
{
  for(f in $scope.filterArray)
  {
      if($scope.filterArray[f].on)
      {
          $scope.showAll=false;
          return;
      }
  }
  $scope.showAll=true;
};
    
//FUNCTION TO FILTER OUT ELEMENTS
$scope.filterFunc=function(p)
{
    if($scope.showAll){return true;}
    var sel=false;
    for(fil in $scope.filterArray)
    {
        var f=$scope.filterArray[fil];
        if(f.on)
        {
            if(f.type=='productCategory')//checking for filter type size
            {
                if(f.name==p.productCategory)
                {return true;}
            }
            else if(f.type=='cult')//checking for fitler type cult
            {
                if(f.name==p.cult)
                {return true;}
            }
            else if(f.type=='discount')//checking for fitler type cult
            {
               if(f.name==p.discount)
               {return true;}
            }
            else if(f.type=='content')
            {
                if(f.name==p.content)
                {return true;}
            }
             else if(f.type=='gender')
            {
                if(f.name==p.gender)
                {return true;}
            }
        }
        }
    
};
    
    
       
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
    
/*    $scope.closeModal=function(x)
    {
        $('#modal'+x).closeModal();
    }
*/	
  
});
	
