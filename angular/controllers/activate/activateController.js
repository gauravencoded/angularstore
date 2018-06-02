var app=angular.module('angularApp',['webStorageModule']);

app.controller('activation',function($scope,$http,webStorage)
{       
    $scope.stageOne=false;
    if(webStorage.session.get("email")==undefined)
	{
        $scope.loggedIn=false;	
    }
	else
    {
		
	}
    //get the query string
    //send query string to the serverz
    var request = $http({
                        method: "post",
                        url: "server/activation/querystring.php",
                        data: {
                                querystring:getQueryVariable("querystring"),
                                email:getQueryVariable("email")
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

        request.success(function(response)
        {
           
            if(response.status=='success')
            {
                $scope.stageOne=true;
            }
            else if(response.status=='fail')
            { 
                $scope.stageOne=false;    
                $scope.errormessage="There seems to be some error with your account verification please go to your email and click on the activation link";    
            }
            
        });
    
    
    $scope.vaidateOTP=function()
    {
        if($scope.stageOne)
        {
                 var request = $http({
                        method: "post",
                        url: "server/activation/otpValidate.php",
                        data: {
                                querystring:getQueryVariable("querystring"),
                                email:getQueryVariable("email"),
                                otp:$scope.otp
                              },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

                request.success(function(response)
                {   $scope.result=response;
                    if($scope.result.status='success')
                    {
                        $scope.stageTwo=true;
                        $scope.successMessage="Your account is successfully verified and activated please login to use collegecults.";
                        
                        //login user and redirect him
                        do
                        {
                            webStorage.session.set("email", $scope.result.email);
                            webStorage.session.set("token",$scope.result.token);
                        }
                        while(webStorage.session.get("email")!=$scope.result.email && webStorage.session.get("token")!=$scope.result.token );
                       // window.location.href='index.html';
                                
                        
                        
                           
                    }
                    else
                    {
                        $scope.stageTwo=false;
                        $scope.errormessage="You ahve netered incorrect OTP, please enter corret otp sent to you";
                    }
                });

        }
    else
        {
                $scope.stageOne=false;    
                $scope.errormessage="There seems to be some error with your account verification please go to your email and click on the activation link";
        }
        
    };
    
    
 });