var app = angular.module('myApp',['ngRoute','ngCookies']);

app.config(function($routeProvider){   
    $routeProvider.when('/', {
        templateUrl: '/home.html',
        resolve:['authService',function(authService){
            return authService.checkUserStatus();
        }]
    })
    .when('/home', {
        templateUrl: '/home.html',
        resolve:['authService',function(authService){
            return authService.checkUserStatus();
        }]
    })
    .when('/signup' ,
    {
        templateUrl: '/signup.html',
        controller:'registerController',
    })
    .when('/login', {
        templateUrl: '/login.html',
        controller:'loginController'
    })
    .when('/post', {
        templateUrl: '/post.html',
        controller:'postController'
        // resolve:['authService',function(authService){
        //     return authService.checkUserStatus();
        // }]
    })
    .when('/list',{
        templateUrl: '/jobs.html',
        controller: 'getController'
        // resolve:['authService',function(authService){
        //     return authService.checkUserStatus();
        // }]
    })
});

app.factory('authService',function($cookies,$http,$location,$q){
    return {
        'checkUserStatus': function(){
            var defer = $q.defer();
            var isLoggedin = ($cookies.get('isLoggedin')=='true');
            // console.log(isLoggedin);
                if(!isLoggedin){
                    console.log($cookies.get('isLoggedin'));
                    defer.reject();
                    $location.path('/login');
                }else{
                    defer.resolve();
                }
        }
    }
})

app.controller('main',function($cookies,$rootScope){
    if($cookies.get('isLoggedin') == 'true'){
        $rootScope.isLoggedin = JSON.parse($cookies.get('isLoggedin'));
        $rootScope.isCompany = JSON.parse($cookies.get('isCompany'));
        $rootScope.isSeeker = JSON.parse($cookies.get('isSeeker'));
    }
});
app.controller('registerController',function($cookies,$rootScope,$scope,$http,$location){

    $scope.register = function(){
        var details = {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email,
            location: $scope.location,
            phone:$scope.phone,
            usertype: $scope.UserType
        }
        console.log(details);
        $http.post('http://localhost:3000/register',details).then(function(resp){
            if(resp.data.flg == 'success'){
                if(details.usertype == "company"){
                    $cookies.put('isCompany', true);
                    $cookies.put('isSeeker',false);
                }else{
                    $cookies.put('isCompany', false);
                    $cookies.put('isSeeker',true);
                }
                $cookies.put('email',$scope.email);
                $cookies.put('isLoggedin',true);
                $rootScope.isLoggedin = JSON.parse($cookies.get('isLoggedin'));
                $rootScope.isCompany = JSON.parse($cookies.get('isCompany'));
                $rootScope.isSeeker = JSON.parse($cookies.get('isSeeker'));
                $location.path('/home');
            }
        })
    }

});

app.controller('loginController',function($http,$cookies,$scope,$rootScope,$location,$cookies){
    $scope.login = function(){
        console.log('login called');
        var user = {
            email: $scope.email,
            password: $scope.password
        }

        $http.post('http://localhost:3000/login',user).then(function(res){
            if(res.data.flg == "existed"){
                if(res.data.type == "company"){
                    $cookies.put('isCompany', true);
                    $cookies.put('isSeeker',false);
                }else{
                    $cookies.put('isCompany', false);
                    $cookies.put('isSeeker',true);
                }
                $cookies.put('email',$scope.email);
                $cookies.put('isLoggedin',true);
                $rootScope.isLoggedin = JSON.parse($cookies.get('isLoggedin'));
                $rootScope.isCompany = JSON.parse($cookies.get('isCompany'));
                $rootScope.isSeeker = JSON.parse($cookies.get('isSeeker'));
                $location.path('/home');
            }else{
                alert('user not existed!');
            }
        })
    }
    $scope.logout = function(){
        var cookies = $cookies.getAll();
            angular.forEach(cookies, function (v, k) {
                $cookies.remove(k);
            });
            $rootScope.isCompany = false;
            $rootScope.isLoggedin = false;
            $rootScope.isSeeker = false;
        $location.path('/login');
    }
});

app.controller('postController',function($scope,$http){
    $scope.save = function(){
        var job = {
            title: $scope.title,
            description: $scope.description,
            location: $scope.location,
            keyword: $scope.keyword
        }
        console.log(job);
        $http.post('http://localhost:3000/post',job).then(function(res){
            console.log(res.data.flg);
            $scope.title = undefined;
            $scope.description = undefined;
            $scope.location = undefined;
            $scope.keyword = undefined;
        });
    }
});
app.controller('getController',function($scope,$http,$cookies){
    $scope.displaySaved = false;
    $scope.displayApplied = false;
    $scope.search = function(){
    
        var job = {
            title: $scope.title,
            location: $scope.location,
            keyword: $scope.keyword
        }
        $http.post('http://localhost:3000/search',job).then(function(res){
            $scope.list = res.data;
            console.log($scope.list);
        });
    };
    $scope.reset = function(){
        // $scope.display = false;
        $scope.list = null;
        $scope.saved = null;
        $scope.applied = null;
        $scope.title = undefined;
        $scope.location = undefined;
        $scope.description = undefined;
    }
    $scope.save = function(title,location,description){
        
        var savejobs = {
            email: $cookies.get('email'),
            title: title,
            location: location,
            description: description
        }
        console.log(savejobs);
        $http.post('http://localhost:3000/savejobs',savejobs).then(function(res){
            console.log(res.data.flg);
        })
    };
    $scope.apply = function(title,location,description){
        var applyjob = {
            email: $cookies.get('email'),
            title: title,
            location: location,
            description: description
        }
        console.log(applyjob);
        $http.post('http://localhost:3000/applyjob',applyjob).then(function(res){
            console.log(res.data.flg);
        });
    };
    $scope.searchSaved = function(){
        $scope.displaySaved = !$scope.displaySaved;
        var user = {
            email: $cookies.get('email')
        }
        $http.post('http://localhost:3000/searchSaved',user).then(function(res){
            $scope.saved = res.data;
            console.log(res.data);
        });
    };
    $scope.searchApplied = function(){
        $scope.displayApplied = !$scope.displayApplied;
        var user = {
            email: $cookies.get('email')
        }
        $http.post('http://localhost:3000/searchApplied',user).then(function(res){
            $scope.applied = res.data;
            console.log(res.data);
        });
    };
});

angular.element(function() {
    angular.bootstrap(document, ['myApp']);
});
