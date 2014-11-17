define(['../app', '../services/nodeService'],function(myApp, serviceClient){
    myApp.controller('HelloWorldCtrl',['$scope','$http',function controller($scope, $http){
        $scope.helloMsg="Hello World!!!";

        $scope.TestService=function(){
            serviceClient.getTestDataFromServer($http,onSuccessGetDataFromNodeServer,onFailureGetDataFromNodeServer);
        }

        function onSuccessGetDataFromNodeServer(data){
            $scope.serviceOutput=data;
        }

        function onFailureGetDataFromNodeServer(data){
            $scope.serviceOutput=data;
        }


    }])
})


