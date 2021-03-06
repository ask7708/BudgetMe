var pfsApp = angular.module('pfsApp', ['ngRoute']);

pfsApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'partials/home.html',
            access: {restricted: true}
        })
        .when('/login',{
            templateUrl: 'partials/login.html',
            controller: 'loginController',
            access: {restricted: false}
        })
        .when('logout',{
            controller: 'logoutController'
        })
        .when('/register',{
            templateUrl: 'partials/register.html',
            controller: 'registerController',
            access: {restricted: false}
        })
        .otherwise({
            redirectTo: '/'
        });
});

pfsApp.run(function ($rootScope, $location, $route, AuthService){
    $rootScope.$on('$routeChangeStart',
        function (event, next, current){
            AuthService.getUserStatus()
            .then(function(){
                if(next.access.restricted && !AuthService.isLoggedIn()){
                    $location.path('/login');
                    $route.reload();
                }else{
                    $rootScope.loggedIn = AuthService.isLoggedIn();
                }
            });
        });
});

