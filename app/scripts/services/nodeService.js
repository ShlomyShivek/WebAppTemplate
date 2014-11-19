define([], function(){
    return{
        getTestDataFromServer: function(http, onSuccess, onFailure){
            http.get('http://127.0.0.1:8081/api')
                .success(onSuccess)
                .error(onFailure);
        },

        getReadMeDataFromServer:function(http, onSuccess, onFailure){
            http.get('http://127.0.0.1:8081/api/readme')
                .success(onSuccess)
                .error(onFailure);
        }
    }

})
