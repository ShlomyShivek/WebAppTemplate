define([], function(){
    return{
        getTestDataFromServer: function(http, onSuccess, onFailure){
            http.get('http://127.0.0.1:8081/api').
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    onSuccess(data);
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    onFailure(data);
                });
        },

        getReadMeDataFromServer:function(http, onSuccess, onFailure){
            http.get('http://127.0.0.1:8081/api/readme')
                .success(onSuccess)
                .error(onFailure);
        }
    }

})
