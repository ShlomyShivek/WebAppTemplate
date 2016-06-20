import * as errorHandling from '../models/errorCodes/errorCodes';
import * as userManagementService from '../services/usersManagementService';
import * as dbModel from '../dbModelsInitiator';


//the url path to be used for this handler
export const path ='/signup';

//the http verb to be used for this handler
export const verb ='POST';

//handler business logic
export const handleRequest=[handler];

function handler(req, res){

    console.log('handling ' + JSON.stringify(req.route.methods) + ' ' + req.originalUrl + ' from:' + req.header('referer'));

    let userModel=dbModel.getDbModel('user');
    let authModel=dbModel.getDbModel('authentication');

    let user=new userModel(req.body.registration);
    let authentication=new authModel(req.body.registration);


    if(user==null || authentication==null){
      //user was not sent as part of the request
      res.status(400).json({err:errorHandling.ApiErrorCodes.MissingData,message:'registration information is missing'});
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
              if (data == errorHandling.ServicesErrorCodes.DuplicateKey) {
                  res.status(400).json(errorHandling.toJson(errorHandling.ApiErrorCodes.UserAlreadyExists,'user already registered'));
              } else {
                  res.status(400).json(errorHandling.toJson(errorHandling.ApiErrorCodes.UnknownError,'unknown error occurred'));
              }
          });
      }
      else {

          console.log('invalid username or password');
          res.status(400).json(errorHandling.toJson(errorHandling.ApiErrorCodes.MissingData,'invalid username or password'));
      }
    }
}