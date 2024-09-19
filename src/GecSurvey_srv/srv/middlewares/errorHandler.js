

function errorHandler(err, req, resp, next ){
    console.log(err.stack);
    let status=500;
    let msmerror="internal Error";
    if(err.status==404){
        status = 404;
        msmerror="not found";
    }else if(err instanceof SyntaxError){
        status = 400;
        msmerror="Error";
    }
    resp.status(status).json({
        status: status,
        msmerror: msmerror
    });
}
module.exports=errorHandler;