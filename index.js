/* Imports */
const express =  require('express');
const path = require('path');
const boom = require('@hapi/boom')
const debug = require('debug')("app:server");
const helmet =  require("helmet")
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require('./routes/api/auth')
//const bodyParser = require("body-parser");
const {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
} =  require('./utils/middleware/errorsHandler');
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');

/* APP  */
const app = express();

/* middleware */
app.use(helmet());
app.use(express.json())



/* Statics files  */
app.use("/static", express.static(path.join(__dirname, "public")));


/* View engine setup */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");



/* routes */

app.use('/products', productsRouter);
productsApiRouter(app)
app.use("/api/auth", authApiRouter );

/* redirect */
app.get ('/', function(req, res) {
   res.redirect('/products');
});

app.use(function (req, res, nesxt){
   if(isRequestAjaxOrApi(req)) {
       const {
           output: {statusCode, payload}
       } = boom.notFound();
       res.status(statusCode).json(payload)
   }else {
    res.status(404).render("404");
  }
});

/* Error handlers  */
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


/* Server  */
const server =  app.listen(8000, function(){
    debug(`listenin http://localhost:${server.address().port}`);
});


