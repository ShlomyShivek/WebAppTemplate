define(['../app', '../services/nodeService'],function(myApp, serviceClient){
    myApp.controller('ReadMeCtrl',['$scope','$http',function controller($scope, $http){
        $scope.readmeData=serviceClient.getReadMeDataFromServer($http, onSuccessGetReadMeData, onFailureGetReadmeData);

        function onSuccessGetReadMeData(data){
            $scope.readmeData=data.message;
        }

        function onFailureGetReadmeData(data){
            $scope.readmeData=data;
        }
    }])
})


