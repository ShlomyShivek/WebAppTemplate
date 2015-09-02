describe("RegisterAndLogin", function() {
    it("should be logged in successfully", function () {
        var randomUsername=getRandomUsername();
        var regResult = registerUser("first","last","email@email.com",randomUsername,"longandvalidpassword");
        expect(regResult.message).toEqual("user registered");
    })

    it("should fail to login due to an invalid username or password", function(){
        var randomUsername=getRandomUsername();
        var regResult = registerUser("first","last","email@email.com",randomUsername,"aa");
        expect(regResult.responseJSON.message).toEqual('invalid username or password');
        expect(regResult.responseJSON.err).toEqual(100);
    })

    it("should fail to login due to missing username",function(){
        var randomUsername="";
        var regResult = registerUser("first","last","email@email.com",randomUsername,"aa");
        expect(regResult.responseJSON.message).toEqual('invalid username or password');
        expect(regResult.responseJSON.err).toEqual(100);
    })

    it("should fail to login due to invalid email address",function(){
        var randomUsername=getRandomUsername();
        var regResult = registerUser("first","last","email",randomUsername,"longandvalidpassword");
        expect(regResult.responseJSON.message).toEqual('unknown error occurred');
        expect(regResult.responseJSON.err).toEqual(-1);
    })

    it("should fail to login due to duplicate username",function(){
        var randomUsername=getRandomUsername();
        var regResult = registerUser("first","last","email@email.com",randomUsername,"longandvalidpassword");
        expect(regResult.message).toEqual("user registered");

        regResult = registerUser("first_2","last_2","email_2@email.com",randomUsername,"longandvalidpassword_2");
        expect(regResult.responseJSON.message).toEqual('user already registered');
        expect(regResult.responseJSON.err).toEqual(101);
    })

    it("should be able to login",function(){
        "use strict";
        var randomUsername=getRandomUsername();
        var password="longandvalidpassword";
        var regResult = registerUser("first","last","email@email.com",randomUsername,password);
        expect(regResult.message).toEqual("user registered");

        var loginResult=login(randomUsername,password);
        expect(loginResult.message).toEqual('logged in');
    })

    it("should fail to login due to wrong password",function(){
        "use strict";
        var randomUsername=getRandomUsername();
        var password="longandvalidpassword";
        var regResult = registerUser("first","last","email@email.com",randomUsername,password);
        expect(regResult.message).toEqual("user registered");

        var loginResult=login(randomUsername,'wrong password');
        expect(loginResult.status).toEqual(401);
    })

    it("should fail to login due to wrong username",function(){
        "use strict";
        var randomUsername=getRandomUsername();
        var password="longandvalidpassword";
        var regResult = registerUser("first","last","email@email.com",randomUsername,password);
        expect(regResult.message).toEqual("user registered");

        var loginResult=login('wrongusername',password);
        expect(loginResult.status).toEqual(401);
    })

    it("should fail to login",function(){
        "use strict";
        var randomUsername=getRandomUsername();
        var password="longandvalidpassword";

        var loginResult=login(randomUsername,password);
        expect(loginResult.status).toEqual(401);
    })

});
