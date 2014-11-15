define(['../app'],function(myApp){
    myApp.controller('HelloWorldCtrl',['$scope',function controller($scope){
        $scope.helloMsg="Hello World!!!";

        $scope.TestService=function(){
            $scope.serviceOutput="service output"
        }
    }])
})


