angular.module('pfsApp').controller('loginController',
    ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService){
        
        $scope.login = function() {
            
            $scope.error = false;
            $scope.disabled = true;
            
            AuthService.login($scope.loginForm.username, $scope.loginForm.password)
            
                .then(function(){
                    $location.path('/');
                    $scope.disabled = false;
                    $scope.loginForm = {};
                })
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });
            
            
            
        };
    }]);
    
angular.module('pfsApp').controller('logoutController',
    ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService){
        
        $scope.logout = function() {
            
            AuthService.logout()
                .then(function() {
                    $location.path('/login')
                });
        };

    }]);    
   
angular.module("pfsApp").controller('profileController',
['$scope', '$location', 'AuthService','$http',
function($scope, $location, AuthService, $http){
   
  
   $scope.profileInfo = {};
   $scope.userPurchases = {};
   $scope.purchaseForm = {};
   
   AuthService.getProfInfo()
      .success(function(data){
      
        $scope.profileInfo = data;
        console.log($scope.profileInfo.name)
      })
      .error(function(e){
        console.log(e);
      });
      
    $http.get("/user/purchaseHistory")
        .success(function(data){
            $scope.userPurchases = data
            console.log(JSON.stringify($scope.userPurchases[0].title));
        })
        .error(function(e){
            console.log(e);
        });
        
    $http.get("/user/monthlyPurchaseHistory")
        .success(function(data){
            $scope.monthlyPurchases = data
      
            console.log(JSON.stringify($scope.monthlyPurchases[0].title));
            
                var total = 0;
                for(var i = 0; i<$scope.monthlyPurchases.length; i++){
                    total += ($scope.monthlyPurchases[i].amountSpent)
                }
                $scope.monthlyTotal = parseInt(total);
                console.log(parseInt($scope.monthlyTotal));
        })
        .error(function(e){
            console.log(e);
        });
        
    $scope.purchaseTotal = function(){
        var total = 0;
        for(var i = 0; i < $scope.userPurchases.length; i++){
      
        total += ($scope.userPurchases[i].amountSpent);
      }
       return total
    }
        
        $scope.createPurchase = function(){
            
            
            $scope.purchaseForm.dateMade = Date.now();
            $http.post('/user/purchaseHistory', $scope.purchaseForm)
            .success(function(data){
                $scope.purchaseForm = {};
                $scope.userPurchases = data;
                console.log("Post")
                console.log(data);
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
            
        }
    
}]);   
    
angular.module('pfsApp').controller('registerController',
    ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService){
        
        $scope.register = function(){
            
            $scope.error = false;
            $scope.disabled = true;
            
            AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.currentBudget)
            
                .then(function(){
                    $location.path('/');
                    $scope.disabled = false;
                    $scope.registerForm = {};
                })
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "The account specified already exists, please try again.";
                    $scope.disabled = false;
                    $scope.registerForm = {};
                });
        };
        
}]);