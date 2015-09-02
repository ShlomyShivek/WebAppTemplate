'use strict';
//the url path to be used for this handler
exports.path='/signup';

//the http verb to be used for this handler
  exports.verb='POST';



//handler business logic
  exports.handleRequest=[handler];
function handler(req, res){

      console.log('handling ' + JSON.stringify(req.route.methods) + ' ' + req.originalUrl + ' from:' + req.header('referer'));

      let userManagementService = require('services/usersManagementService');
      let errorCodes = require('models/errorCodes/errorCodes');
      let dbModel=require('dbModelsInitiator');
      let userModel=dbModel.getDbModel('user');
      let authModel=dbModel.getDbModel('authentication');

      let user=new userModel(req.body.registration);
      let authentication=new authModel(req.body.registration);


      if(user==null || authentication==null){
          //user was not sent as part of the request
          res.status(400).json({err:errorCodes.ApiErrorCodes.MissingData,message:'registration information is missing'});
      }
      else {
          console.log('trying to register user:'+authentication.toString());
          if(authentication.isValid()){
              userManagementService.signup(user, authentication, function () {
                  //success
                  res.status(200).json({message: 'user registered'});
              }, function (data) {
                  //error
                  console.log('failed to signup user');
                  if (data == errorCodes.ServicesErrorCodes.DuplicateKey) {
                      res.status(400).json(errorCodes.toJson(errorCodes.ApiErrorCodes.UserAlreadyExists,'user already registered'));
                  } else {
                      res.status(400).json(errorCodes.toJson(errorCodes.ApiErrorCodes.UnknownError,'unknown error occurred'));
                  }
              });
          }
          else {
              console.log('invalid username or password');
              res.status(400).json(errorCodes.toJson(errorCodes.ApiErrorCodes.MissingData, 'invalid username or password'));
          }
      }
}
