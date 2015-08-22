'use strict';
//the url path to be used for this handler
exports.path='/signup';

//the http verb to be used for this handler
  exports.verb='POST';



//handler business logic
  exports.handleRequest=function(req, res){

      console.log('handling ' + JSON.stringify(req.route.methods) + ' ' + req.originalUrl + ' from:' + req.header('referer'));

      let userManagementService = require('../services/usersManagementService');
      let errorCodes = require('../models/errorCodes/errorCodes');
      let dbModel=require('../dbModelsInitiator');
      let userModel=dbModel.getDbModel('user');

      let user=new userModel(req.body.user);


      if(user==null){
          //user was not sent as part of the request
          res.status(400).json({err:errorCodes.ApiErrorCodes.MissingData,message:'user information is missing'});
      }
      else {

          console.log('trying to register user:'+user.toString());

          userManagementService.signup(user, function () {
              //success
              res.status(200).json({message: 'user registered'});
          }, function (data) {
              //error
              console.log('failed to signup user');
              if (data == errorCodes.ServicesErrorCodes.ItemAlreadyExists) {
                  res.status(400).json({
                      err: errorCodes.ApiErrorCodes.UserAlreadyExists,
                      message: 'user already registered'
                  });
              } else {
                  res.status(400).json({
                      err: errorCodes.ApiErrorCodes.UnknownError,
                      message: 'unknown error occurred.'
                  });
              }
          });
      }

}
