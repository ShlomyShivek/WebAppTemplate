//the url path to be used for this handler
export const path ='/';

//the http verb to be used for this handler
export const verb ='GET';

export const handleRequest=[handler];

function handler(req, res){

    console.log('handling ' + JSON.stringify(req.route.methods) + ' ' + req.originalUrl + ' from:' + req.header('referer'));

    res.json({ message: 'hooray! welcome to our api!!!!!' });
}