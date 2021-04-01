const boom = require('@hapi/boom')
const { config } =  require('../../config');
const isRequestAjaxOrApi =  require('../../utils/isRequestAjaxOrApi')
const Sentry = require("@sentry/node");

 Sentry.init({
    dsn: `https://${config.sentryDns}.ingest.sentry.io/${config.sentryId}`,
    tracesSampleRate: 1.0,   
})
  
function  withErrorStack(err, stack) {
    if (config.dev){
        return {...err, stack} //object.assign({},err,stac k)
    }
    
}

function logErrors(err, req, res, next){
    Sentry.captureException(err);
    console.log(err.stack);
    next(err);
}

function wrapErrors(err, req, res, next) {
    if(!err.isBoom){
        next(boom.badImplementation(err));
    }
    next(err);
}

function clientErrorHandler(err, req, res, next){
    const {
        output: { statusCode, payload}
    } = err;
// Catch errors for AJAX reques or if an error ocurrs while streaming
    if ( isRequestAjaxOrApi(req) || res.headerSent) {
        res.status(statusCode).json(withErrorStack(payload, err.stack));
    } else{
        next(err)
    } 
}

function errorHandler(err, req, res, next){
    // Catch error while streaming
    const {
        output: { statusCode, payload }
    } = err;

    res.status(statusCode)
    res.render("error",withErrorStack(payload, err.stack));
}




module.exports = {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
}