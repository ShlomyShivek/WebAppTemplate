/* Authentication service strategy for authenticating using active directory */

exports.name=function(){return 'AD';};

exports.authenticate=function(username, password, done) {
    console.log("running local strategy for login");
    /*
    var authenticationEntity=new authenticationModel();
    if(!authenticationEntity.isDecryptedPasswordValid(password)){
        console.log("invalid password for login");
        return done(null, false, { message: 'invalid username or password' });
    }
*/

    var ActiveDirectory = require('activedirectory');
    var config = { url: 'ldap://ilspdc01.brainlab.net',
        baseDN: 'dc=domain,dc=net',
        username: username,
        password: password };
    var ad = new ActiveDirectory(config);

    ad.authenticate(username, password, function(err, auth) {
        if (err) {
            console.log('ERROR: '+JSON.stringify(err));
            return done(null, null);
        }

        if (auth) {
            console.log('Authenticated!');
            console.log("username and password match. User can login %s", username);
            return done(null, {"id":username});
        }
        else {
            console.log('Authentication failed!');
            console.log("username and password match. User can login %s", username);
            return done(null, null);
        }
    });




    /*
     console.log("looking for user details in DB for authentication %s",username);
     authenticationModel.findOne({ username: username }, function(err, user) {
     if (err) {
     console.log("failed to query database %s",err);
     return done(err);
     }
     if (!user) {
     console.log("could not find user in DB %s",username);
     return done(null, false, { message: 'Invalid username or password' });
     }else{
     console.log("username found in DB. checking for password");
     var encryptedPassword=authenticationEntity.encryptPassword(password,user.salt);
     if(user.password!=null && encryptedPassword!=null) {
     if (encryptedPassword == user.password) {
     console.log("password=%s, encryptedpassword=%s, user.password=%s", password, encryptedPassword, user.password);
     console.log("username and password match. User can login %s", username);
     return done(null, user);
     }
     }
     }
     return done(null, false, { message: 'Invalid username or password' });
     });
     */
};
