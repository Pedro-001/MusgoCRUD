const { config } =  require('../../config');
const Sentry = require("@sentry/node");

 Sentry.init({
    dsn: `https://${config.sentryDns}.ingest.sentry.io/${config.sentryId}`,
    tracesSampleRate: 1.0,   
})
  
/* 
Sentry.init({
    dsn: "https://0d45ce1daead40f285eb14b354c86538@o552501.ingest.sentry.io/5678401",
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  }); */
  

function logErrors(err, req, res, next){
    Sentry.captureException(err);
    console.log(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next){
    if ( req.xhr) {
        res.status(500).json({err : err.message});
    } else{
        next(err)
    } 
}

function errorHandler(err, req, res, next){
    // Catch error while streaming
    if(res.headerSent){
        next(err);
    }
    if(!config.dev){
        delete err.stack;
    }
    res.status(err.status || 500)
    res.render("error",{error: err});
}




module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler
}