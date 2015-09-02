"use strict";

function registerUser(firstName, lastName, email, userName, password){
    var result=null;
    $.ajax({
        type:"POST",
        url: "http://localhost:8081/api/signup",
        data: {
            "registration": {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "username": userName,
                "password": password
            }},
        dataType:"json",
        async:false,
        success: function (data) {
            result=data;
            console.log(data);
        },
        error:function(data, err){
            console.log(err);
            console.log(data);
            result=data;
        }
    });

    return result;
}

function login(username, password){
    var result=null;
    $.ajax({
        type: "POST",
        url: "http://localhost:8081/api/login",
        data: {
            "username": username,
            "password": password
        },
        dataType: "json",
        async: false,
        success: function (data) {
            result = data;
            console.log(data);
        },
        error: function (data, err) {
            console.log(err);
            console.log(data);
            result = data;
        }
    });

    return result;
}

function getRandomUsername(){
    var randomUserName=Math.random().toString(36).substring(7);
    return randomUserName;
}