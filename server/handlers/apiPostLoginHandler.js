'use strict';
//the url path to be used for this handler
exports.path='/login';

//the http verb to be used for this handler
exports.verb='POST';

//handler business logic
exports.handleRequest=function(req, res){

    console.log('handling ' + JSON.stringify(req.route.methods) + ' ' + req.originalUrl + ' from:' + req.header('referer'));

    let userManagementService = require('services/usersManagementService');
    let errorCodes = require('models/errorCodes/errorCodes');

    let Credentials=require('models/serviceModels/credentials');

    let credentials= new Credentials(req.body.credentials.username,req.body.credentials.password);

    if(credentials.GetUsername()==null || credentials.GetPassword()==null){
        //credentials are missing
        res.status(400).json(errorCodes.toJson(errorCodes.ApiErrorCodes.MissingData,'missing credentials'));
    }
    else {
        console.log('trying to login: '+credentials.GetUsername());
        userManagementService.login(credentials, function(){
            //success
            //ToDo: return a session object
            res.status(200).json({message: 'logged in'});
        }, function(){
            //error
        });
    }

}
