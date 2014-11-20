define([], function(){

    //the service root URL
    var rootUrl='http://127.0.0.1:8081';

    return{
        getTestDataFromServer: function(http, onSuccess, onFailure){
            http.get(rootUrl + '/api')
                .success(onSuccess)
                .error(onFailure);
        },

        getReadMeDataFromServer:function(http, onSuccess, onFailure){
            http.get(rootUrl + '/api/readme')
                .success(onSuccess)
                .error(onFailure);
        }
    }

})
