/// <reference path="../node.d.ts" />

import * as fs from 'fs'

//the url path to be used for this handler
export const path='/readme';

//the http verb to be used for this handler
export const verb='GET';

//handler business logic
export const handleRequest=[handler];

function handler(req, res){

    console.log('handling ' + JSON.stringify(req.route.methods) + ' ' + req.originalUrl + ' from:' + req.header('referer'));

    var readmeFile = process.cwd() +'/../README.md';
    var fileContent = fs.readFileSync(readmeFile, 'utf8');
    res.json({ message: fileContent });
}
